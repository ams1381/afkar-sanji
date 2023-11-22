import {AdminContact} from "@/components/QuestionnairePanel/QuestionnaireSetting/InterviwerSettings/AdminContact";
import {Interviewers} from "@/components/QuestionnairePanel/QuestionnaireSetting/InterviwerSettings/Interviewers";
import {Targetting} from "@/components/QuestionnairePanel/QuestionnaireSetting/InterviwerSettings/Targetting";

export const InterviewSettingContainer = ({ Questionnaire , regions , ChangeDistrict , refetch , ToggleCheckBoxHandler }) => {
    return <>
        <AdminContact Questionnaire={Questionnaire} />
        <Interviewers Questionnaire={Questionnaire}
                      ToggleCheckBoxHandler={ToggleCheckBoxHandler}
                      regions={regions}
                      ChangeDistrict={ChangeDistrict}
                      refetch={refetch} />
        <Targetting Questionnaire={Questionnaire} refetch={refetch} />
    </>
}