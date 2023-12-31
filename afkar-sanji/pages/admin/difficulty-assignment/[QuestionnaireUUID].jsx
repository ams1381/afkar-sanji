import {useRouter} from "next/router";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import {CommonDrawer} from "@/components/common/CommonDrawer";
import QuestionerHeader from "@/components/common/QuestionerHeader";
import {PageBox} from "@/styles/common";
import {useQueries} from "@tanstack/react-query";
import {axiosInstance} from "@/utilities/axios";
import {ContentBox} from "@/styles/folders/Questionnaire";
import {
    AdminPanelContainer,
    LevelAssignmentContainer,
    NextSlideButton,
    PrevSlideButton,
    LevelButtonsContainer,
    ProgressBarThumb,
    ProgressBar,
    ProgressBarContainer,
    QuestionsSliderContainer,
    SwipersController, LevelButton
} from "@/styles/Admin/adminPanel";
import {Button, message} from "antd";
import {Icon} from "@/styles/icons";
import {QuestionsSwiper} from "@/components/Admin/QuestionsSwiper";
import {RejectQuestionsPopup} from "@/components/Admin/RejectQuestionsPopup";
import {LevelPageSkeleton} from "@/components/Admin/QuestionnairesTable/LevelPageSkeleton";

const LevelAssignmentPage = () => {
    const router = useRouter();
    const [ RightDrawerOpen , setRightDrawerOpen ] = useState(false);
    const [ approveLoading , setApproveLoading ] = useState(false);
    const [ swiperInstance , setSwiperInstance ] = useState(null);
    const [ rejectPopup , setRejectPopup ] = useState(false)
    const [ currentSlide , setCurrentSlide ] = useState(0);
    const [ editLevelActive , setEditLevelActive ] = useState(false);
    const [ levelLoading , setLevelLoading ] = useState(null);
    const [ contentEvaluate , setContentEvaluate ] = useState(false);
    const [ MessageApi , MessageContext ] = message.useMessage();
    const [ MeQuery, InterviewQuery ] = useQueries({
        queries : [
            {
                queryKey: ['MeQuery'],
                queryFn: async () => await axiosInstance.get(`/user-api/users/me/`),
                refetchOnWindowFocus: false,
                retry: false
            },
            {
                queryKey: ['InterviewQuery'],
                queryFn: async () => await axiosInstance.get(`/admin-api/interviews/${router.query.QuestionnaireUUID}/`),
                refetchOnWindowFocus: false,
                retry: false
            },
        ]
    });
    console.log(currentSlide)
    const [ QuestionLevel , setQuestionLevel ] = useState(0);
    useEffect(() => {
        if(!InterviewQuery.data?.data.questions || !InterviewQuery.data?.data.questions)
            return
        let QuestionsArray = InterviewQuery.data?.data.questions;
        QuestionsArray = QuestionsArray.filter(item => item.question !== null)

        if(QuestionsArray[currentSlide]?.question)
            setQuestionLevel(QuestionsArray[currentSlide].question.level)

        // if(InterviewQuery.data?.data?.questions[currentSlide] && InterviewQuery.data?.data?.questions[currentSlide].question)
        //     setQuestionLevel(InterviewQuery.data?.data?.questions[currentSlide].question.level)
    },[currentSlide])
    const assignLevel = async (LevelNumber) => {
        setLevelLoading(LevelNumber)
        let QuestionsArray = InterviewQuery.data?.data.questions;
        QuestionsArray = QuestionsArray.filter(item => item.question !== null)
        try {
            // console.log(`/admin-api/interviews/${InterviewQuery?.data?.data?.uuid}/${InterviewQuery.data?.data.questions[currentSlide]?.question.url_prefix}/${InterviewQuery.data?.data.questions[currentSlide]?.question.id}/`)
            await axiosInstance.post(`/interview-api/interviews/${InterviewQuery?.data?.data?.uuid}/${QuestionsArray[currentSlide]?.question?.url_prefix}/${QuestionsArray[currentSlide]?.question?.id}/set-level`,{
                level : LevelNumber
            })
            setQuestionLevel(LevelNumber)
            InterviewQuery.refetch()
        }
        catch (err) {
            if (err.response?.status === 500 || err.response?.status === 404)
                MessageApi.error({
                    content : err.response?.status === 500 ? 'خطای داخلی سرور' : 'یافت نشد',
                })
            else if(err.response?.data)
                MessageApi.error({
                    content : Object.values(err.response?.data)[0],
                })

        }
        finally {
            setLevelLoading(null);
        }
        // axiosInstance.pos

    }
    const ApproveContent = async () => {
        setApproveLoading(true)
        try {
            await axiosInstance.post(`/admin-api/interviews/${InterviewQuery?.data?.data?.uuid}/approve-content/`)
            MessageApi.success({
                content : 'با موفقیت تایید شد'
            })
        }
        catch (err) {
            MessageApi.error({
                content : Object.values(err.response?.data)[0],
            })
        }
        finally {
            setApproveLoading(false);
        }
    }

    return <>
        <Head>
            <title>Afkar Sanji | Admin Panel | Level Assignment </title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <PageBox>
            {MessageContext}
            <CommonDrawer isAdmin={true} RightDrawerOpen={RightDrawerOpen} setRightDrawerOpen={setRightDrawerOpen} />
            <RejectQuestionsPopup Questionnaire={InterviewQuery.data?.data} rejectPopup={rejectPopup} setRejectPopup={setRejectPopup} />
            <QuestionerHeader pageName='level-assignment' interviewData={InterviewQuery?.data?.data} meData={MeQuery?.data?.data}  />
            <main style={{ width : RightDrawerOpen ? '80%' : '100%', transition : '0.3s' }}>
                <ContentBox>
                    { InterviewQuery.isLoading ? <LevelPageSkeleton />
                        : InterviewQuery.data?.data.questions.length ? <AdminPanelContainer>
                        <LevelAssignmentContainer>
                            <ProgressBarContainer>
                                <ProgressBar>
                                    <ProgressBarThumb
                                        height={((currentSlide + 1) / InterviewQuery.data?.data.questions.length) * 100}/>
                                </ProgressBar>
                            </ProgressBarContainer>
                            <QuestionsSliderContainer>
                                {InterviewQuery.data?.data &&
                                    <QuestionsSwiper questionnaireData={InterviewQuery.data?.data}
                                         setCurrentSlide={setCurrentSlide}  setSwiperInstance={setSwiperInstance}/>}
                            </QuestionsSliderContainer>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div>
                                    {
                                       contentEvaluate ? <div>
                                       <Button onClick={() => setRejectPopup(true)} type={'primary'} style={{ width : '100%' }} danger>
                                           ردِّ سوالات
                                       </Button>
                                       <Button loading={approveLoading}
                                               onClick={ApproveContent}
                                               type={'primary'}
                                               style={{ width : '100%' , marginTop : 10 }}>
                                           تایید سوالات
                                       </Button>

                                   </div>
                                    : <> { editLevelActive ?  <LevelButtonsContainer>
                                        <LevelButton active={QuestionLevel === 3}
                                                loading={levelLoading === 3}
                                                onClick={() => assignLevel(3)}>
                                            سخت
                                        </LevelButton>
                                        <LevelButton active={QuestionLevel === 2}
                                                loading={levelLoading === 2}
                                                onClick={() => assignLevel(2)}>
                                            متوسط
                                        </LevelButton>
                                        <LevelButton active={QuestionLevel === 1}
                                                loading={levelLoading === 1}
                                                onClick={() => assignLevel(1)}>
                                            آسان
                                        </LevelButton>
                                        <LevelButton active={QuestionLevel === 0}
                                                loading={levelLoading === 0}
                                                onClick={() => assignLevel(0)}>
                                            نامعلوم
                                        </LevelButton>
                                    </LevelButtonsContainer> :
                                       <Button type={'primary'}
                                           style={{ width : 150 ,
                                               background : 'var(--primary-color)' ,
                                               display : 'flex' ,
                                               justifyContent : 'center' }}
                                               onClick={() => {
                                                   setEditLevelActive(true)
                                                   // console.log(InterviewQuery,InterviewQuery.data?.data?.questions[currentSlide])
                                                   let QuestionsArray = InterviewQuery.data?.data?.questions;
                                                   QuestionsArray = QuestionsArray.filter(item => item.question !== null)
                                                   // if(InterviewQuery.data?.data?.questions[currentSlide].question)
                                                    setQuestionLevel(QuestionsArray[currentSlide].question.level)

                                               }}>
                                           <p>ویرایش تعیین سطح</p>

                                    </Button>}
                                   </>
                                    }
                                    <SwipersController>
                                        <NextSlideButton disabled={currentSlide === 0} onClick={() => swiperInstance?.slidePrev()}>
                                            <Icon name={'ArrowDown'}/>
                                        </NextSlideButton>
                                        <PrevSlideButton disabled={currentSlide === InterviewQuery.data?.data.questions.length - 1}
                                                         className={'prev-question'}
                                                         onClick={() => swiperInstance?.slideNext()}>
                                            <Icon name={'ArrowDown'}/>
                                        </PrevSlideButton>
                                    </SwipersController>
                                    <Button style={{
                                        width : 150 ,
                                        display : 'flex' ,
                                        justifyContent : 'center' ,
                                        marginTop : 10 }}
                                        onClick={() => {
                                            if(!contentEvaluate) {
                                                setContentEvaluate(true)
                                                setEditLevelActive(false)
                                            }
                                            else {
                                                setContentEvaluate(false)
                                                setEditLevelActive(true)
                                                let QuestionsList = InterviewQuery.data?.data?.questions;
                                                QuestionsList = QuestionsList.filter(item => item.question !== null)
                                                setQuestionLevel(QuestionsList[currentSlide]?.question?.level)
                                            }
                                        }}>
                                        { !contentEvaluate ? <p>ویرایش وضعیت</p> : <p>ویرایش تعیین سطح</p>}

                                    </Button>

                                </div>
                            </div>
                        </LevelAssignmentContainer>
                    </AdminPanelContainer>
                    : <AdminPanelContainer style={{ display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
                            <p>سوال جهت نمایش وجود ندارد</p>
                        </AdminPanelContainer>}
                </ContentBox>
            </main>
        </PageBox>
    </>
}
export default  LevelAssignmentPage;

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