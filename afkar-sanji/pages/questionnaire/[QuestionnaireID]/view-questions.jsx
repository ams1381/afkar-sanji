import { DefaultThanks } from '@/components/Questions/DefaultThanks';
import QuestionComponent from '@/components/Questions/Question';
import ThankComponent from '@/components/Questions/Thanks';
import WelcomeComponent from '@/components/Questions/Welcome';
import { Icon } from '@/styles/icons';
import { PreviewPageContainer, PreviewPageHeader , ControlButtonsContainer
  , PreviewPage, AnimLightOne , AnimLightTwo , AnimLightThree , AnimLightFour ,
   PreviewQuestionsContainer } from '@/styles/questionnairePanel/ViewQuestions';
import { axiosInstance, baseURL } from '@/utilities/axios';
import { Button, Progress, Skeleton, message , Statistic  } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import ProgressBarLoading from '@/styles/ProgressBarLoading';
import TopBarProgress from 'react-topbar-progress-indicator';
import { Provider, useSelector } from 'react-redux';
import AnswerStore, { setInitialAnswerSet } from '@/utilities/AnswerStore';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { AnswerSetFormDataConverter } from '@/utilities/FormData';
import { digitsEnToFa } from '@persian-tools/persian-tools';
import { AnimatePresence , motion} from 'framer-motion';
import { FreeMode, Mousewheel, Pagination } from 'swiper/modules';
import { isValidElement } from 'react';
import { useTimer } from 'react-timer-hook';
import { Timer } from '@/components/ViewQuestions/Timer';
// import { NullifiedContextProvider } from '@dnd-kit/core/dist/components/DragOverlay/components';

SwiperCore.use([Navigation]);

