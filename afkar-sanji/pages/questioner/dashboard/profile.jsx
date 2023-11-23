import { HeaderContainer , HeaderComponent , QuestionerPageContainer
    , UserAvatarLogout, PageBox , QuestionerContentBox } from '@/styles/common';
import { QuestionnaireDirectoryContainer , QuestionnaireDirectoryPath
} from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import Head from 'next/head';
import React, {useRef} from 'react'
import { useState } from 'react';
import { CommonDrawer } from '@/components/common/CommonDrawer';
import QuestionerHeader from '@/components/common/QuestionerHeader';
import { useRouter } from 'next/router';
import { UserInfoBox } from '@/components/Questioner/Profile/UserInfo';
import { JobInfo } from '@/components/Questioner/Profile/JobInfo';
import {axiosInstance} from "@/utilities/axios";
import {useQueries, useQuery} from "@tanstack/react-query";
import {Skeleton} from "antd";
import {EditInfoBox, InfoBox} from "@/styles/Questioner/profile";

const Profile = () => {
    const [ logoutPopOver , switchPopover ] = useState(false);
    const [ RightDrawerOpen , setRightDrawerOpen ] = useState(false);

    // axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + cookies?.access_token;
    const [ MeQuery , regions ] = useQueries({
        queries: [
            {
                queryKey: ['MeQuery'],
                queryFn: async () => await axiosInstance.get(`/user-api/users/me/`),
                refetchOnWindowFocus : false
            },
            {
                queryKey: ['regions'],
                queryFn: async () =>
                    await axiosInstance.get(`/user-api/nested-countries/`) ,
                refetchOnWindowFocus : false
            },
        ],
    });
    return (
        <>
            <style global jsx>{`
                  .ant-cascader-menus
                  {
                    direction: rtl;
                  }
                .ant-cascader-menu-item-expand-icon
                {
                  transform: rotate(180deg);
                }
                  .ant-select-dropdown.css-dev-only-do-not-override-byeoj0, .ant-select-dropdown.css-17a39f8
                  {
                   width: auto !important;
                  }
                  .ant-cascader-menus
                  {
                    width: 370px !important;
                  }
                  .ant-cascader-checkbox-inner , .ant-select-selection-item
                  {
                    border-radius: 2px !important;
                  }
        `}</style>
            <Head>
                <title>Afkar Sanji | Profile</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageBox>
                <CommonDrawer RightDrawerOpen={RightDrawerOpen} setRightDrawerOpen={setRightDrawerOpen} />
                        <QuestionerHeader pageName='profile' meData={MeQuery?.data?.data}  />
                        <main style={{ width : RightDrawerOpen ? '84%' : '100%', transition : '0.3s' }}>
                        <QuestionerPageContainer>
                            <QuestionerContentBox>
                                <UserInfoBox MeQuery={MeQuery}  regions={regions?.data?.data} />
                                <JobInfo regions={regions?.data?.data} MeQuery={MeQuery} />
                            </QuestionerContentBox>
                        </QuestionerPageContainer>
                        </main>
            </PageBox>
        </>
    )
}
export default Profile;

export async function getServerSideProps(context) {
    const { req } = context;
    const cookies = req.headers.cookie;
    let regionsData;
    let MeData;
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