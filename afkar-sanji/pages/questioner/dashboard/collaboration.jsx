import {
    QuestionerPageContainer, PageBox, QuestionerContentBox
} from '@/styles/common';
import React, {useEffect} from 'react'
import {useState} from 'react';
import {CommonDrawer} from '@/components/common/CommonDrawer';
import QuestionerHeader from '@/components/common/QuestionerHeader';
import {
    Collaboration, CollaborationBody, CollaborationHeader, Container, FilterBox, TabSection
} from "@/styles/questioner/dashboard/Collaboration/collaboration";
import {Button, Input, Skeleton, Space} from 'antd';
import {convertDate} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingPanel";
import {digitsFaToEn} from "@persian-tools/persian-tools";
import CollaborationItem from "@/components/Questioner/Dashboadr/Collaboration/CollaborationItem";
import {useQueries, useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/utilities/axios";
import CollaborationInterView from "@/components/Questioner/Dashboadr/Collaboration/CollaborationInterView";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";
import {Tabs} from 'antd';
import AlertOn from '@/public/Icons/AlertOn.svg'
import {useRouter} from "next/router";
import {ConfirmButtonContainer} from "@/styles/Questioner/profile";

export default function ({cookies}) {
    const router = useRouter()
    const [RightDrawerOpen, setRightDrawerOpen] = useState(false);
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [recommended, setRecommended] = useState([])
    const [myInterView, setMyInterView] = useState([])
    const [isGetData, setIsGetData] = useState(false);
    const [nextPage, setNextPage] = useState(null);
    const [interviewsNextPage, setInterviewsNextPage] = useState(null);
    const [recommendedError, setRecommendedError] = useState('')
    const [myInterViewError, setMyInterViewError] = useState('');
    const [MeQuery] = useQueries({
        queries: [{
            queryKey: ['MeQuery'],
            queryFn: async () => await axiosInstance.get(`/user-api/users/me/`),
            refetchOnWindowFocus: false
        },],
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

    const {
        data, isLoading, error, refetch
    } = useQuery(['Interview'], async () => await axiosInstance.get('/interview-api/interviews/'), {
        refetchOnWindowFocus: false, retry: false
    })


    const [recommendedData, interViewData] = useQueries({
        queries: [{
            queryKey: ['recommended'],
            queryFn: async () => await axiosInstance.get(`/interview-api/interviews/recommended-interviews/`),
            refetchOnWindowFocus: false,
            retry: false
        }, {
            queryKey: ['interView'],
            queryFn: async () => await axiosInstance.get(`/interview-api/interviews/my-interviews/`),
            refetchOnWindowFocus: false,
            retry: false
        },],
    });

    const handleScroll = () => {
        if (document.getElementById('test').innerHeight + document.getElementById('test').scrollTop !== document.getElementById('test').offsetHeight) {
            return;
        }
        console.log('we,re at the end');
    };

    useEffect(() => {
        if (!document.getElementById('test')) return
        document.getElementById('test').addEventListener('scroll', handleScroll);
        // return () => document.getElementById('test').removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    const FetchMoreData = async () => {
        if (!nextPage) return
        try {
            let {data} = await axiosInstance.get(`${nextPage.replace('http://mah-api.codintofuture.ir', '')}`);
            setNextPage(data.next)
            setRecommended(prevState => [...prevState, ...data.results])

        } catch (err) {
            console.log(err)
        }

    }

    const FetchMoreInterview = async () => {
        if (!interviewsNextPage) return
        try {
            let {data} = await axiosInstance.get(`${interviewsNextPage.replace('http://mah-api.codintofuture.ir', '')}`);
            setInterviewsNextPage(data.next)
            setMyInterView(prevState => [...prevState, ...data.results])
        } catch (err) {
            console.log(err)
        }
    }

    const [meData] = useQueries({
        queries: [{
            queryKey: ['meData'],
            queryFn: async () => await axiosInstance.get(`/user-api/users/me/`),
            refetchOnWindowFocus: false,
            retry: false
        }],
    })

    const items = [{
        key: '1', label: (<div style={{
            width: '100%',
            textAlign: 'right',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            justifyContent: 'flex-end'
        }}>
            <img src={AlertOn?.src} alt=""/>
            <p style={{color: '#5360ED'}}>درخواست‌های همکاری </p>
        </div>), children: (<div id={'scrollableDiv'} style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexDirection: 'column',
            maxHeight: ' 80vh',
            overflow: 'auto',
        }}>
            {recommendedData?.isLoading && (<div style={{
                width: '100%', display: 'flex', flexDirection: 'column', gap: '10px'
            }}>
                <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
            </div>)}
            <div style={{width: '100%'}}>
                <InfiniteScroll
                    dataLength={recommended?.length} //This is important field to render the next data
                    next={FetchMoreData}
                    hasMore={nextPage}
                    style={{
                        width: '100%', gap: '10px', display: 'flex', flexDirection: 'column',
                    }}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv">
                    {(!error && recommendedData?.data?.data?.results) ? recommendedData?.data?.data?.results.map((interview, index) => {
                        return <CollaborationItem refreshData={recommendedData}
                                                  isInterview={false} data={interview}
                                                  key={interview?.id}/>
                    }) : error && error.response?.status === 500 && <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh'
                    }}>خطای داخلی سرور</div>}
                </InfiniteScroll>
                {!recommendedData?.data?.data?.results.length && (<div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '75vh',
                        gap: '20px'
                    }}>
                    {recommendedData?.error?.response?.data?.detail || ' درخواست همکاری‌ای وجود ندارد'}
                    {recommendedData?.error?.response?.data?.detail && (
                        <ConfirmButtonContainer style={{textAlign: 'left'}}>
                            <Button type='primary' onClick={() => router.push('/questioner/dashboard/profile')}>
                                حساب کاربری
                            </Button>
                        </ConfirmButtonContainer>
                    )}
                </div>)}
            </div>
        </div>),
    },

        {
            key: '2', label: 'لیست پرسش‌نامه‌ها', children: (<div id={'interviewsColumn'} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '10px', flexDirection: 'column'
            }}>
                {isGetData && (<div style={{
                    width: '100%', display: 'flex', flexDirection: 'column', gap: '10px'
                }}>
                    <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                    <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                    <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                    <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                    <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                </div>)}
                <>
                    <div style={{
                        width: '100%',
                    }}>
                        <InfiniteScroll
                            dataLength={myInterView?.length} //This is important field to render the next data
                            next={FetchMoreInterview}
                            hasMore={interviewsNextPage}
                            style={{
                                width: '100%', gap: '10px', display: 'flex', flexDirection: 'column'
                            }}
                            loader={<h4>Loading...</h4>}
                            scrollableTarget="interviewsColumn">
                            {(!error && interViewData?.data?.data?.results) && interViewData?.data?.data?.results.map((interview, index) => {
                                return <CollaborationInterView refreshData={recommendedData} data={interview}
                                                               key={interview?.id}/>
                            })}
                        </InfiniteScroll>
                        {!interViewData?.data?.data?.results.length && (<div
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', height: '75vh'
                            }}>{'پرشنامه ای وجود ندارد'}</div>)}
                    </div>
                </>
            </div>),
        },];

    return (<>
            <Head>
                <title>Afkar Sanji | Collaboration </title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <PageBox>
                <CommonDrawer RightDrawerOpen={RightDrawerOpen} setRightDrawerOpen={setRightDrawerOpen}/>
                <QuestionerHeader meData={MeQuery?.data?.data} pageName='collaboration'/>
                <main style={{width: RightDrawerOpen ? '80%' : '100%', transition: '0.3s'}}>
                    <QuestionerPageContainer>
                        <Container>
                            <Collaboration>
                                <CollaborationHeader>
                                </CollaborationHeader>
                                <TabSection>
                                    <Tabs defaultActiveKey="1" items={items}/>
                                </TabSection>
                                <CollaborationBody>
                                    <div id={'scrollableDiv'} style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        flexDirection: 'column',
                                        maxHeight: ' 80vh',
                                        overflow: 'auto',
                                        marginTop: '2rem'
                                    }}>
                                        {recommendedData?.isLoading && (<div style={{
                                            width: '100%', display: 'flex', flexDirection: 'column', gap: '10px'
                                        }}>
                                            <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                                        </div>)}
                                        <div style={{width: '100%'}}>
                                            <div style={{
                                                width: '100%',
                                                textAlign: 'right',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                justifyContent: 'flex-end'
                                            }}>
                                                <img src={AlertOn?.src} alt=""/>
                                                <p style={{color: '#5360ED'}}>درخواست‌های همکاری </p>
                                            </div>
                                            <InfiniteScroll
                                                dataLength={recommended?.length} //This is important field to render the next data
                                                next={FetchMoreData}
                                                hasMore={nextPage}
                                                style={{
                                                    width: '100%',
                                                    gap: '10px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    marginTop: '20px'
                                                }}
                                                loader={<h4>Loading...</h4>}
                                                scrollableTarget="scrollableDiv">
                                                {(!error && recommendedData?.data?.data?.results) ? recommendedData?.data?.data?.results.map((interview, index) => {
                                                    return <CollaborationItem
                                                        isInterview={false} data={interview}
                                                        key={interview?.id}/>
                                                }) : error && error.response?.status === 500 && <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '80vh'
                                                }}>خطای داخلی سرور</div>}
                                            </InfiniteScroll>
                                            {!recommendedData?.data?.data?.results.length && (<div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '60vh'
                                                }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    height: '75vh',
                                                    gap: '20px'
                                                }}>

                                                    {recommendedData?.error?.response?.data?.detail || ' درخواست همکاری‌ای وجود ندارد'}
                                                    {recommendedData?.error?.response?.data?.detail && (
                                                        <ConfirmButtonContainer style={{textAlign: 'left'}}>
                                                            <Button type='primary'
                                                                    onClick={() => router.push('/questioner/dashboard/profile')}>
                                                                حساب کاربری
                                                            </Button>
                                                        </ConfirmButtonContainer>
                                                    )}
                                                </div>
                                                </div>)}
                                        </div>
                                    </div>
                                    <div id={'interviewsColumn'} style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        flexDirection: 'column'
                                    }}>

                                        {interViewData?.isLoading && (<div style={{
                                            width: '100%', display: 'flex', flexDirection: 'column', gap: '10px'
                                        }}>
                                            <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                                        </div>)}
                                        <>
                                            <div style={{width: '100%', textAlign: 'right'}}>
                                                <p style={{color: '#1D1D1D'}}>لیست پرسش‌نامه‌ها</p>
                                            </div>
                                            <div style={{
                                                width: '100%',
                                            }}>
                                                <InfiniteScroll
                                                    dataLength={myInterView?.length} //This is important field to render the next data
                                                    next={FetchMoreInterview}
                                                    hasMore={interviewsNextPage}
                                                    style={{
                                                        width: '100%',
                                                        gap: '10px',
                                                        display: 'flex',
                                                        flexDirection: 'column'
                                                    }}
                                                    loader={<h4>Loading...</h4>}
                                                    scrollableTarget="interviewsColumn">
                                                    {(!error && interViewData?.data?.data?.results) && interViewData?.data?.data?.results.map((interview, index) => {
                                                        return <CollaborationInterView data={interview}
                                                                                       key={interview?.id}/>
                                                    })}
                                                </InfiniteScroll>
                                                {!interViewData?.data?.data?.results.length && (<div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        height: '75vh'
                                                    }}>{'پرشنامه ای وجود ندارد'}</div>)}
                                            </div>
                                        </>
                                    </div>
                                </CollaborationBody>
                            </Collaboration>
                        </Container>
                    </QuestionerPageContainer>
                </main>
            </PageBox>
        </>


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
            permanent: false, destination: "/auth?returnUrl=" + urlDest
        }
    };
}