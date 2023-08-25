import QuestionComponent from '@/components/Questions/Question';
import ThankComponent from '@/components/Questions/Thanks';
import WelcomeComponent from '@/components/Questions/Welcome';
import { Icon } from '@/styles/icons';
import { PreviewPageContainer, PreviewPageHeader , ControlButtonsContainer, PreviewPage, PreviewQuestionsContainer } from '@/styles/questionnairePanel/ViewQuestions';
import { axiosInstance } from '@/utilities/axios';
import { Button, Progress, Skeleton, message } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const ViewQuestions = () => {
  const router = useRouter();
  const [ QuestionnaireInfo , SetQuestionnaireInfo ] = useState(null);
  const [ QuestionsData , SetQuestionsData ] = useState(null);
  const [ messageApi , messageContext ] = message.useMessage()
  const [ CurrentIndex , SetCurrentIndex ] = useState('Welcome');

  useEffect(() => {
    try 
    {
      const QuestionnaireRetriever = async () => {
        let  { data } =  await axiosInstance.get(`/question-api/questionnaires/${router.query.QuestionnaireID}/`);
        let QuestionsArray =  data.questions.map((item,index) => { 
          if(item.question)
            return { question: item.question}
         })
         QuestionsArray.forEach((item,index) => !item ? QuestionsArray.splice(index,1) : '')
         SetQuestionsData(QuestionsArray)
         SetQuestionnaireInfo(data)
     }
     if(router.query.QuestionnaireID)
     QuestionnaireRetriever();
    }
    catch(err)
    {
      console.log(err)
      messageApi.error({
        content : 'در لود کردن سوالا مشکلی پیش آمد',
        style : {
          fontFamily : 'IRANSans'
        }

      })
    }
   
  },[router.query])
  const NextQuestionHandler = () => {
    if(CurrentIndex == QuestionsData.length - 1)
      SetCurrentIndex('Thanks')
    else
      SetCurrentIndex(CurrentIndex + 1)
  }
  const PrevQuestionHandler = () => {
    if(CurrentIndex == 0)
      SetCurrentIndex('Welcome')
    else
      SetCurrentIndex(CurrentIndex - 1)
  }
  return (
    <>
    <Head>
      <title> Afkar Sanji | Preview</title>
    </Head>
    {messageContext}
    { QuestionnaireInfo ? <PreviewPage>
    <PreviewPageHeader>
        {/* {QuestionnaireInfo.progress_bar ? 
        <Progress percent={Math.floor(CurrentIndex + 1/ QuestionsData.length)}  steps={1} /> : <Skeleton active />} */}
    </PreviewPageHeader>
    <PreviewPageContainer>  
      <PreviewQuestionsContainer>
      { (QuestionnaireInfo.welcome_page && CurrentIndex =='Welcome') 
      ? <WelcomeComponent WelcomeInfo={QuestionnaireInfo.welcome_page} SetCurrentIndex={SetCurrentIndex} /> : ''}

      { (CurrentIndex !='Welcome' && CurrentIndex !='Thanks')? !QuestionnaireInfo.show_question_in_pages ?
       QuestionsData.map((item) => <QuestionComponent key={item.question.id} QuestionInfo={item.question} />)
      : <QuestionComponent QuestionInfo={QuestionsData[CurrentIndex].question} /> : ''}   

      { (QuestionnaireInfo.thanks_page && CurrentIndex == 'Thanks') 
      ? <ThankComponent ThanksInfo={QuestionnaireInfo.thanks_page} /> : ''}

     { ((CurrentIndex !='Welcome' && CurrentIndex !='Thanks') &&
      QuestionnaireInfo.show_question_in_pages) ?  <ControlButtonsContainer>
      <Button type='primary' onClick={NextQuestionHandler}
      icon={<Icon name='WhiteArrow' style={{ transform : 'rotate(-90deg)' }}/>}>
         { CurrentIndex == QuestionsData.length - 1 ? 'ارسال' : 'بعدی' }
      </Button>
      <Button type='primary' onClick={PrevQuestionHandler}
       icon={<Icon name='WhiteArrow' style={{ transform : 'rotate(90deg)' }} />}>
        قبلی
      </Button>
      </ControlButtonsContainer> : ''}
      </PreviewQuestionsContainer>
    </PreviewPageContainer>
    </PreviewPage> : <>Loading</>}
   
    </>
    
  )
}
export default ViewQuestions;