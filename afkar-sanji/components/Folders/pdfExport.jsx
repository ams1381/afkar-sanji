import React from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, Canvas, Note, pdf } from '@react-pdf/renderer';;
import { axiosInstance } from '@/utilities/axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Font } from '@react-pdf/renderer';
import DefaultImage from '../../public/Images/DefaultThanks.png'
import { QuestionComponentContainer, QuestionTitle , QuestionDescription } from '@/styles/questionnairePanel/QuestionComponent';
import { customfont } from './IRANSans Regular-normal';
import { digitsEnToFa } from '@persian-tools/persian-tools';

const StartIConString = `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.10433 0.898987C7.47114 0.155739 8.53099 0.155744 8.8978 0.898988L10.8282 4.81048L15.1448 5.43772C15.9651 5.55691 16.2926 6.56488 15.699 7.14342L12.5755 10.1881L13.3129 14.4872C13.453 15.3042 12.5956 15.9271 11.8619 15.5414L8.00106 13.5116L4.14018 15.5414C3.40655 15.9271 2.54913 15.3041 2.68924 14.4872L3.4266 10.1881L0.303081 7.14341C-0.290438 6.56488 0.0370772 5.55691 0.857295 5.43772L5.17389 4.81048L7.10433 0.898987Z" fill="#8F8F8F"/>
</svg>
`
const DislikeIConString = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.4829 17.2962C9.68406 18.1333 8.39129 17.683 8.05198 16.7057C7.77205 15.8995 7.4084 14.9339 7.05406 14.2231C5.99442 12.0971 5.37583 10.8875 3.66974 9.37403C3.44337 9.17322 3.15163 9.01139 2.82905 8.88388C1.69991 8.43756 0.638089 7.2678 0.915812 5.87918L1.26885 4.11401C1.45455 3.18547 2.14894 2.44154 3.06251 2.19239L8.66224 0.665189C11.2078 -0.0290479 13.8017 1.60569 14.2737 4.20164L14.9576 7.96334C15.2924 9.80486 13.8777 11.5 12.006 11.5H11.1225L11.1328 11.5522C11.2129 11.9604 11.3093 12.5225 11.3738 13.1352C11.438 13.7454 11.4721 14.4195 11.4218 15.0477C11.3725 15.6641 11.2379 16.2968 10.9176 16.7774C10.8081 16.9416 10.6455 17.1257 10.4829 17.2962Z" fill="#8F8F8F"/>
</svg>
`

const LikeIconString = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.4829 0.703859C9.68406 -0.133267 8.39129 0.317005 8.05198 1.2943C7.77205 2.10056 7.4084 3.06607 7.05406 3.77696C5.99442 5.90288 5.37583 7.11247 3.66974 8.62598C3.44337 8.8268 3.15163 8.98862 2.82905 9.11613C1.69991 9.56245 0.638089 10.7322 0.915812 12.1208L1.26885 13.886C1.45455 14.8145 2.14894 15.5585 3.06251 15.8076L8.66224 17.3348C11.2078 18.0291 13.8017 16.3943 14.2737 13.7984L14.9576 10.0367C15.2924 8.19515 13.8777 6.50001 12.006 6.50001H11.1225L11.1328 6.44778C11.2129 6.0396 11.3093 5.47747 11.3738 4.86485C11.438 4.25459 11.4721 3.58046 11.4218 2.95233C11.3725 2.33596 11.2379 1.70317 10.9176 1.22266C10.8081 1.05844 10.6455 0.874283 10.4829 0.703859Z" fill="#8F8F8F"/>
</svg>
`
const SmileIconString = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM5.15467 10.4273C4.96002 10.2314 4.64344 10.2304 4.44757 10.4251C4.25169 10.6197 4.25069 10.9363 4.44533 11.1322C6.33704 13.0359 9.37792 13.103 11.3505 11.3265L11.5547 11.1322L11.6123 11.0627C11.7467 10.8674 11.7265 10.5981 11.5524 10.4251C11.3783 10.252 11.1088 10.2336 10.9144 10.3692L10.8453 10.4273L10.6671 10.5961C9.08775 12.0045 6.66416 11.9463 5.15467 10.4273ZM10.5 5.5C9.94772 5.5 9.5 5.94772 9.5 6.5C9.5 7.05228 9.94772 7.5 10.5 7.5C11.0523 7.5 11.5 7.05228 11.5 6.5C11.5 5.94772 11.0523 5.5 10.5 5.5ZM5.5 5.5C4.94772 5.5 4.5 5.94772 4.5 6.5C4.5 7.05228 4.94772 7.5 5.5 7.5C6.05228 7.5 6.5 7.05228 6.5 6.5C6.5 5.94772 6.05228 5.5 5.5 5.5Z" fill="#8F8F8F"/>
</svg>

