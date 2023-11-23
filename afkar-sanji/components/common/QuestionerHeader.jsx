import React, {useContext} from 'react'
import {
    HeaderContainer,
    HeaderComponent,
    UserAvatarLogout,
    PageBox,
    LogoutPopoverItem,
    HeaderAvatarButton, UserIconContainer
} from '@/styles/common';
import { QuestionnaireDirectoryContainer , QuestionnaireDirectoryPath
} from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import { Popover } from 'antd'
import { Icon } from '@/styles/icons';
import { useState } from 'react';
import Link from "next/link";
import { Skeleton } from 'antd'
import {axiosInstance} from "@/utilities/axios";
import {useRouter} from "next/router";
import {AuthContext} from "@/utilities/AuthContext";
import {useLocalStorage} from "@/utilities/useLocalStorage";

export const QuestionerHeader = ({ pageName , meData , interviewData }) => {
   const router = useRouter();
   const { getItem } = useLocalStorage();

   const Auth = useContext(AuthContext)
  const [ logoutPopOver , switchPopover ] = useState(false);
    const LogoutHandler = async () => {
        // removeCookie('access_token')
        // removeCookie('refresh_token');
        try
        {
            (function(){document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); }); })();
            await axiosInstance.post('/user-api/auth/logout/',{
                refresh_token : axiosInstance.refresh_token ,
            })
            Auth.setHasResume(false)
        }
        catch(Err)
        {
            console.log(Err)
        }


        // getCookie
        router.push('/auth')
    }
  return (
      !meData ?
          <HeaderContainer>
              <HeaderComponent>
              <Skeleton.Button active />
              <QuestionnaireDirectoryContainer>
                  <QuestionnaireDirectoryPath>
                      <Skeleton.Input active />
                  </QuestionnaireDirectoryPath>
              </QuestionnaireDirectoryContainer>
              </HeaderComponent>
          </HeaderContainer>
          :  <HeaderContainer>
          <HeaderComponent>
              <UserIconContainer>
                  {
                      Auth.isAdmin ?
                          router?.pathname?.includes('admin')  ? <Link href={'/'}>
                              <Icon style={{ width : 24 , height : 24 }} name={'AdminIcon'} />
                              </Link> : <Link href={'/admin/'} style={{ display : 'flex' , alignItems : 'center' }}>
                                  <Icon style={{ width : 24 , height : 24 }} name={'AdminIcon'} />
                          </Link>  :
                          <>
                              { getItem('role') === 'n' && <Icon style={{ width : 24 , height : 24 }} name={'NormalUser'} /> }
                              { getItem('role') === 'e' && <Icon style={{ width : 24 , height : 24 }} name={'EmployerIcon'} /> }
                              { getItem('role') === 'i' && <Icon style={{ width : 24 , height : 24 }} name={'QuestionerIcon'} /> }
                              { getItem('role') === 'ie' && <Icon style={{ width : 24 , height : 24 }} name={'InterViewerEmployer'} /> }
                          </>
                  }
                  {/*InterViewerEmployer*/}
              </UserIconContainer>
          <Popover
              content={<div style={{ padding : '4px 0' }}>
                  <LogoutPopoverItem>
                      <Link href={'/questioner/dashboard/profile/'}>پروفایل کاربری</Link>
                  </LogoutPopoverItem>
                  <LogoutPopoverItem onClick={() => LogoutHandler()}>
                      <p>خروج</p>
                      <Icon name={'Logout'} />
                  </LogoutPopoverItem>
              </div>}
                trigger="click"
                className='LogoutPopover'
                open={logoutPopOver}
                overlayInnerStyle={{ marginLeft : 15}}
                onOpenChange={() => switchPopover(false)}
                style={{width : 190}}
                >
                    <HeaderAvatarButton onClick={() => switchPopover(!logoutPopOver)}>
                        { meData.avatar ? <img src={meData.avatar}/> :
                        <Icon name={'User'} className={'user_icon'} />}
                        <p>{meData.first_name}</p>
                    </HeaderAvatarButton>
                </Popover>
        <QuestionnaireDirectoryContainer>
              <QuestionnaireDirectoryPath>
              {pathComponentGenerator(pageName,interviewData)}
              </QuestionnaireDirectoryPath>
            </QuestionnaireDirectoryContainer>
          </HeaderComponent>
      </HeaderContainer>
  )
}
const pathComponentGenerator = (PageName,interviewData) => {
  switch(PageName)
  {
    case 'profile':
          return <>
            <p> پروفایل </p> /
             <span> داشبود </span>

          </>
      case 'add-result':
          return <>
              <p> ثبت پاسخ </p> /
              <span> داشبورد </span>
          </>
      case 'result':
          return <>
              <p> نتایج </p> /
              <span> داشبورد </span>
          </>
      case 'admin-panel':
          return <>
              <p>صفحه‌ اصلی</p>
          </>
      case 'users-list':
          return <>
              <p> لیست کاربران </p> /
              <span> صفحه ی اصلی </span>
          </>
      case 'questionnaires-list':
          return  <>
              <p> لیست پرسشنامه ها </p>
              <span>/ صفحه ی اصلی </span>
          </>
      case 'level-assignment':
          return  <>
              <p>تعیین سطح سوالات</p>
              <span>/ {interviewData?.name} /</span>
              <span> لیست پرسشنامه ها /</span>
              <span> صفحه ی اصلی </span>
              {/*<span> لیست پرسشنامه ها </span> /*/}


          </>
  }
}
export default QuestionerHeader;