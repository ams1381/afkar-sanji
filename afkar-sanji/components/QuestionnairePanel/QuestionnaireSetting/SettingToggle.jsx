import {Switch} from "antd";
import {QuestionnaireDatePickerContainer} from "@/styles/questionnairePanel/QuestionnaireSetting";
import React from "react";

export const SettignToggle = ({ ToggleCheckBoxHandler , QuestionnaireData , ToggleName , ToggleText }) => {
    return <QuestionnaireDatePickerContainer
        style={(ToggleName === 'progress_bar' || ToggleName === 'previous_button') ? {
            borderBottom : 'none' ,
            marginRight : ToggleName === 'previous_button' ?  30 : 0
        } : {}}>
        <div className='picker_header' onClick={e => ToggleCheckBoxHandler(!QuestionnaireData[ToggleName], ToggleName)}>
            <p>{ToggleText}</p>
            {
                ToggleName === 'previous_button' ? <Switch disabled={!QuestionnaireData.show_question_in_pages}
                 checked={QuestionnaireData.previous_button && QuestionnaireData.show_question_in_pages} /> :
                <Switch checked={!QuestionnaireData[ToggleName]} />
            }
        </div>
        { !QuestionnaireData.show_question_in_pages && ToggleName === 'previous_button' &&
            <p className='disable_warning'>دکمه‌ها فقط در صورتی که در هر صفحه یک سوال نمایش داده‌شود فعال هستند.</p>
        }
    </QuestionnaireDatePickerContainer>
}
