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
import {Input, Skeleton, Space} from 'antd';
import {convertDate} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingPanel";
import {digitsFaToEn} from "@persian-tools/persian-tools";
import CollaborationItem from "@/components/Questioner/Dashboadr/Collaboration/CollaborationItem";
import {useQueries, useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/utilities/axios";
import CollaborationInterView from "@/components/Questioner/Dashboadr/Collaboration/CollaborationInterView";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";
import {Tabs} from 'antd';

export default function ({cookies}) {
    const [RightDrawerOpen, setRightDrawerOpen] = useState(false);
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [recommended, setRecommended] = useState([])
    const [myInterView, setMyInterView] = useState([])
    const [isGetData, setIsGetData] = useState(false);
    const [nextPage, setNextPage] = useState(null);
    const [interviewsNextPage, setInterviewsNextPage] = useState(null);
    const [recommendedError, setRecommendedError] = useState('')
    const [myInterViewError, setMyInterViewError] = useState('')
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


    const getRecommended = async () => {
        axiosInstance.get('/interview-api/interviews/recommended-interviews/').then(res => {
            setRecommended(res?.data?.results)
            setNextPage(res?.data?.next)
        }).catch(error => {
            const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
            setRecommendedError(ERROR_MESSAGE)

        })
    }


    const getInterViews = async () => {
        setIsGetData(true)
        axiosInstance.get('/interview-api/interviews/my-interviews/').then(res => {
            setIsGetData(false)
            setMyInterView(res?.data?.results)
            setInterviewsNextPage(res?.data?.next)
        }).catch(error => {
            const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
            setMyInterViewError(ERROR_MESSAGE)
        })
    }

    useEffect(() => {
        getRecommended()
        getInterViews()
    }, []);

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

    const items = [{
        key: '1', label: 'درخواست‌های همکاری', children: (<div id={'scrollableDiv'} style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexDirection: 'column',
            maxHeight: ' 80vh',
            overflow: 'auto',
            marginTop: '2rem'
        }}>
            {isGetData && (<div style={{
                width: '100%', display: 'flex', flexDirection: 'column', gap: '10px'
            }}>
                <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
            </div>)}
            <>
                <div style={{width: '100%', textAlign: 'right'}}>
                    <p style={{color: '#1D1D1D'}}>درخواست‌های همکاری </p>
                </div>
                <InfiniteScroll
                    dataLength={recommended?.length} //This is important field to render the next data
                    next={FetchMoreData}
                    hasMore={nextPage}
                    style={{width: '100%'}}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv">
                    {(!error && recommended) ? recommended.map((interview, index) => {
                        return <CollaborationItem getRecommended={getRecommended}
                                                  isInterview={false} data={interview}
                                                  key={interview?.id}/>
                    }) : error && error.response?.status === 500 && <div>خطای داخلی سرور</div>}
                </InfiniteScroll>
                {!recommended.length && (<div
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh'
                    }}>{recommendedError}</div>)}
            </>
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
                                width: '100%', gap: '10px', display: 'flex', flexDirection: 'column'
                            }}
                            loader={<h4>Loading...</h4>}
                            scrollableTarget="interviewsColumn">
                            {(!error && myInterView) && myInterView.map((interview, index) => {
                                return <CollaborationInterView data={interview}
                                                               key={interview?.id}/>
                            })}
                        </InfiniteScroll>
                        {!myInterView.length && (<div
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh'
                            }}>{myInterViewError}</div>)}
                    </div>
                </>
            </div>),
        },];


    return (<>
            <Head>
                <title>Afkar Sanji | Questionaer Panel </title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <PageBox>
                <CommonDrawer RightDrawerOpen={RightDrawerOpen} setRightDrawerOpen={setRightDrawerOpen}/>
                <QuestionerHeader meData={MeQuery?.data?.data} pageName='profile'/>
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
                                        {isGetData && (<div style={{
                                            width: '100%', display: 'flex', flexDirection: 'column', gap: '10px'
                                        }}>
                                            <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                                            <Skeleton.Input active style={{width: '100%', height: '200px'}}/>
                                        </div>)}
                                        <>
                                            <div style={{width: '100%', textAlign: 'right'}}>
                                                <p style={{color: '#1D1D1D'}}>درخواست‌های همکاری </p>
                                            </div>
                                            <InfiniteScroll
                                                dataLength={recommended?.length} //This is important field to render the next data
                                                next={FetchMoreData}
                                                hasMore={nextPage}
                                                style={{width: '100%'}}
                                                loader={<h4>Loading...</h4>}
                                                scrollableTarget="scrollableDiv">
                                                {(!error && recommended) ? recommended.map((interview, index) => {
                                                    return <CollaborationItem getRecommended={getRecommended}
                                                                              isInterview={false} data={interview}
                                                                              key={interview?.id}/>
                                                }) : error && error.response?.status === 500 &&
                                                    <div>خطای داخلی سرور</div>}
                                            </InfiniteScroll>
                                            {!recommended.length && (<div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '80vh'
                                                }}>{recommendedError}</div>)}
                                        </>
                                    </div>
                                    <div id={'interviewsColumn'} style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        flexDirection: 'column'
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
                                                    {(!error && myInterView) && myInterView.map((interview, index) => {
                                                        return <CollaborationInterView data={interview}
                                                                                       key={interview?.id}/>
                                                    })}
                                                </InfiniteScroll>
                                                {!myInterView.length && (<div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        height: '80vh'
                                                    }}>{myInterViewError}</div>)}
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