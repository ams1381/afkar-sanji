import {
    HeaderContainer, HeaderComponent, QuestionerPageContainer
    , UserAvatarLogout, PageBox, QuestionerContentBox
} from '@/styles/common';
import {
    QuestionnaireDirectoryContainer, QuestionnaireDirectoryPath
} from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import Head from 'next/head';
import React, {useEffect} from 'react'
import {useState} from 'react';
import {CommonDrawer} from '@/components/common/CommonDrawer';
import QuestionerHeader from '@/components/common/QuestionerHeader';
import {useRouter} from 'next/router';
// style
import {WalletHeader, Refresh, Title, Container, WalletContainer} from "@/styles/questioner/dashboard/Wallet/wallet";
// antd
import {Button, Skeleton, Statistic} from "antd";
// icon
import refresh from 'public/Icons/Arrow Counterclockwise.svg'
import wallet from 'public/Icons/Wallet2.svg'
// component
import TransactionList from "@/components/Questioner/Dashboadr/Wallet/TransactionList";
import Statistics from "@/components/Questioner/Dashboadr/Wallet/Statistics/Statistics";
import Bank from "@/components/Questioner/Dashboadr/Wallet/Bank/Bank"
import {axiosInstance} from "@/utilities/axios";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import SetQueryParams from "@/utilities/filtering/filter";

export default function ({cookies, wallet}) {
    const [logoutPopOver, switchPopover] = useState(false);
    const [RightDrawerOpen, setRightDrawerOpen] = useState(true);
    const router = useRouter()
    const [filterParams, setFilterParams] = useState({
        transaction_type: undefined,
        transaction_created_at_from: undefined,
        transaction_created_at_to: undefined,
        amount_ordering: undefined
    })
    // const [amount, setAmount] = useState('')
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    // const {data, isLoading, error, refetch} = useQuery(['Wallet'],
    //     async () => await axiosInstance.get(`/wallet-api/wallet/my-wallet/?amount_ordering=${amount}`))
    const getWalletData = () => {
        setIsLoading(true)
        axiosInstance.get(`/wallet-api/wallet/my-wallet/${SetQueryParams(filterParams)}`).then(res => {
            setData(res?.data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getWalletData()
    }, [filterParams]);


    return (
        <PageBox>
            <CommonDrawer RightDrawerOpen={RightDrawerOpen} setRightDrawerOpen={setRightDrawerOpen}/>
            <main style={{width: RightDrawerOpen ? '80%' : '100%', transition: '0.3s'}}>
                <QuestionerHeader pageName='profile'/>
                <QuestionerPageContainer>
                    <QuestionerContentBox>
                        <Container>
                            <WalletHeader>
                                <Refresh onClick={() => router.reload()}>
                                    <img src={refresh?.src} alt="رفرش"/>
                                </Refresh>
                                <Title>کیف پول</Title>
                                <Button className={`flex notBorder`} typeof='submit'
                                        type="primary">
                                    شارژ کیف‌پول
                                    <img src={wallet?.src} alt=""/>
                                </Button>
                            </WalletHeader>
                            <WalletContainer>
                                <Bank filterParams={filterParams} setFilterParams={setFilterParams} data={data}
                                      loading={isLoading}/>
                                <Statistics filterParams={filterParams} setFilterParams={setFilterParams} data={data}
                                            loading={isLoading}/>
                                <TransactionList filterParams={filterParams} setFilterParams={setFilterParams}
                                                 data={data} loading={isLoading}/>
                            </WalletContainer>
                        </Container>
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