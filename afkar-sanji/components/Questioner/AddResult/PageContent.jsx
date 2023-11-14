import {QuestionerContentBox, QuestionerPageContainer} from "@/styles/common";
import {
    AddResultFooter, DegreeItemsContainer, InputAnswerContainer,
    QuestionContainer,
    QuestionOptionsContainer,
    QuestionsContainer
} from "@/styles/Result/AddResult";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {SubComponentGenerator} from "@/components/Questioner/AddResult/QuestionSubCompGenerator";
import {Button, message} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAnswerSetArray, setInitialAnswerSet} from "@/utilities/stores/AnswerStore";
import axios from "axios";
import {AnswerSetFormDataConverter} from "@/utilities/FormData";
import Link from "next/link";
import {useRouter} from "next/router";
import { Skeleton } from "antd"
import {OptionalItemContainer} from "@/styles/questionnairePanel/QuestionComponent";
import {AuthContext} from "@/utilities/AuthContext";
import {axiosInstance} from "@/utilities/axios";

export const PageContent = ({ questionnaire }) => {
    const dispatcher = useDispatch();
    const router = useRouter();
    const Auth = useContext(AuthContext);
    const [ messageApi , messageContext ] = message.useMessage();
    const [ AnswerConfirmLoading , setAnswerConfirmLoading ] = useState(false)
    const [ ErrorQuestions , setErrorQuestions ] = useState([]);
    let AnswerSetsArray = useSelector(state => state.reducer.AnswerSet);
    useEffect(() => {
        if(questionnaire)
            dispatcher(setInitialAnswerSet({
                Questions : questionnaire.questions
            }))
    },[questionnaire])
    const ConfirmAnswerHandler = async () => {
        let AnswerSet = AnswerSetsArray;

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
            // if(!answerSet) {
                let { data } = await axiosInstance.post(`/interview-api/interviews/${questionnaire.uuid}/answer-sets/`);
                CreatedAnswerSet = data;
            // }

            if(FileQuestionQuestions && FileQuestionQuestions.length)
                await axiosInstance.post(`/interview-api/interviews/${questionnaire.uuid}/answer-sets/${CreatedAnswerSet.id}/add-answer/`,
                    AnswerSetFormDataConverter(FileQuestionQuestions),{
                    'Content-Type' : 'multipart/form-data'
                })
            await axiosInstance.post(`/interview-api/interviews/${questionnaire.uuid}/answer-sets/${CreatedAnswerSet.id}/add-answer/`,
                CopiedQuestionAnswerSet)
        }
        catch(err)
        {
            // console.log(err.response?.data)
            if(err.response?.status ==  500) {
                messageApi.error({
                    content : 'مشکل سمت سرور',
                    style : {
                        fontFamily : 'IRANSans'
                    }
                })
                setAnswerConfirmLoading(false)
                return
            }
            setAnswerConfirmLoading(false)
            if(err.response?.data?.questionnaire)
            {
                messageApi.error({
                    content : 'پرسشنامه فعال نیست یا امکان پاسخ دهی به آن وجود ندارد',
                    style : {
                        fontFamily : 'IRANSans'
                    }
                })
                return
            }
            if(err.response?.data)
            {

                if(!Array.isArray(err.response?.data))
                    return
                let ErrorsArray = err.response?.data.map(item => {
                    if(Object.keys(item).length)
                        return Object.keys(item)[0]
                })
                ErrorsArray.forEach(ErrorItem => {
                    if(ErrorItem) {
                        let QuestionElement = document.getElementById('question' + ErrorItem)
                        QuestionElement.scrollIntoView({behavior: 'smooth'});

                        setTimeout(() => {
                            const desiredOffset = window.innerHeight / 2 - QuestionElement.clientHeight / 2;
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
        // router.push(`../${questionnaire.uuid}/questioner-result`);
    }
    return questionnaire ? <QuestionerPageContainer>
        {messageContext}
        <QuestionerContentBox style={{ flexDirection : 'column' }}>
            <QuestionsContainer>
                 { (questionnaire && questionnaire.questions && AnswerSetsArray?.length) &&
                    questionnaire.questions.map(item => item?.question &&
                        <QuestionContainer error={ErrorQuestions.find(ErrorItem => ErrorItem == item.question.id) ? 'active' : null}
                               id={'question' + item.question.id}>
                            <div className='question_header'>
                                <span>
                                    { digitsEnToFa(item.question.placement) + '.' }

                                </span>
                                <p style={{ fontWeight : item?.question.question_type == 'group' ? 700 : 200 }}>
                                    {item.question.title}
                                </p>
                                { item.question.is_required ? '*' : '' }
                            </div>
                            <p className={'question_description'}>
                                {item.question.description}
                            </p>
                            {SubComponentGenerator(item.question,setErrorQuestions,ErrorQuestions,AnswerSetsArray)}
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
    </QuestionerPageContainer> : <QuestionerPageContainer>
        <QuestionerContentBox style={{ flexDirection : 'column' }}>
            <QuestionsContainer>
                <QuestionContainer>
                    <div className='question_header'>
                        <Skeleton.Input active style={{ height : 20 }} />
                    </div>
                    <p className={'question_description'}>
                        <Skeleton.Input active style={{ height : 20 , minWidth : 200 , width : 200 }} />
                    </p>
                    <QuestionOptionsContainer>
                        <OptionalItemContainer style={{ gap : 6 }}>
                            <Skeleton.Input active style={{ height : 20 , minWidth : 20 , width : 20 }} />
                            <Skeleton.Input active style={{ height : 20  }} />
                        </OptionalItemContainer>
                        <OptionalItemContainer style={{ gap : 6 }}>
                            <Skeleton.Input active style={{ height : 20 , minWidth : 20 , width : 20 }} />
                            <Skeleton.Input active style={{ height : 20  }} />
                        </OptionalItemContainer>
                        <OptionalItemContainer style={{ gap : 6 }}>
                            <Skeleton.Input active style={{ height : 20 , minWidth : 20 , width : 20 }} />
                            <Skeleton.Input active style={{ height : 20  }} />
                        </OptionalItemContainer>
                    </QuestionOptionsContainer>
                </QuestionContainer>
                <QuestionContainer>
                    <div className='question_header'>
                        <Skeleton.Input active style={{ height : 20 }} />
                    </div>
                    <p className={'question_description'}>
                        <Skeleton.Input active style={{ height : 20 , minWidth : 200 , width : 200 }} />
                    </p>
                    <InputAnswerContainer>
                        <Skeleton.Input active style={{ width : '100%' }} />
                    </InputAnswerContainer>
                </QuestionContainer>
                <QuestionContainer>
                    <div className='question_header'>
                        <Skeleton.Input active style={{ height : 20 }} />
                    </div>
                    <p className={'question_description'}>
                        <Skeleton.Input active style={{ height : 20 , minWidth : 200 , width : 200 }} />
                    </p>
                    <DegreeItemsContainer>
                        <OptionalItemContainer style={{ gap : 6 }}>
                            <Skeleton.Input active style={{ height : 20 , minWidth : 20 , width : 20 }} />
                            <Skeleton.Input active style={{ height : 20 , minWidth : 'auto' , width : '100%' }} />
                        </OptionalItemContainer>
                        <OptionalItemContainer style={{ gap : 6 }}>
                            <Skeleton.Input active style={{ height : 20 , minWidth : 20 , width : 20 }} />
                            <Skeleton.Input active style={{ height : 20 , minWidth : 'auto' , width : '100%' }} />
                        </OptionalItemContainer>
                        <OptionalItemContainer style={{ gap : 6 }}>
                            <Skeleton.Input active style={{ height : 20 , minWidth : 20 , width : 20 }} />
                            <Skeleton.Input active style={{ height : 20 , minWidth : 'auto' , width : '100%' }} />
                        </OptionalItemContainer>
                    </DegreeItemsContainer>
                </QuestionContainer>
                <QuestionContainer>
                    <div className='question_header'>
                        <Skeleton.Input active style={{ height : 20 }} />
                    </div>
                    <p className={'question_description'}>
                        <Skeleton.Input active style={{ height : 20 , minWidth : 200 , width : 200 }} />
                    </p>
                    <InputAnswerContainer>
                        <Skeleton.Input active style={{ width : '100%' }} />
                    </InputAnswerContainer>
                </QuestionContainer>
                <QuestionContainer>
                    <div className='question_header'>
                        <Skeleton.Input active style={{ height : 20 }} />
                    </div>
                    <p className={'question_description'}>
                        <Skeleton.Input active style={{ height : 20 , minWidth : 200 , width : 200 }} />
                    </p>
                    <QuestionOptionsContainer>
                        <OptionalItemContainer style={{ gap : 6 }}>
                            <Skeleton.Input active style={{ height : 20 , minWidth : 20 , width : 20 }} />
                            <Skeleton.Input active style={{ height : 20  }} />
                        </OptionalItemContainer>
                        <OptionalItemContainer style={{ gap : 6 }}>
                            <Skeleton.Input active style={{ height : 20 , minWidth : 20 , width : 20 }} />
                            <Skeleton.Input active style={{ height : 20  }} />
                        </OptionalItemContainer>
                    </QuestionOptionsContainer>
                </QuestionContainer>
            </QuestionsContainer>
        </QuestionerContentBox>

    </QuestionerPageContainer>

}
