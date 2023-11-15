import {
    QuestionerPageContainer
    , PageBox, QuestionerContentBox
} from '@/styles/common';
import React, {useEffect} from 'react'
import {useState} from 'react';
import {CommonDrawer} from '@/components/common/CommonDrawer';
import QuestionerHeader from '@/components/common/QuestionerHeader';
import {
    Collaboration,
    CollaborationBody,
    CollaborationHeader,
    FilterBox
} from "@/styles/questioner/dashboard/Collaboration/collaboration";
import {Input, Skeleton, Space} from 'antd';
import {AudioOutlined} from '@ant-design/icons';
import {TimePickerContainer} from "@/styles/questioner/dashboard/Collaboration/collaboration";
import {Icon} from "@/styles/icons";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {convertDate} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingPanel";
import {digitsFaToEn} from "@persian-tools/persian-tools";
import persian_fa from 'react-date-object/locales/persian_fa';
import persian from 'react-date-object/calendars/persian';
import DatePicker from "react-multi-date-picker";
import filter from 'public/Icons/Arrow Sort Down Lines.svg'
import CollaborationItem from "@/components/Questioner/Dashboadr/Collaboration/CollaborationItem";
import {useQueries, useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/utilities/axios";
import CollaborationInterView from "@/components/Questioner/Dashboadr/Collaboration/CollaborationInterView";

const {Search} = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
export default function ({cookies}) {
    const [RightDrawerOpen, setRightDrawerOpen] = useState(false);
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [recommended, setRecommended] = useState([])
    const [myInterView, setMyInterView] = useState([])
    const [isGetData, setIsGetData] = useState(false)
    const [MeQuery] = useQueries({
        queries: [
            {
                queryKey: ['MeQuery'],
                queryFn: async () => await axiosInstance.get(`/user-api/users/me/`),
                refetchOnWindowFocus: false
            },
        ],
    });
    const DateFilterHandler = async (_, filterDate) => {
        // console.log(filterDate.validatedValue)
        if (!filterDate.validatedValue?.length) {
            setStartDate('');
            setEndDate('')
            // setResultData(ResultQuery?.data?.data.results)
            return
        }
        try {
            // console.log('check')
            setStartDate(convertDate(digitsFaToEn(filterDate.validatedValue[0]), 'gregorian'));
            setEndDate(filterDate.validatedValue[1] ? convertDate(digitsFaToEn(filterDate.validatedValue[1]), 'gregorian') : '')
            // let response =  await axiosInstance.get(`/result-api/${QuestionnaireQuery.data?.data?.uuid}/answer-sets/?answered_at&start_date=
            // ${convertDate(digitsFaToEn(filterDate.validatedValue[0]),'gregorian')}
            // &end_date=${filterDate.validatedValue[1] ? convertDate(digitsFaToEn(filterDate.validatedValue[1]),'gregorian') : ''}`)
            // setResultData(response?.data?.results)
        } catch (err) {
            console.log(err)
        }
    }

    const {data, isLoading, error, refetch} = useQuery(['Interview'],
        async () => await axiosInstance.get('/interview-api/interviews/'), {
            refetchOnWindowFocus: false,
            retry: false
        })


    const getRecommended = async () => {
        axiosInstance.get('/interview-api/interviews/recommended-interviews/').then(res => {
            setRecommended(res?.data?.results)
        })
    }


    const getInterViews = async () => {
        setIsGetData(true)
        axiosInstance.get('/interview-api/interviews/my-interviews/').then(res => {
            setIsGetData(false)
            setMyInterView(res?.data?.results)
        })
    }

    useEffect(() => {
        getRecommended()
        getInterViews()
    }, []);


    return (
        <PageBox>
            <CommonDrawer RightDrawerOpen={RightDrawerOpen} setRightDrawerOpen={setRightDrawerOpen}/>
            <QuestionerHeader meData={MeQuery?.data?.data} pageName='profile'/>
            <main style={{width: RightDrawerOpen ? '80%' : '100%', transition: '0.3s'}}>
                <QuestionerPageContainer>
                    <QuestionerContentBox>
                        <Collaboration>
                            <CollaborationHeader>
                            </CollaborationHeader>
                            <CollaborationBody>
                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    flexDirection: 'column',
                                    maxHeight: ' 80vh',
                                    overflow: 'auto',
                                    marginTop: '2rem'
                                }}>
                                    {isGetData && (
                                        <div style={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px'
                                        }}>
                                            <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                                        </div>
                                    )}
                                    <>
                                        <div style={{width: '100%', textAlign: 'right'}}>
                                            <p style={{color: '#1D1D1D'}}>درخواست‌های همکاری </p>
                                        </div>
                                        {(!error && recommended) ? recommended.map((interview, index) => {
                                            return <CollaborationItem getRecommended={getRecommended}
                                                                      isInterview={false} data={interview}
                                                                      key={interview?.id}/>
                                        }) : error && error.response?.status === 500 && <div>خطای داخلی سرور</div>}
                                        {!recommended.length && (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '80vh'
                                                }}>درخواست‌های همکاری ای وجود ندارد</div>
                                        )}
                                    </>
                                </div>
                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    flexDirection: 'column'
                                }}>
                                    {isGetData && (
                                        <div style={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px'
                                        }}>
                                            <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                                        </div>
                                    )}
                                    <>
                                        <div style={{width: '100%', textAlign: 'right'}}>
                                            <p style={{color: '#1D1D1D'}}>لیست پرسش‌نامه‌ها</p>
                                        </div>
                                        <>
                                            {(!error && myInterView) && myInterView.map((interview, index) => {
                                                return <CollaborationInterView data={interview}
                                                                               key={interview?.id}/>
                                            })}
                                            {!myInterView.length && (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        height: '80vh'
                                                    }}>پرسشنامه ای وجود ندارد</div>
                                            )}
                                        </>
                                    </>
                                </div>
                            </CollaborationBody>
                        </Collaboration>
                    </QuestionerContentBox>
                </QuestionerPageContainer>
            </main>
        </PageBox>

    )
}

export async function getServerSideProps(context) {
    const {req} = context;
    const cookies = req.headers.cookie;
    const urlDest = req.url;
    // Check if cookies are present
    if (cookies) {
        // Parse the cookies
        const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});
        return {
            props: {
                // Pass the cookies as props to the component
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