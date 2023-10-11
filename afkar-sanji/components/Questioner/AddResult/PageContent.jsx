import {QuestionerContentBox, QuestionerPageContainer} from "@/styles/common";
import {AddResultFooter, QuestionContainer, QuestionsContainer} from "@/styles/Result/AddResult";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {SubComponentGenerator} from "@/components/Questioner/AddResult/QuestionSubCompGenerator";
import {Button, message} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAnswerSetArray, setInitialAnswerSet} from "@/utilities/stores/AnswerStore";
import axios from "axios";
import {AnswerSetFormDataConverter} from "@/utilities/FormData";
import Link from "next/link";
import {useRouter} from "next/router";


export const PageContent = ({ questionnaire , answerSet}) => {
    const dispatcher = useDispatch();
    const router = useRouter();
    const [ messageApi , messageContext ] = message.useMessage();
    const AnswerSetsArray = useSelector(state => state.reducer.AnswerSet);
    const [ AnswerConfirmLoading , setAnswerConfirmLoading ] = useState(false)
    const [ ErrorQuestions , setErrorQuestions ] = useState([]);
    // console.log(AnswerSetsArray)
    useEffect(() => {
        if(answerSet) {
            dispatcher(setAnswerSetArray({ AnswerSetArray : answerSet.answers }))
        }
        else {
            dispatcher(setInitialAnswerSet({
                Questions : questionnaire.questions
            }))
        }
    },[])
    const ConfirmAnswerHandler = async () => {

        let AnswerSet = answerSet ? answerSet.answers : AnswerSetsArray;

        let FileQuestionQuestions = AnswerSet.map(item => {
            if(item.file)
                return item
        })
        let CopiedQuestionAnswerSet = JSON.parse(JSON.stringify(AnswerSet));
        CopiedQuestionAnswerSet.forEach((item,index) => {
            if(item.answer && !Object.keys(item.answer)?.length)
                item.answer = null
        })

        FileQuestionQuestions = FileQuestionQuestions.filter(item => item != undefined);
        CopiedQuestionAnswerSet = CopiedQuestionAnswerSet.filter(item => item.file == null);

        try
        {
            setAnswerConfirmLoading(true)
            let CreatedAnswerSet;
            if(!answerSet) {
                let { data } = await axios.post(`/question-api/questionnaires/${questionnaire.uuid}/answer-sets/`);
                CreatedAnswerSet = data;
            }

            if(FileQuestionQuestions && FileQuestionQuestions.length)
                await axios.post(`/question-api/questionnaires/${questionnaire.uuid}/answer-sets/${answerSet ? answerSet.id : CreatedAnswerSet.id}/add-answer/`,
                    AnswerSetFormDataConverter(FileQuestionQuestions),{
                    'Content-Type' : 'multipart/form-data'
                })
            await axios.post(`/question-api/questionnaires/${questionnaire.uuid}/answer-sets/${answerSet ? answerSet.id : CreatedAnswerSet.id}/add-answer/`,
                CopiedQuestionAnswerSet)
        }
        catch(err)
        {
            setAnswerConfirmLoading(false)
            if(err.response?.data)
            {
                let ErrorsArray = err.response?.data.map(item => {
                    if(Object.keys(item).length)
                        return Object.keys(item)
                })
                ErrorsArray.forEach(ErrorItem => {
                    if(ErrorItem) {
                        let QuestionElement = document.getElementById('question' + ErrorItem)
                        QuestionElement.scrollIntoView({behavior: 'smooth'});

                        // Wait for the scroll to complete (you can adjust the delay based on your requirements)
                        setTimeout(() => {
                            // Calculate the desired position for the element in the viewport (e.g., to center it)
                            const desiredOffset = window.innerHeight / 2 - QuestionElement.clientHeight / 2;

                            // Adjust the scroll position to center the element in the viewport
                            window.scrollTo({
                                top: QuestionElement.offsetTop - desiredOffset,
                                behavior: 'smooth'
                            });
                        }, 500);

                    }
                })

                setErrorQuestions(ErrorsArray)
                err.response.data?.forEach((item) => {
                    if(item && Object.values(item).length)
                        messageApi.error({
                            content : Object.values(item)[0],
                            style : {
                                fontFamily : 'IRANSans'
                            }
                        })
                })
            }

        }
        setAnswerConfirmLoading(false)
        router.push(`../${questionnaire.uuid}/questioner-result`);
    }
    return <QuestionerPageContainer>
        {messageContext}
        <QuestionerContentBox style={{ flexDirection : 'column' }}>
            <QuestionsContainer>
                {
                    questionnaire.questions.map(item => item?.question &&
                        <QuestionContainer error={ErrorQuestions.find(ErrorItem => ErrorItem == item.question.id) ? 'active' : null}
                               id={'question' + item.question.id}>
                            <div className='question_header'>
                                <span>
                                    { digitsEnToFa(item.question.placement) + '.' }
                                </span>
                                <p>
                                    {item.question.title}
                                </p>
                            </div>
                            <p>
                                {item.question.description}
                            </p>
                            {SubComponentGenerator(item.question,answerSet,setErrorQuestions,ErrorQuestions)}
                        </QuestionContainer>)
                }
            </QuestionsContainer>

            <AddResultFooter>
                <Button type='primary' loading={AnswerConfirmLoading}  onClick={ConfirmAnswerHandler}>
                    ثبت پاسخ‌ها
                </Button>
                <Link href={`/questioner/dashboard/${questionnaire.uuid}/questioner-result/`}>
                    <Button danger>
                        انصراف
                    </Button>
                </Link>

            </AddResultFooter>
        </QuestionerContentBox>
    </QuestionerPageContainer>

}
