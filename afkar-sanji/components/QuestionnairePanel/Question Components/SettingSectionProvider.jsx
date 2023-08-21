import React from 'react'
import SettingMultipleAnswer from './Multiple Choice/SettingMultipleAnswer'
import SettingQWanswer from './QWanswer/SettingQWanswer'
import { SettingPrioritize } from './Prioritize/SettingPrioritze'
import { RateQuestionSetting } from './Rating/RateQuestionSetting'
import { SettingDropDownAnswer } from './Drop Down/SettingDropDownAnswer'
import { SettingNumberAnswer } from './Number Answer/SettingNumberAnswer'
import { CommonSetting } from './Common/CommonSetting'

export const SettingSectionProvider = (Type , QuestionInfo) => {
    switch(Type)
    {
        case 'optional':
            return <SettingMultipleAnswer QuestionInfo={QuestionInfo}/>
        case 'drop_down':
            return <SettingDropDownAnswer QuestionInfo={QuestionInfo}/>
        case 'integer_selective':
            return <RateQuestionSetting QuestionInfo={QuestionInfo} />
        case 'integer_range':
            return <CommonSetting QuestionInfo={QuestionInfo}/>
        case 'sort':
            return <SettingPrioritize QuestionInfo={QuestionInfo}/>
        case 'link':
            return <CommonSetting QuestionInfo={QuestionInfo}/>
        case 'email_field':
            return <CommonSetting QuestionInfo={QuestionInfo}/>
        case 'file':
            return <></>
        case 'numberanswer':
            return <SettingNumberAnswer QuestionInfo={QuestionInfo}/>
        case 'textanswer':
            return <SettingQWanswer QuestionInfo={QuestionInfo}/>
        case 'welcome':
            return <></>
        case 'thank':
            return <></>
    }
}
