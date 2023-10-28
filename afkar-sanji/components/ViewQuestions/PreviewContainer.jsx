import {ControlButtonsContainer, PreviewQuestionsContainer} from "@/styles/questionnairePanel/ViewQuestions";
import WelcomeComponent from "@/components/Questions/Welcome";
import {Swiper, SwiperSlide} from "swiper/react";
import {Mousewheel, Pagination} from "swiper/modules";
import QuestionComponent from "@/components/Questions/Question";
import {Button} from "antd";
import {AnimatePresence, motion} from "framer-motion";
import ThankComponent from "@/components/Questions/Thanks";
import {DefaultThanks} from "@/components/Questions/DefaultThanks";
import {Icon} from "@/styles/icons";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setInitialAnswerSet} from "@/utilities/stores/AnswerStore";

export const PreviewContainer = ({ CurrentIndex , QuestionnaireInfo , QuestionsData , nextQuestionError}) => {
    const  dispatcher = useDispatch();
    let QuestionsAnswerSet = useSelector(state => state.reducer.AnswerSet)
    useEffect(() => {
        // console.log(QuestionsData.filter(item => item.question !== null))
        dispatcher(setInitialAnswerSet({ Questions : QuestionsData.filter(item => item.question !== null) }))
    },[])
    console.log(QuestionsAnswerSet)
    return <PreviewQuestionsContainer slidemode={(!QuestionnaireInfo.show_question_in_pages &&
        CurrentIndex != 'Thanks')? 'active' : null}>
        { (QuestionnaireInfo.show_question_in_pages &&
                QuestionnaireInfo.welcome_page && CurrentIndex =='welcome_page')
            && <WelcomeComponent mobilepreview={true}
                                 WelcomeInfo={QuestionnaireInfo.welcome_page} SetCurrentIndex={SetCurrentIndex} />}
        { ( CurrentIndex !='Thanks') ? !QuestionnaireInfo.show_question_in_pages ?
            <div className="custom-swiper-container">
                {/*<Swiper*/}
                {/*    direction="vertical"*/}
                {/*    onSwiper={saveSwiperInstance}*/}
                {/*    slidesPerView={'auto'}*/}
                {/*    effect="coverflow"*/}
                {/*    coverflowEffect={{*/}
                {/*        rotate: -5,*/}
                {/*        stretch: 270,*/}
                {/*        depth: 100,*/}
                {/*        modifier: 1,*/}
                {/*        slideShadows: false*/}
                {/*    }}*/}
                {/*    mousewheelControl*/}
                {/*    centeredSlides={true}*/}
                {/*    mousewheel*/}
                {/*    // slideToClickedSlide*/}
                {/*    breakpoints={{*/}
                {/*        '480': {*/}
                {/*            slidesPerView: 'auto',*/}
                {/*            // spaceBetween: 0*/}
                {/*        },*/}
                {/*        // when window width is >= 640px*/}
                {/*        // '640': {*/}
                {/*        //   slidesPerView: 4,*/}
                {/*        //   spaceBetween: 40*/}
                {/*        // }*/}
                {/*    }}*/}
                {/*    modules={[ Mousewheel, Pagination]}*/}
                {/*    onSlideChange={ChangeSwiperSlideHandler}>*/}
                {/*    { QuestionnaireInfo.welcome_page && <SwiperSlide>*/}
                {/*        <WelcomeComponent mobilepreview={true} swiperMode={true}*/}
                {/*                          WelcomeInfo={QuestionnaireInfo.welcome_page}*/}
                {/*                          SetCurrentIndex={() => swiperInstance?.slideTo(1)} />*/}
                {/*    </SwiperSlide>}*/}
                {/*    {QuestionsData.map((item, index) => (*/}
                {/*        item && <SwiperSlide key={item.question.id} id={'swiper-slide' + item.question.id} >*/}
                {/*            <QuestionComponent mobilepreview={true}*/}
                {/*                               key={item.question.id}*/}
                {/*                               slidemode={(!QuestionnaireInfo.show_question_in_pages && CurrentIndex != 'Thanks')? 'active' : null}*/}
                {/*                               QuestionInfo={item.question}*/}
                {/*                               UUID={router.query.QuestionnaireID}*/}
                {/*                               errorMessage={ nextQuestionError && nextQuestionError.number == index ? nextQuestionError?.message : null} />*/}
                {/*            { index == QuestionsData.length - 1 &&   <ControlButtonsContainer style={{ width : '90%' , flexDirection : 'column' , alignItems : 'center' }}>*/}
                {/*                <Button type='primary' onClick={answerSetID ? ConfirmAnswersHandler : () => {*/}
                {/*                    SetCurrentIndex('Thanks')*/}
                {/*                }}>ارسال</Button>*/}
                {/*            </ControlButtonsContainer>}*/}
                {/*        </SwiperSlide>*/}
                {/*    ))}*/}
                {/*</Swiper>*/}
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
                            <QuestionComponent mobilepreview={true}  QuestionInfo={QuestionsData[CurrentIndex].question} />
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
}