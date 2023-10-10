import {configureStore, createSlice} from "@reduxjs/toolkit";

var InitialData = {
    AnswerSet : []
}

const ChangeResultStore =  createSlice({
    name: 'ChangeResultStore',
    initialState: InitialData,
    reducers: {

    }
});
const AnswerStore = configureStore({
    reducer : ChangeResultStore ,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})