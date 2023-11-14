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

const {Search} = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
export default function ({cookies}) {
    const [logoutPopOver, switchPopover] = useState(false);
    const [RightDrawerOpen, setRightDrawerOpen] = useState(false);
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [ MeQuery  ] = useQueries({
        queries: [
            {
                queryKey: ['MeQuery'],
                queryFn: async () => await axiosInstance.get(`/user-api/users/me/`),
                refetchOnWindowFocus : false
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
        async () => await axiosInstance.get('/interview-api/interviews/'),{
            refetchOnWindowFocus : false ,
            retry : false
        })

    return (
        <PageBox>
            <CommonDrawer RightDrawerOpen={RightDrawerOpen} setRightDrawerOpen={setRightDrawerOpen}/>

                <QuestionerHeader meData={MeQuery?.data?.data} pageName='profile'/>
            <main style={{width: RightDrawerOpen ? '80%' : '100%', transition: '0.3s'}}>
                <QuestionerPageContainer>
                    <QuestionerContentBox>
                        <Collaboration>
                            <CollaborationHeader>
                                <div>
                                    <p>لیست پرسش‌نامه‌ها</p>
                                </div>
                                <div>
                                    <p>درخواست‌های همکاری</p>
                                </div>
                                {/*<FilterBox>*/}
                                {/*    <img src={filter?.src} alt=""/>*/}
                                {/*</FilterBox>*/}
                                {/*<DatePicker format="YYYY-MM-DD"*/}
                                {/*            onChange={DateFilterHandler}*/}
                                {/*            render={(value, openCalendar) => {*/}
                                {/*                return (*/}
                                {/*                    <TimePickerContainer active={'active'}>*/}
                                {/*                        <input value={value} onClick={openCalendar}*/}
                                {/*                               placeholder='انتخاب تاریخ' readOnly/>*/}
                                {/*                        <Icon name='Calender'/>*/}
                                {/*                    </TimePickerContainer>*/}
                                {/*                )*/}
                                {/*            }}*/}
                                {/*            range*/}
                                {/*            plugins={[*/}
                                {/*                <DatePanel position="left"/>*/}
                                {/*            ]}*/}
                                {/*            calendar={persian}*/}
                                {/*            calendarPosition="bottom-left"*/}
                                {/*            locale={persian_fa}*/}
                                {/*/>*/}
                                {/*<Search*/}
                                {/*    rootClassName={'notBorder'}*/}
                                {/*    placeholder="براساس عنوان پرسش‌نامه یا نام کارفرما جست‌وجو کنید"*/}
                                {/*    onSearch={onSearch}*/}
                                {/*    style={{*/}
                                {/*        width: '60%',*/}
                                {/*    }}*/}
                                {/*/>*/}
                            </CollaborationHeader>
                            <CollaborationBody>
                                {isLoading && (
                                    <>
                                        <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                                        <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                                        <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                                        <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                                        <Skeleton.Input active style={{width: '100%', height: '100px'}}/>
                                    </>
                                )}
                                {(!error && data?.data?.results) ? data?.data?.results.map((interview, index) => {
                                    return <CollaborationItem data={interview} key={interview?.id}/>
                                }) : error && error.response?.status === 500 && <div>خطای داخلی سرور</div>}
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

    // Check if cookies are present
    if (cookies) {
        // Parse the cookies
        const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});
        // const {data} = await axios.get(`https://mah-api.ariomotion.com/wallet-api/wallet/my-wallet/`, {headers:{
        //     Authorization: `Bearer ${parsedCookies}`
        //     }})
        // console.log('wallet: ', data)
        return {
            props: {
                // Pass the cookies as props to the component
                cookies: parsedCookies,
                // wallet: data
            },
        };
    }

    return {
        redirect: {
            permanent: false,
            destination: "/auth"
        }
    };
}