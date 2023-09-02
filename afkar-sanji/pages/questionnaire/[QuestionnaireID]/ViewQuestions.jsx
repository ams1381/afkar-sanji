import { DefaultThanks } from '@/components/Questions/DefaultThanks';
import QuestionComponent from '@/components/Questions/Question';
import ThankComponent from '@/components/Questions/Thanks';
import WelcomeComponent from '@/components/Questions/Welcome';
import { Icon } from '@/styles/icons';
import { PreviewPageContainer, PreviewPageHeader , ControlButtonsContainer, PreviewPage, PreviewQuestionsContainer } from '@/styles/questionnairePanel/ViewQuestions';
import { axiosInstance, baseURL } from '@/utilities/axios';
import { Button, Progress, Skeleton, message } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import ProgressBarLoading from '@/styles/ProgressBarLoading';
import TopBarProgress from 'react-topbar-progress-indicator';
import { Provider, useSelector } from 'react-redux';
import AnswerStore, { setInitialAnswerSet } from '@/utilities/AnswerStore';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { AnswerSetFormDataConverter } from '@/utilities/FormData';

SwiperCore.use([Navigation]);

const ViewQuestions = ({ answerSetID }) => {
  const router = useRouter();
  const [ QuestionnaireInfo , SetQuestionnaireInfo ] = useState(null);
  const [ QuestionsData , SetQuestionsData ] = useState(null);
  const [ messageApi , messageContext ] = message.useMessage();
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);
  const [ CurrentIndex , SetCurrentIndex ] = useState('Welcome');
  const [ swiperInstance , setSwiperInstance ] = useState(null)
  let QuestionsAnswerSet;
  let dispatcher;
  if(answerSetID)
  {
    dispatcher = useDispatch();
    QuestionsAnswerSet = useSelector(state => state.reducer.AnswerSet)
  }
  const disableScroll = () => {
    const scrollTop = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollTop}px`;
    setIsScrollDisabled(true);
  };
  const enableScroll = () => {
    const scrollTop = parseInt(document.body.style.top || '0', 10);
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, -scrollTop); // Scroll back to original position
    setIsScrollDisabled(false);
  };
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
         QuestionsArray && QuestionsArray.length && answerSetID ? dispatcher(setInitialAnswerSet({ Questions : QuestionsArray })) : ''
         SetQuestionsData(QuestionsArray)
         SetQuestionnaireInfo(data)
         if(data.welcome_page)
            SetCurrentIndex('welcome_page');
        else
            SetCurrentIndex(0);
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
    if(QuestionnaireInfo && !QuestionnaireInfo.show_question_in_pages)
    {
      disableScroll();
    }
  },[])
  const saveSwiperInstance = (swiper) => {
    setSwiperInstance(swiper); // Store the Swiper instance
  };
  const NextQuestionHandler = () => {
    if(CurrentIndex == QuestionsData.length - 1)
      SetCurrentIndex('Thanks')
    else
      SetCurrentIndex(CurrentIndex + 1)
  } 

  const PrevQuestionHandler = () => {
    if(CurrentIndex == 0)
      SetCurrentIndex('welcome_page')
    else
      SetCurrentIndex(CurrentIndex - 1)
  }

  const ConfirmAnswersHandler = async () => {

    let FileQuestionQuestions = QuestionsAnswerSet.map(item => {
      if(item.file)
        return item
    }) 
    // .find((item,index) => item.file !== null);
    FileQuestionQuestions = FileQuestionQuestions.filter(item => item != undefined);
    QuestionsAnswerSet = QuestionsAnswerSet.filter(item => item.file == null);

    console.log(FileQuestionQuestions)
    try
    {
      if(FileQuestionQuestions && FileQuestionQuestions.length)
      await axios.post(baseURL + `/question-api/questionnaires/${router.query.QuestionnaireID}/answer-sets/${answerSetID}/add-answer/`,AnswerSetFormDataConverter(FileQuestionQuestions),{
        'Content-Type' : 'multipart/form-data'
      })
    await axios.post(baseURL + `/question-api/questionnaires/${router.query.QuestionnaireID}/answer-sets/${answerSetID}/add-answer/`,
    QuestionsAnswerSet)
    SetCurrentIndex('Thanks')
  }
  catch(err)
  {

  }
    
  }
  return (
    <>
    <Head>
      <title> Afkar Sanji | { answerSetID ? 'Answer Page' : 'Preview' }</title>
    </Head>
    {messageContext}
    { QuestionnaireInfo ? <PreviewPage>
   <Provider store={AnswerStore}>
    <PreviewPageContainer >  
      <PreviewPageHeader>
          {QuestionnaireInfo.progress_bar ? 
          <Progress percent={CurrentIndex == 'Thanks' ? 100
          : Math.floor((CurrentIndex / QuestionsData.length) * 100)}  steps={QuestionsData.length} /> : ''}
      </PreviewPageHeader>
      <PreviewQuestionsContainer slidemode={(!QuestionnaireInfo.show_question_in_pages && CurrentIndex != 'Thanks')? 'active' : null}>
      { (QuestionnaireInfo.show_question_in_pages && QuestionnaireInfo.welcome_page && CurrentIndex =='welcome_page') 
      && <WelcomeComponent mobilepreview={true}
       WelcomeInfo={QuestionnaireInfo.welcome_page} SetCurrentIndex={SetCurrentIndex} />}

      { ( CurrentIndex !='Thanks') ? !QuestionnaireInfo.show_question_in_pages ?
            <div className="custom-swiper-container">
            <Swiper 
              direction="vertical"
              allowSlideNext={true}
              onSwiper={saveSwiperInstance}
              allowSlidePrev={true}
              slidesPerView={1}
              onSlideChange={(E) => SetCurrentIndex(E.activeIndex)}
            >
             { QuestionnaireInfo.welcome_page && <SwiperSlide>
              <WelcomeComponent mobilepreview={true} swiperMode={true}
                WelcomeInfo={QuestionnaireInfo.welcome_page}
                 SetCurrentIndex={() => swiperInstance?.slideTo(1)} />
              </SwiperSlide>}
              {QuestionsData.map((item, index) => (
                item && <SwiperSlide key={item.question.id}>
                    <QuestionComponent mobilepreview={true} QuestionInfo={item.question} />
                    { index == QuestionsData.length - 1 &&   <ControlButtonsContainer style={{ width : '90%' }}>
                      <Button type='primary' onClick={answerSetID ? ConfirmAnswersHandler : () => {
                       SetCurrentIndex('Thanks')
                       enableScroll();
                      }}>ارسال</Button>
                      </ControlButtonsContainer>}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
      : (QuestionsData[CurrentIndex] && <QuestionComponent mobilepreview={true} QuestionInfo={QuestionsData[CurrentIndex].question} /> ): ''}   

      { CurrentIndex == 'Thanks'
      ? QuestionnaireInfo.thanks_page ? <ThankComponent ThanksInfo={QuestionnaireInfo.thanks_page} mobilepreview={true}/> : 
      <DefaultThanks mobilepreview={true} /> : 
         ''
       }
      </PreviewQuestionsContainer>
      {
        <>
        {
        (QuestionnaireInfo.show_question_in_pages  &&  CurrentIndex !='Thanks') && <ControlButtonsContainer>
          {
            ((CurrentIndex !='welcome_page')) &&
            <>
            <Button type='primary'
             icon={<Icon name='WhiteArrow' style={{ transform : 'rotate(-90deg)' }}/>}
              onClick={(CurrentIndex == QuestionsData.length - 1 && answerSetID) ? ConfirmAnswersHandler :  NextQuestionHandler}>
               { CurrentIndex == QuestionsData.length - 1 ? 'ارسال' : 'بعدی' }
            </Button> 
           { (CurrentIndex == 0 && !QuestionnaireInfo.welcome_page || !QuestionnaireInfo.previous_button ) ? '' 
           : <Button type='primary' onClick={PrevQuestionHandler} 
            icon={<Icon name='WhiteArrow' style={{ transform : 'rotate(90deg)' }} />}>
              قبلی
            </Button> }
            </>
          }
        </ControlButtonsContainer>}
        {
      
          (!QuestionnaireInfo.show_question_in_pages) && <ControlButtonsContainer>
        </ControlButtonsContainer>

        
        }
        {
          (QuestionnaireInfo.show_question_in_pages && CurrentIndex =='Thanks') && <ControlButtonsContainer>
          </ControlButtonsContainer>
        }
        </>
      }
    </PreviewPageContainer>
    </Provider>
    </PreviewPage> : <TopBarProgress />}
   
    </>
  )
}
export default ViewQuestions;