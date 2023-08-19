import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import { ClearSearchInputButton, QuestionDesignTitle, QuestionDesignBox,
   QuestionnairePanelBodyContainer  , QuestionSearchContainer , QuestionSearchInput
} from '@/styles/questionnairePanel/QuestionDesignPanel';
import { Icon } from '@/styles/icons';
import { Provider } from 'react-redux'
import { QuestionItem } from './QuestionItem';
import QuestionComponent from '../Questions/Question';
import WelcomeComponent from '../Questions/Welcome';
import { axiosInstance } from '@/utilities/axios';
import { StoreInitialValueSetter } from '@/utilities/QuestionStore';
import QuestionStore from '@/utilities/QuestionStore';
import { useDrag } from 'react-dnd'
import { Draggable } from 'react-beautiful-dnd';

const QuestionDesignPanel = ({ Questionnaire }) => {
  const [ SearchQuestionText , SetSearchQuestion ] = useState(null);
  const [ ClearSearchBoxState , SetClearSearchBoxState ] = useState(false);
  const [ QuestionToPreview , SetQuestionToPreview ] = useState(null);
  // useEffect(() => {
  //   console.log(QuestionStore.getState())
  //   if(Questionnaire)
  //     StoreInitialValueSetter(Questionnaire.questions)
  // },[Questionnaire])
  const SearchQuestionHandler = async (e) => {
    if(!e.target.value)
      SetClearSearchBoxState(false)
    else
      SetClearSearchBoxState(true)
    SetSearchQuestion(e.target.value);
    setTimeout(async () => {
     let SearchRes = await axiosInstance.get(`/question-api/questionnaires/${Questionnaire.uuid}/search-questions/?search=${SearchQuestionText}`);
      console.log(SearchRes)
    },1000)
   

  }
  return (
    <QuestionnairePanelBodyContainer>
      <div>
        <QuestionSearchContainer>   
                { Questionnaire ?  <>
                  <QuestionSearchInput placeholder='جستجو کنید' value={SearchQuestionText ? SearchQuestionText : ''}  onChange={SearchQuestionHandler} /> 
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
      <Provider store={QuestionStore}>
      <QuestionDesignBox>
        { Questionnaire ? <div className='QuestionDesignRightContainer'>

                  {Questionnaire.welcome_page ? <QuestionItem SetQuestionToPreview={SetQuestionToPreview} 
                  question={Questionnaire.welcome_page} QuestionToPreview={QuestionToPreview}/> : ''}
                  {Questionnaire.questions.map((item) => 
                  <QuestionItem SetQuestionToPreview={SetQuestionToPreview}
                   key={item.question.id} question={item.question} QuestionToPreview={QuestionToPreview}/>)} 
                  {Questionnaire.thank_page ? <QuestionItem SetQuestionToPreview={SetQuestionToPreview} 
                  question={Questionnaire.thank_page} QuestionToPreview={QuestionToPreview} /> : ''}
                    </div> : <Skeleton active /> }
          <div className='QuestionDesignLeftContainer'>
                  {/* { QuestionToPreview.question_type ? } */}
                  {QuestionToPreview ? QuestionToPreview.question_type ?
                  <QuestionComponent QuestionInfo={QuestionToPreview} /> :
                   <WelcomeComponent WelcomeInfo={QuestionToPreview}/> : ''}
                  {/* <QuestionComponent QuestionInfo={QuestionToPreview} />  */}
          </div>
      </QuestionDesignBox>
      </Provider>
    </QuestionnairePanelBodyContainer>
  )
}
export default QuestionDesignPanel;