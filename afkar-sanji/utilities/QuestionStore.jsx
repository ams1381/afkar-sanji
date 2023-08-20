import { connect } from 'react-redux'
import { configureStore , createSlice , current } from '@reduxjs/toolkit'

var InitialValue = {
    data : []
}
const QuestionSlice =  createSlice({
    name : 'QuestionsSlice',
    initialState : InitialValue,
    reducers : {
        initialStateSetter : (state,action) => {
            state.data = action.payload.questions;
            action.payload.welcome_page ? state.data.push({ question : action.payload.welcome_page}) : ''
            action.payload.thank_page ? state.data.push({ question : action.payload.thank_page}) : ''

            console.log(state.data)
        },
        ChangeNameHandler : (state, action) => {
            const { QuestionID , NewTitle } = action.payload;
            let clonedStore = state.data;
            // console.log(state)
            // console.log(state.data.find(item => item.question.id == QuestionID))
            JSON.parse(JSON.stringify(clonedStore)).find(item => item.question.id == QuestionID).question.title = NewTitle;
            state.data = clonedStore

            // console.log(SON.parse(JSON.stringify(state.data)))
            // console.log(JSON.parse(JSON.stringify(state)).data.find(item => item.question.id == QuestionID).title = NewTitle)
            // state.data.forEach((item) => console.log(item))
            // state.data.find(item => item.question.id == QuestionID).title = NewTitle;
           
            console.log(JSON.parse(JSON.stringify(clonedStore)).find(item => item.question.id == QuestionID).question)
        }
    }
})
const QuestionStore = configureStore({
    reducer : QuestionSlice , 
    middleware: (getDefaults) => getDefaults({}).concat([]),
})
export const { initialStateSetter , ChangeNameHandler} = QuestionSlice.actions;
export default QuestionStore;