import React from 'react';
import { axiosInstance } from '@/utilities/axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { QuestionComponentContainer, QuestionTitle , QuestionDescription } from '@/styles/questionnairePanel/QuestionComponent';
import { customfont } from './IRANSans Regular-normal';
import { digitsEnToFa } from '@persian-tools/persian-tools';

function convertSvgToBase64Jpeg(svg) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set the canvas dimensions based on the SVG size
    canvas.width = 30; // Adjust width as needed
    canvas.height = 30; // Adjust height as needed

    // Fill the canvas with a white background
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
function extractArrayAfterChildQuestions(arr) {
  const result = [];
  let previousQuestion = null;

  for (const item of arr) {
    const currentQuestion = item.question;

    if (currentQuestion) {
      if (previousQuestion && previousQuestion.child_questions) {
        // Extract child questions for the previous question
        previousQuestion.child_questions.forEach((item) => {
          result.push(item);
        })
        
      }
      result.push({ question: currentQuestion });
      previousQuestion = currentQuestion;
    }
  }

  // Handle the last question
  if (previousQuestion && previousQuestion.child_questions) {
    result.push({ question: { child_questions: previousQuestion.child_questions } });
  }

  return result;
}
const regex = /(<([^>]+)>)/gi;

// export const PdfGenerator = async () => {
//   try {
//     const base64Jpeg = await convertSvgToBase64Jpeg(LikeIconString);
//     console.table('like',await convertSvgToBase64Jpeg(LikeIconString) ,
//     'dislike', await convertSvgToBase64Jpeg(DislikeIConString),
//     'Smile',await convertSvgToBase64Jpeg(SmileIconString),
//     'Star',await convertSvgToBase64Jpeg(StartIConString))
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
//     let array = [0 , 1 ,2 , 3]
//     array.forEach(item => {
//       doc.addImage(base64Jpeg, 'JPEG', item * 10, 0, 15, 15);
//     })
//     // for(let i = 0; i < 5 ; i ++)
//       console.log(base64Jpeg)
//     // doc.save('safafaf.pdf');
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
  // const canvas = document.createElement('canvas');
  // const context = canvas.getContext('2d');
  const a4Width = 595.28;
  const a4Height = 841.89;
  const maxBoxWidth = a4Width * 0.95;  
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
  // console.log(extractArrayAfterChildQuestions(data?.questions))
  let ListToRenderPDF = extractArrayAfterChildQuestions(data?.questions);
  ListToRenderPDF.forEach(async (item, index) => {
    if (item.question) {
      if(item.question.question_type == 'file' || !item.question.title)
        return

      const boxWidth = item.question.group ? maxBoxWidth - 20 : maxBoxWidth;
      const boxX = (a4Width - boxWidth) / 2;  // X position for the boxes
  
      if (yOffset + 120 > a4Height) {
        pdf.addPage();  // Move to the next page
        yOffset = 10;   // Reset y offset for the new page
      }
    
      pdf.setDrawColor(255, 255, 255); 
      console.log(item.question.title)
      const titleHeight = 
      pdf.getTextDimensions(item.question.title, { align: 'right', maxWidth: maxTextWidth }).h;
      let descHeight = 0;
      
      if (item.question.description) {
        descHeight = pdf.getTextDimensions(item.question.description, { align: 'right', maxWidth: maxTextWidth, fontSize: 14 }).h;
      }

      let totalHeight = titleHeight + descHeight + 40; 
      

      if (item.question.question_type === 'link' || item.question.question_type === 'email_field' ||
      item.question.question_type === 'number_answer' || item.question.question_type === 'text_answer') {
        totalHeight += childBoxHeight + 10;  
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

      totalHeight += Math.ceil(item.question.options.length / 2) * 40 + 20; // Add extra padding
    }

      // Set text properties for right alignment and text wrapping
      pdf.setTextColor(0, 0, 0);  // Black color
      pdf.setFont('IRANSans', 'normal');
      pdf.setFontSize(16);

      if (item.question.question_type === 'integer_selective') {
        const iconSize = 20;
        const iconX = boxX + boxWidth - iconSize - 10;
        const iconY = yOffset + parentBoxTopMargin + 40;// Y position for the icon
        let dataUri ;
        // let iconToSet ;
        console.log(dataUri)
        switch(item.question.shape)
        {
          case 'L':
            dataUri = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAeAB4DASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAQFBwgJ/8QAKhAAAQMDAgUCBwAAAAAAAAAAAQIDBAAFBgcREiExQWEIIhMUJDJRgZH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9ItWM7iae4TcL46+lMxbamIDfLdySoEI2HcD7j4SazD0q5s1LslwsV9ydL9zfuC3YseVKKn1pLaSspCjuRuCeXfiNYvrxcMtl6kXiLlEiWtuLLdTb23QUtojFXsLaegBSEkkdT151G0Ps0u96q44xFSv6aaiY4pJ24W2ved/B4dv3t3oO8aUpQRLlaLTeWPlrva4k5nr8OSwl1P8UCKr8fwrEsUW87jeOW+2uSOTq47CUKWPwSOe3jpV3SgUpSg//9k=';
            break;
          case 'D':
            dataUri = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAeAB4DASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAUHCAP/xAAlEAABAwQCAgIDAQAAAAAAAAABAgMFAAQGEQcSMUEIExQiUXH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A0dy9zlyK9mc3AxU/cxMdH3j1k03aD6XCG19SorH77JTvyNb9Vw4E5Py2P5Eioe/yC8u46WeFo8xdXCnUhSgeik9iequ+vHkEirr+QnEkbl+MXmTxNg23PRjZuO7TaUqu20gd0LPlRCQSn3sa91WPxi4tg8pfOcyd1d/fBSKPx7dBCWlrSlK0qUfJ0TvQ14G9jYoNX0pSgVF4/jMBilkuOxyKt4+2deVcLbZToKcVraj/AE6AH+AD1UpSgUpSg//Z';
            break;
          case 'SM':
            dataUri = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAeAB4DASIAAhEBAxEB/8QAGAABAQADAAAAAAAAAAAAAAAAAAEDBwj/xAAiEAABAwQDAAMBAAAAAAAAAAABAAIFAwQHEQYSIRMUMTL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A31lHInK8nzc5VtpYW0BEdjRsjdtpMfSDxTDuux8r3E9te6BIHgVxnkjl+MpmEr3kz9qElgHVrE3TawbRLzT7FuyaTwW7H4SB754s2QcTVcf8olBNcelJDj932q2EhH/tuC8O0/YLdgbaQ7W/6BUx9il2Q+TxrYHjkpY8ftHtqX8hJEP+cA7LWgNa33XUNb2I3txIQdpoiICIiAiIg//Z';
            break;
          case 'S':
            dataUri = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAeAB4DASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAIIBf/EACUQAAEDBAIBBAMAAAAAAAAAAAECAwQABQYRBxIIISIxQRMyYf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDY3LnkvZpFhueK4Y1dmLo6oxVzHGgyllIVpzr7u4VoED0Gt7+RU8R+Stlg45a8Uy2Ld5N0YIiNPx2Q8Hkb02D7uxVrSfQHegfs1x/Ifj69ZTyrFhYXiTz8iVbm3ZT7LRQ2473WCpazpA0kIBJI+Rv6q/Hjjy+YnypLiZlib7MiNbXXYkhxvs0hf5EJ7oX+pJBUAQSfU/2g1JSlKBSlKBSlKD//2Q==';
            break;
        }

        for (let i = 0; i < item.question.max; i++) {
          const xPos = iconX + i * (iconSize + 5);  // Adjust X position for each icon

          pdf.addImage(dataUri,'JPEG',xPos / 2, iconY)
      
        }
        pdf.setFontSize(16);
        pdf.setFillColor(255, 255, 255);  
      }
      // Draw the title
      let QuestionNumber;
      if(item.question.group)
      {
        QuestionNumber =  item.question.placement  + ' - ' + ListToRenderPDF.find(Ite => Ite.question.id == item.question.group).question.placement ;
      }
      else 
        QuestionNumber = item.question.placement

      
      pdf.text(digitsEnToFa(QuestionNumber.toString()),
      boxX + 10 + boxWidth , yOffset + parentBoxTopMargin + 10,{ align: 'right', maxWidth: maxTextWidth })
      pdf.text(item.question.title, item.question.group ? (boxX + boxWidth - 40) : (boxX + boxWidth - 10)
       , yOffset + parentBoxTopMargin + 10, { align: 'right', maxWidth: maxTextWidth });
     

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


  pdf.rect(x, y, boxSize, boxSize);
  if (isChecked) {
    // pdf.setFillColor(0);
    pdf.rect(x + 2, y + 2, boxSize - 4, boxSize - 4, 'F');
  }


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
