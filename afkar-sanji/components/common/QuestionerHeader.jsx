import React from 'react'
import { HeaderContainer , HeaderComponent , UserAvatarLogout, PageBox } from '@/styles/common';
import { QuestionnaireDirectoryContainer , QuestionnaireDirectoryPath
} from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import { Popover } from 'antd'
import { Icon } from '@/styles/icons';
import { useState } from 'react';

export const QuestionerHeader = ({ pageName }) => {
  const [ logoutPopOver , switchPopover ] = useState(false);
  return (
    <HeaderContainer>
          <HeaderComponent>
          <Popover
                content={<p>fgsdgsdgsdg</p>}
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
  }
}
export default QuestionerHeader;