import {Input, InputNumber} from "antd";
import {InputAnswerContainer} from "@/styles/Result/AddResult";
import {ChangeInputAnswer} from "@/utilities/stores/AnswerStore";
import {digitsEnToFa, digitsFaToEn} from "@persian-tools/persian-tools";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import TextArea from "antd/lib/input/TextArea";
import {PatternGenerator} from "@/components/QuestionnairePanel/Question Components/QWanswer/SettingQWanswer";


export const InputSubComponent = ({ QuestionData , answerSet , ErrorQuestions , setErrorQuestions , loadableAnswer }) => {
    const dispatcher = useDispatch();
    const [ InputValue , setInputValue ] = useState(null);
    useEffect(() => {
        if(!answerSet.find(item => item.question == QuestionData.id).answer[QuestionData.question_type] && !loadableAnswer)
        {
            setInputValue(null)
        }
        if(answerSet.find(item => item.question == QuestionData.id) && loadableAnswer)
        {

            if(answerSet.find(item => item.question == QuestionData.id).answer[QuestionData.question_type])
                 setInputValue(digitsFaToEn(answerSet.find(item => item.question == QuestionData.id).answer[QuestionData.question_type]))
            // else
            //     setInputValue(null)

        }
        if(answerSet && answerSet?.answers?.length)
        {
            if(answerSet?.answers.find(item => item.question_id === QuestionData.id))
            {
                setInputValue(answerSet?.answers.find(item => item.question_id == QuestionData.id).answer)
            }
        }
    },[QuestionData.id , answerSet])

    const ChangeInputHandler = (e) => {
        if(QuestionData.pattern.includes('english_letters'))
        {
            const inputValue = event.target.value;
            const cleanedValue = inputValue.replace(/[^a-zA-Z]/g, '');

            setInputValue(cleanedValue)
            let ErrorQuestionArray = [...ErrorQuestions]
            setErrorQuestions(ErrorQuestionArray.filter(item => item !== QuestionData.id))
        }
        else if(QuestionData.pattern.includes('number_character'))
        {
            const inputValue = event.target.value;
            const cleanedValue = inputValue.replace(/[^0-9]/g, '');
            setInputValue(cleanedValue)
            let ErrorQuestionArray = [...ErrorQuestions]
            setErrorQuestions(ErrorQuestionArray.filter(item => item !== QuestionData.id))
        }

        else
        {
            // e.target.value ? SetShowClearButtonState(true) : false ;
            setInputValue(e.target.value)
            let ErrorQuestionArray = [...ErrorQuestions]
            setErrorQuestions(ErrorQuestionArray.filter(item => item != QuestionData.id))
        }

        dispatcher(ChangeInputAnswer({
            QuestionID : QuestionData.id ,
            InputName : QuestionData.question_type ,
            InputValue : digitsFaToEn(e.target.value?.toString())
        }))
    }
    return (
        <InputAnswerContainer>
            {QuestionData.question_type == 'number_answer' ?
                <InputNumber min={QuestionData.min} max={QuestionData.max}
                     value={(InputValue)}  onChange={(e) => {
                     if(e) {
                         setInputValue((e.toString()))
                         // console.log(digitsFaToEn(e.toString()),e.toString())
                     }
                    else
                         setInputValue(null)
                    dispatcher(ChangeInputAnswer({
                        QuestionID : QuestionData.id ,
                        InputName : 'number_answer' ,
                        InputValue :e ? digitsFaToEn(e.toString()) : null
                    }))}
                } /> :
                QuestionData.question_type == 'text_answer' ?
                    <TextArea rows={4} placeholder={PatternGenerator(QuestionData.pattern)?.label}
                              value={InputValue}
                              maxLength={QuestionData.max ? QuestionData.max : null}
                              onChange={ChangeInputHandler}  /> :
                <Input style={{ borderRadius : 2 , marginTop : 26 }} value={InputValue} onChange={(e) => {

                    let ValidationRegex = QuestionData.question_type == 'link' ? /https?:\/\/\S+/g : /[^a-zA-Z@._\-]/g
                    const inputValue = e.target.value;
                    const cleanedValue = inputValue.replace(ValidationRegex, '');
                    setInputValue(cleanedValue)
                    let ErrorQuestionArray = [...ErrorQuestions]

                    setErrorQuestions(ErrorQuestionArray.filter(item => item != QuestionData.id))
                    dispatcher(ChangeInputAnswer({
                        QuestionID : QuestionData.id ,
                        InputName : QuestionData.question_type ,
                        InputValue : digitsFaToEn(cleanedValue)
                    }))
                    }
                } />}
        </InputAnswerContainer>

    )
}