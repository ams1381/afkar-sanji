import { Skeleton } from 'antd';
import React, { useState } from 'react'
import { ClearSearchInputButton, QuestionDesignTitle, QuestionDesignBox,
   QuestionnairePanelBodyContainer  , QuestionSearchContainer , QuestionSearchInput
} from '@/styles/questionnairePanel/QuestionDesignPanel';
import { Icon } from '@/styles/icons';
import { QuestionItem } from './QuestionItem';

const QuestionDesignPanel = ({ Questionnaire }) => {
  const [ SearchQuestionText , SetSearchQuestion ] = useState(null);
  const [ ClearSearchBoxState , SetClearSearchBoxState ] = useState(false);
  
  const SearchQuestionHandler = (e) => {
    if(!e.target.value)
      SetClearSearchBoxState(false)
    else
      SetClearSearchBoxState(true)
    SetSearchQuestion(e.target.value);
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
      <QuestionDesignBox>
        { Questionnaire ? <div className='QuestionDesignRightContainer'>
                  <QuestionItem />
          </div> : <Skeleton active /> }
          <div className='QuestionDesignLeftContainer'>

          </div>
      </QuestionDesignBox>
    </QuestionnairePanelBodyContainer>
  )
}
export default QuestionDesignPanel;