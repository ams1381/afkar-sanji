import { connect } from 'react-redux'
import { configureStore , createSlice } from '@reduxjs/toolkit'

var InitialValue = [];

export const StoreInitialValueSetter = (InitialData) => {
    InitialValue = InitialData;
}
const QuestionSlice =  createSlice({
    name : 'Questions Slice',
    initialState : InitialValue,
    reducers : {
        
    }
})
const QuestionStore = configureStore({
    reducer : QuestionSlice
})
export default QuestionStore;