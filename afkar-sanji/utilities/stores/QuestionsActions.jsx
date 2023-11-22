import {
    AddQuestion,
    ChangeErrorData, ChildQuestionRemover, ChildQuestionReorder, ChildQuestionReplace,
    DeleteNonQuestionHandler,
    DeleteQuestionHandler, finalizer,
    QuestionSorter, SwitchIntoGroups
} from "@/utilities/stores/QuestionStore";
import {axiosInstance} from "@/utilities/axios";
import {form_data_convertor} from "@/utilities/FormData";
import {moveItem} from "@/components/QuestionnairePanel/QuestionDesignPanel";

export function shallowEqual(obj1, obj2) {
    if (obj1 === null || obj2 === null ||
        typeof obj1 !== 'object' ||
        typeof obj2 !== 'object') {
        return obj1 === obj2;
    }

    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    keys1 = keys1.filter(item =>
        item != 'placement' && item != 'child_questions' && item != 'group');
    keys2 = keys2.filter(item => item != 'placement' && item != 'child_questions' && item != 'group');

    if (keys1.length !== keys2.length) return false;

    return keys1.every(key => {

        const val1 = obj1[key];
        const val2 = obj2[key];

        return typeof val1 === 'object' && typeof val2 === 'object'
            ? shallowEqual(val1, val2)
            : val1 === val2;
    });
}
export const DeleteQuestion = async (questionsData , UUID , IsQuestion , QuestionDispatcher , SetDeleteQuestionState , QuestionsReload , SetQuestionsReload) => {
    (questionsData.question.question_type == 'welcome_page' ||
        questionsData.question.question_type == 'thanks_page') ?
        QuestionDispatcher(DeleteNonQuestionHandler({ NonQuestionType : questionsData.question.question_type }))
        : QuestionDispatcher((DeleteQuestionHandler({
            QuestionID : questionsData.question.id ,
            isQuestion : IsQuestion ,
            groupID : questionsData.question.group
        })))

    if(!questionsData.question.newFace)
    {
        if(questionsData.question.url_prefix)
            await axiosInstance.delete(`/question-api/questionnaires/${UUID}/delete-question/?id=${questionsData.question.id}`);
        else
            questionsData.question.question_type == 'welcome_page' ?
                await axiosInstance.delete(`/question-api/questionnaires/${UUID}/welcome-pages/${questionsData.question.id}/`)
                : await axiosInstance.delete(`/question-api/questionnaires/${UUID}/thanks-pages/${questionsData.question.id}/`)
    }
    QuestionDispatcher(QuestionSorter());

    SetDeleteQuestionState(false);
    SetQuestionsReload(!QuestionsReload)
}
export const QuestionOpenHandler = (setQuestionBoxHeight ,QuestionRootOpenState , SetQuestionRootOpenState , setActiveQuestion , questionsData , setQuestionTopDis) => {
    SetQuestionRootOpenState(!QuestionRootOpenState);

    if(!QuestionRootOpenState)
    {
        setActiveQuestion({
            'QuestionID' : questionsData.question.id ,
            'QuestionType' : questionsData.question.question_type
        })
        // console.log(document.querySelector('.search_box_container').getBoundingClientRect().top - 8.8);

        setQuestionTopDis(document.querySelector('.search_box_container').getBoundingClientRect().top - 8.8)

        document.querySelector(`.QuestionItem${questionsData.question.id}`)?.scrollIntoView({ behavior : 'smooth' });
        setQuestionBoxHeight(300)
        // setTimeout(() => {
        //     // console.log(document.querySelector(`.QuestionItem${questionsData.question.id} .question_item__root`).clientHeight)
        //     setQuestionBoxHeight(document.querySelector(`.QuestionItem${questionsData.question.id} .question_item__root`).clientHeight + 80)
        // },300)
    }

    else
    {
        setActiveQuestion(null)
        setQuestionBoxHeight(56)
    }

}

