import { Icon } from '@/styles/icons'
import { QuestionDesignItem , QuestionItemSurface ,DropDownQuestionButton , QuestionItemActionSelector ,
  QuestionItemButtonContainer, QuestionItemSettingContainer, QuestionItemTitleContainer ,
  QuestionItemTitleInput , QuestionItemFooter ,
  QuestionItemActionButton,
  QuestionItemRow} from '@/styles/questionnairePanel/QuestionDesignPanel'
import Dropdown from 'react-dropdown';
import { Question_types } from '@/utilities/QuestionTypes';
import 'react-dropdown/style.css';
import RemovePopup from '../common/RemovePopup';
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useReducer, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Button, Select, Skeleton, Upload } from 'antd';
import { QuestionFileUploadContainer } from '@/styles/questionnairePanel/QuestionSetting';
import PN from "persian-number";
import QuestionDescription from './Question Components/Common/Description';
import QuestionComponent from '../Questions/Question';
import FileUpload from './Question Components/Common/FileUpload';
import MultipleAnswer from './Question Components/Multiple Choice/WriteMultipleAnswer';
import SettingMultipleAnswer from './Question Components/Multiple Choice/SettingMultipleAnswer';
import { axiosInstance } from '@/utilities/axios';
import { ChangeNameHandler } from '@/utilities/QuestionStore';
import { SettingSectionProvider } from './Question Components/SettingSectionProvider';
import { WritingSectionProvider } from './Question Components/WritingSectionProvider';
import RateQuestion from '../Questions/Rate';
// import { ChangeName, selBaseStatus, setName } from '@/utilities/stores/slices/base/slice';

