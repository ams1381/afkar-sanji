import { connect } from 'react-redux'
import { configureStore , createSlice , current, getDefaultMiddleware } from '@reduxjs/toolkit'

var InitialValue = {
    nonQuestionData : [],
    data : [],
    Error : []
}
const QuestionSlice =  createSlice({
    name : 'QuestionsSlice',
    initialState : InitialValue,
    reducers : {
        initialQuestionsSetter : (state,action) => {
            // state.data = action.payload.map(item => item.question ? {/ question : item.question } : '');
            state.data.length = 0;
            action.payload?.forEach(item => {
                if(item.question)
                    state.data.push({ question : item.question })
            })  
        },
        ChangeErrorData : (state,action) => {
            const { actionErrorObject , questionID } = action.payload;
            console.log(actionErrorObject , questionID)
            if(!state.Error.find(item => item.qid == questionID))
            {
                state.Error.push({
                err_object : actionErrorObject?.data , 
                qid : questionID
                });
            }
            else 
            {
                state.Error.find(item => item.qid == questionID).err_object = actionErrorObject?.data;
                state.Error.find(item => item.qid == questionID).qid = questionID;
            }
            // console.log()
        },
        DuplicateQuestionHandler : (state , action) =>{
            const { QuestionID , CopiedQuestionID, group } = action.payload;
            
            
            if(group)
            {
                let DuplicatedElement = JSON.parse(JSON.stringify(state.data.find(item => item.question.id == group).question.child_questions
                .find(item => item.question.id == QuestionID)));

                let DuplicatedIndex = state.data.find(item => item.question.id == group).question.child_questions
                .findIndex(item => item.question.id == QuestionID);
                DuplicatedElement.question.id = CopiedQuestionID;

                state.data.find(item => item.question.id == group).question.child_questions.splice(DuplicatedIndex + 1, 0, DuplicatedElement);
                // state.data.find(item => item.question.id == group).question.child_questions[[DuplicatedIndex + 1]].question.id = CopiedQuestionID;
                state.data.find(item => item.question.id == group).question.child_questions[DuplicatedIndex + 1].question.newFace = true;
                state.data.find(item => item.question.id == group).question.child_questions[DuplicatedIndex + 1].question.duplicated = true;
                state.data.find(item => item.question.id == group).question.child_questions[DuplicatedIndex + 1].question.is_finalized = false;

                // console.log(JSON.parse(JSON.stringify(state.data.find(item => item.question.id == group).question.child_questions)))
            }
            else 
            {
                let DuplicatedElement = JSON.parse(JSON.stringify(state.data)).find(item => item.question.id == QuestionID)
                let DuplicatedIndex = JSON.parse(JSON.stringify(state.data)).findIndex(item => item.question.id == QuestionID);
                state.data.splice(DuplicatedIndex + 1, 0, DuplicatedElement);
                state.data[[DuplicatedIndex + 1]].question.id = CopiedQuestionID;
                state.data[DuplicatedIndex + 1].question.newFace = true;
                state.data[DuplicatedIndex + 1].question.duplicated = true;
                state.data[DuplicatedIndex + 1].question.is_finalized = false;
            }
            
        },
        DeleteQuestionHandler : (state , action) => {
            const { QuestionID , isQuestion ,groupID } = action.payload;
            if(isQuestion)
            {
                if(groupID)
                {
                    let DeletedQuestionIndex = state.data.find(item => item.question.id == groupID)
                    .question.child_questions.findIndex(item => item.question.id == QuestionID);
 
                     state.data.find(item => item?.question.id == groupID).question.child_questions
                    .splice(DeletedQuestionIndex , 1)

                }
                else
                {
                    let DeletedQuestionIndex = state.data.findIndex(item => item.question.id == QuestionID);
                    state.data.splice(DeletedQuestionIndex , 1);
                }
            }
            else
            {
                let DeletedNonQuestionIndex = state.nonQuestionData.findIndex(item => item.question.id == QuestionID);
                state.data.splice(DeletedNonQuestionIndex , 1);
            }
        } ,
        DeleteNonQuestionHandler : (state , action) => {
            const { NonQuestionType } = action.payload;
            NonQuestionType == 'welcome_page' ? state.nonQuestionData[0].question = null
            : state.nonQuestionData[1].question = null

        },
        finalizer : (state , action) => {
            const { isQuestion , QuestionID , Response , group } = action.payload;
            
            if(isQuestion)
            {
                if(!group)
                    state.data.find(item => item.question.id == QuestionID).question = Response;
                // if(state.data.find(item => item.question && item.question.id == QuestionID)){
                //     // console.log(JSON.parse(JSON.stringify(state.data.find(item => item.question.id == QuestionID).question)),Response)
                    
                // }
                else
                {
                    console.log(Response, group)
                    state.data.find(item => item.question.id == group).question.child_questions
                        .find(item => item.question.id == QuestionID).question = Response;
                    // state.data.forEach(item => item.question.child_questions ?
                    //     item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                    //     .question = Response : '') 
                }
                
            }
            else
            {
                state.nonQuestionData.find(item => (item.question && item.question.id == QuestionID)).question.newFace = null;
                state.nonQuestionData.find(item => (item.question && item.question.id == QuestionID)).question = Response;
            }
            
        } ,
        QuestionSorter : (state , action) => {
            // state.data.forEach((item,index) => !item.question ? state.data.splice(index,1) : '')
            state.data.forEach((item,index) => item.question.placement = index + 1)
        },
        QuestionReorder : (state , action) => {
            const { newPlacementArray } = action.payload;
            state.data = newPlacementArray;
        },
        AddWelcome : (state , action)  => {
            const { QuestionnaireID , WelcomeID  } = action.payload;
            state.nonQuestionData.shift();
            state.nonQuestionData.unshift({ question : {
                title : 'خوش آمدید',
                description : null,
                question_type: "welcome_page",
                media: null,
                button_text: "شروع",
                button_shape: "round",
                is_solid_button: false,
                questionnaire : QuestionnaireID,
                id : WelcomeID,
                newFace : true,
                nonquestion : true
            }})
        },
        AddThanks : (state , action) => {
            const { QuestionnaireID , ThanksID } = action.payload;
            state.nonQuestionData.pop();
            state.nonQuestionData.push({ question : {
                title: "صفحه ی تشکر",
                description: null,
                question_type: "thanks_page",
                media: null,
                is_solid_button: false,
                questionnaire : QuestionnaireID,
                id : ThanksID,
                newFace : true,
                nonquestion : true
            }})
        },
        NonQuestionSetter : (state, action) => {
            state.nonQuestionData = action.payload
        },
        ChangeNameHandler : (state, action) => {
            const { QuestionID , NewTitle , QuestionChanged , group } = action.payload;
            // delete state.Error?.title;
            state.Error = state.Error?.filter(item => item.qid != QuestionID)
            if(QuestionChanged) 
            {
              if(!group)
                state.data.find(item => item.question.id == QuestionID).question.title = NewTitle
              else
              {
                state.data.find(item => item.question.id == group).question.child_questions
                .find(item => item.question.id == QuestionID).question.title = NewTitle
              }
            }
            
            else
                state.nonQuestionData.find(item => (item.question && item.question.id == QuestionID)).question.title = NewTitle
        },
        ChangeDescriptionHandler : (state , action) => {
            const { QuestionID , NewDesc , QuestionChanged , group} = action.payload;
            if(QuestionChanged) 
            {
                if(!group)
                {
                   state.data.find(item => item.question.id == QuestionID).question.description = NewDesc 
                }
                else
                    state.data.find(item => item.question.id == group).question.child_questions
                        .find(item => item.question.id == QuestionID).question.description = NewDesc;
            }
            else
                state.nonQuestionData.find(item => (item.question && item.question.id == QuestionID)).question.description = NewDesc
        },
        ChangeToggleHandler : (state, action) => {
            const  { QuestionID , ToggleName , ToggleValue , notQuestion , group } = action.payload;
            if(notQuestion)
            {
                state.nonQuestionData.find(item => item?.question?.id == QuestionID).question[ToggleName] = ToggleValue;
            }
            else
            {
                // state.data.find(item => item.question.id == QuestionID) ?
                if(!group)
                    state.data.find(item => item.question.id == QuestionID).question[ToggleName] = ToggleValue
                else 
                {
                    state.data.find(item => item.question.id == group).question
                    .child_questions.find(item => item.question.id == QuestionID).question[ToggleName] = ToggleValue;
                }

            }
            
        },
        ChangeMinOrMaxAnswerHandler : (state, action) => {
            const  { QuestionID , MinMaxName , MinMaxValue , group } = action.payload;
            if(state.Error && state.Error[MinMaxName])
            {
                // delete  state.Error[MinMaxName];
                state.Error = state.Error.filter(item => item.quid != QuestionID);
                // console.log(JSON.parse(JSON.stringify(state.Error)))
            }
            if(!group)
            {
               state.data.find(item => item.question.id == QuestionID).question[MinMaxName] = MinMaxValue  
            }
            // state.data.find(item => item.question.id == QuestionID) ? 
            else 
            {
                state.data.find(item => item.question.id == group).question.child_questions.
                find(ChildItem => ChildItem.question.id == QuestionID).question[MinMaxName] = MinMaxValue;
                // state.data.forEach(item => item.question.child_questions ?
                // item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                // .question[MinMaxName] = MinMaxValue : '')
            }
            // :
            
        },
        ChangeDegreeShapeHandler : (state, action) => {
            const  { QuestionID , NewIconName , NewShape  } = action.payload;
            if(state.data.find(item => item.question.id == QuestionID))
            {
                state.data.find(item => item.question.id == QuestionID).question.shape = NewShape;
                state.data.find(item => item.question.id == QuestionID).question.shapeIcon = NewIconName;
            }
            else
            {
                state.data.forEach(item => item.question.child_questions ?
                    item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                    .question.shape = NewShape : '')
                state.data.forEach(item => item.question.child_questions ?
                    item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                    .question.shapeIcon = NewIconName : '')
            }
        },
        ChangeDegreeHandler : (state, action) => {
            const  { QuestionID , DegreeValue , group } = action.payload;
            if(!group)
            {
                state.data.find(item => item.question.id == QuestionID).question.max = DegreeValue
            }
            else 
            {
                state.data.find(item => item.question.id == group).question.child_questions
                .find(item => item.question.id == QuestionID).question.max = DegreeValue;
            }
            // state.data.find(item => item.question.id == QuestionID) ?
            
            // : state.data.forEach(item => item.question.child_questions ?
            //     item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
            //     .question.max = DegreeValue : '')
        },
        OptionModifier : (state, action) => {
            const  { QuestionID , OptionID , OptionText , group } = action.payload;

            if(!group)
            {
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.options.find
                (item => item.id == OptionID).text = OptionText
            }
            // state.data.find(questionItem => questionItem.question.id == QuestionID) ? 
            else
            {
                state.data.find(questionItem => questionItem.question.id == group).question.child_questions
                .find(item => item.question.id == QuestionID).question.options
                .find(optionItem => optionItem.id == OptionID).text = OptionText;
            }
            // : state.data.forEach(item => item.question.child_questions ?
            // item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
            // .question.options.find
            // (item => item.id == OptionID).text = OptionText : '')
        },
        OptionAdder : (state, action) => {
            const  { QuestionID , OptionID , NewOptionID , group , OptionText , newOption} = action.payload;
            if(OptionID)
            {
                // if(state.data.find(questionItem => questionItem.question.id == QuestionID))
                if(!group)
                {
                    state.Error
                    let DuplicatedOption = JSON.parse(JSON.stringify(state.data)).find(item => item.question.id == QuestionID).question.options.find(OptionItem => OptionItem.id == OptionID)
                    let DuplicatedIndex = JSON.parse(JSON.stringify(state.data)).find(item => item.question.id == QuestionID).question.options.findIndex(OptionItem => OptionItem.id == OptionID)

                    state.data.find(questionItem => questionItem.question.id == QuestionID).question.options.splice(DuplicatedIndex + 1, 0, DuplicatedOption);
                    state.data.find(questionItem => questionItem.question.id == QuestionID).question.options[DuplicatedIndex + 1].text = OptionText;
                    state.data.find(questionItem => questionItem.question.id == QuestionID).question.options[DuplicatedIndex + 1].id = NewOptionID;
                    state.data.find(questionItem => questionItem.question.id == QuestionID).question.options[DuplicatedIndex + 1].newOption = newOption;

                
                }
                else
                {
                    // let DuplicatedOption = JSON.parse(JSON.stringify(state.data)).forEach(item => item.question.child_questions ?
                    //     item.question.child_questions.find(child_item => child_item.question.id == QuestionID).question.options.find(OptionItem => OptionItem.id == OptionID) : '');
                    let DuplicatedOption = JSON.parse(JSON.stringify(state.data))?.find(item => item.question.id == group).question.child_questions.find(item => item.question.id == QuestionID)
                    .question.options.find(OptionItem => OptionItem.id == OptionID);

                    
                    // // let DuplicatedIndex = JSON.parse(JSON.stringify(state.data)).forEach(item => item.question.child_questions ?
                    // //     item.question.child_questions.find(child_item => child_item.question.id == QuestionID).question.options.findIndex(OptionItem => OptionItem.id == OptionID) : '');

                    let DuplicatedIndex = JSON.parse(JSON.stringify(state.data))?.find(item => item.question.id == group).question.child_questions.find(item => item.question.id == QuestionID)
                    .question.options.findIndex(OptionItem => OptionItem.id == OptionID)

                    const foundGroup = state.data.find(item => item.question.id === group);
                    const childQuestions = foundGroup?.question.child_questions;
                    const foundChildQuestion = childQuestions?.find(item => item?.question?.id);
                    // console.log(JSON.parse(JSON.stringity(foundGroup)),
              
                    if (foundChildQuestion) {

                    // console.log(DuplicatedOption , DuplicatedIndex)
                    const options = foundChildQuestion.question.options;

                    // Insert the duplicated option at the specified index
                    options.splice(DuplicatedIndex + 1, 0, DuplicatedOption);

                    const targetOption = options.find((item, index) => index === DuplicatedIndex + 1);
                    state.data.find(item => item.question.id == group).question.child_questions
                    .find(item => item.question.id == QuestionID).question.options.splice(DuplicatedIndex + 1, 0, DuplicatedOption);
                    // console.log(DuplicatedOption , DuplicatedIndex)
                    // Update the text and ID for the duplicated option
                    if (targetOption) {
                        targetOption.text = '';
                        targetOption.id = NewOptionID;
                        targetOption.newOption = newOption;
                    }
                    }
  
                }
            }
            else
            {
                if(!group)
                    // console.log(JSON.parse(JSON.stringify(state.data)).find(item => item.question.id ==))
                    state.data.find(questionItem => questionItem.question.id == QuestionID).question.options.push({
                        id : NewOptionID ,
                        text : OptionText , 
                        newOption : newOption,
                })
                else 
                {
                    state.data.find(questionItem => questionItem.question.id == group).question.child_questions
                    .find(item => item.question.id == QuestionID).question.options.push({
                        id : NewOptionID ,
                        text : OptionText,
                        newOption : newOption
                    })
                }
            }
                
        },
        OptionRemover : (state, action) => {
            const  { QuestionID , OptionID , group } = action.payload;
            if(!group)
            {
              let Option_index = JSON.parse(JSON.stringify(state.data))
              .find(questionItem => questionItem.question.id == QuestionID).question.options
              .findIndex(item => item.id == OptionID);
             
              state.data.find(questionItem => questionItem.question.id == QuestionID).question.options
              .splice(Option_index,1);
            }
            else 
            {
                let Option_index = JSON.parse(JSON.stringify(state.data))
                .find(questionItem => questionItem.question.id == group).question.child_questions
                .find(item => item.question.id == QuestionID).question.options
                .findIndex(item => item.id == OptionID);

                state.data.find(questionItem => questionItem.question.id == group).question.child_questions.
                find(item => item.question.id == QuestionID).question.options
                .splice(Option_index,1);
            }
        },
        OptionRemoverByText : (state, action) => {
            const  { QuestionID , OptionText , group} = action.payload;
            if(!group)
            {
                let Option_index = JSON.parse(JSON.stringify(state.data)).find(questionItem => questionItem.question.id == QuestionID).question.options.findIndex(item => item.text == OptionText);
                if(Option_index == -1)
                    return
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.options.splice(Option_index,1);
            }
            else
            {
                let Option_index = JSON.parse(JSON.stringify(state.data)).find(item => item.question.id == group)
                .question.child_questions.find(ChildQuestion => ChildQuestion.question.id == QuestionID).question.options
                .findIndex(item => item.text == OptionText);

                state.data.find(item => item.question.id == group).question.child_questions
                .find(ChildQuestion => ChildQuestion.question.id == QuestionID).question.options.splice(Option_index , 1);

            }
        },
        OptionsAlphaBeticalSorter : (state, action) => {
            const  { QuestionID , group} = action.payload;
            if(state.data.find(questionItem => questionItem.question.id == QuestionID))
            {
                let SortedOptions = JSON.parse(JSON.stringify(state.data)).find(questionItem => questionItem.question.id == QuestionID).question.options
                .sort((a,b) => a.text.localeCompare(b.text));
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.options = SortedOptions;
            }
            else
            {
                // let SortedOptions = JSON.parse(JSON.stringify(state.data)).forEach(item => item.question.child_questions ?
                //     item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                //     .question.options.sort((a,b) => a.text.localeCompare(b.text))  : '')
                // let SortedOptions = JSON.parse(JSON.stringify(state.data)).find(item = > item.question.id == group).child_questions
                // .find(item => item.question.id == QuestionID).question.options.sort((a,b) => a.text.lcaleCompare(b.text));

                state.data.find(item => item.question.id == group).question.child_questions
                .find(item => item.question.id == QuestionID).question.options.sort((a,b) => a.text.localeCompare(b.text));
                
                // state.data.forEach(item => item.question.child_questions ?
                //     item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                //     .question.options = SortedOptions  : '')
            }
        }
        ,ChangeLabelHandler : (state, action) => {
            const  { QuestionID , Label , LabelValue , group } = action.payload;
            if(!group)
                state.data.find(questionItem => questionItem.question.id == QuestionID).question[Label] = LabelValue
            else
                state.data.find(questionItem => questionItem.question.id == group).question.child_questions
                .find(item => item.question.id == QuestionID).question[Label] = LabelValue
            // state.data.forEach(item => item.question.child_questions ?
            //     item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
            //     .question[Label] = LabelValue  : '')
        },
        AddQuestion : (state, action) => {
            
            const { TopQuestionID , AddedQuestionID , unshiftQuestion , ParentQuestion} = action.payload;
            let initialQuestionData =  { question : {
                title : 'سوال جدید',
                description : null,
                options : [
                    { id : Date.now() , text : null },
                    { id : Date.now() + 1 , text : null }
                ],
                show_number : false,
                id : AddedQuestionID,
                placement : 1,
                is_required : null,
                max : null,
                additional_options : false,
                url_prefix: "optional-questions",
                media: null,
                is_vertical: false,
                question_type : 'optional',
                multiple_choice: false,
                button_text : 'test',
                volume_unit : 'mb',
                all_options: false,
                group : null,
                newFace : true,
                pattern : 'free',
                answer_template : 'متن آزاد',
                nothing_selected: false,
                other_options: false,
                is_alphabetic_order : false,
                is_random_options : false,
                max_selected_options : null,
                min_selected_options : null,
                shape : 'S',
            }}
            if(TopQuestionID && state.data.length)
            {
                if(state.data.find(questionItem => questionItem.question.id == TopQuestionID))
                {
                    let TopQuestionIndex = JSON.parse(JSON.stringify(state.data)).
                    findIndex(item => (item.question && item.question.id == TopQuestionID));
                    initialQuestionData.question.placement = TopQuestionIndex + 1;
                    state.data.splice(TopQuestionIndex + 1, 0,initialQuestionData);
                }
                else if(ParentQuestion)
                {
                    let TopQuestionIndex = state.data.find(item => item.question.id == ParentQuestion).question.child_questions
                    .findIndex(item => item.question.id == TopQuestionID);

                    initialQuestionData.question.placement = TopQuestionIndex + 1;
                    initialQuestionData.question.group = ParentQuestion;
                    state.data.find(item => item.question.id == ParentQuestion)
                    .question.child_questions.splice(TopQuestionIndex + 1 ,0,initialQuestionData)

                }
            }
            else
            {
                initialQuestionData.question.placement = 1;
                unshiftQuestion ? state.data.unshift(initialQuestionData)
                : state.data.push(initialQuestionData);
            }
        },
        ChangeQuestionType : (state , action) => {
            const { QuestionID , newType , Prefix_url , group} = action.payload;
            let newMin , newMax;
            switch(newType)
            {
                case 'number_answer':
                    newMin = null;
                    newMax= null;
                    break;
                case 'integer_selective':
                    newMax= 4;
                    break;
                case 'integer_range':
                    newMax = 3;
                    newMin = 1;
                    break;
                case 'text_answer':
                    newMin = null;
                    newMax= null;
                    break;
                case 'text_answer':
                    newMin = null;
                    newMax= 4;
                    break;
            }
            if(!group)
            {
                
                state.data.find(item => item.question.id == QuestionID).question.question_type = newType;
                state.data.find(item => item.question.id == QuestionID).question.url_prefix = Prefix_url;
               
                state.data.find(item => item.question.id == QuestionID).question.min = newMin;
                state.data.find(item => item.question.id == QuestionID).question.max = newMax;

                if(!state.data.find(item => item.question.id == QuestionID).question.options)
                {
                    state.data.find(item => item.question.id == QuestionID).question.options = [
                        { id : Date.now() , text : null },
                        { id : Date.now() , text : null }
                    ]
                }
                if(!state.data.find(item => item.question.id == QuestionID).question.pattern)
                {
                    state.data.find(item => item.question.id == QuestionID).question.pattern = 'free'
                }
                if((newType == 'drop_down' || newType == 'sort') && state.data.find(item => item.question.id == QuestionID).question.options)
                {
                    const filteredArray = state.data.find(item => item.question.id == QuestionID).question.options.filter(item => !item.text?.includes('<span>'));

                    state.data.find(item => item.question.id == QuestionID).question.all_options = false;
                    state.data.find(item => item.question.id == QuestionID).question.additional_options = false;
                    state.data.find(item => item.question.id == QuestionID).question.nothing_selected = false;
                    state.data.find(item => item.question.id == QuestionID).question.options = filteredArray;
                }
                if(newType == 'file' && !state.data.find(item => item.question.id == QuestionID).question.volume_unit)
                {
                    state.data.find(item => item.question.id == QuestionID).question.volume_unit = 'kb';
                }
            }
            else
            {
                state.data.find(item => item.question.id == group).question.child_questions
                .find(ChildItem => ChildItem.question.id == QuestionID).question.question_type = newType;

                state.data.find(item => item.question.id == group).question.child_questions
                .find(ChildItem => ChildItem.question.id == QuestionID).question.url_prefix = Prefix_url;

                state.data.find(item => item.question.id == group).question.child_questions
                .find(ChildItem => ChildItem.question.id == QuestionID).question.min = newMin;

                state.data.find(item => item.question.id == group).question.child_questions
                .find(ChildItem => ChildItem.question.id == QuestionID).question.max = newMax;


                console.log(JSON.parse(JSON.stringify(state.data.find(item => item.question.id == group).question.child_questions
                .find(ChildItem => ChildItem.question.id == QuestionID))))
                // state.data.forEach(item => item.question.child_questions ?
                //     item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                //     .question.question_type = newType : '')
                // state.data.forEach(item => item.question.child_questions ?
                //     item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                //     .question.url_prefix = Prefix_url : '')
                // state.data.forEach(item => item.question.child_questions ?
                //     item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                //     .question.min = newMin : '')
                // state.data.forEach(item => item.question.child_questions ?
                //     item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                //     .question.max = newMax : '')
            }

            // console.log(state.data.find(item => item.question.id == QuestionID).question.question_type)
        },
        ChangeAnswerPattern : (state, action) => {
            const { QuestionID , NewPattern , answer_template} = action.payload;
            if(state.data.find(questionItem => questionItem.question.id == QuestionID))
            {
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.pattern = NewPattern
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.answer_template = answer_template;
            }
            else
            {
                state.data.forEach(item => item.question.child_questions ?
                item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                .question.pattern = NewPattern  : '')
                state.data.forEach(item => item.question.child_questions ?
                    item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                    .question.answer_template = answer_template  : '')
            }
            
        },
        UploadFileHandler : (state, action) => {
            const { QuestionID , FileObject , IsQuestion , group } = action.payload;
            delete FileObject.uid;
            if(IsQuestion)
            {
                if(!group)
                    state.data.find(questionItem => questionItem.question.id == QuestionID).question.media = FileObject;
                else 
                    state.data.find(questionItem => questionItem.question.id == group).question.child_questions
                    .find(item => item.question.id == QuestionID).question.media = FileObject;
            }
            else
                state.nonQuestionData.find(questionItem => questionItem.question && questionItem.question.id == QuestionID)
            .question.media = FileObject;
            if(FileObject.status && FileObject.status == 'removed')
            {
                if(IsQuestion)
                {
                    if(!group)
                        state.data.find(questionItem => questionItem.question.id == QuestionID).question.media = ''
                    else 
                        state.data.find(questionItem => questionItem.question.id == group).question.child_questions
                        .find(item => item.question.id == QuestionID).question.media = '';
                }
                else
                    state.nonQuestionData.find(questionItem => questionItem.question && questionItem.question.id == QuestionID ).question.media = ''
            }
        },
        RemoveFileHandler : (state, action) => {
            const { QuestionID , IsQuestion , group } = action.payload;
            if(IsQuestion)
            {
              if(!group) 
                 state.data.find(questionItem => questionItem.question.id == QuestionID).question.media = '';
            else
            {
                
                state.data.find(questionItem => questionItem.question.id == group).question.child_questions
                .find(item => item.question.id == QuestionID).question.media = ''

                console.log(JSON.parse(JSON.stringify(state.data.find(questionItem => questionItem.question.id == group).question.child_questions
                .find(item => item.question.id == QuestionID).question)))
            }
            }
            else
            {
               state.nonQuestionData.find(questionItem => questionItem.question && questionItem.question.id == QuestionID)
               .question.media = '';
            }
        },
        ChangeUploadSizeHandler : (state, action) => {
            const { QuestionID , uploadSize , group } = action.payload; 
            state.Error = state.Error?.filter(item => item.qid != QuestionID)

            if(!group)
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.max_volume = uploadSize
            else 
                state.data.find(item => item.question.id == group).question.child_questions.
                    find(item => item.question.id == QuestionID).question.max_volume = uploadSize;
        },
        ReorderOptions : (state, action) => {
            const { QuestionID , NewOptionsPlacement } = action.payload;
            state.data.find(questionItem => questionItem.question.id == QuestionID) ?
            state.data.find(questionItem => questionItem.question.id == QuestionID).question.options = NewOptionsPlacement
            :
            state.data.forEach(item => item.question.child_questions ?
                item.question.child_questions.find(child_item => child_item.question.id == QuestionID).question.options = NewOptionsPlacement : '')
        },
        ChildQuestionAdder : (state , action) => {
            const { groupID , childQuestion , childQuestionIndex , prevIndex } = action.payload;

            state.data.splice(prevIndex , 1);
            
            if(!state.data.find(item => item?.question?.id == groupID).question.child_questions?.length)
            {
                childQuestion.question.placement = 1;
                state.data.find(item => item?.question?.id == groupID).question.child_questions.push(childQuestion)
                state.data.find(item => item?.question?.id == groupID).question.child_questions[0].question.group = groupID;
            }
            else 
            {
               state.data.find(item => item?.question?.id == groupID).question.child_questions.splice(childQuestionIndex, 0 ,childQuestion)
               state.data.find(item => item?.question?.id == groupID).question.child_questions[childQuestionIndex].question.placement = childQuestionIndex ;
               state.data.find(item => item?.question?.id == groupID).question.child_questions[childQuestionIndex].question.group = groupID; 
               state.data.find(item => item?.question?.id == groupID).question.child_questions.forEach((ChildItem,index) => {
                ChildItem.question.placement = index + 1;
               })

            }
        },
        ChildQuestionReorder : (state, action) => {
            const { ParentQuestionID } = action.payload;

            state.data.find(item => item.question.id == ParentQuestionID).question.child_questions.forEach((item,index) => {
                item.question.placement = index + 1;
            })
            // console.log(ParentQuestionID , NewChildQ/uestion)
            // state.data.find(item => item.question && item.question.id == ParentQuestionID).question.child_questions = NewChildQuestion;
        },
        FileVolumeTypeHandler : (state, action) => {
            const { QuestionID , NewVolumeType , group } = action.payload;

            if(!group)
               state.data.find(item => item.question && item.question.id == QuestionID)
            .question.volume_unit = NewVolumeType; 
            else 
                state.data.find(item => item.question?.id == group).question.child_questions
                    .find(item => item.question.id == QuestionID).question.volume_unit = NewVolumeType;
            
        },
        DeleteOptionsError : (state , action) => {
            const { errID , optionID } = action.payload;

            if(state.Error.find(item => item.qid == errID) && state.Error.find(item => item.qid == errID).err_object?.length)
            { 
                state.Error.find(item => item.qid == errID).err_object = state.Error.find(item => item.qid == errID).err_object.filter(item => item.optionID != optionID)
            //   state.Error.find(item => item.qid == errID).err_object.options = null;
            }
                
        },
        DeleteInputError : (state , action) => {
            const { errID , inputName } = action.payload;

            if(state.Error.find(item => item.qid == errID) && state.Error.find(item => item.qid == errID).err_object?.inputName)
            {
              
              state.Error.find(item => item.qid == errID).err_object.inputName = null;
            }
        },
        ChildQuestionRemover : (state, action) => {
            const { group , questionIndex , questionNewIndex } = action.payload;
            // console.log('before remove',JSON.parse(JSON.stringify(state.data.find(item => item.question.id == group).question)))
            let removedChild = state.data.find(item => item.question.id == group).question.child_questions[questionIndex];
            state.data.find(item => item.question.id == group).question.child_questions[questionIndex].question.group = null;
            state.data.find(item => item.question.id == group).question.child_questions.splice(questionIndex , 1);
       
            state.data.splice(questionNewIndex , 0, removedChild)

            // console.log(JSON.s)
          
        },
        ChildQuestionReplace : (state , action) => {
            const { newChildrenArray , groupID } = action.payload;

           state.data.find(item => item.question.id == groupID).question.child_questions = newChildrenArray;
        },
        SwitchIntoGroups : (state, action) => {
            const { oldGroup , newGroup , questionID , oldIndex , newIndex } = action.payload;
            // console.log(newIndex)
            let switchedQuestion = state.data.find(item => item.question.id == oldGroup).question.child_questions
                .find(childItem => childItem.question.id == questionID);
            switchedQuestion.question.group = newGroup;
            state.data.find(item => item.question.id == oldGroup).question.child_questions.splice(oldIndex , 1);

            state.data.find(item => item.question.id == newGroup).question.child_questions
                .splice(newIndex , 0 , switchedQuestion);
        }
    }
})
const QuestionStore = configureStore({
    reducer : QuestionSlice , 
    // middleware: (getDefaults) => getDefaults({}).concat([]),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
        serializableCheck: false,
        }),
})
export const { initialQuestionsSetter , ChangeDescriptionHandler , ChildQuestionReplace ,
    DuplicateQuestionHandler,   ChangeQuestionType , DeleteQuestionHandler , SwitchIntoGroups ,
     AddQuestion , DeleteNonQuestionHandler , ChildQuestionReorder , ChangeErrorData ,
    ChangeToggleHandler,  ChangeNameHandler , ChangeMinOrMaxAnswerHandler, DeleteInputError ,
     ChangeLabelHandler , OptionsAlphaBeticalSorter , ReorderOptions , DeleteOptionsError ,
    OptionModifier , OptionAdder , OptionRemover , ChangeUploadSizeHandler , ChildQuestionAdder ,
    ChildQuestionRemover , ChangeDegreeShapeHandler , OptionRemoverByText , finalizer , FileVolumeTypeHandler ,
    ChangeAnswerPattern , QuestionReorder , UploadFileHandler , RemoveFileHandler , AddWelcome , AddThanks ,
    QuestionSorter , ChangeDegreeHandler , NonQuestionSetter} = QuestionSlice.actions;

export default QuestionStore;