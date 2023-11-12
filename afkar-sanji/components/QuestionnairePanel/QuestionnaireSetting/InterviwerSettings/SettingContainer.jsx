import {AdminContact} from "@/components/QuestionnairePanel/QuestionnaireSetting/InterviwerSettings/AdminContact";
import {Interviewers} from "@/components/QuestionnairePanel/QuestionnaireSetting/InterviwerSettings/Interviewers";
import {Targetting} from "@/components/QuestionnairePanel/QuestionnaireSetting/InterviwerSettings/Targetting";

export const InterviewSettingContainer = ({ Questionnaire }) => {
    return <>
        <AdminContact Questionnaire={Questionnaire} />
        <Interviewers Questionnaire={Questionnaire} />
        <Targetting Questionnaire={Questionnaire} />
    </>
}