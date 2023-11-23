import {RecommandedMessage} from "@/styles/common";
import React, {useState} from "react";
import {axiosInstance} from "@/utilities/axios";

export const ReadyMessageToSend = ({ MessageText , ChatQuery , Questionnaire , isAdmin }) => {
    const [ SendMessageLoading , setSendMessageLoading ] = useState(false);
    const SendMessage = async () => {
        setSendMessageLoading(true)
        try {
            await axiosInstance.post(`/${!isAdmin ? 'interview' :'admin'}-api/tickets/`,{
                interview : Questionnaire.id ,
                text : MessageText
            })
            ChatQuery.refetch()
        } catch (err) {

        }
        finally {
            setSendMessageLoading(false)
        }
    }
    return <RecommandedMessage onClick={SendMessage} loading={SendMessageLoading}>
        <p>{MessageText}</p>
    </RecommandedMessage>
}