function getDeadlineTimestamp(timeString) {
  if(!timeString)
    return null
  const [hours, minutes, seconds] = timeString.split(':').map(Number);

  // Calculate milliseconds from the given time
  const millisecondsFromTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

  // Calculate the total deadline timestamp
  const deadlineTimestamp = Date.now() + millisecondsFromTime;

  return deadlineTimestamp;
}
const ViewQuestions = ({ answerSetID , Questionnaire , cookies }) => {
  const router = useRouter();
  const [ QuestionnaireInfo , SetQuestionnaireInfo ] = useState(Questionnaire);
  const [ QuestionsData , SetQuestionsData ] = useState(Questionnaire?.questions);
  const [ messageApi , messageContext ] = message.useMessage();
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);
  const [ CurrentIndex , SetCurrentIndex ] = useState('Welcome');
  const [ swiperInstance , setSwiperInstance ] = useState(null);
  const [ nextQuestionError , setNextQuestionError ] = useState(null);
  const [ nextQuestionLoading , setNextQuestionLoading ] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [ TimerFinished , SetTimerFinished ] = useState(false);
 

 


  let notAnsweredQuestions = []
  let QuestionsAnswerSet;
  let dispatcher;
  if(answerSetID)
  {
    dispatcher = useDispatch();
    QuestionsAnswerSet = useSelector(state => state.reducer.AnswerSet)
  }
  

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
        let data;
        if(answerSetID)
        {
          try 
          {
            let  response =  await axios.get(`/question-api/${router.query.QuestionnaireID}/`);
          data = response.data;
          }
          catch(err) {
            if(err?.response?.status == 403)
              router.push('/403')
            return
          }
        }
        else
        {
          axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + cookies?.access_token;
          let  response =  await axiosInstance.get(`/question-api/questionnaires/${router?.query?.QuestionnaireID}/`);
          data = response.data;
        }          
        let QuestionsArray =  data.questions.map((item,index) => { 
          if(item.question)
            return { question: item.question}
         })
         QuestionsArray.forEach((item,index) => !item ? QuestionsArray.splice(index,1) : '')
         QuestionsArray && QuestionsArray.length && answerSetID ? dispatcher(setInitialAnswerSet({ Questions : QuestionsArray })) : ''
         SetQuestionsData(QuestionsArray?.filter(item => item != undefined))
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
      if(err?.response?.status == 403)
        router.push('/403')
      messageApi.error({
        content : 'در لود کردن سوالا مشکلی پیش آمد',
        style : {
          fontFamily : 'IRANSans'
        }
      })
    }
  },[])

  useEffect(() => {
      setNextQuestionError(null)
  },[QuestionsAnswerSet])

  const saveSwiperInstance = (swiper) => { 
    setSwiperInstance(swiper); // Store the Swiper instance
  };
  // console.log(getDeadlineTimestamp(QuestionnaireInfo.timer))
  // if(QuestionnaireInfo)
  //   console.log(getDeadlineTimestamp(QuestionnaireInfo?.timer),QuestionnaireInfo?.timer)
  const NextQuestionHandler = async () => {
    setNextQuestionError(null)
    // console.log(QuestionsData[CurrentIndex].question , QuestionsAnswerSet)
    if(QuestionsAnswerSet)
    {
      let AnswerItem;
      let CopiedAnswerItem;
      if(QuestionsData[CurrentIndex]?.question?.question_type != 'group')
      {
        AnswerItem = QuestionsAnswerSet.find((item => item.question ==  QuestionsData[CurrentIndex]?.question?.id));
        CopiedAnswerItem = JSON.parse(JSON.stringify(AnswerItem))
      }
      else 
      {
        AnswerItem = QuestionsData[CurrentIndex]?.question.child_questions.map(item => {
          return QuestionsAnswerSet.find(AnswerItem => AnswerItem.question == item.question.id)
        })

      }
      if(!AnswerItem)
        return
      
      // console.log(!Object.values(AnswerItem.answer).length)
      if(!Array.isArray(AnswerItem) && !Object.values(AnswerItem.answer).length)
        delete CopiedAnswerItem.answer;
      try 
      {
        setNextQuestionLoading(true)
        if(!Array.isArray(AnswerItem))
        {
          if(AnswerItem?.file)
          {
            await axios.post(`/question-api/questionnaires/${router.query.QuestionnaireID}/answer-sets/${answerSetID}/add-answer/`,AnswerSetFormDataConverter([AnswerItem]),{
              'Content-Type' : 'multipart/form-data'
            });
        // .
          }
        else
          await axios.post(`/question-api/questionnaires/${router.query.QuestionnaireID}/answer-sets/${answerSetID}/add-answer/`,[CopiedAnswerItem]);
        }
        else 
        {
          if(AnswerItem.find(item => item.file != null))
          {
           let FileAnswers = AnswerItem.filter(item => item.file != null);
           FileAnswers.forEach(async (item) => {
            await axios.post(`/question-api/questionnaires/${router.query.QuestionnaireID}/answer-sets/${answerSetID}/add-answer/`,AnswerSetFormDataConverter([item]),{
              'Content-Type' : 'multipart/form-data'
            });
           }) 
          }
          await axios.post(`/question-api/questionnaires/${router.query.QuestionnaireID}/answer-sets/${answerSetID}/add-answer/`,AnswerItem.filter(item => !item.file));
          // }
        }  
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
    {
      SetCurrentIndex(CurrentIndex + 1)
      setNextButtonPressed(true)
      setPrevButtonPressed(false);
    }
      
  } 
  const ChangeSwiperSlideHandler = async (E) => {
    const text = document.querySelector('.swiper-wrapper').getAttribute('style');

    const regex = /translate3d\(([-\d]+px), ([-\d]+px), ([-\d]+px)\)/;
    const match = text.match(regex);

    SetCurrentIndex(E.activeIndex)
    if(QuestionsData[E.activeIndex - 1]?.question?.question_type != 'group' && QuestionsAnswerSet)
    {
      let AnswerItem = QuestionsAnswerSet.find((item => item.question ==  QuestionsData[E.activeIndex - 1]?.question?.id));
      if(!AnswerItem)
        return
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
        // nextButtonPressed = true;
        // prevButtonPressed = false;
      }
      catch(err)
      {
        setNextQuestionLoading(false)

        // console.log(Object.values(err?.response?.data[0]))
        if(err?.response?.data)
          setNextQuestionError({ number : E.activeIndex - 1 , message :  Object.values(err?.response?.data[0])[0]})
        // return
      }
      // QuestionsData[CurrentIndex].quetion.id
    }
      // console.log((QuestionsAnswerSet[E.activeIndex - 1]))
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
    // nextButtonPressed = false;
    // prevButtonPressed = true;
    setNextQuestionError(null)
    if(CurrentIndex == 0)
      SetCurrentIndex('welcome_page')
    else
    {
      SetCurrentIndex(CurrentIndex - 1)
      setPrevButtonPressed(true)
      setNextButtonPressed(false);
    }
      
  }
  const ConfirmAnswersHandler = async () => {

    if(TimerFinished)
    {
      messageApi.error({
        content : 'مدت زمان پاسخ به پایان رسیده',
        style : {
          fontFamily : 'IRANSans'
        }
      })
      return
    }
    let FileQuestionQuestions = QuestionsAnswerSet.map(item => {
      if(item.file)
        return item
    }) 
    let CopiedQuestionAnswerSet = JSON.parse(JSON.stringify(QuestionsAnswerSet));
    CopiedQuestionAnswerSet.forEach((item,index) => {
      if(item.answer && !Object.keys(item.answer)?.length)
          item.answer = null
    })

    FileQuestionQuestions = FileQuestionQuestions.filter(item => item != undefined);
    CopiedQuestionAnswerSet = CopiedQuestionAnswerSet.filter(item => item.file == null);

    console.log(FileQuestionQuestions)
    try
    {
      
      if(FileQuestionQuestions && FileQuestionQuestions.length)
      await axios.post(`/question-api/questionnaires/${router.query.QuestionnaireID}/answer-sets/${answerSetID}/add-answer/`,AnswerSetFormDataConverter(FileQuestionQuestions),{
        'Content-Type' : 'multipart/form-data'
      })
    await axios.post(`/question-api/questionnaires/${router.query.QuestionnaireID}/answer-sets/${answerSetID}/add-answer/`,
    CopiedQuestionAnswerSet)
    SetCurrentIndex('Thanks')
  }
  catch(err)
  {
    err.response.data?.forEach((item) => {
      if(item && Object.values(item).length)
          messageApi.error({
            content : Object.values(item)[0],
            style : {
              fontFamily : 'IRANSans'
            }
          })
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
      <div>
      <Timer SetTimerFinished={SetTimerFinished} expiryTimestamp={getDeadlineTimestamp(QuestionnaireInfo?.timer)} />
      </div>
      <Provider store={AnswerStore}>
        <PreviewPageContainer >  
          <PreviewPageHeader>
              {(QuestionnaireInfo.progress_bar &&  CurrentIndex != 'welcome_page') ? 
              <Progress  format={(percent) => `${digitsEnToFa(percent)}%`}
              percent={CurrentIndex == 'Thanks' ? 100
              : Math.floor((CurrentIndex / QuestionsData.length) * 100)}  steps={QuestionsData.length} /> : ''}
          </PreviewPageHeader>
          <PreviewQuestionsContainer slidemode={(!QuestionnaireInfo.show_question_in_pages &&
             CurrentIndex != 'Thanks')? 'active' : null}>
          { (QuestionnaireInfo.show_question_in_pages &&
           QuestionnaireInfo.welcome_page && CurrentIndex =='welcome_page') 
          && <WelcomeComponent mobilepreview={true}
          WelcomeInfo={QuestionnaireInfo.welcome_page} SetCurrentIndex={SetCurrentIndex} />}

          { ( CurrentIndex !='Thanks') ? !QuestionnaireInfo.show_question_in_pages ?
                <div className="custom-swiper-container">
                <Swiper 
                  direction="vertical"
                  onSwiper={saveSwiperInstance}
                  slidesPerView={'auto'}
                  // spaceBetween={30}
                  effect="coverflow"
                  coverflowEffect={{
                    rotate: -5,
                    stretch: 270,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false
                }}
                  mousewheelControl
                  centeredSlides={true}
     
                  mousewheel
                  // slideToClickedSlide
                  breakpoints={{
                    '480': {
                      slidesPerView: 'auto',
                      // spaceBetween: 0
                    },
                    // when window width is >= 640px
                    // '640': {
                    //   slidesPerView: 4,
                    //   spaceBetween: 40
                    // }
                  }}
                  modules={[ Mousewheel, Pagination]}
                  onSlideChange={ChangeSwiperSlideHandler}
                >
                { QuestionnaireInfo.welcome_page && <SwiperSlide>
                  <WelcomeComponent mobilepreview={true} swiperMode={true}
                    WelcomeInfo={QuestionnaireInfo.welcome_page}
                    SetCurrentIndex={() => swiperInstance?.slideTo(1)} />
                  </SwiperSlide>}
                  {QuestionsData.map((item, index) => (
                    item && <SwiperSlide key={item.question.id} id={'swiper-slide' + item.question.id} >
                        <QuestionComponent mobilepreview={true} 
                        key={item.question.id}
                        slidemode={(!QuestionnaireInfo.show_question_in_pages && CurrentIndex != 'Thanks')? 'active' : null}
                        QuestionInfo={item.question}
                         UUID={router.query.QuestionnaireID}
                        errorMessage={ nextQuestionError && nextQuestionError.number == index ? nextQuestionError?.message : null} />
                        
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
         { QuestionnaireInfo.progress_bar ?  <AnimatePresence >
            <motion.div
              key={CurrentIndex}
              initial={{ scale : 0.2 ,y : -500 ,
                  // width : '5%' ,
                  opacity : 0.1 ,
                  x :  (CurrentIndex + 1 - QuestionsData?.length) * 10  }} 
              transition={{ duration : 0.5 }}
              animate={ { scale : 1  , x : 0 , y : 0 , opacity : 1 , width : '100%'} }>
            <QuestionComponent mobilepreview={true} QuestionInfo={QuestionsData[CurrentIndex].question} />
            { nextQuestionError ? <p className='answer_error_message'>{nextQuestionError}</p> : '' }
            </motion.div>
            </AnimatePresence> : <> 
                  <QuestionComponent mobilepreview={true} QuestionInfo={QuestionsData[CurrentIndex].question} />
                { nextQuestionError ? <p className='answer_error_message'>{nextQuestionError}</p> : '' }
                </>}
          </>  ): ''}   

          { CurrentIndex == 'Thanks'
          ? QuestionnaireInfo.thanks_page ? <ThankComponent ThanksInfo={QuestionnaireInfo.thanks_page}
           mobilepreview={true} QuestionnaireInfo={QuestionnaireInfo} UUID={router.query.QuestionnaireID} /> : 
          <DefaultThanks mobilepreview={true} QuestionnaireInfo={QuestionnaireInfo} /> : 
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
                icon={<Icon name='NextQuestion'  style={{ width : 12 }}/>}
                  onClick={NextQuestionHandler}>
                  { CurrentIndex == QuestionsData.length - 1 ? 'ارسال' : 'بعدی' }
                </Button> 
              { (CurrentIndex == 0 && !QuestionnaireInfo.welcome_page || !QuestionnaireInfo.previous_button ) ? '' 
              : <Button type='primary' onClick={PrevQuestionHandler} 
                icon={<Icon name='PrevQuestion' style={{ width : 12 }} />}>
                  قبلی
                </Button> }
                </>
              }
            </ControlButtonsContainer>}
            {
              (CurrentIndex =='Thanks') && <ControlButtonsContainer>
                  <div className='brand_button' >
                    <Button type='primary'>
                      <p>ساخته شده با <span>ماح</span></p>
                    </Button>
                </div>
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

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = req.headers.cookie;
  const urlDest = req.url;


  if (cookies) {
    // Parse the cookies
    const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});

    return {
      props: {
        cookies: parsedCookies,
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/auth?returnUrl=" + urlDest
    }
  };
}