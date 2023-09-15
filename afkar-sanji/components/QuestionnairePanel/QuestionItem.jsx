import { Icon } from '@/styles/icons'
import { QuestionDesignItem , QuestionItemSurface ,DropDownQuestionButton , QuestionItemActionSelector ,
  QuestionItemButtonContainer, QuestionItemSettingContainer, QuestionItemTitleContainer ,
  QuestionItemTitleInput , QuestionItemFooter , QuestionItemWriteContainer ,
  QuestionItemActionButton, PreviewMobileSizeComponent ,
  QuestionItemRow} from '@/styles/questionnairePanel/QuestionDesignPanel'
import Dropdown from 'react-dropdown';
import { QuestionTypeComponentGenerator, Question_types } from '@/utilities/QuestionTypes';
import 'react-dropdown/style.css';
import RemovePopup from '../common/RemovePopup';
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { CSS } from "@dnd-kit/utilities";
import {useDispatch, useSelector} from 'react-redux'
import { Button, ConfigProvider, Select, Skeleton, Upload, message } from 'antd';
import QuestionDescription from './Question Components/Common/Description';
import QuestionComponent from '../Questions/Question';
import FileUpload from './Question Components/Common/FileUpload';
import { axiosInstance } from '@/utilities/axios';
import { AddQuestion, ChangeErrorData, ChangeNameHandler, ChildQuestionReorder, DeleteNonQuestionHandler, DeleteQuestionHandler, DuplicateQuestionHandler, QuestionSorter, RemoveFileHandler, finalizer } from '@/utilities/QuestionStore';
import { SettingSectionProvider } from './Question Components/SettingSectionProvider';
import { WritingSectionProvider } from './Question Components/WritingSectionProvider';
import { ChangeQuestionType } from '@/utilities/QuestionStore';
import { form_data_convertor } from '@/utilities/FormData';
import { DragDropContext, Droppable ,  Draggable } from '@hello-pangea/dnd';
import { digitsEnToFa } from '@persian-tools/persian-tools';
import { themeContext } from '@/utilities/ThemeContext';
import { ReorderPoster, getListStyle } from './QuestionDesignPanel';
import { StyleSheetConsumer } from 'styled-components';
import { NestedDndItem } from './nestedDndItem';
import { Scrollbar } from 'react-scrollbars-custom';
import { useDraggable , Translate} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';

