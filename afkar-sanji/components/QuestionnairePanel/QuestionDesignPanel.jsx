import { Select, Skeleton, Spin, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { ClearSearchInputButton, QuestionDesignTitle, QuestionDesignBox,
   QuestionnairePanelBodyContainer  , QuestionSearchContainer , QuestionSearchInput,
    AddNonQuestionItem, QuestionItemRow, QuestionDesignItem, QuestionItemSurface, 
    LoadingQuestionItem, QuestionItemButtonContainer
} from '@/styles/questionnairePanel/QuestionDesignPanel';
import { Icon } from '@/styles/icons';
import { QuestionItem } from './QuestionItem';
import QuestionComponent from '../Questions/Question';
import WelcomeComponent from '../Questions/Welcome';
import { axiosInstance } from '@/utilities/axios';
import QuestionStore, { AddQuestion, AddThanks, AddWelcome, NonQuestionSetter, QuestionReorder, QuestionSorter } from '@/utilities/QuestionStore';
import { useDispatch } from 'react-redux';
import { initialQuestionsSetter } from '@/utilities/QuestionStore';
import { useSelector } from 'react-redux';
import { DragDropContext , Droppable , Draggable } from '@hello-pangea/dnd';
import { NestedDndItem } from './nestedDndItem';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const getListStyle = (isDraggingOver) => ({
  width: '100%',
});
export const ReorderPoster = async (UUID,reOrderedArray) => {
  axiosInstance.defaults.headers['Content-Type'] = 'application/json';
  try
     {
      await axiosInstance.post(`/question-api/questionnaires/${UUID}/change-questions-placements/`,{
        'placements' : reOrderedArray
      })
     }
    catch(err)
    {
      throw err;
    }
}
const QuestionDesignPanel = ({ Questionnaire , QuestionnaireReloader}) => {
  const QuestionDataDispatcher = useDispatch();
  const [ SearchResult , SetSearchResult ] = useState([]);
  const [ QuestionToPreview , SetQuestionToPreview ] = useState(null);
  const [ QuestionsReload , SetQuestionsReloaded ] = useState(false);
  const [ActiveQuestionId, setActiveQuestionId] = useState(null);
  const [ SavedMessage , contextHolder] = message.useMessage();
  const regex = /(<([^>]+)>)/gi;
  const  AllQuestion = useSelector(s => s.reducer.data)
  const NonQuestions = useSelector(s => s.reducer.nonQuestionData)
  
  useEffect(() => {
    if(Questionnaire)
    {
      QuestionDataDispatcher(NonQuestionSetter([{ question : Questionnaire.welcome_page }, 
        { question : Questionnaire.thanks_page}]))

      QuestionDataDispatcher(initialQuestionsSetter(Questionnaire.questions))
      QuestionDataDispatcher(QuestionSorter());
    }
  },[Questionnaire])
  const SearchQuestionHandler = async (e) => {
     let SearchRes = await axiosInstance.get(`/question-api/questionnaires/${Questionnaire.uuid}/search-questions/?search=${e}`);
     if(SearchRes)
     {
      let search_array = SearchRes.data.map(item => item.question ? ({
        label : <p style={{ fontFamily : 'IRANSans' , textAlign : 'right' }}>
          {item.question.title.replace(regex,"")}
          </p>,
        value : item.question.id,
        id : item.question.id
      }) : '')
      search_array.forEach((item,index) => !item ? search_array.splice(index,1)  : '')
      SetSearchResult(search_array)
     }
  }
  const SearchSelectHandler = (QuestionID) => {
    setActiveQuestionId(QuestionID);
     document.querySelector(`.QuestionItem${QuestionID}`)?.scrollIntoView({ behavior : 'smooth' });
  }
  const onDragEnd = async (result) =>  {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      AllQuestion,
      result.source.index,
      result.destination.index
    );

    QuestionDataDispatcher(QuestionReorder({ newPlacementArray : reorderedItems }))
    QuestionDataDispatcher(QuestionSorter())
    let reOrderedArray =  reorderedItems.map((item,index) => { 
      if(item.question)
        return { question_id : item.question.id , new_placement : index + 1}
     })
     
     reOrderedArray.forEach((item,index) => !item ? reOrderedArray.splice(index,1) : '')
    try 
    {
      await ReorderPoster(Questionnaire.uuid,reOrderedArray)
    }
    catch(err)
    {
      SavedMessage.error({
        content : 'در مرتب کردن سوالات مشکلی پیش آمد',
        duration : 4,
        style : {
          fontFamily : 'IRANSans',
          display : 'flex',
          alignItems : 'center',
          justifyContent : 'center',
          direction : 'rtl'
        }
      }) 
    }
  };
  const AddWelcomeHandler = () => {
    let welcomeID = Date.now();
    QuestionDataDispatcher(AddWelcome({ QuestionnaireID : Questionnaire.uuid , WelcomeID : welcomeID }));

    setActiveQuestionId(welcomeID)
  }
  const AddThanksHandler = () => {
    let ThanksID = Date.now();
    QuestionDataDispatcher(AddThanks({ QuestionnaireID : Questionnaire.uuid , ThanksID : ThanksID }));

    setActiveQuestionId(ThanksID)
  }
  const AddFirstQuestion = () => {
    let FirstQuestionID = Date.now();
    QuestionDataDispatcher(AddQuestion({AddedQuestionID : FirstQuestionID }))
    setActiveQuestionId(FirstQuestionID)
  }
  return (
    <QuestionnairePanelBodyContainer>
      {contextHolder}
      <div>
        <QuestionSearchContainer>   
              { Questionnaire ?  <>
                <Select
                showSearch
                defaultActiveFirstOption={false}
                suffixIcon={<div>
                  <Icon name='GraySearch' style={{ width : 15 }}/>
                  </div>}
                allowClear
                placeholder="براساس عنوان سوال جست‌وجو کنید"
                optionFilterProp="children"
                options={SearchResult}
                onSelect={SearchSelectHandler}
                onChange={(e) => SearchQuestionHandler(e)}
                style={{ width : '100%' , height : '100%' , direction : 'rtl' , fontFamily : 'IRANSans' }}
                onSearch={SearchQuestionHandler}
                notFoundContent={null}
                
                filterOption={(_, option) => option ? option.label : ''}/>
                </> : <Skeleton.Input active />}
          </QuestionSearchContainer>
      </div>
      <QuestionDesignTitle>
        { Questionnaire &&  <p>سوالی را ایجاد یا ویرایش کنید</p> }
      </QuestionDesignTitle>
      <QuestionDesignBox id='characters' className=''>
        { (AllQuestion && NonQuestions) ? <div className='QuestionDesignRightContainer' >
                {(Questionnaire && NonQuestions.length) ? (NonQuestions[0] && NonQuestions[0].question) ?
                <QuestionItem 
                IsQuestion={false}
                UUID={Questionnaire.uuid}
                activeQuestionId={ActiveQuestionId}
                setActiveQuestion={setActiveQuestionId}
                question={NonQuestions[0]}/> :
                 <AddNonQuestionItem onClick={AddWelcomeHandler}  >
                  <p>افزودن خوش آمد گویی</p>
                  </AddNonQuestionItem> : 
                  <LoadingQuestionItem className='question_design_item loading-skeleton' >
                  <QuestionItemSurface className='loading_surface' >
                  <QuestionItemButtonContainer style={{ display : 'flex' }}>
                        <Skeleton.Button style={{ width : 10 , borderRadius : 2 }} active loading block shape='square'/>
                        <Skeleton.Button style={{ width : 10 , borderRadius : 2 }} active loading block shape='square'/>
                    </QuestionItemButtonContainer>
                    <div className='question_item_info'>
                        <Skeleton.Input size='small' style={{ height : 20 , width : 150 }} active loading />
                      </div>
          
                  </QuestionItemSurface>
              </LoadingQuestionItem>}
                { Questionnaire ? AllQuestion.length ?
                <NestedDndItem  ListToRender={AllQuestion} Questionnaire={Questionnaire} onDrag={onDragEnd}
                 ActiveQuestionId={ActiveQuestionId}
                 setActiveQuestionId={setActiveQuestionId} />
                // <DragDropContext onDragEnd={onDragEnd} >
                //   <Droppable droppableId='dropboard'>
                //   {(provided, snapshot) => <div  
                //     ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                //     {AllQuestion.map((item,index) => 
                //     ( item.question)? 
                //       <Draggable
                //       key={item.question.id}
                //       draggableId={item.question.id.toString()}
                //       index={index}>
                //       {(provided, snapshot) => (
                //         <div ref={provided.innerRef} {...provided.draggableProps}>
                //           <QuestionItem
                //             IsQuestion={true}
                //             UUID={Questionnaire.uuid}
                //             key={item.question.id}
                //             question={item}
                //             provided={provided}
                //             activeQuestionId={ActiveQuestionId}
                //             setActiveQuestion={setActiveQuestionId}
                //             dropboardprovide={provided}/>         
                //         </div>
                //       )}
                //     </Draggable> : null)}
                //   {provided.placeholder}
                //   </div>  } 
                //   </Droppable>
                // </DragDropContext>
                :  <AddNonQuestionItem style={{ marginTop : 10 }} addquestion='true' onClick={AddFirstQuestion}>
                  <svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 8C16.5 12.4183 12.9183 16 8.5 16C4.08172 16 0.5 12.4183 0.5 8C0.5 3.58172 4.08172 0 8.5 0C12.9183 0 16.5 3.58172 16.5 8ZM4.5 8C4.5 8.27614 4.72386 8.5 5 8.5H8V11.5C8 11.7761 8.22386 12 8.5 12C8.77614 12 9 11.7761 9 11.5V8.5H12C12.2761 8.5 12.5 8.27614 12.5 8C12.5 7.72386 12.2761 7.5 12 7.5H9V4.5C9 4.22386 8.77614 4 8.5 4C8.22386 4 8 4.22386 8 4.5V7.5H5C4.72386 7.5 4.5 7.72386 4.5 8Z"/>
                  </svg>
                <p>برای افزودن اولین سوال کلیک کنید</p>
                

                </AddNonQuestionItem> : ''}
                {(Questionnaire && NonQuestions.length ) ?
                 (NonQuestions[1] && NonQuestions[1].question) ? 
                 <QuestionItem 
                  activeQuestionId={ActiveQuestionId}
                  setActiveQuestion={setActiveQuestionId}
                  IsQuestion={false} 
                  UUID={Questionnaire.uuid} 
                  question={NonQuestions[1]} /> :
                   <AddNonQuestionItem onClick={AddThanksHandler} style={{  marginTop : 10 }}>
                  <p>افزودن صفحه تشکر</p>
                 </AddNonQuestionItem>
                 : 
                 <>
                  <LoadingQuestionItem className='question_design_item loading-skeleton' >
                        <QuestionItemSurface className='loading_surface' >
                        <QuestionItemButtonContainer style={{ display : 'flex' }}>
                              <Skeleton.Button style={{ width : 10 , borderRadius : 2 }} active loading block shape='square'/>
                              <Skeleton.Button style={{ width : 10 , borderRadius : 2 }} active loading block shape='square'/>
                              <Skeleton.Button style={{ width : 10 , borderRadius : 2 }} active loading block shape='square'/>
                          </QuestionItemButtonContainer>
                          <div className='question_item_info'>
                              <Skeleton.Input size='small' style={{ height : 20 , width : 150 }} active loading />
                            </div>
                
                        </QuestionItemSurface>
                    </LoadingQuestionItem>
                    <LoadingQuestionItem className='question_design_item loading-skeleton' >
                        <QuestionItemSurface className='loading_surface' >
                        <QuestionItemButtonContainer style={{ display : 'flex' }}>
                              <Skeleton.Button style={{ width : 10 , borderRadius : 2 }} active loading block shape='square'/>
                              <Skeleton.Button style={{ width : 10 , borderRadius : 2 }} active loading block shape='square'/>
                              <Skeleton.Button style={{ width : 10 , borderRadius : 2 }} active loading block shape='square'/>
                          </QuestionItemButtonContainer>
                          <div className='question_item_info'>
                              <Skeleton.Input size='small' style={{ height : 20 , width : 150 }} active loading />
                            </div>
                
                        </QuestionItemSurface>
                    </LoadingQuestionItem>
                    <LoadingQuestionItem className='question_design_item loading-skeleton' >
                        <QuestionItemSurface className='loading_surface' >
                        <QuestionItemButtonContainer style={{ display : 'flex' }}>
                              <Skeleton.Button style={{ width : 10 , borderRadius : 2 }} active loading block shape='square'/>
                          </QuestionItemButtonContainer>
                          <div className='question_item_info'>
                              <Skeleton.Input size='small' style={{ height : 20 , width : 150 }} active loading />
                            </div>
                
                        </QuestionItemSurface>
                    </LoadingQuestionItem>
                 </>
                  }
                  </div> : <></>}
                  { !ActiveQuestionId && Questionnaire && <div className='QuestionDesignLeftContainer' >
                       <p>جهت ویرایش یک از سوالات را از قسمت سمت‌راست انتخاب کنید</p>
                   </div> }
        
      </QuestionDesignBox>
    </QuestionnairePanelBodyContainer>
  )
}
export default QuestionDesignPanel;