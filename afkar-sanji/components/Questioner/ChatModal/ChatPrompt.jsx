import {Button, Input} from "antd";
import {Icon} from "@/styles/icons";
import {ChatPromptContainer} from "@/styles/common";
import {useEffect, useRef, useState} from "react";
import {axiosInstance} from "@/utilities/axios";
import {styled} from "styled-components";

export const ChatPrompt = ({ isAdmin , receiverID , messagesItems , setMessagesItems , Questionnaire , ChatQuery , setEditableMessage , editableMessage  }) => {
    const [ promptValue , setPromptValue ] = useState(null);
    const [ SendMessageLoading , setSendMessageLoading ] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if(editableMessage) {
            setPromptValue(editableMessage.text);
            inputRef.current?.focus();
        }

        else
            setPromptValue(null)
    }, [editableMessage]);
    const SendMessage = async () => {
        if(!promptValue)
            return
        setSendMessageLoading(true)
        let MessageObject = {
            text : promptValue
        }

        if(receiverID)
            MessageObject.receiver = receiverID;
        if(Questionnaire)
            MessageObject.interview = Questionnaire.id;
        else if(messagesItems.find(item => item.interview !== null)?.interview)
            MessageObject.interview = messagesItems.find(item => item.interview !== null)?.interview
        try {
            let { data } = await axiosInstance.post(`/${!isAdmin ? 'interview' :'admin'}-api/tickets/`,MessageObject)
            setMessagesItems(prevState => [...prevState,data])
            setPromptValue(null)
            // ChatQuery.refetch()
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
            setMessagesItems(prevState => {
                let messeageArrray = prevState;
                messeageArrray.find(item => item.id === editableMessage.id).text = promptValue;

                return messeageArrray;
            })
            setPromptValue(null)
            // ChatQuery.refetch()
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
               ref={inputRef}
               style={{ direction : 'rtl' }}
               placeholder={'چیزی بنویسید'} />
    </ChatPromptContainer>
}
const SendMessageButton = styled(Button)`
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
`
