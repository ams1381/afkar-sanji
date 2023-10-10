import { Select, Skeleton, Spin, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { ClearSearchInputButton, QuestionDesignTitle, QuestionDesignBox,
   QuestionnairePanelBodyContainer  , QuestionSearchContainer , QuestionSearchInput,
    AddNonQuestionItem, QuestionItemRow, QuestionDesignItem, QuestionItemSurface, 
    LoadingQuestionItem, QuestionItemButtonContainer
} from '@/styles/questionnairePanel/QuestionDesignPanel';
import { Icon } from '@/styles/icons';
import { QuestionItem } from './QuestionItem';
import { axiosInstance } from '@/utilities/axios';
import QuestionStore, { AddQuestion, AddThanks, AddWelcome, ChildQuestionAdder,
   ChildQuestionReorder, NonQuestionSetter, QuestionReorder, QuestionSorter } from '@/utilities/QuestionStore';
import { useDispatch } from 'react-redux';
import { initialQuestionsSetter } from '@/utilities/QuestionStore';
import { useSelector } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';

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
export function moveItem(arr, prevIndex, newIndex) {
  if (prevIndex >= 0 && prevIndex < arr.length && newIndex >= 0 && newIndex < arr.length) {
    const [movedItem] = arr.splice(prevIndex, 1);
    arr.splice(newIndex, 0, movedItem);
  }
  return arr;
}
const QuestionDesignPanel = ({ Questionnaire , QuestionnaireReloader}) => {
  const QuestionDataDispatcher = useDispatch();
  const [ SearchResult , SetSearchResult ] = useState([]);
  const [ActiveQuestion, setActiveQuestion] = useState(null);
  const [ SavedMessage , contextHolder] = message.useMessage();
  const regex = /(<([^>]+)>)/gi;
  const  AllQuestion = useSelector(s => s.reducer.data);
  const NonQuestions = useSelector(s => s.reducer.nonQuestionData);

  const sortableOptions = {
    animation: 150,
    group: 'nested',
    // easing: "cubic-bezier(1, 0, 0, 1)",
    // fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: "ghost",
    handle : '.question_surface',
    onStart : (etx) => {
      if(etx.item.className.includes('group'))
      {
        document.querySelectorAll('.child_container').forEach(item => {
          item.setAttribute('style','display : none')
        })
      }
      // child_container
    } ,
    onUpdate: async function (/**Event*/e) {
    let newArray = [...AllQuestion];
    newArray = moveItem(newArray,e.oldDraggableIndex,e.newDraggableIndex)
 
    QuestionDataDispatcher(QuestionReorder({ newPlacementArray : newArray }))
    QuestionDataDispatcher(QuestionSorter())


      let reOrderedArray =  newArray.map((item,index) => { 
        if(item.question && !item.question.newFace)
          return { question_id : item.question.id , new_placement : index + 1}
       })

       reOrderedArray.forEach((item,index) => !item  ? reOrderedArray.splice(index,1) : '');
       if(reOrderedArray.includes(undefined) || reOrderedArray.includes(null))
          return
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
    },
    onEnd : async (event) => {
      document.querySelectorAll('.child_container').forEach(item => {
        item.setAttribute('style','display : block')
      })
      if(event.to.getAttribute('class') == 'child_container')
      {
        try 
        {

          event.to.firstElementChild.style.position = 'unset'
          event.clone.firstElementChild.firstElementChild.firstElementChild.style.width = '100%'
          event.clone.firstElementChild.style.background = 'red'
          let DraggedQuestionID =  event.clone?.firstElementChild?.classList[2].split('QuestionItem')[1];

          let DroppedGroupQuestionID = event.to?.parentElement?.parentElement?.classList[2].split('QuestionItem')[1];
          let AllQuestionsData = JSON.parse(JSON.stringify(AllQuestion));
          let DraggedQuestion = AllQuestionsData.find(item => item?.question?.id == DraggedQuestionID);
          let DraggedQuestionIndex =  AllQuestionsData.findIndex(item => item?.question?.id == DraggedQuestionID);
          // AllQuestionsData = AllQuestionsData.filter(item => item?.question?.id != DraggedQuestionID);
          AllQuestionsData.splice(DraggedQuestionIndex , 1)
          let copiedDraggedQuestion = JSON.parse(JSON.stringify(DraggedQuestion))
          copiedDraggedQuestion.question.placement = event.newDraggableIndex + 1;
          QuestionDataDispatcher(ChildQuestionAdder({
           groupID : DroppedGroupQuestionID ,
            childQuestion : copiedDraggedQuestion, 
            childQuestionIndex : event.newDraggableIndex  , 
            prevIndex : event.oldDraggableIndex
          }))
         
          if(!DraggedQuestion?.question.newFace)
          await axiosInstance.patch(`/question-api/questionnaires/${Questionnaire.uuid}/${DraggedQuestion?.question.url_prefix}/${DraggedQuestionID}/`,
          { group : DroppedGroupQuestionID , placement : event.newDraggableIndex + 1});
          AllQuestionsData.find(item => item.question.id == DroppedGroupQuestionID).question.child_questions.splice(event.newDraggableIndex, 0 ,copiedDraggedQuestion);
          QuestionDataDispatcher(QuestionSorter())

        }
        
       catch(err)
       {
        console.log(err)
       }
        // console.log(event.oldDraggableIndex,event.newDraggableIndex,event.to)
      }
    },
    onMove : event => {
      if(event.to.className.includes('child_container'))
      {
        if(event.to.firstElementChild.className.includes('nested_dnd_message'))
        {
          event.to.firstElementChild.style.position = 'absolute';
          event.to.firstElementChild.style.top = 0;
          event.to.firstElementChild.firstElementChild.style.display = 'none'
        }
        // console.log(event.dragged)
        document.querySelector(`#${event.dragged.getAttribute('id')} .question_design_item`).setAttribute('style','width : 95% !important')
        event.dragged.firstElementChild.firstElementChild.style.width = '100%'
      }
      else 
      {
        document.querySelectorAll('.nested_dnd_message').forEach(item => {
          item.style.position = 'unset';
          item.firstElementChild.style.display = 'block'
        })
        document.querySelector(`#${event.dragged.getAttribute('id')} .question_design_item`).setAttribute('style','width : 100% !important')
        // event.dragged.style.width = '100%';
        event.dragged.firstElementChild.firstElementChild.style.width = '50%'
      }
      return true;
    }
  };

  useEffect(() => {
    if(Questionnaire)
    {
      QuestionDataDispatcher(NonQuestionSetter([{ question : Questionnaire.welcome_page }, 
        { question : Questionnaire.thanks_page}]))

      QuestionDataDispatcher(initialQuestionsSetter(Questionnaire.questions))
      QuestionDataDispatcher(QuestionSorter());
    }
  },[Questionnaire])
  useEffect(() => {

    document.querySelectorAll('.child_container .design_container').forEach(item => {
      item.style.width = '100%'
      item.firstElementChild.style.width = '95%'
    })
    document.querySelectorAll('.child_question').forEach((item) => {
      if(item.firstElementChild?.firstElementChild?.firstElementChild)
      {
        item.style.position = 'unset'
      }
    })
  },[AllQuestion])
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
       search_array = search_array.filter(SearchItem => typeof SearchItem == 'object')
      SetSearchResult(search_array)
     }
  }
  const SearchSelectHandler = (QuestionID) => {
    let SelectedQuestion = AllQuestion.find(item => item && item.question && item.question.id == QuestionID);
    setActiveQuestion({ 
      'QuestionID' : SelectedQuestion.question.id ,
       'QuestionType' : SelectedQuestion.question.question_type }
      );
     document.querySelector(`.QuestionItem${QuestionID}`)?.scrollIntoView({ behavior : 'smooth' , block : 'nearest' });
  }

  const AddWelcomeHandler = () => {
    let welcomeID = Date.now();
    QuestionDataDispatcher(AddWelcome({ QuestionnaireID : Questionnaire.id , WelcomeID : welcomeID }));

    setActiveQuestion({
       'QuestionID' : welcomeID ,
       'QuestionType' : 'welcome_page'
      })
  }
  const AddThanksHandler = () => {
    let ThanksID = Date.now();
    QuestionDataDispatcher(AddThanks({ QuestionnaireID : Questionnaire.id , ThanksID : ThanksID }));

    setActiveQuestion({
       'QuestionID' : ThanksID ,
       'QuestionType' : 'thanks_page'
      })
  }
  const AddFirstQuestion = () => {
    let FirstQuestionID = Date.now();
    
    QuestionDataDispatcher(AddQuestion({AddedQuestionID : FirstQuestionID }))
    // console.log(AllQuestion,FirstQuestionID)
    setActiveQuestion({
       'QuestionID' : FirstQuestionID ,
       'QuestionType' : 'optional'
      })
  }

  return (
    <QuestionnairePanelBodyContainer>
      {contextHolder}
      <QuestionDesignBox id='characters' className=''>
      <QuestionSearchContainer questionnairePanel className='search_box_container'>   
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
                filterOption={(_, option) => {
                  if(option.label)
                    return option
                }}
                />
                </> : <Skeleton.Input active />}
          </QuestionSearchContainer>
        { (AllQuestion && NonQuestions) ? <div className='QuestionDesignRightContainer' >
                {(Questionnaire && NonQuestions.length) ? (NonQuestions[0] && NonQuestions[0].question) ?
                <QuestionItem 
                IsQuestion={false}
                UUID={Questionnaire.uuid}
                ActiveQuestion={ActiveQuestion}
                Questionnaire={Questionnaire}
                setActiveQuestion={setActiveQuestion}
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
                <ReactSortable {...sortableOptions}
                list={AllQuestion.map(item => item.question ? ({ ...item.question , chosen : true }) : {})}
                 setList={(newList) => {}}
                  style={{ width : '100%' }} className='main_container' >
                  {
                    AllQuestion.map((item,index) =>
                    <div id={'question' + item?.question.id} className={item.question.question_type}>
                               <QuestionItem
                                IsQuestion={true}
                                QuestionnaireReloader
                                Questionnaire={Questionnaire}
                                UUID={Questionnaire.uuid}
                                key={item.question.id}
                                question={item}
                                // provided={provided}
                                QuestionsList={AllQuestion}
                                ActiveQuestion={ActiveQuestion}
                                setActiveQuestion={setActiveQuestion}
                                // dropboardprovide={provided}
                                />         
                            </div>)
                  }
                </ReactSortable>
          
                :  <AddNonQuestionItem style={{ marginTop : 10 }} addquestion='true' onClick={AddFirstQuestion}>
                  <svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 8C16.5 12.4183 12.9183 16 8.5 16C4.08172 16 0.5 12.4183 0.5 8C0.5 3.58172 4.08172 0 8.5 0C12.9183 0 16.5 3.58172 16.5 8ZM4.5 8C4.5 8.27614 4.72386 8.5 5 8.5H8V11.5C8 11.7761 8.22386 12 8.5 12C8.77614 12 9 11.7761 9 11.5V8.5H12C12.2761 8.5 12.5 8.27614 12.5 8C12.5 7.72386 12.2761 7.5 12 7.5H9V4.5C9 4.22386 8.77614 4 8.5 4C8.22386 4 8 4.22386 8 4.5V7.5H5C4.72386 7.5 4.5 7.72386 4.5 8Z"/>
                  </svg>
                <p>برای افزودن اولین سوال کلیک کنید</p>
                </AddNonQuestionItem> : ''}
                {(Questionnaire && NonQuestions.length ) ?
                 (NonQuestions[1] && NonQuestions[1].question) ? 
                 <QuestionItem 
                  ActiveQuestion={ActiveQuestion}
                  setActiveQuestion={setActiveQuestion}
                  IsQuestion={false} 
                  UUID={Questionnaire.uuid} 
                  Questionnaire={Questionnaire}
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
                  { !ActiveQuestion && Questionnaire && <div className='QuestionDesignLeftContainer' >
                       <p>یکی از سوالات را انتخاب کنید یا سوالی بسازید</p>
                   </div> }
        
      </QuestionDesignBox>
    </QuestionnairePanelBodyContainer>
  )
}
export default QuestionDesignPanel;