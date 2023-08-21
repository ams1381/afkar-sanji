import { Select, Skeleton } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { ClearSearchInputButton, QuestionDesignTitle, QuestionDesignBox,
   QuestionnairePanelBodyContainer  , QuestionSearchContainer , QuestionSearchInput
} from '@/styles/questionnairePanel/QuestionDesignPanel';
import { Icon } from '@/styles/icons';

import { QuestionItem } from './QuestionItem';
import QuestionComponent from '../Questions/Question';
import WelcomeComponent from '../Questions/Welcome';
import { axiosInstance } from '@/utilities/axios';
import QuestionStore, { NonQuestionSetter, QuestionSorter } from '@/utilities/QuestionStore';
import { useDrag } from 'react-dnd'
import { Draggable } from 'react-beautiful-dnd';
import DebounceSelect from './Preview Components/QuestionSearchBar';
import { useDispatch } from 'react-redux';
import { initialQuestionsSetter } from '@/utilities/QuestionStore';
import { useSelector } from 'react-redux';
import DraggableList from 'react-draggable-list';

const QuestionDesignPanel = ({ Questionnaire , QuestionnaireReloader}) => {
  const QuestionDataDispatcher = useDispatch();
  const [ SearchQuestionText , SetSearchQuestion ] = useState([]);
  const [ ClearSearchBoxState , SetClearSearchBoxState ] = useState(false);
  const [ QuestionToPreview , SetQuestionToPreview ] = useState(null);
  const [ QuestionsReload , SetQuestionsReloaded ] = useState(false);
  const QuestionBoxContainer = useRef(null);
  const  AllQuestion = useSelector(s => s.reducer.data)
  
  useEffect(() => {
    if(AllQuestion.length)
      QuestionDataDispatcher(initialQuestionsSetter(AllQuestion))
    else if(Questionnaire)
    {
      QuestionDataDispatcher(NonQuestionSetter([{ question : Questionnaire.welcome_page }, 
        { question : Questionnaire.thanks_page}]))

      QuestionDataDispatcher(initialQuestionsSetter(Questionnaire.questions))
      QuestionDataDispatcher(QuestionSorter());
    }
    
      // StoreInitialValueSetter(Questionnaire.questions)
  },[Questionnaire , AllQuestion])
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
                  <QuestionSearchInput placeholder='جستجو کنید' defaultValue={SearchQuestionText ? SearchQuestionText : ''}   /> 
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
      <QuestionDesignBox ref={QuestionBoxContainer}>
        { (Questionnaire) ? <div className='QuestionDesignRightContainer'>
                {Questionnaire.welcome_page ? 
                <QuestionItem IsQuestion={false} UUID={Questionnaire.uuid} question={Questionnaire.welcome_page}/> : ''}
                
                  {/* <DraggableList list={AllQuestion.map(item => item.question)} itemKey="id" template={<QuestionItem className="disable-select dragHandle" IsQuestion={true}  UUID={Questionnaire.uuid}/>}
                   container={() => QuestionBoxContainer.current} /> */}
                  
                     {
                     AllQuestion.map((item,index) => 
                    //  <Draggable key={item.id} draggableId={item.id} index={index}>
                    //   {(provided, snapshot) => 
                      <QuestionItem className="disable-select dragHandle" IsQuestion={true} 
                       UUID={Questionnaire.uuid} key={item.question.id} question={item.question}/>
                      // </Draggable> 
                     )}
                    
                {Questionnaire.thanks_page ? <QuestionItem  IsQuestion={false} UUID={Questionnaire.uuid} 
                 question={Questionnaire.thanks_page} /> : ''}
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