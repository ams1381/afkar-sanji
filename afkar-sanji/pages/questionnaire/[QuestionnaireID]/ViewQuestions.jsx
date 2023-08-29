import { DefaultThanks } from '@/components/Questions/DefaultThanks';
import QuestionComponent from '@/components/Questions/Question';
import ThankComponent from '@/components/Questions/Thanks';
import WelcomeComponent from '@/components/Questions/Welcome';
import { Icon } from '@/styles/icons';
import { PreviewPageContainer, PreviewPageHeader , ControlButtonsContainer, PreviewPage, PreviewQuestionsContainer } from '@/styles/questionnairePanel/ViewQuestions';
import { axiosInstance } from '@/utilities/axios';
import { Button, Progress, Skeleton, message } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';

// SwiperCore.use([Navigation]);

const ViewQuestions = () => {
  const router = useRouter();
  const [ QuestionnaireInfo , SetQuestionnaireInfo ] = useState(null);
  const [ QuestionsData , SetQuestionsData ] = useState(null);
  const [ messageApi , messageContext ] = message.useMessage()
  const [ CurrentIndex , SetCurrentIndex ] = useState('Welcome');
  const swiperRef = useRef(null);

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
   
  },[router.query])
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
  console.log(CurrentIndex)
  return (
    <>
    <Head>
      <title> Afkar Sanji | Preview</title>
    </Head>
    {messageContext}
    { QuestionnaireInfo ? <PreviewPage>
   
    <PreviewPageContainer >  
      <PreviewPageHeader>
          {QuestionnaireInfo.progress_bar ? 
          <Progress percent={CurrentIndex == 'Thanks' ? 100
          : (CurrentIndex/ QuestionsData.length) * 100}  steps={QuestionsData.length} /> : ''}
      </PreviewPageHeader>
      <PreviewQuestionsContainer slidemode={!QuestionnaireInfo.show_question_in_pages ? 'active' : null}>
      { (QuestionnaireInfo.welcome_page && CurrentIndex =='welcome_page') 
      && <WelcomeComponent mobilePreview={true}
       WelcomeInfo={QuestionnaireInfo.welcome_page} SetCurrentIndex={SetCurrentIndex} />}

      { (CurrentIndex !='welcome_page' && CurrentIndex !='Thanks') ? !QuestionnaireInfo.show_question_in_pages ?
            <div className="custom-swiper-container">
            <Swiper 
              direction="vertical"
              _swiper={swiperRef}
              slidesPerView={1}
              navigation={[Navigation]}
             
              onSlideChange={(E) => SetCurrentIndex(E.activeIndex)}
            >
              {QuestionsData.map((item, index) => (
                item && <SwiperSlide key={item.question.id}>
                    <QuestionComponent mobilePreview={true} QuestionInfo={item.question} />
                    { index == QuestionsData.length - 1 &&   <ControlButtonsContainer>
                      <Button type='primary' onClick={() => {
                        console.log(swiperRef.current)
                      }}>ارسال</Button>
                      </ControlButtonsContainer>}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
      : (QuestionsData[CurrentIndex] && <QuestionComponent QuestionInfo={QuestionsData[CurrentIndex].question} /> ): ''}   

      { CurrentIndex == 'Thanks'
      ? QuestionnaireInfo.thanks_page ? <ThankComponent ThanksInfo={QuestionnaireInfo.thanks_page} /> : 
      <DefaultThanks /> : 
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
        (CurrentIndex) == 'Thanks' && <ControlButtonsContainer style={{ justifyContent : 'center' }}>
        <>
            <Button type='primary'>
            ساحته شده با ماح
          </Button>
            </>
        </ControlButtonsContainer> 
        }
        {
          (!QuestionnaireInfo.show_question_in_pages) && <ControlButtonsContainer>
        </ControlButtonsContainer>
        }
        </>
      }
    </PreviewPageContainer>
    </PreviewPage> : <>Loading</>}
   
    </>
  )
}
export default ViewQuestions;