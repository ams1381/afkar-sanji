import {
    HeaderContainer, HeaderComponent, QuestionerPageContainer
    , UserAvatarLogout, PageBox, QuestionerContentBox
} from '@/styles/common';
import {
    QuestionnaireDirectoryContainer, QuestionnaireDirectoryPath
} from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import Head from 'next/head';
import React from 'react'
import {useState} from 'react';
import {CommonDrawer} from '@/components/common/CommonDrawer';
import QuestionerHeader from '@/components/common/QuestionerHeader';
import {useRouter} from 'next/router';
// style
import {WalletHeader, Refresh, Title, Container, WalletContainer} from "@/styles/questioner/dashboard/Wallet/wallet";
// antd
import {Button, Statistic} from "antd";
// icon
import refresh from 'public/Icons/Arrow Counterclockwise.svg'
import wallet from 'public/Icons/Wallet2.svg'
// component
import TransactionList from "@/components/Questioner/Dashboadr/Wallet/TransactionList";
import Statistics from "@/components/Questioner/Dashboadr/Wallet/Statistics/Statistics";
import Bank from "@/components/Questioner/Dashboadr/Wallet/Bank/Bank"

export default function ({cookies, userData}) {
    const [logoutPopOver, switchPopover] = useState(false);
    const [RightDrawerOpen, setRightDrawerOpen] = useState(true);
    const router = useRouter()

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
                                    <img src={wallet.src} alt=""/>
                                </Button>
                            </WalletHeader>
                            <WalletContainer>
                                <Bank/>
                                <Statistics/>
                                <TransactionList/>
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
            destination: "/auth"
        }
    };
}