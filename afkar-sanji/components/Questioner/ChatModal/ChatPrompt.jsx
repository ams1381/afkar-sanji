import {Button, Input} from "antd";
import {Icon} from "@/styles/icons";
import {ChatPromptContainer} from "@/styles/common";
import {useEffect, useState} from "react";
import {axiosInstance} from "@/utilities/axios";
import {styled} from "styled-components";

export const ChatPrompt = ({ isAdmin , Questionnaire , ChatQuery , setEditableMessage , editableMessage  }) => {
    const [ promptValue , setPromptValue ] = useState(null);
    const [ SendMessageLoading , setSendMessageLoading ] = useState(false);

    useEffect(() => {
        if(editableMessage)
            setPromptValue(editableMessage.text)
        else
            setPromptValue(null)
    }, [editableMessage]);
    const SendMessage = async () => {
        if(!promptValue)
            return
        setSendMessageLoading(true)
        try {
            await axiosInstance.post(`/${!isAdmin ? 'interview' :'admin'}-api/tickets/`,{
                interview : Questionnaire.id ,
                text : promptValue
            })
            setPromptValue(null)
            ChatQuery.refetch()
        } catch (err) {

        }
        finally {
            setSendMessageLoading(false)
        }
    }
    const EditMessage = async  () => {
        setSendMessageLoading(true)
        if(!promptValue)
            return
        try {
            await axiosInstance.patch(`/${!isAdmin ? 'interview' :'admin'}-api/tickets/${editableMessage.id}/?interview_id=${Questionnaire.id}`,{
                text : promptValue
            })
            setEditableMessage(null)
            setPromptValue(null)
            ChatQuery.refetch()
        } catch (err) {

        }
        finally {
            setSendMessageLoading(false)
        }

    }
    return <ChatPromptContainer>
        { editableMessage ? <SendMessageButton type={'primary'} onClick={EditMessage} loading={SendMessageLoading}>
            <Icon name={'Check'} />
        </SendMessageButton> : <SendMessageButton type={'primary'} loading={SendMessageLoading}
                            onClick={promptValue ? SendMessage : () => {}}>
            {!SendMessageLoading && <Icon name={'SendMessage'}/>}
        </SendMessageButton>}
        <Input value={promptValue ? promptValue : ''}
               onKeyDown={e => e.key === 'Enter' ? editableMessage ? EditMessage() : SendMessage() : ''}
               onChange={(e) => setPromptValue(e.target.value)}
               placeholder={'چیزی بنویسید'} />
    </ChatPromptContainer>
}
const SendMessageButton = styled(Button)`
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
`
