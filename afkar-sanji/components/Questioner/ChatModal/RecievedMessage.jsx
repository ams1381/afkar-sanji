import {SentMessageContainer , RecievedMessageTextContainer } from "@/styles/common";
import {Icon} from "@/styles/icons";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {convertToRegularTime} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingPanel";
import {useEffect} from "react";
import {axiosInstance} from "@/utilities/axios";

export const RecievedMessage = ({ messageData , Questionnaire , isAdmin }) => {

    useEffect(() => {
        const SeeMessage = async () => {
            try {
                await axiosInstance.patch(`/${!isAdmin ? 'interview' :'admin'}-api/tickets/${messageData.id}/?interview_id=${Questionnaire.id}`,{
                    is_read : true
                })
            } catch (err) {
            }
        }
        SeeMessage()
    }, []);

    return <div style={{ display : 'flex' , justifyContent : 'flex-start' }}>
        <SentMessageContainer>
            <RecievedMessageTextContainer>
                <p>{messageData.text}</p>
            </RecievedMessageTextContainer>
            <div style={{ display : 'flex' , gap : 10 , alignItems : 'center' }}>
                <p style={{ fontSize : 12 }}>
                    {digitsEnToFa(convertToRegularTime(messageData.sent_at).split(' ')[1])}
                </p>
            </div>
        </SentMessageContainer>
    </div>
}