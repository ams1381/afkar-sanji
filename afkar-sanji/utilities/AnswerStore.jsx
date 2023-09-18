import { connect } from 'react-redux'
import { configureStore , createSlice , current, getDefaultMiddleware } from '@reduxjs/toolkit'

var InitialData = {
    AnswerSet : []
}
const AnswerSetSlice =  createSlice({
    name : 'AnswerSlice',
    initialState : InitialData,
    reducers : {
        setInitialAnswerSet : (state , action) => {
            const { Questions } = action.payload;
            state.AnswerSet.length = 0;
            Questions.forEach((QuestionItem) => {
                if(!QuestionItem || !QuestionItem.question)
                    return
                if(QuestionItem.question && QuestionItem.question.child_questions)
                {
                    QuestionItem.question.child_questions.forEach((item) => {
                        state.AnswerSet.push({
                            question : item.question.id,
                            answer : {},
                            file : null
                        })
                    })
                }
                else
                    state.AnswerSet.push({
                        question : QuestionItem.question.id,
                        answer : {},
                        file : null
                    })
            })
        },
        ChangeInputAnswer : (state , action) => {
            const { QuestionID , InputName , InputValue } = action.payload;

            state.AnswerSet.find(item => item.question == QuestionID).answer[InputName] = InputValue;
            console.log(JSON.parse(JSON.stringify(state.AnswerSet.find(item => item.question == QuestionID))),
            InputName,InputValue,
            JSON.parse(JSON.stringify(state.AnswerSet)))
        },
        SortOptions : (state , action) => {
            const { QuestionID , NewOptionsArray } = action.payload;
            console.log(NewOptionsArray)
            if(state.AnswerSet.find(item => item.question == QuestionID))
                state.AnswerSet.find(item => item.question == QuestionID).answer.sorted_options = NewOptionsArray;
        },
        ChoseOption : (state , action) => {
            const { QuestionID , ChoseOptionsArray , other_text} = action.payload;
            if(ChoseOptionsArray && Array.isArray(ChoseOptionsArray) && ChoseOptionsArray.length)
            {
                if(other_text)
                {   
                    state.AnswerSet.find(item => item.question == QuestionID).answer['other_text'] = other_text;
                    state.AnswerSet.find(item => item.question == QuestionID).answer['selected_options'] ? 
                    state.AnswerSet.find(item => item.question == QuestionID).answer['selected_options'] = [ChoseOptionsArray[0].id]
                    : '' 
                }
                else
                    state.AnswerSet.find(item => item.question == QuestionID).answer = {
                        'selected_options' : ChoseOptionsArray.map(item => item.id)
                    }
            }
            else if(typeof ChoseOptionsArray == 'object')
            { 
                if(ChoseOptionsArray.id)
                    state.AnswerSet.find(item => item.question == QuestionID).answer = {
                        'selected_options' : [ChoseOptionsArray.id]
                    }
                
            }
            else if(Array.isArray(ChoseOptionsArray) && !ChoseOptionsArray.length)
            {
                state.AnswerSet.find(item => item.question == QuestionID).answer = null;
            }
                
        },
        OtherOptionHandler : (state , action) =>{
            const { QuestionID , other_text} = action.payload;
            
            state.AnswerSet.find(item => item.question == QuestionID).answer.other_text = other_text;

        },
        NumberSelect : (state , action) => {
            const { QuestionID , NumberValue , NumberName } = action.payload;

            state.AnswerSet.find(item => item.question == QuestionID).answer[NumberName] = NumberValue;
        },
        FileUploadHandler : (state , action) => {
            const { QuestionID , file } = action.payload;
            
            state.AnswerSet.find(item => item.question == QuestionID).file = file

        },
        FileRemoveHandler : (state , action) => {
            const { QuestionID } = action.payload;
            // console.log(state.AnswerSet.length)
            if(!state.AnswerSet.length)
                return
            state.AnswerSet.find(item => item.question == QuestionID).file = null;
        }
    }
});
const AnswerStore = configureStore({
    reducer : AnswerSetSlice , 
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
        serializableCheck: false,
        }),
})
export const { setInitialAnswerSet , FileRemoveHandler ,
    ChangeInputAnswer , FileUploadHandler , OtherOptionHandler ,
     SortOptions , ChoseOption , NumberSelect } = AnswerSetSlice.actions
export default AnswerStore;