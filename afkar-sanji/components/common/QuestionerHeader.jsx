import React from 'react'
import {HeaderContainer, HeaderComponent, UserAvatarLogout, PageBox, LogoutPopoverItem} from '@/styles/common';
import { QuestionnaireDirectoryContainer , QuestionnaireDirectoryPath
} from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import { Popover } from 'antd'
import { Icon } from '@/styles/icons';
import { useState } from 'react';
import Link from "next/link";

export const QuestionerHeader = ({ pageName }) => {
  const [ logoutPopOver , switchPopover ] = useState(false);
  return (
    <HeaderContainer>
          <HeaderComponent>
          <Popover
              content={<div style={{ padding : '4px 0' }}>
                  <LogoutPopoverItem>
                      <Link href={'/'}>پروفایل کابری</Link>
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
                    <UserAvatarLogout onClick={() => switchPopover(!logoutPopOver)}>
                        <Icon name='GrayUser' />
                    </UserAvatarLogout>
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
         <p> داشبود </p>  
        
      </>
      case 'add-result':
      return <>
          <p> ثبت پاسخ </p> /
          <p> داشبورد </p>
      </>
  }
}
export default QuestionerHeader;