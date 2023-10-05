import { HeaderContainer , HeaderComponent , QuestionerPageContainer 
   , UserAvatarLogout, PageBox , QuestionerContentBox } from '@/styles/common';
import { QuestionnaireDirectoryContainer , QuestionnaireDirectoryPath
 } from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import Head from 'next/head';
import React from 'react'
import { useState } from 'react';
import { CommonDrawer } from '@/components/common/CommonDrawer';
import QuestionerHeader from '@/components/common/QuestionerHeader';
import { useRouter } from 'next/router';
import { UserInfoBox } from '@/components/Questioner/Profile/UserInfo';
import { JobInfo } from '@/components/Questioner/Profile/JobInfo';

const Profile = ({ cookies , userData}) => {
  const [ logoutPopOver , switchPopover ] = useState(false);
  const [ RightDrawerOpen , setRightDrawerOpen ] = useState(false);
  return (
    <>
      <Head>
        <title>Afkar Sanji | Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBox>
        <CommonDrawer RightDrawerOpen={RightDrawerOpen} setRightDrawerOpen={setRightDrawerOpen} />
        <main style={{ width : RightDrawerOpen ? '80%' : '100%', transition : '0.3s' }}>
        <QuestionerHeader pageName='profile' />
        <QuestionerPageContainer>
          <QuestionerContentBox>
            <UserInfoBox userData={userData} />
            <JobInfo />
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