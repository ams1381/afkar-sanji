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

export const Targetting = ({ Questionnaire }) => {
    return <InterViewerTargetingContainer>
        <InterViewerTargetHeader>
            <p className={'target-header-text'}>
                هدف‌گذاری
            </p>
        </InterViewerTargetHeader>
        <InterViewerTargetingInfoContainer>
            <InterViewerTimeRangeContainer>
                <p>:در بازه‌ی زمانی </p>
                { Questionnaire.goal_start_date && <span>{digitsEnToFa(convertDate(Questionnaire.goal_start_date,'jalali'))}</span>}
                <p>الی</p>
                { Questionnaire.goal_end_date && <span>{digitsEnToFa(convertDate(Questionnaire.goal_end_date,'jalali'))}</span>}
                <p>باید { digitsEnToFa(Questionnaire.answer_count_goal) } نتیجه ثبت شود</p>
            </InterViewerTimeRangeContainer>

            <Button>
                <p>ویرایش</p>
                <Icon name={'ArrowLeftBlue'} />
            </Button>
        </InterViewerTargetingInfoContainer>
    </InterViewerTargetingContainer>
}