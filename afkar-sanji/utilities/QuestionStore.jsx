import { connect } from 'react-redux'
import { configureStore , createSlice , current, getDefaultMiddleware } from '@reduxjs/toolkit'

var InitialValue = {
    nonQuestionData : [],
    data : [],
}
const QuestionSlice =  createSlice({
    name : 'QuestionsSlice',
    initialState : InitialValue,
    reducers : {
        initialQuestionsSetter : (state,action) => {
            // state.data = action.payload.map(item => item.question ? {/ question : item.question } : '');
            state.data.length = 0;
            action.payload.forEach(item => {
                if(item.question)
                    state.data.push({ question : item.question })
            })  
        },
        DuplicateQuestionHandler : (state , action) =>{
            const { QuestionID , CopiedQuestionID} = action.payload;
            let DuplicatedElement = JSON.parse(JSON.stringify(state.data)).find(item => item.question.id == QuestionID)
            let DuplicatedIndex = JSON.parse(JSON.stringify(state.data)).findIndex(item => item.question.id == QuestionID);
            
            state.data.splice(DuplicatedIndex + 1, 0, DuplicatedElement);
            state.data[[DuplicatedIndex + 1]].question.id = CopiedQuestionID;
            state.data[DuplicatedIndex + 1].question.newFace = true;
            state.data[DuplicatedIndex + 1].question.duplicated = true;
        },
        DeleteQuestionHandler : (state , action) => {
            const { QuestionID , isQuestion } = action.payload;
            if(isQuestion)
            {
                let DeletedQuestionIndex = state.data.findIndex(item => item.question.id == QuestionID);
                state.data.splice(DeletedQuestionIndex , 1);
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
            const { isQuestion , QuestionID , Response } = action.payload;
            
            if(isQuestion)
            {
                if(state.data.find(item => item.question && item.question.id == QuestionID)){
                    // console.log(JSON.parse(JSON.stringify(state.data.find(item => item.question.id == QuestionID).question)),Response)
                    console.log(JSON.parse(JSON.stringify(state.data.find(item => item.question.id == QuestionID).question)))
                    state.data.find(item => item.question.id == QuestionID).question = Response;
                    console.log(JSON.parse(JSON.stringify(state.data)))
                }
                else
                {
                    state.data.forEach(item => item.question.child_questions ?
                        item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                        .question = Response : '')
                //  state.data.forEach(item => item.question.child_questions ?
                //     item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                //     .question.newFace = null : '')
                // state.data.forEach(item => item.question.child_questions ?
                //     item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                //     .question.id = ResponseID : '')   
                }
                
            }
            else
            {
                state.nonQuestionData.find(item => (item.question && item.question.id == QuestionID)).question.newFace = null;
                state.nonQuestionData.find(item => (item.question && item.question.id == QuestionID)).question.id = ResponseID;
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
            const { QuestionID , NewTitle , QuestionChanged} = action.payload;

            QuestionChanged ? 
            state.data.find(item => item.question.id == QuestionID) ? 
            state.data.find(item => item.question.id == QuestionID).question.title = NewTitle
            : 
            state.data.forEach(item => item.question.child_questions ?
            item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
            .question.title = NewTitle : '')
            : 
            state.nonQuestionData.find(item => (item.question && item.question.id == QuestionID)).question.title = NewTitle
        },
        ChangeDescriptionHandler : (state , action) => {
            const { QuestionID , NewDesc , QuestionChanged} = action.payload;
            QuestionChanged ? 
            state.data.find(item => item.question.id == QuestionID) ?
            state.data.find(item => item.question.id == QuestionID).question.description = NewDesc 
            :
            state.data.forEach(item => item.question.child_questions ?
                item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                .question.description = NewDesc : '')
            :
            state.nonQuestionData.find(item => (item.question && item.question.id == QuestionID)).question.description = NewDesc
        },
        ChangeToggleHandler : (state, action) => {
            const  { QuestionID , ToggleName , ToggleValue } = action.payload;
            state.data.find(item => item.question.id == QuestionID) ?
            state.data.find(item => item.question.id == QuestionID).question[ToggleName] = ToggleValue
            : 
            state.data.forEach(item => item.question.child_questions ?
                item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                .question[ToggleName] = ToggleValue : '')
        },
        ChangeMinOrMaxAnswerHandler : (state, action) => {
            const  { QuestionID , MinMaxName , MinMaxValue} = action.payload;

            state.data.find(item => item.question.id == QuestionID) ? 
            state.data.find(item => item.question.id == QuestionID).question[MinMaxName] = MinMaxValue 
            :
            state.data.forEach(item => item.question.child_questions ?
                item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                .question[MinMaxName] = MinMaxValue : '')
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
            const  { QuestionID , DegreeValue  } = action.payload;
            state.data.find(item => item.question.id == QuestionID) ?
            state.data.find(item => item.question.id == QuestionID).question.max = DegreeValue
            : state.data.forEach(item => item.question.child_questions ?
                item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                .question.max = DegreeValue : '')
        },
        OptionModifier : (state, action) => {
            const  { QuestionID , OptionID , OptionText } = action.payload;
            state.data.find(questionItem => questionItem.question.id == QuestionID) ? 
            state.data.find(questionItem => questionItem.question.id == QuestionID).question.options.find
            (item => item.id == OptionID).text = OptionText
            : state.data.forEach(item => item.question.child_questions ?
            item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
            .question.options.find
            (item => item.id == OptionID).text = OptionText : '')
        },
        OptionAdder : (state, action) => {
            const  { QuestionID , OptionID , NewOptionID , OptionText , newOption} = action.payload;
            if(OptionID)
            {
                if(state.data.find(questionItem => questionItem.question.id == QuestionID))
                {
                let DuplicatedOption = JSON.parse(JSON.stringify(state.data)).find(item => item.question.id == QuestionID).question.options.find(OptionItem => OptionItem.id == OptionID)
                let DuplicatedIndex = JSON.parse(JSON.stringify(state.data)).find(item => item.question.id == QuestionID).question.options.findIndex(OptionItem => OptionItem.id == OptionID)

                state.data.find(questionItem => questionItem.question.id == QuestionID).question.options.splice(DuplicatedIndex + 1, 0, DuplicatedOption);
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.options[DuplicatedIndex + 1].text = OptionText;
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.options[DuplicatedIndex + 1].id = NewOptionID;
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.options[DuplicatedIndex + 1].newOption = newOption;

                
                }
                else
                {
                    let DuplicatedOption = JSON.parse(JSON.stringify(state.data)).forEach(item => item.question.child_questions ?
                        item.question.child_questions.find(child_item => child_item.question.id == QuestionID).question.options.find(OptionItem => OptionItem.id == OptionID) : '');

                    let DuplicatedIndex = JSON.parse(JSON.stringify(state.data)).forEach(item => item.question.child_questions ?
                        item.question.child_questions.find(child_item => child_item.question.id == QuestionID).question.options.findIndex(OptionItem => OptionItem.id == OptionID) : '');

                    state.data.forEach(item => item.question.child_questions ?
                        item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                        .question.options.splice(DuplicatedIndex + 1, 0, DuplicatedOption) : '')
                    state.data.forEach(item => item.question.child_questions ?
                        item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                        .question.options.text = OptionText : '')
                    state.data.forEach(item => item.question.child_questions ?
                        item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                        .question.options.id = NewOptionID : '')
                    state.data.forEach(item => item.question.child_questions ?
                        item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                        .question.options.newOption = newOption : '')
                }
            }
            else
                state.data.find(questionItem => questionItem.question.id == QuestionID) ?
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.options.push({
                    id : NewOptionID ,
                    text : OptionText , 
                    newOption : newOption,
                }) :
                state.data.forEach(item => item.question.child_questions ?
                    item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                    .question.options.push({
                        id : NewOptionID ,
                        text : OptionText,
                        newOption : newOption
                    })  : '')
        },
        OptionRemover : (state, action) => {
            const  { QuestionID , OptionID } = action.payload;
            if(state.data.find(questionItem => questionItem.question.id == QuestionID))
            {
              let Option_index = JSON.parse(JSON.stringify(state.data)).find(questionItem => questionItem.question.id == QuestionID).question.options.findIndex(item => item.id == OptionID);

              state.data.find(questionItem => questionItem.question.id == QuestionID).question.options.splice(Option_index,1);
            }

        },
        OptionRemoverByText : (state, action) => {
            const  { QuestionID , OptionText } = action.payload;
            if(state.data.find(questionItem => questionItem.question.id == QuestionID))
            {
                let Option_index = JSON.parse(JSON.stringify(state.data)).find(questionItem => questionItem.question.id == QuestionID).question.options.findIndex(item => item.text == OptionText);
                if(Option_index == -1)
                    return
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.options.splice(Option_index,1);
            }
            else
            {
                let Option_index = JSON.parse(JSON.stringify(state.data)).forEach(item => item.question.child_questions ?
                    item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                    .question.options.findIndex(item => item.text == OptionText) : '')
                forEach(item => item.question.child_questions ?
                    item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                    .question.options.splice(Option_index,1) : '')
            }
        },
        OptionsAlphaBeticalSorter : (state, action) => {
            const  { QuestionID } = action.payload;
            if(state.data.find(questionItem => questionItem.question.id == QuestionID))
            {
                let SortedOptions = JSON.parse(JSON.stringify(state.data)).find(questionItem => questionItem.question.id == QuestionID).question.options
                .sort((a,b) => a.text.localeCompare(b.text));
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.options = SortedOptions;
            }
            else
            {
                let SortedOptions = JSON.parse(JSON.stringify(state.data)).forEach(item => item.question.child_questions ?
                    item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                    .question.options.sort((a,b) => a.text.localeCompare(b.text))  : '')
                
                state.data.forEach(item => item.question.child_questions ?
                    item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                    .question.options = SortedOptions  : '')
            }
        }
        ,ChangeLabelHandler : (state, action) => {
            const  { QuestionID , Label , LabelValue} = action.payload;
            state.data.find(questionItem => questionItem.question.id == QuestionID) ?
            state.data.find(questionItem => questionItem.question.id == QuestionID).question[Label] = LabelValue
            : 
            state.data.forEach(item => item.question.child_questions ?
                item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                .question[Label] = LabelValue  : '')
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
                    let TopQuestionIndex = JSON.parse(JSON.stringify(state.data)).
                    forEach(item => item.question.child_questions ?
                        item.question.child_questions.findIndex(child_item => child_item.question.id == TopQuestionID) : '');

                    initialQuestionData.question.placement = TopQuestionIndex + 1;
                    state.data.find(item => item.question.id == ParentQuestion)
                    .child_questions.splice(TopQuestionIndex + 1 ,0,initialQuestionData)
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
            const { QuestionID , newType , Prefix_url} = action.payload;
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
            if(state.data.find(item => item.question.id == QuestionID))
            {
                
                state.data.find(item => item.question.id == QuestionID).question.question_type = newType;
                state.data.find(item => item.question.id == QuestionID).question.url_prefix = Prefix_url;
               
                state.data.find(item => item.question.id == QuestionID).question.min = newMin;
                state.data.find(item => item.question.id == QuestionID).question.max = newMax;
            }
            else
            {
                state.data.forEach(item => item.question.child_questions ?
                    item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                    .question.question_type = newType : '')
                state.data.forEach(item => item.question.child_questions ?
                    item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                    .question.url_prefix = Prefix_url : '')
                state.data.forEach(item => item.question.child_questions ?
                    item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                    .question.min = newMin : '')
                state.data.forEach(item => item.question.child_questions ?
                    item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                    .question.max = newMax : '')
            }

            console.log(state.data.find(item => item.question.id == QuestionID).question.question_type)
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
            const { QuestionID , FileObject , IsQuestion } = action.payload;
            delete FileObject.uid;
            if(IsQuestion)
            {
               state.data.find(questionItem => questionItem.question.id == QuestionID).question.media = FileObject; 
            }
            else
                state.nonQuestionData.find(questionItem => questionItem.question && questionItem.question.id == QuestionID)
            .question.media = FileObject;
            if(FileObject.status && FileObject.status == 'removed')
            {
                IsQuestion ? state.data.find(questionItem => questionItem.question.id == QuestionID).question.media = ''
                : state.nonQuestionData.find(questionItem => questionItem.question && questionItem.question.id == QuestionID ).question.media = ''
            }
        },
        RemoveFileHandler : (state, action) => {
            const { QuestionID , IsQuestion } = action.payload;
            if(IsQuestion)
            {
              if(state.data.find(questionItem => questionItem.question.id == QuestionID)) 
                 state.data.find(questionItem => questionItem.question.id == QuestionID).question.media = '';
            else
                 state.data.forEach(item => item.question.child_questions ?
                    item.question.child_questions.find(child_item => child_item.question.id == QuestionID).question.media = '' : '')  
            }
            else
            {
               state.nonQuestionData.find(questionItem => questionItem.question && questionItem.question.id == QuestionID)
               .question.media = '';
            }
        },
        ChangeUploadSizeHandler : (state, action) => {
            const { QuestionID , uploadSize } = action.payload; 

            state.data.find(questionItem => questionItem.question.id == QuestionID) ?
            state.data.find(questionItem => questionItem.question.id == QuestionID).question.max_volume = uploadSize
            :
            state.data.forEach(item => item.question.child_questions ?
                item.question.child_questions.find(child_item => child_item.question.id == QuestionID)
                .question.max_volume = uploadSize  : '')
        },
        ReorderOptions : (state, action) => {
            const { QuestionID , NewOptionsPlacement } = action.payload;
            state.data.find(questionItem => questionItem.question.id == QuestionID) ?
            state.data.find(questionItem => questionItem.question.id == QuestionID).question.options = NewOptionsPlacement
            :
            state.data.forEach(item => item.question.child_questions ?
                item.question.child_questions.find(child_item => child_item.question.id == QuestionID).question.options = NewOptionsPlacement : '')
        },
        ChildQuestionReorder : (state, action) => {
            const { ParentQuestionID , NewChildQuestion } = action.payload;
            console.log(ParentQuestionID , NewChildQuestion)
            // state.data.find(item => item.question && item.question.id == ParentQuestionID).question.child_questions = NewChildQuestion;
        },
        FileVolumeTypeHandler : (state, action) => {
            const { QuestionID , NewVolumeType } = action.payload;

            state.data.find(item => item.question && item.question.id == QuestionID).question.volume_unit = NewVolumeType;
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
export const { initialQuestionsSetter , ChangeDescriptionHandler ,
    DuplicateQuestionHandler,   ChangeQuestionType , DeleteQuestionHandler ,
     AddQuestion , DeleteNonQuestionHandler , ChildQuestionReorder ,
    ChangeToggleHandler,  ChangeNameHandler , ChangeMinOrMaxAnswerHandler,
     ChangeLabelHandler , OptionsAlphaBeticalSorter , ReorderOptions ,
    OptionModifier , OptionAdder , OptionRemover , ChangeUploadSizeHandler
    , ChangeDegreeShapeHandler , OptionRemoverByText , finalizer , FileVolumeTypeHandler ,
    ChangeAnswerPattern , QuestionReorder , UploadFileHandler , RemoveFileHandler , AddWelcome , AddThanks ,
    QuestionSorter , ChangeDegreeHandler , NonQuestionSetter} = QuestionSlice.actions;

export default QuestionStore;