export const QuestionPatcher = async (SetSaveButtonLoadingState , UUID , questionsData , QuestionDispatcher , SavedMessage , setQuestionChangedState,Auth) => {
    SetSaveButtonLoadingState(true);
    let QDataInstance = JSON.parse(JSON.stringify(questionsData))
    QDataInstance.question.media = questionsData.question.media;

    if(questionsData.question?.options?.find(item => !item.text))
    {
        let ErrorData = [];
        questionsData.question?.options?.forEach(item => {
            if(!item.text)
                ErrorData.push({ optionID : item.id })
        })
        QuestionDispatcher(ChangeErrorData({ actionErrorObject : {
                data : ErrorData
            },
            questionID : questionsData?.question?.id
        }))
        SavedMessage.error({
            content : 'متن گزینه نمیتواند خالی باشد',
            duration : 4,
            style : {
                fontFamily : 'IRANSans',
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
                direction : 'rtl'
            }
        })
        SetSaveButtonLoadingState(false);
        return;
    }
    if(typeof questionsData?.question?.media == 'string' && questionsData?.question?.media?.length)
    {
        delete QDataInstance.question['media'];
        // console.log(questionsData,'check')
    }
    axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';
    try
    {
        if(questionsData.question.url_prefix)
            await axiosInstance.patch(`/${Auth.reqRole}/${UUID}/${questionsData.question.url_prefix}/${questionsData.question.id}/`,form_data_convertor(QDataInstance.question))
        else
            questionsData.question.question_type == 'welcome_page' ? axiosInstance.patch(`/${Auth.reqRole}/${UUID}/welcome-pages/${questionsData.question.id}/`,form_data_convertor(QDataInstance.question))
                : axiosInstance.patch(`/${Auth.reqRole}/${UUID}/thanks-pages/${questionsData.question.id}/`,form_data_convertor(QDataInstance.question))

        axiosInstance.defaults.headers['Content-Type'] = 'application/json';
        setQuestionChangedState(false);
    }
    catch(err)
    {
        if(err?.response?.status == 401)
            return
        if(err?.response?.status === 500) {
            SavedMessage.error({
                content : 'خطای داخلی سرور'
            })
            SetSaveButtonLoadingState(false)
            return
        }
        if(err.response)
        {
            QuestionDispatcher(ChangeErrorData({
                actionErrorObject : err.response ,
                questionID : questionsData?.question.id
            }))
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


export const QuestionCreator = async (questionsData , QuestionsArray , setQuestionChangedState , InitialQuestionData , UUID  , SetSaveButtonLoadingState , QuestionDispatcher , SavedMessage , setActiveQuestion,Auth) => {
    let QDataInstance = JSON.parse(JSON.stringify(questionsData))
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
            if((questionsData.question?.question_type == 'optional' ||
                    questionsData.question?.question_type == 'drop_down' ||
                    questionsData.question?.question_type == 'sort') &&
                questionsData.question?.options?.find(item => !item.text))
            {
                let ErrorData = [];
                questionsData.question?.options?.forEach(item => {
                    if(!item.text)
                        ErrorData.push({ optionID : item.id })
                })
                QuestionDispatcher(ChangeErrorData({ actionErrorObject : {
                        data : ErrorData
                    },
                    questionID : questionsData?.question?.id
                }))
                SavedMessage.error({
                    content : 'متن گزینه نمیتواند خالی باشد',
                    duration : 4,
                    style : {
                        fontFamily : 'IRANSans',
                        display : 'flex',
                        alignItems : 'center',
                        justifyContent : 'center',
                        direction : 'rtl'
                    }
                })
                SetSaveButtonLoadingState(false);
                return;
            }

            let { data }  = await axiosInstance.post(`/${Auth.reqRole}/${UUID}/${questionsData.question.url_prefix}/`,
                form_data_convertor(questionsData.question));
            setActiveQuestion({
                'QuestionID' : data.id ,
                'QuestionType' : data.question_type
            })
            QuestionDispatcher(finalizer({
                isQuestion :  true ,
                QuestionID : questionsData.question.id ,
                Response : data  ,
                group : questionsData.question.group
            }))
            axiosInstance.defaults.headers['Content-Type'] = 'application/json';
            let sorted_questions_array = QuestionsArray.map(item => {
                if(!item.question.newFace)
                    return ({ question_id : item.question.id > 10000000000 ? data.id : item.question.id ,
                        new_placement : item.question.placement })
            });
            sorted_questions_array.forEach((item,index) => !item  ? sorted_questions_array.splice(index,1) : '')

            await axiosInstance.post(`/${Auth.reqRole}/${UUID}/change-questions-placements/`,{
                'placements' : sorted_questions_array
            })
            QuestionDispatcher(QuestionSorter())
        }
        else
        {
            SetSaveButtonLoadingState(true);
            let { data } = questionsData.question.question_type == 'welcome_page' ? await axiosInstance.post(`/${Auth.reqRole}/${UUID}/welcome-pages/`,form_data_convertor(questionsData.question))
                : await axiosInstance.post(`/${Auth.reqRole}/${UUID}/thanks-pages/`,form_data_convertor(questionsData.question))

            QuestionDispatcher(finalizer({
                isQuestion :  false ,
                QuestionID : questionsData.question.id ,
                Response : data  ,

            }))
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
        if(err?.response?.status == 401)
            return
        if(err?.response?.status === 500) {
            SavedMessage.error({
                content : 'خطای داخلی سرور'
            })
            SetSaveButtonLoadingState(false)
            return
        }
        if(err.response)
        {
            QuestionDispatcher(ChangeErrorData({
                actionErrorObject : err.response ,
                questionID : questionsData?.question.id
            }))
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
        }
    }
    SetSaveButtonLoadingState(false);
}

export const AddQuestionHandler = (setQuestionBoxHeight,RandomIdGenerator,questionsData,QuestionDispatcher,setActiveQuestion) => {
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
    // setTimeout(() => {
    //     // setQuestionBoxHeight(document.querySelector(`.QuestionItem${newQuestionId} .question_item__root`)?.clientHeight + 80)
    //     console.log(document.querySelector(`.QuestionItem${newQuestionId} .question_item__root`),newQuestionId)
    //     setQuestionBoxHeight(300)
    // },300)
    // setQuestionBoxHeight(document.querySelector(`.QuestionItem${newQuestionId} .question_item__root`).clientHeight + 80)
}

export const SortableConfigGenerator = (childQuestion,UUID,QuestionDispatcher,SavedMessage,QuestionsArray,Auth) => {
    return  {
        animation: 100,
        group: 'nested',
        easing: "cubic-bezier(1, 0, 0, 1)",
        // fallbackOnBody: true,
        swapThreshold: 0.65,
        ghostClass: "ghost",
        handle : '.question_surface',
        onUpdate: function (/**Event*/e) {
            // same properties as onEnd

        },
        onEnd: async function (/**Event*/evt) {
            var itemEl = evt.item;  // dragged HTMLElement
            if(evt.to.getAttribute('class') == 'main_container')
            {
                try {
                    let copiedChildQuestion = JSON.parse(JSON.stringify(childQuestion));
                    let questionID = childQuestion[evt.oldDraggableIndex]?.question?.id;
                    let questionParentID = childQuestion[evt.oldDraggableIndex]?.question?.group;
                    let AllQuestions = JSON.parse(JSON.stringify(QuestionsArray));

                    QuestionDispatcher(ChildQuestionRemover({
                        group : childQuestion[evt.oldDraggableIndex]?.question?.group ,
                        questionIndex : evt.oldDraggableIndex ,
                        questionNewIndex : evt.newDraggableIndex
                    }))
                    axiosInstance.defaults.headers['Content-Type'] = 'application/json';
                    if(!childQuestion[evt.oldDraggableIndex]?.question?.newFace)
                        await axiosInstance.patch(`/${Auth.reqRole}/${UUID}/${childQuestion[evt.oldDraggableIndex]?.question?.url_prefix}/
              ${childQuestion[evt.oldDraggableIndex]?.question?.id}`
                            ,{ group : null })
                    AllQuestions.splice(evt.newDraggableIndex , 0, copiedChildQuestion[evt.oldDraggableIndex])

                    let reOrderedArray =  AllQuestions.map((item,index) => {
                        if(item.question && !item.question.newFace)
                            return { question_id : item.question.id , new_placement : index + 1}
                    })

                    reOrderedArray.forEach((item,index) => !item  ? reOrderedArray.splice(index,1) : '');
                    if(reOrderedArray.includes(undefined) || reOrderedArray.includes(null))
                        return

                    await axiosInstance.post(`/${Auth.reqRole}/${UUID}/change-questions-placements/`,{
                        'placements' : reOrderedArray
                    })

                    QuestionDispatcher(QuestionSorter())
                    QuestionDispatcher(ChildQuestionReorder({ ParentQuestionID : questionParentID }))
                    //  QuestionnaireReloader();
                }
                catch(err)
                {
                    console.log(err)
                    SavedMessage.error({
                        content : 'مشکل داری ؟ مشکل داری؟',
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
            else if(evt.to.getAttribute('id'))
            {
                if(childQuestion[evt.oldDraggableIndex]?.question?.group ==
                    evt.to.getAttribute('id').split('group-container-')[1])
                {

                    let newArray = [...childQuestion];
                    newArray = moveItem(newArray,evt.oldDraggableIndex,evt.newDraggableIndex)
                    // [newArray[evt.oldDraggableIndex], newArray[evt.newDraggableIndex]] = [newArray[evt.newDraggableIndex], newArray[evt.oldDraggableIndex]];

                    QuestionDispatcher(ChildQuestionReplace({
                        newChildrenArray : newArray ,
                        groupID : evt.to.getAttribute('id').split('group-container-')[1]
                    }))
                    console.log(newArray)

                    let ReorderArray = [ {
                        question_id : evt.to.getAttribute('id').split('group-container-')[1] ,
                        new_placement : QuestionsArray.find(item => item.question.id == evt.to.getAttribute('id').split('group-container-')[1]).question.placement
                    }];
                    newArray.forEach((item,index) => {
                        if(item.question && !item.question.newFace)
                            ReorderArray.push({ question_id : item.question.id , new_placement : index + 1 })
                    })
                    axiosInstance.defaults.headers['Content-Type'] = 'application/json';
                    await axiosInstance.post(`/${Auth.reqRole}/${UUID}/change-questions-placements/`,{
                        'placements' : ReorderArray
                    })
                }
                else
                {

                    // evt.oldDraggableIndex  evt.newDraggableIndex
                    let copiedChild = [...childQuestion];
                    let newGroup = evt.to.getAttribute('id').split('group-container-')[1];
                    let oldGroup = evt.from.getAttribute('id').split('group-container-')[1]
                    let questionID = evt.clone.firstElementChild.className.split('QuestionItem')[1];
                    let newGroupQuestion = JSON.parse(JSON.stringify(QuestionsArray.find(item => item.question.id == newGroup)));
                    let SwitchedQuestion =  JSON.parse(JSON.stringify(QuestionsArray.find(item => item.question.id == oldGroup).
                    question.child_questions.find(item => item.question.id == questionID)));
                    QuestionDispatcher(SwitchIntoGroups({
                        newGroup : newGroup ,
                        oldGroup : oldGroup ,
                        questionID : questionID ,
                        oldIndex : evt.oldDraggableIndex ,
                        newIndex : evt.newDraggableIndex
                    }))
                    let NewGroupOrder = [];
                    newGroupQuestion.question.child_questions.splice(evt.newDraggableIndex , 0 , SwitchedQuestion)
                    // moveItem(newGroupQuestion.question.child_questions)

                    NewGroupOrder.push({
                        question_id : newGroupQuestion.question.id ,
                        new_placement : newGroupQuestion.question.placement
                    })
                    newGroupQuestion.question.child_questions.forEach(ChildItem => {
                        if(!ChildItem.question.newFace)
                            NewGroupOrder.push({
                                question_id : ChildItem.question.id ,
                                new_placement : ChildItem.question.placement
                            })
                    })
                    await axiosInstance.post(`/${Auth.reqRole}/${UUID}/change-questions-placements/`,{
                        'placements' : NewGroupOrder
                    })
                    // console.log(QuestionsArray.find(item => item.question.id == newGroup))
                    // QuestionsArray.find(item => item.question.id == newGroup)
                    if(!copiedChild[evt.oldDraggableIndex]?.question?.newFace)
                        await axiosInstance.patch(`/${Auth.reqRole}/${UUID}/${copiedChild[evt.oldDraggableIndex]?.question?.url_prefix}/
          ${childQuestion[evt.oldDraggableIndex]?.question?.id}`
                            ,{ group : newGroup })
                    // SwitchIntoGroups
                    // console.log(evt.clone.firstElementChild.className.split('QuestionItem')[1])
                    // console.log(QuestionsArray.find(item => item.question.id == newGroup))
                }
            }
            else
            {
                let copiedChild = [...childQuestion];
                let oldGroup = evt.from.getAttribute('id').split('group-container-')[1]
                let newGroup = evt.to?.parentElement?.parentElement?.classList[2].split('QuestionItem')[1];
                let questionID = evt.clone.firstElementChild.className.split('QuestionItem')[1];
                QuestionDispatcher(SwitchIntoGroups({
                    newGroup : newGroup ,
                    oldGroup : oldGroup ,
                    questionID : questionID ,
                    oldIndex : evt.oldDraggableIndex ,
                    newIndex : evt.newDraggableIndex
                }))
                if(!copiedChild[evt.oldDraggableIndex]?.question?.newFace)
                    await axiosInstance.patch(`/${Auth.reqRole}/${UUID}/${copiedChild[evt.oldDraggableIndex]?.question?.url_prefix}/
            ${childQuestion[evt.oldDraggableIndex]?.question?.id}`
                        ,{ group : newGroup })

            }
        },
        onMove : event => {
            if(event.to.className.includes('main_container'))
            {
                document.querySelectorAll('.nested_dnd_message').forEach(item => {
                    item.style.position = 'unset';
                    item.firstElementChild.style.display = 'block'
                })
                document.querySelector(`#${event.dragged.getAttribute('id')} .question_design_item`).setAttribute('style','width : 100% !important')

                event.dragged.firstElementChild.firstElementChild.style.width = '50%'
            }
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
            // console.log(event)
            return true;
        }
    };
}