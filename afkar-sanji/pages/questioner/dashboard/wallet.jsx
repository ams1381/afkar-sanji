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

export default function ({cookies, wallet}) {
    const [logoutPopOver, switchPopover] = useState(false);
    const [RightDrawerOpen, setRightDrawerOpen] = useState(true);
    const router = useRouter()
    const {data, isLoading, error, refetch} = useQuery(['FolderFetch'],
        async () => await axiosInstance.get('/user-api/folders/'))

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
                                <Bank loading={isLoading}/>
                                <Statistics loading={isLoading}/>
                                <TransactionList loading={isLoading}/>
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