`
function convertSvgToBase64Jpeg(svg) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set the canvas dimensions based on the SVG size
    canvas.width = 25; // Adjust width as needed
    canvas.height = 25; // Adjust height as needed
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const img = new Image();

    
    // Convert the SVG data to a data URL
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    // Set the Image src to the SVG data URL
    img.src = url;

    // When the image loads, draw it on the canvas
    img.onload = function () {
      ctx.fillStyle = 'white';
      ctx.drawImage(img, 0, 0);

      // Convert canvas content to a base64-encoded JPEG image
      const base64Jpeg = canvas.toDataURL('image/jpeg');

      // Cleanup
      URL.revokeObjectURL(url);

      // Resolve with the base64-encoded JPEG data
      resolve(base64Jpeg);
    };

    // Handle image load error
    img.onerror = function (error) {
      reject(error);
    };
  });
}
const regex = /(<([^>]+)>)/gi;
// Create styles
// export const PdfGenerator = async () => {
//   try {
//     const base64Jpeg = await convertSvgToBase64Jpeg(StartIConString);
//     const a4Width = 595.28;
//     const a4Height = 841.89;
//     const doc = new jsPDF('p', 'pt', [a4Width, a4Height]);
//      doc.addFileToVFS(
//   "IRANSans Regular-normal.ttf",
//   customfont
// );
// doc.addFont(
//   "IRANSans Regular-normal.ttf",
//   "IRANSans",
//   "normal"
// );
// doc.setTextColor(0, 0, 0);
// doc.setFont("IRANSans");
//     doc.addPage()
//     doc.setTextColor(0, 0, 0);
//     doc.setLineWidth(1)
//     doc.setDrawColor(0);
//     doc.setFillColor(0 , 0 , 0);
//     for(let i = 0; i < 5 ; i ++)
//       doc.addImage(base64Jpeg, 'JPEG', i * 10, 0, 15, 15);
//     doc.save('safafaf.pdf');
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//   }
// }
export const PdfGenerator = async (questionnaire) => {
  // let QuestionsComponents = ''
  try 
  {

   let { data } = await axiosInstance.get(`/question-api/questionnaires/${questionnaire.uuid}/`)
  

  // console.log(data)

  // Set canvas dimensions
  const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const a4Width = 595.28;
const a4Height = 841.89;
const maxBoxWidth = a4Width * 0.95;  // 95% of the page width
const maxTextWidth = maxBoxWidth - 40;  // Max width for text
const parentBoxTopMargin = 20;  // Top margin for the parent box
const childBoxHeight = 40;  // Height of the child box
const integerBoxSize = 35;  // Size of each integer box
const integerBoxBackgroundColor = [200];  // Background color for integer boxes (shades of gray)

const pdf = new jsPDF('p', 'pt', [a4Width, a4Height]);
pdf.addFileToVFS(
  "IRANSans Regular-normal.ttf",
  customfont
);
pdf.addFont(
  "IRANSans Regular-normal.ttf",
  "IRANSans",
  "normal"
);
pdf.setTextColor(0, 0, 0);
pdf.setFont("IRANSans");

let yOffset = 10;  // Initialize y offset
// pdf.setDrawColor(255, 255, 255);
data?.questions.forEach(async (item, index) => {
  if (item.question) {
    if(item.question.question_type == 'file')
      return

    const boxWidth = maxBoxWidth;
    const boxX = (a4Width - boxWidth) / 2;  // X position for the boxes

    if (yOffset + 120 > a4Height) {
      pdf.addPage();  // Move to the next page
      yOffset = 10;   // Reset y offset for the new page
    }
  
    pdf.setDrawColor(255, 255, 255); 
    const titleHeight = pdf.getTextDimensions(digitsEnToFa(item.question.placement) + ' ' + item.question.title, { align: 'right', maxWidth: maxTextWidth }).h;
    let descHeight = 0;
    
    if (item.question.description) {
      descHeight = pdf.getTextDimensions(item.question.description, { align: 'right', maxWidth: maxTextWidth, fontSize: 14 }).h;
    }
    // Calculate total height for the parent box
    let totalHeight = titleHeight + descHeight + 40;  // Add extra padding for the child box

    if (item.question.question_type === 'integer_selective') {
      // const iconSize = 20;
      // const iconX = boxX + boxWidth - iconSize - 10;
      // const iconY = yOffset + parentBoxTopMargin + 10;// Y position for the icon
      // let dataUri;
      // switch(item.question.shape)
      // {
      //   case 'L':
      //     dataUri = await convertSvgToBase64Jpeg(LikeIconString)
      //     break;
      //   case 'D':
      //     dataUri = await convertSvgToBase64Jpeg(DislikeIConString)
      //     break;
      //   case 'SM':
      //     dataUri = await convertSvgToBase64Jpeg(SmileIconString)
      //   case 'S':
      //     dataUri = await convertSvgToBase64Jpeg(StartIConString)
      // }
      // // const img = document.createElement('img');
      // // img.src = dataUri;
      // // Draw the SVG icons based on item.question.max
      // for (let i = 0; i < item.question.max; i++) {
      //   const xPos = iconX + i * (iconSize + 5);  // Adjust X position for each icon
  
      //   pdf.addImage(dataUri, 'JPEG',  xPos, iconY, iconSize , iconSize);
      //   // Draw the SVG icon
      // }
      // pdf.setFillColor(255, 255, 255);  
    }
    // Check if the child box should be included
    if (item.question.question_type === 'link' || item.question.question_type === 'email_field' ||
     item.question.question_type === 'number_answer' || item.question.question_type === 'text_answer') {
      totalHeight += childBoxHeight + 10;  // Add child box height and extra padding
    }

    pdf.rect(boxX, yOffset, boxWidth, totalHeight + parentBoxTopMargin);  // Draw the border
   
    // Draw the parent box
    pdf.setFillColor(255, 255, 255);  // Set fill color to white
    pdf.rect(boxX, yOffset, boxWidth, totalHeight + parentBoxTopMargin, 'F');  // Draw the box

    if (item.question.question_type === 'integer_range') {
      const n = 10;  // Replace with the actual value of n
      const integerBoxStartX = boxX + (boxWidth - n * integerBoxSize) / 2;  // Calculate starting X position for integer boxes
      const integerBoxStartY = yOffset + totalHeight + parentBoxTopMargin + 10;  // Calculate starting Y position for integer boxes
  
    // Draw the integer boxes and numbers
    for (let i = 1; i <= n; i++) {
      const integerBoxX = integerBoxStartX + (i - 1) * (integerBoxSize + 10); // Adjusted X position with padding
  
      // Draw the background for the integer box
      const backgroundColor = [200, 200, 200];  // Alternating background colors
      pdf.setFillColor(...backgroundColor);  // Set fill color
      // pdf.setFillColor(255, 0, 0);
      pdf.rect(integerBoxX, integerBoxStartY, integerBoxSize, integerBoxSize, 'F');  // Draw the background
      // Draw the border for the integer box
      pdf.setLineWidth(1);  // Border width
      // pdf.setFillColor(255, 0, 0);
      pdf.setDrawColor(0); // Set border color to black
      pdf.rect(integerBoxX, integerBoxStartY, integerBoxSize, integerBoxSize);  // Draw the border
  
      // Draw the number
      const textColor = (i % 2 === 0) ? [0, 0, 0] : [255, 255, 255];  // Alternating text colors
      // Set text color
      
      pdf.setFontSize(16);  // Adjust font size for numbers
      pdf.text(digitsEnToFa(item.question.min == 0 ? (i-1).toString() : i.toString()), 
      integerBoxX + integerBoxSize / 2, integerBoxStartY + integerBoxSize / 2 + 5, { align: 'center' });
      // pdf.setFillColor(255, 0, 0);
      // pdf.setTextColor(255, 0, 0);
    }
    pdf.setDrawColor(255, 255, 255);
    // Update total height to account for integer boxes
    totalHeight += integerBoxSize + 20;  // Add extra padding
  }

  if (item.question.question_type === 'optional' || item.question.question_type === 'drop_down'
  || item.question.question_type === 'sort') {
    const colWidth = maxBoxWidth / 2;

    for (let i = 0; i < item.question.options.length; i++) {
      const col = i % 2; // 0 for left column, 1 for right column
      const x = boxX + (col * colWidth);
      const y = yOffset + totalHeight + parentBoxTopMargin + 10 + Math.floor(i / 2) * 40; // Adjust the y position

      // Draw the option box
      drawOptionBox(x, y, item.question.options[i].text, false,item.question.question_type); // Pass true as the last argument to preselect the checkbox
    }

    // Update total height to account for option boxes
    totalHeight += Math.ceil(item.question.options.length / 2) * 40 + 20; // Add extra padding
  }
 
  
    // Set text properties for right alignment and text wrapping
    pdf.setTextColor(0, 0, 0);  // Black color
    pdf.setFont('IRANSans', 'normal');
    pdf.setFontSize(16);

   
    // Draw the title
    pdf.text(digitsEnToFa(item.question.placement) + ' ' +  item.question.title, boxX + boxWidth - 10, yOffset + parentBoxTopMargin + 10, { align: 'right', maxWidth: maxTextWidth });

    // Draw the description if available
    if (item.question.description) {
      pdf.setFontSize(14);  // Adjust font size for description
      pdf.text(item.question.description, boxX + boxWidth - 10, yOffset + titleHeight + parentBoxTopMargin + 20, { align: 'right', maxWidth: maxTextWidth });
    }

    // Check if the child box should be included
    if (item.question.question_type === 'link' || item.question.question_type === 'email_field' || 
    item.question.question_type === 'number_answer' || item.question.question_type === 'text_answer') {
      // Draw the border for the child box
      pdf.setLineWidth(1);  // Border width
      pdf.setDrawColor(0); // Set border color to black
      pdf.rect(boxX + maxBoxWidth * 0.1, yOffset + totalHeight - childBoxHeight, maxBoxWidth * 0.9, childBoxHeight);  // Draw the border
      // Draw the child box
      pdf.setFillColor(220,220,220);
        // Set fill color to white
      pdf.rect(boxX + maxBoxWidth * 0.1, yOffset + totalHeight - childBoxHeight, maxBoxWidth * 0.9, childBoxHeight, 'F');  // Draw the box

      pdf.setDrawColor(255, 255, 255); 
      pdf.setFillColor(255, 255, 255);
    }
    
    // Update yOffset for the next item
    yOffset += totalHeight + parentBoxTopMargin;  // Adjust yOffset for the next item
  }
  function drawOptionBox(x, y, text, isChecked,questionType) {
    pdf.setDrawColor(1); 
  const boxSize = questionType == 'sort' ? 20 : 12;

  // Draw the checkbox
  // pdf.setDrawColor(0);
  // pdf.setLineWidth(1);
  pdf.rect(x, y, boxSize, boxSize);
  if (isChecked) {
    // pdf.setFillColor(0);
    pdf.rect(x + 2, y + 2, boxSize - 4, boxSize - 4, 'F');
  }

  // Draw the text if it's not null
  if (text !== null) {
    const textX = x + boxSize + 10;
    pdf.setDrawColor(0); 
    pdf.setTextColor(0);
    pdf.setFontSize(12);
    pdf.text(text && text != 'null' ? text.replace(regex,"") : ' ', textX, y + boxSize / 2);

   
  }
  pdf.setDrawColor(255, 255, 255); 
  }
});

pdf.save('exported.pdf');
  
  }
  catch(err)
  {
    console.log(err)
  }

}
function wrapText(text, font, maxWidth, context) {
  if(!text)
    return
  const lines = [];
  let line = '';
  const words = text.split(' ');

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth) {
      lines.push(line);
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }

  lines.push(line);
  return lines;
}
