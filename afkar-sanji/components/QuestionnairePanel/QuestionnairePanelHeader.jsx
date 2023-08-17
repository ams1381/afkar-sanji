import React from 'react'
import { QuestionnairePanelContainer , PanelInnerContainer , SeeResultButton ,
  QuestionnaireDirectoryContainer , QuestionnaireDirectoryPath , PanelHeader ,
  QuestionnaireEditItemsInnerContainer , QuestionnaireEditItem , QuestionnaireEditItemsContainer , QuestionnaireEditButtonContainer
} from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import { Icon } from '@/styles/icons';
import { FolderPopoverToggle } from '@/styles/folders/Questionnaire';

const QuestionnairePanelHeader = ({ FolderName , QuestionnaireName , SideState , ChangeSide }) => {
  return (
    <>
    <PanelHeader>
          <QuestionnaireDirectoryContainer>
            <QuestionnaireDirectoryPath>
              <p><span>{FolderName ? '' : ' '} / </span>{QuestionnaireName}</p>
            </QuestionnaireDirectoryPath>
   
              <div>
                <FolderPopoverToggle>
                  <Icon name='menu' />
                </FolderPopoverToggle>
              </div>
           
          </QuestionnaireDirectoryContainer>
          <div>
            <SeeResultButton>
              <p>مشاهده نتایج</p>
              <Icon name='SeeResult' />
            </SeeResultButton>
          </div>
        </PanelHeader>
        <QuestionnaireEditItemsContainer>
            <QuestionnaireEditItemsInnerContainer>
                <QuestionnaireEditItem selected={SideState == 'question_design' ? true : null} 
                onClick={() => ChangeSide('question_design')}>
                    <p>طراحی سوال</p>
                </QuestionnaireEditItem>
                <QuestionnaireEditItem selected={SideState == 'questionnaire_setting' ? true : null} 
                onClick={() => ChangeSide('questionnaire_setting')}>
                    <p>تنظیمات </p>
                </QuestionnaireEditItem>
            </QuestionnaireEditItemsInnerContainer>
            <QuestionnaireEditButtonContainer>
              <button>
                <Icon name='Eye' />
              </button>
              <button>
                <Icon name='Share' />
              </button>
            </QuestionnaireEditButtonContainer>
        </QuestionnaireEditItemsContainer>
        
    </>
        
  )
}
export default QuestionnairePanelHeader;