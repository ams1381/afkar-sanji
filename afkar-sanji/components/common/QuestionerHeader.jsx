import React from 'react'
import {
    HeaderContainer,
    HeaderComponent,
    UserAvatarLogout,
    PageBox,
    LogoutPopoverItem,
    HeaderAvatarButton
} from '@/styles/common';
import { QuestionnaireDirectoryContainer , QuestionnaireDirectoryPath
} from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import { Popover } from 'antd'
import { Icon } from '@/styles/icons';
import { useState } from 'react';
import Link from "next/link";
import { Skeleton } from 'antd'

export const QuestionerHeader = ({ pageName , meData }) => {
  const [ logoutPopOver , switchPopover ] = useState(false);
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
          <Popover
              content={<div style={{ padding : '4px 0' }}>
                  <LogoutPopoverItem>
                      <Link href={'/questioner/dashboard/profile/'}>پروفایل کاربری</Link>
                  </LogoutPopoverItem>
                  <LogoutPopoverItem>
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
                        { meData.avatar ? <img src={'https://mah-api.ariomotion.com' + meData.avatar}/> :
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
  }
}
export default QuestionerHeader;