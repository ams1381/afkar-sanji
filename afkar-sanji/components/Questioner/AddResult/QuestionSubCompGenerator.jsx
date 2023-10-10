import {Checkbox} from "antd";
import {OptionalItemContainer} from "@/styles/questionnairePanel/QuestionComponent";
import {QuestionContainer, QuestionOptionsContainer} from "@/styles/Result/AddResult";
import {OptionalSubComponent} from "@/components/Questioner/AddResult/OptionalSubComponent";
import {InputSubComponent} from "@/components/Questioner/AddResult/InputSubComponent";
import {DegreeRangeSubComponent} from "@/components/Questioner/AddResult/DegreeRangeSubComponent";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import React from "react";

export const SubComponentGenerator = (QuestionData,answerSet,setErrorQuestions,ErrorQuestions) => {
    switch (QuestionData.question_type)
    {
        case 'optional':
        case 'drop_down':
            return <OptionalSubComponent QuestionData={QuestionData} answerSet={answerSet}
                     ErrorQuestions={ErrorQuestions}  setErrorQuestions={setErrorQuestions}/>
        case 'link':
        case 'email_field':
        case 'text_answer':
        case 'number_answer':
            return <InputSubComponent QuestionData={QuestionData} setErrorQuestions={setErrorQuestions}
                      ErrorQuestions={ErrorQuestions} answerSet={answerSet} />
        case 'integer_selective':
        case 'integer_range':
           return <DegreeRangeSubComponent QuestionData={QuestionData}
               ErrorQuestions={ErrorQuestions} answerSet={answerSet} />
        case 'group':
            QuestionData.child_questions.forEach(ChildQuestion => {
              return  <QuestionContainer error={ErrorQuestions.find(ErrorItem => ErrorItem == ChildQuestion.question.id) ? 'active' : null}
                                   id={'question' + ChildQuestion.question.id}>
                    <div className='question_header'>
                                <span>
                                    { digitsEnToFa(ChildQuestion.question.placement) + '.' }
                                </span>
                        <p>
                            {ChildQuestion.question.title}
                        </p>
                    </div>
                    <p>
                        {ChildQuestion.question.description}
                    </p>
                    {SubComponentGenerator(ChildQuestion.question,answerSet,setErrorQuestions,ErrorQuestions)}
                </QuestionContainer>
            })
            break;
    }
}