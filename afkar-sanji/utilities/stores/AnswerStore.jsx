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
            Questions?.forEach((QuestionItem) => {
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
        setAnswerSetArray : (state , action) => {
            const { AnswerSetArray , QuestionsArray } = action.payload;
            let JSONAnswerSetArray = JSON.parse(JSON.stringify(AnswerSetArray));
            JSONAnswerSetArray = JSONAnswerSetArray.map(item => ({
                question : item.question_id ,
                answer : (item.question_type == 'optional') ? item.answer.options ? {
                        selected_options : item.answer.options ? item.answer.options.map(OptionItem => OptionItem.id) : [],
                        other_text : item.answer.other_text ? item.answer.other_text : null
                    } : {} : (item.question_type == 'drop_down') ? (item.answer.options && item.answer.options.length) ?
                    {
                        selected_options: item.answer?.length ? item.answer.map(OptionItem => OptionItem.id) : []
                    } : {}
                    :  (item.question_type == 'sort') ?
                        {
                            sorted_options : item.answer.map((SortItem,index) => ({
                                id : SortItem.id ,
                                placement : index + 1
                            }))
                        }
                        : item.question_type == 'email_field' ? {
                        email_field : item.answer
                    } :
                    item.question_type == 'integer_range' ? item.answer ? {
                        integer_range : item.answer
                    } : {} :
                    item.question_type == 'integer_selective' ? item.answer ? {
                            integer_selective : item.answer
                        } : {} :
                    item.question_type == 'number_answer' ? item.answer ? {
                            number_answer : item.answer
                        } : {}
                    : item.question_type == 'link' ? item.answer ? {
                        link : item.answer
                    } : {} : item.question_type == 'text_answer' ? item.answer ? {
                                text_answer : item.answer
                            } : {} : {},

                file : item.file
            }))

            state.AnswerSet = JSONAnswerSetArray;
        } ,
        ChangeInputAnswer : (state , action) => {
            const { QuestionID , InputName , InputValue } = action.payload;
            // console.log(QuestionID , InputName , InputValue )
            state.AnswerSet.find(item => item.question == QuestionID).answer[InputName] = InputValue;

        },
        SortOptions : (state , action) => {
            const { QuestionID , NewOptionsArray } = action.payload;

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
export const { setInitialAnswerSet , FileRemoveHandler , setAnswerSetArray ,
    ChangeInputAnswer , FileUploadHandler , OtherOptionHandler ,
     SortOptions , ChoseOption , NumberSelect } = AnswerSetSlice.actions
export default AnswerStore;