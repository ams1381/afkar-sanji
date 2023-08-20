import { Select, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import { ClearSearchInputButton, QuestionDesignTitle, QuestionDesignBox,
   QuestionnairePanelBodyContainer  , QuestionSearchContainer , QuestionSearchInput
} from '@/styles/questionnairePanel/QuestionDesignPanel';
import { Icon } from '@/styles/icons';

import { QuestionItem } from './QuestionItem';
import QuestionComponent from '../Questions/Question';
import WelcomeComponent from '../Questions/Welcome';
import { axiosInstance } from '@/utilities/axios';
import QuestionStore from '@/utilities/QuestionStore';
import { useDrag } from 'react-dnd'
import { Draggable } from 'react-beautiful-dnd';
import DebounceSelect from './Preview Components/QuestionSearchBar';
import { useDispatch } from 'react-redux';
import { initialStateSetter } from '@/utilities/QuestionStore';
import { useSelector } from 'react-redux';

const QuestionDesignPanel = ({ Questionnaire , QuestionnaireReloader}) => {
  const QuestionDataDispatcher = useDispatch();
  const [ SearchQuestionText , SetSearchQuestion ] = useState([]);
  const [ ClearSearchBoxState , SetClearSearchBoxState ] = useState(false);
  const [ QuestionToPreview , SetQuestionToPreview ] = useState(null);
  
  useEffect(() => {
    Questionnaire ? QuestionDataDispatcher(initialStateSetter(Questionnaire)) : ''
      // StoreInitialValueSetter(Questionnaire.questions)
  },[Questionnaire])
  // const SearchQuestionHandler = async (e) => {
  //   // if(!e.target.value)
  //   //   SetClearSearchBoxState(false)
  //   // else
  //   //   SetClearSearchBoxState(true)
  //   SetSearchQuestion(e);
  
  //    let SearchRes = await axiosInstance.get(`/question-api/questionnaires/${Questionnaire.uuid}/search-questions/?search=${SearchQuestionText}`);
  //    if(SearchRes)
  //    {
  //     console.log(SearchQuestionText,SearchRes.data)
  //     return SearchRes.data.map(item => { value : item.title })
  //    }
  //     SetQuestions(SearchRes.data)
   

  // }
  return (
    <QuestionnairePanelBodyContainer>
      <div>
        <QuestionSearchContainer>   
                { Questionnaire ?  <>
                  {/* <DebounceSelect 
                  mode="multiple"
                  value={SearchQuestionText}
                  placeholder="جستجو کنید"
                  fetchOptions={SearchQuestionHandler}
                  onChange={(newValue) => {
                    SetSearchQuestion(newValue);
                  }}
                  style={{
                    width: '100%',
                  }}
                  /> */}
                  <QuestionSearchInput placeholder='جستجو کنید' value={SearchQuestionText ? SearchQuestionText : ''}   /> 
                  {ClearSearchBoxState ? <ClearSearchInputButton onClick={() => SetSearchQuestion(null)}>
                    <Icon name='ClearInput' style={{ width : 13 }} />
                  </ClearSearchInputButton> : ''}
                   <label> <Icon name='Search' style={{ width : 14 }}/> </label> 
                  </> : ''}
              </QuestionSearchContainer>
      </div>
      <QuestionDesignTitle>
         <p>سوالی را ایجاد یا ویرایش کنید</p> 
      </QuestionDesignTitle>
      <QuestionDesignBox>
        { (Questionnaire) ? <div className='QuestionDesignRightContainer'>
                {Questionnaire.welcome_page ? 
                <QuestionItem UUID={Questionnaire.uuid} 
                QuestionnaireReloader={QuestionnaireReloader} 
                question={Questionnaire.welcome_page}/> : ''}
                {Questionnaire.questions.map((item,index) => 
                <QuestionItem questionIndex={index} UUID={Questionnaire.uuid}                 QuestionnaireReloader={QuestionnaireReloader}  key={item.question.id} question={item.question}/>)} 
                {Questionnaire.thank_page ? <QuestionItem UUID={Questionnaire.uuid} 
                QuestionnaireReloader={QuestionnaireReloader} question={Questionnaire.thank_page} /> : ''}
                  </div> : <Skeleton active /> }
          {/* <div className='QuestionDesignLeftContainer'>
          
                  {QuestionToPreview ? QuestionToPreview.question_type ?
                  <QuestionComponent QuestionInfo={QuestionToPreview} /> :
                   <WelcomeComponent WelcomeInfo={QuestionToPreview}/> : ''}
     
          </div> */}
      </QuestionDesignBox>
    </QuestionnairePanelBodyContainer>
  )
}
export default QuestionDesignPanel;