import {Checkbox} from "antd";
import {OptionalItemContainer} from "@/styles/questionnairePanel/QuestionComponent";
import {QuestionContainer, QuestionOptionsContainer} from "@/styles/Result/AddResult";
import {OptionalSubComponent} from "@/components/Questioner/AddResult/OptionalSubComponent";
import {InputSubComponent} from "@/components/Questioner/AddResult/InputSubComponent";
import {DegreeRangeSubComponent} from "@/components/Questioner/AddResult/DegreeRangeSubComponent";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import React from "react";
import {useSelector} from "react-redux";
import {SortSubComponent} from "@/components/Questioner/AddResult/SortSubComponent";
import {FileSubComponent} from "@/components/Questioner/AddResult/FileSubComponent";

export const ModalSubQuestionGenerator = (QuestionData,setErrorQuestions,ErrorQuestions,AnswerSetsArray,loadableAnswer) => {

    switch (QuestionData.question_type)
    {
        case 'optional':
        case 'drop_down':
            return <OptionalSubComponent QuestionData={QuestionData} loadableAnswer={loadableAnswer} answerSet={AnswerSetsArray}
                                         ErrorQuestions={ErrorQuestions}  setErrorQuestions={setErrorQuestions}/>
        case 'file':
            return <FileSubComponent QuestionData={QuestionData} loadableAnswer={loadableAnswer} answerSet={AnswerSetsArray}
                                     ErrorQuestions={ErrorQuestions} loadableAnswer={loadableAnswer} setErrorQuestions={setErrorQuestions}/>
        case 'link':
        case 'email_field':
        case 'text_answer':
        case 'number_answer':
            return <InputSubComponent QuestionData={QuestionData} setErrorQuestions={setErrorQuestions}
                                      ErrorQuestions={ErrorQuestions} loadableAnswer={loadableAnswer} answerSet={AnswerSetsArray} />
        case 'integer_selective':
        case 'integer_range':
            return <DegreeRangeSubComponent QuestionData={QuestionData} setErrorQuestions={setErrorQuestions}
                                            ErrorQuestions={ErrorQuestions} loadableAnswer={loadableAnswer} answerSet={AnswerSetsArray} />
        case 'sort':
            return <SortSubComponent QuestionData={QuestionData} setErrorQuestions={setErrorQuestions}
                                     ErrorQuestions={ErrorQuestions} loadableAnswer={loadableAnswer} answerSet={AnswerSetsArray}/>
        case 'group':
            return   QuestionData.child_questions.map((ChildQuestion,index) =>
                    AnswerSetsArray.some(AnswerItem => AnswerItem.question_id == ChildQuestion?.question.id) && <QuestionContainer key={ChildQuestion.question.id} error={ErrorQuestions.find(ErrorItem => ErrorItem == ChildQuestion.question.id) ? 'active' : null}
                                                                                                                                   id={'question' + ChildQuestion.question.id}>
                        <div className='question_header'>
                                <span>
                                    { digitsEnToFa( (index + 1) + '-' + QuestionData.placement ) + '.' }
                                </span>
                            <p>
                                {ChildQuestion.question.title}
                            </p>
                            { ChildQuestion.question.is_required ? '*' : '' }
                        </div>
                        <p className={'question_description'}>
                            {ChildQuestion.question.description}
                        </p>
                        {ModalSubQuestionGenerator(ChildQuestion.question,setErrorQuestions,ErrorQuestions,AnswerSetsArray,loadableAnswer)}
                    </QuestionContainer>
            )
    }
}