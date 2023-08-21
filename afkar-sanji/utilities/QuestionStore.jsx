import { connect } from 'react-redux'
import { configureStore , createSlice , current } from '@reduxjs/toolkit'

var InitialValue = {
    nonQuestionData : [],
    data : []
}
const QuestionSlice =  createSlice({
    name : 'QuestionsSlice',
    initialState : InitialValue,
    reducers : {
        initialQuestionsSetter : (state,action) => {
            state.data = action.payload;
        },
        DuplicateQuestionHandler : (state , action) =>{
            const { QuestionID , CopiedQuestionID} = action.payload;
            let DuplicatedElement = JSON.parse(JSON.stringify(state.data)).find(item => item.question.id == QuestionID)
            let DuplicatedIndex = JSON.parse(JSON.stringify(state.data)).findIndex(item => item.question.id == QuestionID);
            
            state.data.splice(DuplicatedIndex + 1, 0, DuplicatedElement);
            state.data[[DuplicatedIndex + 1]].question.id = CopiedQuestionID;
            state.data[DuplicatedIndex + 1].question.newFace = true;

        },
        DeleteQuestionHandler : (state , action) => {
            const { QuestionID , isQuestion } = action.payload;
            if(isQuestion)
            {
                let DeletedQuestionIndex = state.data.findIndex(item => item.question.id == QuestionID);
                console.log(DeletedQuestionIndex)
                state.data.splice(DeletedQuestionIndex , 1);
            }
            else
            {
                let DeletedNonQuestionIndex = state.nonQuestionData.findIndex(item => item.question.id == QuestionID);
                state.data.splice(DeletedNonQuestionIndex , 1);
            }
        } ,
        QuestionSorter : (state , action) => {
            state.data.forEach((item,index) => item.question.placement = index + 1)
        },
        ChangeQuestionType : (state , action) => {
            const { QuestionID , newType } = action.payload;
            state.data.find(item => item.question.id == QuestionID).question.question_type = newType;
        },
        NonQuestionSetter : (state, action) => {
            state.nonQuestionData = action.payload
        },
        ChangeNameHandler : (state, action) => {
            const { QuestionID , NewTitle , QuestionChanged} = action.payload;
            console.log(QuestionID , NewTitle)
            QuestionChanged ? state.data.find(item => item.question.id == QuestionID).question.title = NewTitle
            : state.nonQuestionData.find(item => item.question.id == QuestionID).question.title = NewTitle
        },
        ChangeDescriptionHandler : (state , action) => {
            const { QuestionID , NewDesc , QuestionChanged} = action.payload;
            QuestionChanged ? state.data.find(item => item.question.id == QuestionID).question.description = NewDesc :
            state.nonQuestionData.find(item => item.question.id == QuestionID).question.description = NewDesc
        },
        ChangeToggleHandler : (state, action) => {
            const  { QuestionID , ToggleName , ToggleValue } = action.payload;
            state.data.find(item => item.question.id == QuestionID).question[ToggleName] = ToggleValue;
        },
        ChangeMinOrMaxAnswerHandler : (state, action) => {
            const  { QuestionID , MinMaxName , MinMaxValue} = action.payload;
  
            // console.log(state.data.find(item => item.question.id == QuestionID).question[`${MinMaxName}`])
            state.data.find(item => item.question.id == QuestionID).question[MinMaxName] = MinMaxValue;
        },
        ChangeDegreeShapeHandler : (state, action) => {
            const  { QuestionID , NewIconName , NewShape  } = action.payload;
            state.data.find(item => item.question.id == QuestionID).question.shape = NewShape;
            state.data.find(item => item.question.id == QuestionID).question.shapeIcon = NewIconName;
        },
        ChangeDegreeHandler : (state, action) => {
            const  { QuestionID , DegreeValue  } = action.payload;
            state.data.find(item => item.question.id == QuestionID).question.max = DegreeValue;
        },
        OptionModifier : (state, action) => {
            const  { QuestionID , OptionID , OptionText } = action.payload;
            state.data.find(questionItem => questionItem.question.id == QuestionID).question.options.find
            (item => item.id == OptionID).text = OptionText;
        },
        OptionAdder : (state, action) => {
            const  { QuestionID , OptionID , NewOptionID , OptionText} = action.payload;
            if(OptionID)
            {

                let DuplicatedOption = JSON.parse(JSON.stringify(state.data)).find(item => item.question.id == QuestionID).question.options.find(OptionItem => OptionItem.id == OptionID)
                let DuplicatedIndex = JSON.parse(JSON.stringify(state.data)).find(item => item.question.id == QuestionID).question.options.findIndex(OptionItem => OptionItem.id == OptionID)
    
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.options.splice(DuplicatedIndex + 1, 0, DuplicatedOption);
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.options[DuplicatedIndex + 1].text = OptionText;
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.options[DuplicatedIndex + 1].id = NewOptionID;
            }
            else
                state.data.find(questionItem => questionItem.question.id == QuestionID).question.options.push({
                    id : NewOptionID ,
                    text : OptionText
                })
        },
        OptionRemover : (state, action) => {
            const  { QuestionID , OptionID } = action.payload;
            let Option_index = JSON.parse(JSON.stringify(state.data)).find(questionItem => questionItem.question.id == QuestionID).question.options.findIndex(item => item.id == OptionID);

            state.data.find(questionItem => questionItem.question.id == QuestionID).question.options.splice(Option_index,1);
        },
        
        ChangeLabelHandler : (state, action) => {
            const  { QuestionID , Label , LabelValue} = action.payload;
            state.data.find(questionItem => questionItem.question.id == QuestionID).question[Label] = LabelValue;
        }
    }
})
const QuestionStore = configureStore({
    reducer : QuestionSlice , 
    middleware: (getDefaults) => getDefaults({}).concat([]),
})
export const { initialQuestionsSetter , ChangeDescriptionHandler ,
    DuplicateQuestionHandler,   ChangeQuestionType , DeleteQuestionHandler ,
    ChangeToggleHandler,  ChangeNameHandler , ChangeMinOrMaxAnswerHandler, ChangeLabelHandler ,
    OptionModifier , OptionAdder , OptionRemover , ChangeDegreeShapeHandler ,
    QuestionSorter , ChangeDegreeHandler , NonQuestionSetter} = QuestionSlice.actions;
// export  * from QuestionSlice.actions;
export default QuestionStore;