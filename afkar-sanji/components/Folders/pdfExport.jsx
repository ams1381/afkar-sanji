import React from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, Canvas, Image, Note } from '@react-pdf/renderer';
import { useEffect } from 'react';
import { axiosInstance } from '@/utilities/axios';
import ReactDOMServer from 'react-dom/server';
import QuestionComponent from '../Questions/Question';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Font } from '@react-pdf/renderer';
import DefaultImage from '../../public/Images/DefaultThanks.png'
import { QuestionComponentContainer, QuestionTitle , QuestionDescription } from '@/styles/questionnairePanel/QuestionComponent';
// Font.register({
//   family: 'IRANSans',
//   src: '/IRANSansX-Regular',
// });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems : 'center',
    justifyContent : 'center',
    // fontFamily : 'IRANSans',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    flexDirection: 'column',
    alignItems : 'center',
    justifyContent : 'center',
  },
  Image : {
    width : '100%',
    height : '100%'
  }
});

export const PdfGenerator = async (questionnaire) => {
  // let QuestionsComponents = ''
  try 
  {
   let { data } = await axiosInstance.get(`/question-api/questionnaires/${questionnaire.uuid}/`)
  //  console.log(data)
  data?.questions.forEach(item => {
    console.log(new DOMParser().parseFromString(ReactDOMServer.renderToString(
    <QuestionComponentContainer >
      <QuestionTitle>
          {item.question.title}
      </QuestionTitle>
      <QuestionDescription>
            <p>{item.question.description ? item.question.description.replace(regex,"") :
             item.question.question_text ? item.question.question_text.replace(regex,"") : ''}</p>
        </QuestionDescription>
    </QuestionComponentContainer>
    ),'text/html').firstChild.lastChild.firstChild)


    const report = new jsPDF('portrait','pt','a4');
    // report.addFont('IRANSansX-Regular.ttf', 'IRANSans', 'normal')
    const content = `
    <html>
      <head>
        <style>
          @font-face {
            font-family: 'IRANSans';
            src: url('../public//Fonts/IRANSansX-Regular.ttf);
          }

          body {
            font-family: 'IRANSans', sans-serif;
          }
        </style>
      </head>
      <body>
        ${ReactDOMServer.renderToString(
          <QuestionComponentContainer >
            <QuestionTitle>
                {item.question.title}
            </QuestionTitle>
            <QuestionDescription>
                  <p>{item.question.description ? item.question.description.replace(regex,"") :
                   item.question.question_text ? item.question.question_text.replace(regex,"") : ''}</p>
              </QuestionDescription>
          </QuestionComponentContainer>
          )}
      </body>
    </html>
`;
    // report.html(new DOMParser().parseFromString(ReactDOMServer.renderToString(
    //   <QuestionComponentContainer >
    //     <QuestionTitle>
    //         {item.question.title}
    //     </QuestionTitle>
    //     <QuestionDescription>
    //           <p>{item.question.description ? item.question.description.replace(regex,"") :
    //            item.question.question_text ? item.question.question_text.replace(regex,"") : ''}</p>
    //       </QuestionDescription>
    //   </QuestionComponentContainer>
    //   ),'text/html').firstChild.lastChild.firstChild).then(() => {
    //     report.save('report.pdf');
    // });
    report.html(content, {
      callback: () => {
        report.save('report.pdf');
      }
    });
  })
  //  setRetrievedQuestionnaire(data)/
  }
  catch(err)
  {
    console.log(err)
  }
  // return  <Document>
  //      <Page size="A4" style={styles.page}>
  //        <View style={styles.section}>
  //          <Text style={styles.title}>
  //           <Text>Hiiiii</Text>
  //           <Image style={styles.Image} src={DefaultImage.src} />
  //          </Text>
  //        </View>
  //        <View style={styles.section}>
  //          <Text style={styles.title}>Question Des</Text>
  //        </View>
  //        <View style={styles.section}>
  //          <Text style={styles.title}>Question Body</Text>
  //        </View>
  //      </Page>
  //      <div>
  //           sdfgksdfhgkfdhfgkg
  //           </div>
  //    </Document>
}
function convertReactElementToHTML(reactElement) {
  if (!reactElement || typeof reactElement !== 'object' || !reactElement.type) {
    return null;
  }

  const { type, props } = reactElement;
  let htmlNode;

  if (typeof type === 'string') {
    htmlNode = document.createElement(type);

    // Set HTML attributes based on React props
    Object.keys(props).forEach(key => {
      if (key !== 'children') {
        htmlNode.setAttribute(key, props[key]);
      }
    });

    // Recursively convert and append children
    if (props.children) {
      const childrenArray = Array.isArray(props.children) ? props.children : [props.children];
      childrenArray.forEach(child => {
        const childNode = convertReactElementToHTML(child);
        if (childNode) {
          htmlNode.appendChild(childNode);
        }
      });
    }
  } else if (typeof type === 'function') {
    // Handle functional components or other functions
    const functionalComponentResult = type(props);
    htmlNode = convertReactElementToHTML(functionalComponentResult);
  }
  return htmlNode;
}