export const QuestionItem = ({ question , UUID , QuestionnaireReloader}) => {
  const [ QuestionRootOpenState , SetQuestionRootOpenState ] = useState(false);
  const [ QuestionActionState , SetQuestionActionState ] = useState('edit');
  const [ DeleteQuestionState , SetDeleteQuestionState ] = useState(false);
  const QuestionDataDispatcher = useDispatch();
  const questionsData = useSelector(s => s.reducer.data.find(item => item.question.id == question.id))

  const regex = /(<([^>]+)>)/gi;
  const DeleteQuestion = async () => {
     await axiosInstance.delete(`/question-api/questionnaires/${UUID}/delete-question/?id=${question.id}`);
     SetDeleteQuestionState(false);
     QuestionnaireReloader();
  }
  // console.log(props.questionIndex)
  const Duplicate_question = () => {

  }
  const QuestionOpenHandler = () => {
    SetQuestionRootOpenState(!QuestionRootOpenState);
    // QuestionnaireReloader(true);
  }
  return (
    questionsData ? <QuestionItemRow>
    <QuestionDesignItem className='question_design_item'>     
          <QuestionItemSurface>
              <div className="question_item_info">
                  <DropDownQuestionButton dropped={QuestionRootOpenState ? 'true' : null} onClick={QuestionOpenHandler}>
                      <Icon name='ArrowDown' />                                         
                  </DropDownQuestionButton>
                  <p>{questionsData.question.title.replace(regex,"")}<span>{PN.convertEnToPe(questionsData.question.placement)} .</span></p>
              </div>
              <QuestionItemButtonContainer>
                  <button>
                      <Icon name='GrayAdd' />
                  </button>
                  <RemovePopup onOkay={DeleteQuestion} setDeleteState={SetDeleteQuestionState}
                  title='تمام نتایج حاصل از این سوال هم حذف خواهد شد'
                  DeleteState={DeleteQuestionState}>
                  </RemovePopup>
                  <button onClick={() => SetDeleteQuestionState(true)}>
                      <Icon name='RedTrash' />
                  </button>
                  <button>
                    <Icon name='duplicate' />   
                  </button>
              </QuestionItemButtonContainer>

          </QuestionItemSurface>
          { QuestionRootOpenState ? <div className="question_item__root">
            <QuestionItemActionSelector>
            <QuestionItemActionButton selected={QuestionActionState == 'view' ? 'selected' : null} className='view_question' onClick={() => SetQuestionActionState('view')}>
                  <p>نمایش سوال</p>
                  <svg width="20" height="13" viewBox="0 0 20 13" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.83334 4.00462C12.0425 4.00462 13.8333 5.79549 13.8333 8.00462C13.8333 10.2138 12.0425 12.0046 9.83334 12.0046C7.6242 12.0046 5.83334 10.2138 5.83334 8.00462C5.83334 5.79549 7.6242 4.00462 9.83334 4.00462ZM9.83334 0.5C14.4469 0.5 18.4294 3.65001 19.5345 8.06439C19.635 8.4662 19.3908 8.87348 18.989 8.97406C18.5872 9.07465 18.1799 8.83045 18.0794 8.42863C17.1405 4.67796 13.7547 2 9.83334 2C5.91027 2 2.52344 4.68026 1.5862 8.43315C1.48583 8.83502 1.07869 9.07944 0.676823 8.97908C0.274952 8.87872 0.0305309 8.47158 0.130894 8.06971C1.23398 3.65272 5.21782 0.5 9.83334 0.5Z"/>
                  </svg>
            </QuestionItemActionButton>
            <QuestionItemActionButton selected={QuestionActionState == 'setting' ? 'selected' : null} onClick={() => SetQuestionActionState('setting')}>
                  <p>تنظیمات</p>
                  <svg width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0124 0.25C10.7464 0.25846 11.4775 0.343262 12.1939 0.503038C12.5067 0.572785 12.7406 0.833511 12.7761 1.15196L12.9463 2.67881C13.0233 3.37986 13.6152 3.91084 14.3209 3.91158C14.5105 3.91188 14.6982 3.87238 14.8734 3.79483L16.2741 3.17956C16.5654 3.05159 16.9057 3.12136 17.1232 3.35362C18.1354 4.43464 18.8892 5.73115 19.3279 7.14558C19.4225 7.45058 19.3137 7.78203 19.0566 7.9715L17.8151 8.88659C17.461 9.14679 17.2518 9.56001 17.2518 9.99946C17.2518 10.4389 17.461 10.8521 17.8159 11.1129L19.0585 12.0283C19.3156 12.2177 19.4246 12.5492 19.3299 12.8543C18.8914 14.2685 18.138 15.5649 17.1264 16.6461C16.9091 16.8783 16.569 16.9483 16.2777 16.8206L14.8714 16.2045C14.4691 16.0284 14.007 16.0542 13.6268 16.274C13.2466 16.4937 12.9935 16.8812 12.9452 17.3177L12.7761 18.8444C12.7413 19.1592 12.5124 19.4182 12.2043 19.4915C10.7558 19.8361 9.24673 19.8361 7.79828 19.4915C7.49015 19.4182 7.26129 19.1592 7.22643 18.8444L7.0576 17.32C7.00802 16.8843 6.75459 16.498 6.37467 16.279C5.99475 16.06 5.53345 16.0343 5.13244 16.2094L3.72582 16.8256C3.43446 16.9533 3.09428 16.8833 2.87703 16.6509C1.86487 15.5685 1.11144 14.2705 0.673445 12.8548C0.579106 12.5499 0.688106 12.2186 0.94509 12.0293L2.18842 11.1133C2.54256 10.8531 2.75172 10.4399 2.75172 10.0005C2.75172 9.56101 2.54256 9.14779 2.18796 8.88725L0.945406 7.97285C0.68804 7.78345 0.57894 7.45178 0.673612 7.14658C1.11236 5.73215 1.86619 4.43564 2.87837 3.35462C3.09584 3.12236 3.43618 3.05259 3.72749 3.18056L5.12786 3.79572C5.53081 3.97256 5.99404 3.94585 6.37601 3.72269C6.75633 3.50209 7.00953 3.11422 7.05841 2.67764L7.22849 1.15196C7.26401 0.83335 7.49811 0.572541 7.81105 0.502942C8.52832 0.34342 9.2602 0.258654 10.0124 0.25ZM9.99994 6.99995C8.34309 6.99995 6.99994 8.3431 6.99994 9.99995C6.99994 11.6568 8.34309 13 9.99994 13C11.6568 13 12.9999 11.6568 12.9999 9.99995C12.9999 8.3431 11.6568 6.99995 9.99994 6.99995Z" />
                    </svg>
                </QuestionItemActionButton>
              <QuestionItemActionButton selected={QuestionActionState == 'edit' ? 'selected' : null} onClick={() => SetQuestionActionState('edit')}>
                    <p>نوشتن سوال</p>
                    <svg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5577 1.04825C15.9551 -0.349357 18.221 -0.349424 19.6185 1.0481C21.0159 2.4455 21.016 4.71112 19.6187 6.10861L18.7268 7.00057L13.6661 1.93991L14.5577 1.04825ZM12.6055 3.00064L2.60767 12.9997C2.20135 13.4061 1.91574 13.9172 1.78264 14.4762L0.687052 19.0777C0.626727 19.3311 0.702163 19.5976 0.886326 19.7817C1.07049 19.9659 1.33701 20.0413 1.59037 19.981L6.19162 18.8855C6.75082 18.7523 7.2621 18.4666 7.66855 18.0601L17.6662 8.06129L12.6055 3.00064Z"/>
                    </svg>
                </QuestionItemActionButton>   
              
                
            </QuestionItemActionSelector>
            { QuestionActionState == 'edit' ? <QuestionItemSettingContainer>
                <div className="question_bold_info">
                    <QuestionItemTitleContainer>
                        <QuestionItemTitleInput value={questionsData.question.title} 
                        onChange={(e) => QuestionDataDispatcher(ChangeNameHandler({ NewTitle : e.target.value , QuestionID : questionsData.question.id }))}
                         type="text" placeholder='عنوان سوال' />
                    </QuestionItemTitleContainer>
                    <div className="question_type_selector">
                    <Select
                        bordered={false}
                        maxTagTextLength={6}
                        labelInValue
                        defaultValue={{ value: <h3>Hii</h3>, label: <p>Hello Wrold</p> }}
                        style={{ width: 120 , border : 'none'}}
                        dropdownStyle={{ width : '350px !important' }}
                        options={Question_types}
                      />
                    </div>
                </div>
                <QuestionDescription questionDescription={questionsData.question.description} />
                { WritingSectionProvider(questionsData.question.question_type,questionsData.question) }
            </QuestionItemSettingContainer> : QuestionActionState == 'setting' ? 
            <>
              <FileUpload />
              {/* <SettingMultipleAnswer /> */}
              { SettingSectionProvider(questionsData.question.question_type,questionsData.question) }
            </>
            : <>
              <QuestionComponent QuestionInfo={questionsData.question} />
              </>}
            { QuestionRootOpenState ? <QuestionItemFooter>
              <Button type='primary'>
                <p>ذخیره</p>
              </Button>
              <Button danger onClick={QuestionOpenHandler}>
                <p>انصراف</p>
              </Button>
            </QuestionItemFooter> : <Skeleton active /> }
            
          </div> : '' }
        </QuestionDesignItem>
        <div className='question_preview'>
              {QuestionRootOpenState ? <QuestionComponent QuestionInfo={questionsData.question} /> : ''}
        </div>
    </QuestionItemRow> : ''
   
    
  )
}
