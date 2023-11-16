import {
    AdminPanelContainer,
    LevelAssignmentContainer,
    ProgressBar,
    ProgressBarContainer,
    QuestionsSliderContainer
} from "@/styles/Admin/adminPanel";
import {Skeleton} from "antd";
import {
    EmailInputContainer,
    QuestionComponentContainer,
    QuestionDescription,
    QuestionTitle
} from "@/styles/questionnairePanel/QuestionComponent";
import React from "react";

export const LevelPageSkeleton = () => {
    return <AdminPanelContainer>
        <LevelAssignmentContainer>
            <ProgressBarContainer>
                <ProgressBar>
                    <Skeleton.Input active style={{ minWidth : 6 , width : 6 , height : 136 }} />
                </ProgressBar>
            </ProgressBarContainer>
            <QuestionsSliderContainer loading={true} style={{  alignItems : 'flex-end' , gap : 24 , paddingTop : 60 }}>
                <QuestionComponentContainer style={{ margin : 0,  width : '40%' , height : 146 , background : 'none' , boxShadow : 'none' }}>
                    <QuestionTitle>
                        <Skeleton.Input active style={{ height : 20 }} />
                    </QuestionTitle>
                    <QuestionDescription>
                        <Skeleton.Input active style={{ height : 20 }} />
                    </QuestionDescription>
                    <EmailInputContainer style={{ border : 'none' }}>
                        <Skeleton.Input active style={{ width : '100%' }} />
                    </EmailInputContainer>
                </QuestionComponentContainer>
                <QuestionComponentContainer style={{ opacity : 0.9 , margin : 0,  width : '40%' , height : 146 , background : 'none' , boxShadow : 'none' }}>
                    <QuestionTitle>
                        <Skeleton.Input active style={{ height : 20 }} />
                    </QuestionTitle>
                    <QuestionDescription>
                        <Skeleton.Input active style={{ height : 20 }} />
                    </QuestionDescription>
                    <EmailInputContainer style={{ border : 'none' }}>
                        <Skeleton.Input active style={{ width : '100%' }} />
                    </EmailInputContainer>
                </QuestionComponentContainer>
            </QuestionsSliderContainer>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div>
                    <Skeleton.Button active style={{ width : 150 }} />
                    <Skeleton.Button active style={{ width : 150 }} />
                </div>
            </div>
        </LevelAssignmentContainer>
    </AdminPanelContainer>
}