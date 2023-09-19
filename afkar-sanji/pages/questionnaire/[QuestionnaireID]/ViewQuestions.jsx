import { DefaultThanks } from '@/components/Questions/DefaultThanks';
import QuestionComponent from '@/components/Questions/Question';
import ThankComponent from '@/components/Questions/Thanks';
import WelcomeComponent from '@/components/Questions/Welcome';
import { Icon } from '@/styles/icons';
import { PreviewPageContainer, PreviewPageHeader , ControlButtonsContainer
  , PreviewPage, AnimLightOne , AnimLightTwo , AnimLightThree , AnimLightFour ,
   PreviewQuestionsContainer } from '@/styles/questionnairePanel/ViewQuestions';
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
import { digitsEnToFa } from '@persian-tools/persian-tools';
// import { NullifiedContextProvider } from '@dnd-kit/core/dist/components/DragOverlay/components';


SwiperCore.use([Navigation]);

const ViewQuestions = ({ answerSetID , Questionnaire }) => {
  const router = useRouter();
  const [ QuestionnaireInfo , SetQuestionnaireInfo ] = useState(Questionnaire);
  const [ QuestionsData , SetQuestionsData ] = useState(Questionnaire?.questions);
  const [ messageApi , messageContext ] = message.useMessage();
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);
  const [ CurrentIndex , SetCurrentIndex ] = useState('Welcome');
  const [ swiperInstance , setSwiperInstance ] = useState(null);
  const [ nextQuestionError , setNextQuestionError ] = useState(null);
  const [ nextQuestionLoading , setNextQuestionLoading ] = useState(false);
  let scroll_position = 0;
  let scroll_direction;
  // const [ notAnsweredQuestions , setNotAnsweredQuestions ] = useState([]);

  let notAnsweredQuestions = []
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
        let  { data } =  await axiosInstance.get(`/question-api/${router.query.QuestionnaireID}/`);
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
  useEffect(() => {
    window.addEventListener('scroll', function(e){
      scroll_direction = (document.body.getBoundingClientRect()).top > scroll_position ? 'up' : 'down';
      scroll_position = (document.body.getBoundingClientRect()).top;
      
      if(swiperInstance && swiperInstance?.__swiper__)
      {
        console.log(swiperInstance)
        if(scroll_direction == 'down') 
        {
          // CurrentIndex != QuestionsData.length - 1
          if(CurrentIndex != QuestionsData.length - 1)
            swiperInstance?.slideTo(CurrentIndex + 2);
          // CornerButton.current.setAttribute('style',' right : -30%;')
        }   
        else 
        {
          if(CurrentIndex != 0)
            swiperInstance?.slideTo(CurrentIndex + 2);
        }
      }
  });
  },[swiperInstance])
  useEffect(() => {
      setNextQuestionError(null)
  },[QuestionsAnswerSet])

  const saveSwiperInstance = (swiper) => { 
    setSwiperInstance(swiper); // Store the Swiper instance
  };
  
  const NextQuestionHandler = async () => {
    // console.log(QuestionsData[CurrentIndex].question , QuestionsAnswerSet)
    if(QuestionsData[CurrentIndex]?.question?.question_type != 'group' && QuestionsAnswerSet)
    {
      let AnswerItem = QuestionsAnswerSet.find((item => item.question ==  QuestionsData[CurrentIndex]?.question?.id));
      let CopiedAnswerItem = JSON.parse(JSON.stringify(AnswerItem))
      // console.log(!Object.values(AnswerItem.answer).length)
      if(!Object.values(AnswerItem.answer).length)
        delete CopiedAnswerItem.answer;
      try 
      {
        setNextQuestionLoading(true)

          if(AnswerItem?.file)
          {

            await axios.post(`/question-api/questionnaires/${router.query.QuestionnaireID}/answer-sets/${answerSetID}/add-answer/`,AnswerSetFormDataConverter([AnswerItem]),{
              'Content-Type' : 'multipart/form-data'
            });
        // .
          }
        else
          await axios.post(`/question-api/questionnaires/${router.query.QuestionnaireID}/answer-sets/${answerSetID}/add-answer/`,[CopiedAnswerItem]);
        setNextQuestionLoading(false)
      }
      catch(err)
      {
        setNextQuestionLoading(false)

        // console.log(Object.values(err?.response?.data[0]))
        if(err?.response?.data)
          setNextQuestionError(Object.values(err?.response?.data[0])[0])
        return
      }
      // QuestionsData[CurrentIndex].quetion.id
    }
    
    if(CurrentIndex == QuestionsData.length - 1)
      SetCurrentIndex('Thanks')
    else
      SetCurrentIndex(CurrentIndex + 1)
  } 
  const ChangeSwiperSlideHandler = (E) => {
    // console.log(E)
    SetCurrentIndex(E.activeIndex)
    // if(QuestionsAnswerSet && !Object.values(QuestionsAnswerSet[E.activeIndex - 1]?.answer)?.length && 
    //   QuestionsData[E.activeIndex - 1]?.question?.is_required)
    //   {
    //     setNextQuestionError('لطفا به سوال پاسخ دهید');
    //     return
    //   }
    // else
    //   setNextQuestionError(null)
  }
  const PrevQuestionHandler = () => {
    setNextQuestionError(null)
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
    QuestionsAnswerSet.forEach((item,index) => {
      if(item.answer && !Object.values(item.answer)?.length && 
      QuestionsData[index]?.question?.is_required)
      {
        notAnsweredQuestions.push((QuestionsData?.find(QuestionItem => QuestionItem.question.id == item?.question))?.question?.placement)
      }
   
    })
    console.log(notAnsweredQuestions)
    if(notAnsweredQuestions?.length)
      setNextQuestionError(notAnsweredQuestions)
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
    console.log(err)
        messageApi.error({
          content : 'به سوالات درست پاسخ دهید',
          style : {
            fontFamily : 'IRANSans'
          }
        })
      
  }
    
  }
  return (
    <>
    <Head>
      <title> Afkar Sanji | { answerSetID ? 'Answer Page' : 'Preview' }</title>
    </Head>
    <AnimLightOne />
      <AnimLightTwo />
      <AnimLightThree />
      <AnimLightFour />
    {messageContext}
    { QuestionnaireInfo ? <PreviewPage>
      
   <Provider store={AnswerStore}>
    <PreviewPageContainer >  
      <PreviewPageHeader>
          {(QuestionnaireInfo.progress_bar &&  CurrentIndex != 'welcome_page') ? 
          <Progress  format={(percent) => `${digitsEnToFa(percent)}%`}
          percent={CurrentIndex == 'Thanks' ? 100
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
              onSlideChange={ChangeSwiperSlideHandler}
            >
             { QuestionnaireInfo.welcome_page && <SwiperSlide>
              <WelcomeComponent mobilepreview={true} swiperMode={true}
                WelcomeInfo={QuestionnaireInfo.welcome_page}
                 SetCurrentIndex={() => swiperInstance?.slideTo(1)} />
              </SwiperSlide>}
              {QuestionsData.map((item, index) => (
                item && <SwiperSlide key={item.question.id}>
                     <QuestionComponent mobilepreview={true} QuestionInfo={item.question} 
                     errorMessage={ nextQuestionError && CurrentIndex == index + 1 ? nextQuestionError : null} />
                    
                    { index == QuestionsData.length - 1 &&   <ControlButtonsContainer style={{ width : '90%' , flexDirection : 'column' , alignItems : 'center' }}>
                      {/* { Array.isArray(nextQuestionError) &&  nextQuestionError ?
                       <p className='answer_error_message'>پاسخ به این سوالات {
                      nextQuestionError?.map(item => ` ${digitsEnToFa(item)} , `)
                      } اجباری است </p>  : '' } */}
                      <Button type='primary' onClick={answerSetID ? ConfirmAnswersHandler : () => {
                       SetCurrentIndex('Thanks')
                       enableScroll();
                      }}>ارسال</Button>
                      </ControlButtonsContainer>}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
      : (QuestionsData[CurrentIndex] && 
      <>
        <QuestionComponent mobilepreview={true} QuestionInfo={QuestionsData[CurrentIndex].question} />
        { nextQuestionError ? <p className='answer_error_message'>{nextQuestionError}</p> : '' }
      </>  ): ''}   

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
            <Button type='primary' loading={nextQuestionLoading}
             icon={<Icon name='WhiteArrow' style={{ transform : 'rotate(-90deg)' }}/>}
              onClick={NextQuestionHandler}>
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
// export const getServerSideProps = async (context) => {
//   const { QuestionnaireID } = context.query;
//   try {
//     const { data } = await axiosInstance.get(`/question-api/questionnaires/${QuestionnaireID}/`);
//     return {
//       props:
//        { Questionnaire : {
//         data
//       } },
//     };
//   } catch (error) {
//     console.error('Error creating answer set:', error);
//     return {
//       props: { data: null },
//     };
//   }
// }
export default ViewQuestions;