function shallowEqual(obj1, obj2) {
  if (obj1 === null || obj2 === null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every(key => {
    const val1 = obj1[key];
    const val2 = obj2[key];
    return typeof val1 === 'object' && typeof val2 === 'object'
      ? shallowEqual(val1, val2)
      : val1 === val2;
  });
}
export const QuestionItem = ({  ActiveQuestion, provided ,setActiveQuestion , QuestionsList  , IsQuestion , question , UUID , parentPlacement , GroupID }) => {
  const [ QuestionRootOpenState , SetQuestionRootOpenState ] = useState(false);
  const [ QuestionActionState , SetQuestionActionState ] = useState('edit');
  const [nestedQuestions, setNestedQuestions] = useState(question.child_questions);
  const [ DeleteQuestionState , SetDeleteQuestionState ] = useState(false);
  // const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
  //   id : question?.question?.id,
  //   data: {
  //     id: question?.question?.id,
  //     type: "draggable"
  //   }
  // });

  const [ SaveButtonLoadingState , SetSaveButtonLoadingState ] = useState(false);
  const [ QuestionsReload , SetQuestionsReload ] = useState(false);
  const [ SavedMessage , contextHolder] = message.useMessage();
  const [ QuestionChanged , setQuestionChangedState ] = useState(question.newFace ? true : false)
  const QuestionDispatcher = useDispatch();
  const QuestionsArray = useSelector(state => state.reducer.data);
  const NonQuestionArray = useSelector(state => state.reducer.nonQuestionData);
  const InitialQuestionData = useRef(null);
  const QuestionDesignElement = useRef(null);
  const [maxheight, setMaxHeight] = useState(null);
  const [ titleError , setTitleError ] = useState(false);
  const OcurredError = useSelector(state => state.reducer.Error);
  // const InitialQuestionData = IsQuestion ? : useSelector(s => s.reducer.nonQuestionData.find(item => item.question && item.question.id == question.id));
  const regex = /(<([^>]+)>)/gi;
  // const [ questionsData , setQuestionData ] = useState(null)
  let questionsData = question;
  
  useEffect(() => {
    InitialQuestionData.current = question;
 },[]) 
 window.addEventListener('resize',() => {
  if(window.innerWidth > 768 && QuestionActionState == 'view')
    SetQuestionActionState('edit')
  
})
 useEffect(() =>{
  if(questionsData && InitialQuestionData.current)
  {    
    if(!shallowEqual(InitialQuestionData.current ,questionsData))
      setQuestionChangedState(true);
    else if(!questionsData.question.newFace)
        setQuestionChangedState(false);
     if(questionsData.question.newFace)
        setQuestionChangedState(true);
  }
 },[question])
 useEffect(() => {
  if (QuestionDesignElement.current) {
    const newMaxHeight = QuestionRootOpenState ? QuestionDesignElement.current.offsetHeight : null;
    setMaxHeight(newMaxHeight);
  }
}, [QuestionRootOpenState , QuestionActionState , questionsData]); 
  useEffect(() => {
    if((ActiveQuestion?.QuestionID == questionsData.question.id && ActiveQuestion?.QuestionType == questionsData.question.question_type))
        SetQuestionRootOpenState(true);
      else
        SetQuestionRootOpenState(false)

  },[ActiveQuestion])
   
  const DeleteQuestion = async () => {
    (questionsData.question.question_type == 'welcome_page' ||
     questionsData.question.question_type == 'thanks_page') ?
     QuestionDispatcher(DeleteNonQuestionHandler({ NonQuestionType : questionsData.question.question_type }))
      : QuestionDispatcher((DeleteQuestionHandler({ QuestionID : questionsData.question.id , isQuestion : IsQuestion })))
    
    if(!questionsData.question.newFace)
    {
      if(questionsData.question.url_prefix)
        await axiosInstance.delete(`/question-api/questionnaires/${UUID}/delete-question/?id=${questionsData.question.id}`);
      else
        questionsData.question.question_type == 'welcome_page'  ? await axiosInstance.delete(`/question-api/questionnaires/${UUID}/welcome-pages/${questionsData.question.id}/`)
       : await axiosInstance.delete(`/question-api/questionnaires/${UUID}/thanks-pages/${questionsData.question.id}/`)
    }
    QuestionDispatcher(QuestionSorter());

     SetDeleteQuestionState(false);
     SetQuestionsReload(!QuestionsReload)
  }
  const RandomIdGenerator = () => {
    let ID = Date.now();
    QuestionsArray.forEach(item => {
     if(item.question && item.question.id == ID)
        return RandomIdGenerator()
    })
    return ID;
}
  const Duplicate_question = () => {
    let copiedQuestionId = RandomIdGenerator()
    RandomIdGenerator()
    QuestionDispatcher(DuplicateQuestionHandler({
       QuestionID : questionsData.question.id ,
        CopiedQuestionID : copiedQuestionId 
      }))
    QuestionDispatcher(QuestionSorter());
    setActiveQuestion({ 
      'QuestionID' : copiedQuestionId,
      'QuestionType' : questionsData?.question?.question_type
    })
  }
  const QuestionOpenHandler = () => {
    SetQuestionRootOpenState(!QuestionRootOpenState);

    if(!QuestionRootOpenState)
    {
      console.log(questionsData.question.id)
      setActiveQuestion({
        'QuestionID' : questionsData.question.id , 
        'QuestionType' : questionsData.question.question_type
      })
      document.querySelector(`.QuestionItem${questionsData.question.id}`)?.scrollIntoView({ behavior : 'smooth' });
    }
    
    else
      setActiveQuestion(null)
  }
  const ChangeQuestionTypeHandler = (_,ChangedType) => {
    ChangedType ? QuestionDispatcher(ChangeQuestionType({ newType : ChangedType.value ,
       QuestionID : questionsData.question.id , Prefix_url : ChangedType.url_prefix })) : ''
    // ChangeQuestionTypeState(ChangedType.value)
  }
  const AddQuestionHandler = () => {
    let newQuestionId = RandomIdGenerator()
    questionsData.question.group ?
    QuestionDispatcher(AddQuestion({ TopQuestionID : questionsData.question.id , ParentQuestion : questionsData.question.group , AddedQuestionID : RandomIdGenerator()}))
    : questionsData.question.question_type == 'welcome_page' ?
    QuestionDispatcher(AddQuestion({ unshiftQuestion : true , AddedQuestionID : newQuestionId}))
    :
    QuestionDispatcher(AddQuestion({ TopQuestionID : questionsData.question.id , AddedQuestionID : newQuestionId}))

    QuestionDispatcher(QuestionSorter())
    setActiveQuestion({
      'QuestionID' : newQuestionId ,
      'QuestionType' : 'optional'
      })
  }
  const QuestionPatcher = async () => {
    SetSaveButtonLoadingState(true);
    let QDataInstance = JSON.parse(JSON.stringify(questionsData))
    QDataInstance.question.media = questionsData.question.media;
    if(questionsData.question.media != null && typeof questionsData.question.media == 'string')
    {
      delete QDataInstance.question['media'];
    }
     axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';
    try
    { 
      if(questionsData.question.url_prefix)
          await axiosInstance.patch(`/question-api/questionnaires/${UUID}/${questionsData.question.url_prefix}/${questionsData.question.id}/`,form_data_convertor(QDataInstance.question))
      else
        questionsData.question.question_type == 'welcome_page' ? axiosInstance.patch(`/question-api/questionnaires/${UUID}/welcome-pages/${questionsData.question.id}/`,form_data_convertor(QDataInstance.question)) 
        : axiosInstance.patch(`/question-api/questionnaires/${UUID}/thanks-pages/${questionsData.question.id}/`,form_data_convertor(QDataInstance.question)) 

        axiosInstance.defaults.headers['Content-Type'] = 'application/json'; 
        setQuestionChangedState(false);
    }
    catch(err)
    {
      if(err.response)
      {
        QuestionDispatcher(ChangeErrorData({ actionErrorObject : err.response}))
         SavedMessage.error({
          content : Object.values(err.response.data)[0],
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
       
    }
   SetSaveButtonLoadingState(false);
   
  }
  const QuestionCreator = async () => {
    axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data'
    if(questionsData.question.media != null && typeof questionsData.question.media == 'string')
    {
      delete QDataInstance.question['media'];
    }
    try
    {
      
      if(questionsData.question.url_prefix)
      {
        SetSaveButtonLoadingState(true);
       let { data }  = await axiosInstance.post(`/question-api/questionnaires/${UUID}/${questionsData.question.url_prefix}/`,
       form_data_convertor(questionsData.question));
       setActiveQuestion({ 
        'QuestionID' : data.id ,
        'QuestionType' : data.question_type
      })
        QuestionDispatcher(finalizer({
           isQuestion :  true , 
           QuestionID : questionsData.question.id ,
            Response : data  
          }))
          axiosInstance.defaults.headers['Content-Type'] = 'application/json';
        let sorted_questions_array = QuestionsArray.map(item => {
          if(!item.question.newFace) 
          return ({ question_id : item.question.id > 10000000000 ? data.id : item.question.id ,
            new_placement : item.question.placement })
          });
          sorted_questions_array.forEach((item,index) => !item  ? sorted_questions_array.splice(index,1) : '')

        await axiosInstance.post(`/question-api/questionnaires/${UUID}/change-questions-placements/`,{
          'placements' : sorted_questions_array
        })
        QuestionDispatcher(QuestionSorter())
          }
      else
      {
        SetSaveButtonLoadingState(true);
        let { data } = questionsData.question.question_type == 'welcome_page' ? await axiosInstance.post(`/question-api/questionnaires/${UUID}/welcome-pages/`,form_data_convertor(questionsData.question)) 
        : await axiosInstance.post(`/question-api/questionnaires/${UUID}/thanks-pages/`,form_data_convertor(questionsData.question))
     
        QuestionDispatcher(finalizer({ isQuestion :  false , QuestionID : questionsData.question.id , Response : data }))
        setActiveQuestion({ 
        'QuestionID' : data.id ,
        'QuestionType' : data.question_type
      })
        InitialQuestionData.current = { question : data };

      }
      
      setQuestionChangedState(false);
    }
    catch(err)
    {
      console.group(err)
      if(err.response)
      {
        QuestionDispatcher(ChangeErrorData({ actionErrorObject : err.response}))
         SavedMessage.error({
        content :  Object.values(err.response.data)[0],
        duration : 11,
        style : {
          fontFamily : 'IRANSans',
          display : 'flex',
          alignItems : 'center',
          justifyContent : 'center',
          direction : 'rtl'
        }
      })

      // console.log(OcurredError)
      }
     
    }
    SetSaveButtonLoadingState(false);
  }
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result)
    // const updatedNestedQuestions = Array.from(nestedQuestions);
    // const [removed] = updatedNestedQuestions.splice(result.source.index, 1);
    // updatedNestedQuestions.splice(result.destination.index, 0, removed);
    // QuestionDispatcher(ChildQuestionReorder({ ParentQuestionID : GroupID , NewChildQuestion : updatedNestedQuestions }))
    // setNestedQuestions(updatedNestedQuestions);
  };
  return (
    (questionsData) ? 
    
    <QuestionItemRow childq={questionsData.question.group ? 'true' : null}
    maxheight={maxheight}
    isopen={QuestionRootOpenState ? 'true' : null}
    className={`QuestionItem${questionsData.question.id}`}>
      {contextHolder}
      <div className='design_container' style={{ width : !questionsData.question.group ? '50%' : '100%' }}> 
    <QuestionDesignItem className='question_design_item' errorocurr={OcurredError ? Object.keys(OcurredError).includes('title') ? 'active' : null : null}
     isopen={QuestionRootOpenState ? 'true' : null} ref={QuestionDesignElement}
    childq={questionsData.question.group ? 'true' : null}>     
          <QuestionItemSurface >
              <div className="question_item_info" onClick={QuestionOpenHandler} 
              {...provided?.dragHandleProps?? null}
              >
                  <DropDownQuestionButton  dropped={QuestionRootOpenState ? 'true' : null}>   
                     <Icon name='ArrowDown' />
                                                        
                  </DropDownQuestionButton>
                  { questionsData.question.question_type == 'group' &&  
                     <Icon name='GroupIcon' style={{ marginLeft : 13 }} />}
                  { questionsData.question.placement ?  <div style={{ fontWeight : 600 , whiteSpace : 'pre'}}>
                    {<>.{digitsEnToFa(questionsData.question.placement)}</>} 
                { parentPlacement &&  <span>-{digitsEnToFa(parentPlacement)}</span>  }</div> : ''}
                  <p>{questionsData.question.title?.replace(regex,"")}</p>
              </div>
              <QuestionItemButtonContainer>
                 <button onClick={() => SetDeleteQuestionState(true)}>
                      <Icon name='RedTrash' style={{ width : '16px' }} />
                  </button>
                  
                  <RemovePopup onOkay={DeleteQuestion} setDeleteState={SetDeleteQuestionState}
                  title='تمام نتایج حاصل از این سوال هم حذف خواهد شد'
                  DeleteState={DeleteQuestionState}>
                  </RemovePopup>
                  
                 {(questionsData.question.question_type != 'welcome_page' && questionsData.question.question_type != 'thanks_page') 
                 ? <button onClick={Duplicate_question}>
                    <Icon name='duplicate' style={{ width : '12px' }} />   
                  </button> : ''}
                  
                  { (questionsData.question.question_type !== 'thanks_page') && 
                  <button className='add_btn' onClick={() => AddQuestionHandler()}>
                      <Icon name='GrayAdd' style={{ width : '15.5px' }} />
                  </button>}
              </QuestionItemButtonContainer>

          </QuestionItemSurface>
          { QuestionRootOpenState ? <div className="question_item__root" draggable={false} >
            <QuestionItemActionSelector>
            <QuestionItemActionButton selected={QuestionActionState == 'view' ? 'selected' : null} className='view_question' 
            onClick={() => SetQuestionActionState('view')}>
                  <p>نمایش سوال</p>
                  <svg width="20" height="13" viewBox="0 0 20 13" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.83334 4.00462C12.0425 4.00462 13.8333 5.79549 13.8333 8.00462C13.8333 10.2138 12.0425 12.0046 9.83334 12.0046C7.6242 12.0046 5.83334 10.2138 5.83334 8.00462C5.83334 5.79549 7.6242 4.00462 9.83334 4.00462ZM9.83334 0.5C14.4469 0.5 18.4294 3.65001 19.5345 8.06439C19.635 8.4662 19.3908 8.87348 18.989 8.97406C18.5872 9.07465 18.1799 8.83045 18.0794 8.42863C17.1405 4.67796 13.7547 2 9.83334 2C5.91027 2 2.52344 4.68026 1.5862 8.43315C1.48583 8.83502 1.07869 9.07944 0.676823 8.97908C0.274952 8.87872 0.0305309 8.47158 0.130894 8.06971C1.23398 3.65272 5.21782 0.5 9.83334 0.5Z"/>
                  </svg>
            </QuestionItemActionButton>
            <QuestionItemActionButton className='setting_button' selected={QuestionActionState == 'setting' ? 'selected' : null}
             onClick={() => SetQuestionActionState('setting')}>
                  <p>تنظیمات سوال</p>
                  <svg width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0124 0.25C10.7464 0.25846 11.4775 0.343262 12.1939 0.503038C12.5067 0.572785 12.7406 0.833511 12.7761 1.15196L12.9463 2.67881C13.0233 3.37986 13.6152 3.91084 14.3209 3.91158C14.5105 3.91188 14.6982 3.87238 14.8734 3.79483L16.2741 3.17956C16.5654 3.05159 16.9057 3.12136 17.1232 3.35362C18.1354 4.43464 18.8892 5.73115 19.3279 7.14558C19.4225 7.45058 19.3137 7.78203 19.0566 7.9715L17.8151 8.88659C17.461 9.14679 17.2518 9.56001 17.2518 9.99946C17.2518 10.4389 17.461 10.8521 17.8159 11.1129L19.0585 12.0283C19.3156 12.2177 19.4246 12.5492 19.3299 12.8543C18.8914 14.2685 18.138 15.5649 17.1264 16.6461C16.9091 16.8783 16.569 16.9483 16.2777 16.8206L14.8714 16.2045C14.4691 16.0284 14.007 16.0542 13.6268 16.274C13.2466 16.4937 12.9935 16.8812 12.9452 17.3177L12.7761 18.8444C12.7413 19.1592 12.5124 19.4182 12.2043 19.4915C10.7558 19.8361 9.24673 19.8361 7.79828 19.4915C7.49015 19.4182 7.26129 19.1592 7.22643 18.8444L7.0576 17.32C7.00802 16.8843 6.75459 16.498 6.37467 16.279C5.99475 16.06 5.53345 16.0343 5.13244 16.2094L3.72582 16.8256C3.43446 16.9533 3.09428 16.8833 2.87703 16.6509C1.86487 15.5685 1.11144 14.2705 0.673445 12.8548C0.579106 12.5499 0.688106 12.2186 0.94509 12.0293L2.18842 11.1133C2.54256 10.8531 2.75172 10.4399 2.75172 10.0005C2.75172 9.56101 2.54256 9.14779 2.18796 8.88725L0.945406 7.97285C0.68804 7.78345 0.57894 7.45178 0.673612 7.14658C1.11236 5.73215 1.86619 4.43564 2.87837 3.35462C3.09584 3.12236 3.43618 3.05259 3.72749 3.18056L5.12786 3.79572C5.53081 3.97256 5.99404 3.94585 6.37601 3.72269C6.75633 3.50209 7.00953 3.11422 7.05841 2.67764L7.22849 1.15196C7.26401 0.83335 7.49811 0.572541 7.81105 0.502942C8.52832 0.34342 9.2602 0.258654 10.0124 0.25ZM9.99994 6.99995C8.34309 6.99995 6.99994 8.3431 6.99994 9.99995C6.99994 11.6568 8.34309 13 9.99994 13C11.6568 13 12.9999 11.6568 12.9999 9.99995C12.9999 8.3431 11.6568 6.99995 9.99994 6.99995Z" />
                    </svg>
                </QuestionItemActionButton>
              <QuestionItemActionButton className='write_button' selected={QuestionActionState == 'edit' ? 'selected' : null} onClick={() => SetQuestionActionState('edit')}>
                    <p>نوشتن سوال</p>
                    <svg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5577 1.04825C15.9551 -0.349357 18.221 -0.349424 19.6185 1.0481C21.0159 2.4455 21.016 4.71112 19.6187 6.10861L18.7268 7.00057L13.6661 1.93991L14.5577 1.04825ZM12.6055 3.00064L2.60767 12.9997C2.20135 13.4061 1.91574 13.9172 1.78264 14.4762L0.687052 19.0777C0.626727 19.3311 0.702163 19.5976 0.886326 19.7817C1.07049 19.9659 1.33701 20.0413 1.59037 19.981L6.19162 18.8855C6.75082 18.7523 7.2621 18.4666 7.66855 18.0601L17.6662 8.06129L12.6055 3.00064Z"/>
                    </svg>
                </QuestionItemActionButton>         
            </QuestionItemActionSelector>
            { QuestionActionState == 'edit' ? <QuestionItemSettingContainer >
                <div className="question_bold_info">
                    <QuestionItemTitleContainer >
                        <QuestionItemTitleInput value={questionsData.question.title.replace(regex,"")} 
                        onChange={(e) => QuestionDispatcher(ChangeNameHandler({ NewTitle : e.target.value , QuestionID : questionsData.question.id , QuestionChanged : IsQuestion}))}
                         type="text" placeholder='عنوان سوال' />
                    </QuestionItemTitleContainer>
                    <div className="question_type_selector">
                    <Select
                        bordered={false}
                        maxTagTextLength={6}
                        listHeight={360}
                        className='type_selector'
                        columns={2} 
                        labelInValue
                        disabled={(!questionsData.question.newFace ||
                           questionsData.question.nonquestion) ? true : false}
                        defaultValue={{
                         label : <span style={{ color : 'blue' }}>
                          {QuestionTypeComponentGenerator(questionsData.question.question_type,'active')}
                          </span>,
                         value : questionsData.question.question_type
                        }}
                        style={{ width: 120 , border : 'none' , color : 'var(--primary-color)'}}
                        dropdownStyle={{ width : '350px !important' }}
                        options={Question_types}
                        onChange={ChangeQuestionTypeHandler}
                        dropdownRender={(menu) => <div id='select-type-container'>{menu}</div>}
                      />
                    </div>
                </div>
                <QuestionDescription IsQuestion={IsQuestion} QuestionInfo={questionsData.question} QuestionDataDispatcher={QuestionDispatcher} />
                { WritingSectionProvider(questionsData.question.question_type,questionsData.question) }
            </QuestionItemSettingContainer> : QuestionActionState == 'setting' ? 
            <QuestionItemWriteContainer>
              <FileUpload QuestionInfo={questionsData.question} />
              { SettingSectionProvider(questionsData.question.question_type,questionsData.question) }
            </QuestionItemWriteContainer>
            : <PreviewMobileSizeComponent>
              <QuestionComponent mobilepreview={true} QuestionInfo={questionsData.question} />
              </PreviewMobileSizeComponent>}
            { QuestionRootOpenState ? <QuestionItemFooter savebuttonactive={!QuestionChanged ? 'active' : null} >
              <Button type='primary'
               loading={SaveButtonLoadingState} 
              onClick={questionsData.question.newFace ? QuestionCreator : QuestionPatcher}>
                ذخیره
              </Button>
              <Button danger onClick={QuestionOpenHandler}>
                <p>انصراف</p>
              </Button>

            </QuestionItemFooter> : ''}
          </div> : '' }
          
        </QuestionDesignItem>
        {questionsData.question.question_type === 'group' && ''
      //   <DragDropContext onDragEnd={handleDragEnd}>
      //     <Droppable droppableId="dropboard" type="CHILD">
      //       {(provided, snapshot) => (
      //         <div ref={provided.innerRef} {...provided.droppableProps} style={getListStyle(snapshot.isDraggingOver)}>
      //           {questionsData.question.child_questions?.map((nestedQuestion, index) => (
      //             <Draggable
      //               key={nestedQuestion.question.id}
      //               draggableId={nestedQuestion.question.id.toString()}
      //               index={index}>
      //               {(provided) => (
      //                 <div
      //                   ref={provided.innerRef}
      //                   {...provided.draggableProps}>
      //                   <QuestionItem
      //                     ActiveQuestion={ActiveQuestion}
      //                     setActiveQuestion={setActiveQuestion}
      //                     IsQuestion
      //                     UUID
      //                     provided
      //                     parentPlacement={questionsData.question.placement}
      //                     GroupID={questionsData.question.id}
      //                     question={nestedQuestion}
      //                   />
      //                 </div>
      //               )}
      //             </Draggable>
      //           ))}
      //           {provided.placeholder}
      //         </div>
      //       )}
      //     </Droppable>
      //  </DragDropContext>
          }
           </div>
       { !GroupID ?  <div className='question_preview'> 
              {QuestionRootOpenState ? <QuestionComponent QuestionInfo={questionsData.question} 
              ChildQuestion={questionsData.question.group ? 'true' : null} />
               : ''}
        </div>: ''}
    </QuestionItemRow> : ''
  )
}
