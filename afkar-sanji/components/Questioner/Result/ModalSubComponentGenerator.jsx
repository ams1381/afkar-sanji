import {digitsEnToFa} from "@persian-tools/persian-tools";
import {ModalSubComponentContainer, NoAnswerBoxContainer} from "@/styles/Result/QuestionerResult";
import {QuestionContainer} from "@/styles/Result/AddResult";
import {SubComponentGenerator} from "@/components/Questioner/AddResult/QuestionSubCompGenerator";
import React from "react";
import {Icon} from "@/styles/icons";
import {Upload} from "antd";

export const ModalSubComponentGenerator = (QuestionData , Answer,EditAnswerSetState,setErrorQuestions,ErrorQuestions) => {
    switch(QuestionData.question_type)
    {
        case 'email_field':
            return Answer.find(item => item.question_id == QuestionData.id) ? <ModalSubComponentContainer>
                <p style={{ fontWeight : 700 , whiteSpace : 'nowrap' }}> ایمیل: </p>
                <p>{
                    Answer.find(item => item.question_id == QuestionData.id)?.answer
                }</p>
            </ModalSubComponentContainer> : <NoAnswerBoxContainer>
                <p>به این سوال پاسخ داده نشده</p>
            </NoAnswerBoxContainer>
            break;
        case 'integer_range':
            return Answer.find(item => item.question_id == QuestionData.id)?.answer ? <ModalSubComponentContainer>
                <p style={{ fontWeight : 700 }}> طیف: </p>
                <p>{
                    Answer.find(item => item.question_id == QuestionData.id)?.answer
                }</p>
            </ModalSubComponentContainer>  : <NoAnswerBoxContainer>
                <p>به این سوال پاسخ داده نشده</p>
            </NoAnswerBoxContainer>
        case 'integer_selective':
            return Answer.find(item => item.question_id == QuestionData.id)?.answer ? <ModalSubComponentContainer>
                <p style={{ fontWeight : 700 }}> درجه: </p>
                <p>{
                    digitsEnToFa(Answer.find(item => item.question_id == QuestionData.id)?.answer)
                }</p>
            </ModalSubComponentContainer>  : <NoAnswerBoxContainer>
                <p>به این سوال پاسخ داده نشده</p>
            </NoAnswerBoxContainer>
        case 'number_answer':
            return Answer.find(item => item.question_id == QuestionData.id)?.answer  ? <ModalSubComponentContainer>
                <p style={{ fontWeight : 700 }}> عدد: </p>
                <p>{
                    Answer.find(item => item.question_id == QuestionData.id)?.answer ?
                        digitsEnToFa(Answer.find(item => item.question_id == QuestionData.id)?.answer) : ''
                }</p>
            </ModalSubComponentContainer> :  <NoAnswerBoxContainer>
                <p>به این سوال پاسخ داده نشده</p>
            </NoAnswerBoxContainer>
        case 'optional':
            return Answer.find(item => item.question_id == QuestionData.id)?.answer?.options?.length ? <ModalSubComponentContainer style={{ flexDirection : 'column' , gap : 40 }}>
                {
                    Answer.find(item => item.question_id == QuestionData.id)?.answer?.options?.
                    map((item,index) =>
                        <div className={'sort_item'}>
                            {/*<span>{digitsEnToFa(index + 1)}</span>*/}
                            <p>{item.text != 'null' ? digitsEnToFa(item.text) : ''}</p>
                        </div>)
                }
            </ModalSubComponentContainer> :
                <NoAnswerBoxContainer>
                    <p>به این سوال پاسخ داده نشده</p>
                </NoAnswerBoxContainer>
        case 'drop_down':
            return Answer.find(item => item.question_id == QuestionData.id)?.answer?.options?.length ? <ModalSubComponentContainer style={{ flexDirection : 'column' , gap : 40 }}>
                    {
                        Answer.find(item => item.question_id == QuestionData.id)?.answer?.options?.
                        map((item,index) =>
                            <div className={'sort_item'}>
                                {/*<span>{digitsEnToFa(index + 1)}</span>*/}
                                <p>{item.text != 'null' ? digitsEnToFa(item.text) : ''}</p>
                            </div>)
                    }
                </ModalSubComponentContainer> :
                <NoAnswerBoxContainer>
                    <p>به این سوال پاسخ داده نشده</p>
                </NoAnswerBoxContainer>
        case 'sort':
            return  <ModalSubComponentContainer style={{ flexDirection : 'column' , gap : 40 }}>
                {
                    Answer.find(item => item.question_id == QuestionData.id)?.answer?.
                        map((item,index) =>
                        <div className={'sort_item'}>
                            <span>{digitsEnToFa(index + 1)}</span>
                            <p>{item.text}</p>
                        </div>)
                }
            </ModalSubComponentContainer>
        case 'file':
            return Answer.find(item => item.question_id == QuestionData.id)?.answer ?
                <Upload isImageUrl={() => true} disabled
                    iconRender={() => <Icon name='File' />}
                    defaultFileList={[{
                            name: Answer.find(item => item.question_id == QuestionData.id)?.answer.split('/')[6],
                            status: 'done',
                            url: 'https://mah-api.ariomotion.com' +
                                Answer.find(item => item.question_id == QuestionData.id)?.answer,
                            thumbUrl : 'https://mah-api.ariomotion.com' +
                                Answer.find(item => item.question_id == QuestionData.id)?.answer
                        }]} /> :  <NoAnswerBoxContainer>
                <p>به این سوال پاسخ داده نشده</p>
            </NoAnswerBoxContainer>
        case 'group':
           return  QuestionData.child_questions?.map((ChildQuestionitem,index) => ChildQuestionitem?.question &&
                <QuestionContainer error={ErrorQuestions.find(ErrorItem => ErrorItem == item.question.id) ? 'active' : null} id={'question' + ChildQuestionitem.question.id}>
                    <div className='question_header'>
                               <span>
                                    { digitsEnToFa( (index + 1) + '-' + QuestionData.placement ) + '.' }
                                </span>
                        <p className={'question_title'}>
                            {ChildQuestionitem.question.title}
                        </p>
                        { ChildQuestionitem.question.is_required ? '*' : '' }
                    </div>
                    <p className={'question_description'}>
                        {ChildQuestionitem.question.description}
                    </p>
                    { EditAnswerSetState ?
                        SubComponentGenerator(ChildQuestionitem.question,null,setErrorQuestions,ErrorQuestions)
                        :
                        ModalSubComponentGenerator(ChildQuestionitem.question ,Answer,EditAnswerSetState)
                    }
                </QuestionContainer>)
            break;
        case 'link':
            return  Answer.find(item => item.question_id == QuestionData.id)?.answer ?
                <ModalSubComponentContainer>
                    <p style={{ fontWeight : 700 , whiteSpace : 'nowrap' }}> لینک: </p>
                    <p>{
                        Answer.find(item => item.question_id == QuestionData.id)?.answer
                    }</p>
                </ModalSubComponentContainer> : <NoAnswerBoxContainer>
                    <p>به این سوال پاسخ داده نشده</p>
                </NoAnswerBoxContainer>

    }
}