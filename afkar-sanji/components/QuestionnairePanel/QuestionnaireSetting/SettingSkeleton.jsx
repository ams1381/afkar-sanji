import {
    QuestionnaireDatePickerContainer,
    QuestionnaireSettingContainer
} from "@/styles/questionnairePanel/QuestionnaireSetting";
import {Button, Skeleton} from "antd";
import {
    AdminContactBody,
    AdminContactHeader,
    AdminContactStatusContainer, AminContactContainer
} from "@/styles/questionnairePanel/QuestionSetting";
import {Icon} from "@/styles/icons";

export const SettingSekelton = () => {
    return <QuestionnaireSettingContainer style={{ background : 'none' }}>
        <QuestionnaireDatePickerContainer>
            <div className='picker_header' >
                <Skeleton.Input active style={{ minWidth : 40 , width : 115 }} />
                <Skeleton.Input active style={{ minWidth : 40 , width : 80 , borderRadius : 70 }} />
            </div>
            <div className='picker_container date_picker' >
                <Skeleton.Input active />
            </div>
        </QuestionnaireDatePickerContainer>
        <QuestionnaireDatePickerContainer>
            <div className='picker_header' >
                <Skeleton.Input active style={{ minWidth : 40 , width : 90 }} />
                <Skeleton.Input active style={{ minWidth : 40 , width : 80 , borderRadius : 70 }} />
            </div>
            <div className='picker_container date_picker' >
                <Skeleton.Input active />
            </div>
        </QuestionnaireDatePickerContainer>
        <AminContactContainer>
            <AdminContactHeader>
                <Skeleton.Button active />
                <Skeleton.Input active />
            </AdminContactHeader>
            <AdminContactBody>
                <Skeleton.Input active />
                <AdminContactStatusContainer>
                    <Skeleton.Input active />
                    <Skeleton.Input active />
                </AdminContactStatusContainer>
            </AdminContactBody>
        </AminContactContainer>
    </QuestionnaireSettingContainer>
}