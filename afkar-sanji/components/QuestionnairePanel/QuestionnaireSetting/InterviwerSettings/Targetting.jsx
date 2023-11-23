import {Button} from "antd";
import {Icon} from "@/styles/icons";
import {
    InterViewerTargetHeader,
    InterViewerTargetingContainer,
    InterViewerTargetingInfoContainer
    , InterViewerTimeRangeContainer
} from "@/styles/questionnairePanel/QuestionSetting";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {convertDate} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingPanel";
import {GoalPopup} from "@/components/QuestionnairePanel/QuestionnaireSetting/InterviwerSettings/GoalPopup";
import {useState} from "react";

export const Targetting = ({ Questionnaire , refetch }) => {
    const [ countPopupOpen , setCountPopupOpen ] = useState(false);


    return <InterViewerTargetingContainer>
        <GoalPopup countPopupOpen={countPopupOpen}
           Questionnaire={Questionnaire}
           refetch={refetch}
           setCountPopupOpen={setCountPopupOpen} />
        <InterViewerTargetHeader>
            <p className={'target-header-text'}>
                هدف‌گذاری
            </p>
        </InterViewerTargetHeader>
        <InterViewerTargetingInfoContainer>
            { Questionnaire.answer_count_goal ? <InterViewerTimeRangeContainer>
                <p>:در بازه‌ی زمانی </p>
                {Questionnaire.goal_start_date &&
                    <span>{digitsEnToFa(convertDate(Questionnaire.goal_start_date, 'jalali'))}</span>}
                <p>الی</p>
                {Questionnaire.goal_end_date &&
                    <span>{digitsEnToFa(convertDate(Questionnaire.goal_end_date, 'jalali'))}</span>}
                <p>باید {Questionnaire.answer_count_goal && digitsEnToFa(Questionnaire.answer_count_goal)} نتیجه ثبت
                    شود</p>
            </InterViewerTimeRangeContainer> : <InterViewerTimeRangeContainer>
                <p>تعیین نشده</p>
            </InterViewerTimeRangeContainer> }
            <Button onClick={() => setCountPopupOpen(true)}>
                <p>ویرایش</p>
                <Icon name={'ArrowLeftBlue'} />
            </Button>
        </InterViewerTargetingInfoContainer>
    </InterViewerTargetingContainer>
}