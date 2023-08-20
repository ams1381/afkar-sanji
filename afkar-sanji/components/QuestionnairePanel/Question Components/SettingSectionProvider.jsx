import React from 'react'
import SettingMultipleAnswer from './Multiple Choice/SettingMultipleAnswer'
import SettingQWanswer from './QWanswer/SettingQWanswer'
import { SettingPrioritize } from './Prioritize/SettingPrioritze'
import { RateQuestionSetting } from './Rating/RateQuestionSetting'
import { SettingDropDownAnswer } from './Drop Down/SettingDropDownAnswer'
import { SettingNumberAnswer } from './Number Answer/SettingNumberAnswer'

export const SettingSectionProvider = (Type , QuestionInfo) => {
    switch(Type)
    {
        case 'optional':
            return <SettingMultipleAnswer />
        case 'drop_down':
            return <SettingDropDownAnswer/>
        case 'integer_selective':
            return <RateQuestionSetting />
        case 'integer_range':
            return <></>
        case 'sort':
            return <SettingPrioritize />
        case 'link':
            return <></>
        case 'email_field':
            return <></>
        case 'file':
            return <></>
        case 'numberanswer':
            return <SettingNumberAnswer />
        case 'textanswer':
            return <SettingQWanswer />
        case 'welcome':
            return <></>
        case 'thank':
            return <></>
    }
}
