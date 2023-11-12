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

export const QuestionerHeader = ({ pageName , meData }) => {
   const router = useRouter();
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
                          <Link href={'/admin/'} style={{ display : 'flex' , alignItems : 'center' }}>
                              <Icon style={{ width : 24 , height : 24 }} name={'AdminIcon'} />
                          </Link>:
                          <>
                              { Auth.role === '' && <Icon style={{ width : 24 , height : 24 }} name={'NormalUser'} /> }
                              { Auth.role === 'e' && <Icon style={{ width : 24 , height : 24 }} name={'EmployerIcon'} /> }
                              { Auth.role === 'i' && <Icon style={{ width : 24 , height : 24 }} name={'QuestionerIcon'} /> }
                              { Auth.role === 'ie' && <Icon style={{ width : 24 , height : 24 }} name={'InterViewerEmployer'} /> }
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
              {pathComponentGenerator(pageName)}
              </QuestionnaireDirectoryPath>
            </QuestionnaireDirectoryContainer>
          </HeaderComponent>
      </HeaderContainer>
  )
}
const pathComponentGenerator = (PageName) => {
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
              <p> لیست پرسشنامه ها </p> /
              <span> صفحه ی اصلی </span>
          </>
  }
}
export default QuestionerHeader;