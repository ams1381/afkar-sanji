import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    HeaderComponent, UserAvatarLogout, HeaderContainer,
    SideBarToggleButton, HeaderFolderButton, LogoutPopOverInfo, LogoutPopOverLayout, UserIconContainer
} from '@/styles/common';
import { Button, ConfigProvider, Popover, Skeleton } from 'antd';
import { AuthContext } from '@/utilities/AuthContext';
import { themeContext } from '@/utilities/ThemeContext';
import { QuestionnairePanelContainer , PanelInnerContainer , SeeResultButton ,
    QuestionnaireDirectoryContainer , QuestionnaireDirectoryPath , PanelHeader ,
    QuestionnaireEditItemsInnerContainer , QuestionnaireEditItem , QuestionnaireEditItemsContainer , QuestionnaireEditButtonContainer
  } from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import { FolderPopoverToggle, QuestionnaireNameInput } from '@/styles/folders/Questionnaire';
import { useLocalStorage } from '@/utilities/useLocalStorage';
import { Icon } from '@/styles/icons';
import AvatarComponent from './LogoutPopover';
import { Router, useRouter } from 'next/router';
import PN from 'persian-number';
import Link from 'next/link';
import { handleInputWidth } from '@/utilities/RenameFunctions';
import { QuestionnairePopover } from '../QuestionnairePanel/QuestionnairePopover';
import { axiosInstance } from '@/utilities/axios';
import { getCookie } from 'react-use-cookie';

export const Header = ({SetSideBar , goToFolders , Questionnaire , cookies , loadingHeader}) => {
    const [ logoutPopOver , switchPopover ] = useState(false);
    const { getItem , setItem , removeItem } = useLocalStorage();
    const router = useRouter();
    const PhoneNumber = getCookie('numberPhone');
    const [ QuestionnaireName , SetQuestionnaireName ]= useState(Questionnaire ? Questionnaire.name : null);
    const [ RenameState , SetRenameState ] = useState(false);
    const Auth = useContext(AuthContext);
    const QuestionnaireNameInputRef = useRef(null);
    const [ QuestionnairePopoverState , SetQuestionnairePopoverState ] = useState(false);
    useEffect(() => {
        Auth.changePhone(PhoneNumber)
    },[])
    // console.log(document.cookie)
    const FolderButtonHandler = () => {
        goToFolders ? router.back() : SetSideBar();
    }

    useEffect(() => {
        handleInputWidth(QuestionnaireNameInputRef,QuestionnaireName);
      },[QuestionnaireNameInputRef.current])
      useEffect(() => {
        if(Questionnaire)
        {
          SetQuestionnaireName(Questionnaire.name)
          handleInputWidth(QuestionnaireNameInputRef,Questionnaire?.name);
        }
      },[Questionnaire])
    const QuestionnaireNameChangeHandler = (e) => {
        SetQuestionnaireName(e.target.value);
        handleInputWidth(QuestionnaireNameInputRef,QuestionnaireName);
      }
      const QuestionnaireRenameConfirmHandler = async () => {
        if(!QuestionnaireName)
          return
       await axiosInstance.patch(`/${Auth.reqRole}/${Questionnaire.uuid}/`,{ name : QuestionnaireName });
       SetRenameState(false);
      }
    // question-api/questionnaires
  return (
    loadingHeader ? 
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
    :
    <HeaderContainer>
        <HeaderComponent>
            <UserIconContainer>
                {
                    Auth.isAdmin ?
                        <Link href={'/admin/'} style={{ display : 'flex' , alignItems : 'center' }}>
                            <Icon style={{ width : 24 , height : 24 }} name={'AdminIcon'} />
                        </Link>:
                        <>
                            { getItem('role') === 'n' && <Icon style={{ width : 24 , height : 24 }} name={'NormalUser'} /> }
                            { getItem('role') === 'e' && <Icon style={{ width : 24 , height : 24 }} name={'EmployerIcon'} /> }
                            { getItem('role') === 'i' && <Icon style={{ width : 24 , height : 24 }} name={'QuestionerIcon'} /> }
                            { getItem('role') === 'ie' && <Icon style={{ width : 24 , height : 24 }} name={'InterViewerEmployer'} /> }
                        </>
                }
                {/*InterViewerEmployer*/}
            </UserIconContainer>

            <ConfigProvider theme={themeContext}>
                <Popover
                content={<AvatarComponent cookies={cookies} />}
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
            </ConfigProvider>
        {goToFolders ?  <QuestionnaireDirectoryContainer>
            <QuestionnaireDirectoryPath>
              <QuestionnaireNameInput style={{ marginRight : 10 , fontSize : 14 , color : '#000000D9' }}
              ref={QuestionnaireNameInputRef} questionnairePanel='active'
               value={QuestionnaireName} onKeyDown={e => e.key == 'Enter' ? QuestionnaireRenameConfirmHandler() : ''}
               onChange={QuestionnaireNameChangeHandler} disabled={!RenameState} /> 
               <span style={{ color : '#00000073' }}>/</span>
              <Link style={{ color : '#A3A3A3' , display : 'flex' , alignItems : 'center'}}
               onClick={() => removeItem('tabType')}
               href={{
                pathname : '/'
              }}> {Questionnaire?.folder} </Link>
            </QuestionnaireDirectoryPath>
              <div>
                <Popover content={<QuestionnairePopover RenameInput={QuestionnaireNameInputRef}
                Questionnaire={Questionnaire}
                trigger='click'
                RenameChangeState={SetRenameState} SetQuestionnairePopoverState={SetQuestionnairePopoverState} />}
                open={QuestionnairePopoverState}
                onOpenChange={() => SetQuestionnairePopoverState(false)}>
                </Popover>
                <FolderPopoverToggle style={{ marginRight : RenameState ? 10 : 0 }}
                onClick={RenameState ? QuestionnaireRenameConfirmHandler : 
                  () => SetQuestionnairePopoverState(!QuestionnairePopoverState)}>
                  {RenameState ? <Icon name='GrayCheck' /> : <Icon name='Menu' />}
                </FolderPopoverToggle>
                {RenameState && <FolderPopoverToggle style={{ marginRight : 8 }}
                onClick={() => {
                  SetQuestionnaireName(Questionnaire?.name)
                  handleInputWidth(QuestionnaireNameInputRef,Questionnaire?.name)
                  SetRenameState(false);
              }}><Icon name='BlackClose' style={{ width : 15}} /></FolderPopoverToggle>}
              </div>
          </QuestionnaireDirectoryContainer>
        : <HeaderFolderButton onClick={() => SetSideBar()}>
                <p>پوشه‌ها</p>
                <Icon name='Folder' style={{ width : 15 , gap : 8 }} />
            </HeaderFolderButton>}
        </HeaderComponent>
    </HeaderContainer>
  )
}
