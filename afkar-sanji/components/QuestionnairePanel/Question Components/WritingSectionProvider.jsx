import React from 'react'
import MultipleAnswer from './Multiple Choice/WriteMultipleAnswer'
import { QWanswerWrite } from './QWanswer/WriteQWanswer'
import { WritePrioritize } from './Prioritize/WritePrioritize'
import { RateQuestionWrite } from './Rating/RateQuestionWrite'
import { WriteDropDownAnswer } from './Drop Down/WriteDropDownAnswer'
import { RangeWrite } from './Range/RangeWrite'

export const WritingSectionProvider = (Type , QuestionInfo) => {
  switch(Type)
    {
        case 'optional':
            return <MultipleAnswer QuestionInfo={QuestionInfo}/>
        case 'drop_down':
            return <WriteDropDownAnswer QuestionInfo={QuestionInfo}/>
        case 'integer_selective':
            return <RateQuestionWrite QuestionInfo={QuestionInfo}/>
        case 'integer_range':
            return <RangeWrite QuestionInfo={QuestionInfo} />
        case 'sort':
            return <WritePrioritize QuestionInfo={QuestionInfo}/>
        case 'link':
            return <></>
        case 'email_field':
            return <></>
        case 'file':
            return <></>
        case 'numberanswer':
            return <></>
        case 'textanswer':
            return <QWanswerWrite QuestionInfo={QuestionInfo}/>
  }
}
