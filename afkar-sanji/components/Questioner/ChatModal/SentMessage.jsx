import {MessageMenuToggle, SentMessageContainer, SentMessageTextContainer} from "@/styles/common";
import {Icon} from "@/styles/icons";
import {convertToRegularTime} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingPanel";
import {axiosInstance} from "@/utilities/axios";
import {Button, Popover} from "antd";
import {useState} from "react";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {styled} from "styled-components";
import { motion } from 'framer-motion';

export const SentMessage = ({ messageData , setMessagesItems , ChatQuery , isAdmin , Questionnaire , setEditableMessage }) => {
    const [ messagePopover , setMessagePopover ] = useState(false);
    const [ deleteMessageLoading , setDeleteLoading ] = useState(false);
    const deleteMessage = async () => {
        setDeleteLoading(true)
        try {
            await axiosInstance.delete(`/${!isAdmin ? 'interview' :'admin'}-api/tickets/${messageData.id}/?interview_id=${Questionnaire ? Questionnaire.id : ''}`);

            setMessagesItems(prevState => prevState.filter(MessageItem => MessageItem.id !== messageData.id))
            // console.log()
            setTimeout(() => {
                setMessagePopover(false)
            },200)
        } catch (err) {
            console.log(err)
        } finally {
            setDeleteLoading(false);

        }
    }

    return <motion.div initial={{ x : 80 }} animate={{ x : 0 }} transition={{ duration: 0.4 }}>
        <div style={{ display : 'flex' , justifyContent : 'flex-end' }}>
            <SentMessageContainer>
                <SentMessageTextContainer>
                    <Popover open={messagePopover}
                             onOpenChange={() => setMessagePopover(false)}
                             trigger={'click'}
                             placement={'bottomRight'}
                             content={<PopoverContainer>
                                 <DeleteMessageButton style={{ width : '100%' }} loading={deleteMessageLoading} danger onClick={deleteMessage}>
                                     { !deleteMessageLoading && <Icon name={'OutlineTrashRed'}/>}
                                     <p>حذف</p>
                                 </DeleteMessageButton>
                                 <EditMessageButton onClick={() => {
                                     setEditableMessage({ id : messageData.id , text : messageData.text })
                                     setMessagePopover(false)
                                 }}>
                                     <p>ویرایش</p>
                                     <Icon name={'OutlinePen'} />
                                 </EditMessageButton>
                             </PopoverContainer>}>
                        <MessageMenuToggle onClick={() => setMessagePopover(!messagePopover)}>
                            <Icon name={'Menu'} />
                        </MessageMenuToggle>
                    </Popover>
                    <p>{messageData.text}</p>

                </SentMessageTextContainer>
                <div style={{ display : 'flex' , gap : 10 , alignItems : 'center' }}>
                    <p style={{ fontSize : 12 }}>
                        {digitsEnToFa(convertTimeTo12HourFormat(convertToRegularTime(messageData.sent_at).split(' ')[1]))}
                    </p>
                    <span>
                    <Icon style={{ width : 12 , height : 12 }} name={'GrayCheck'} />
                </span>
                </div>
            </SentMessageContainer>
        </div>
    </motion.div>
}
export function convertTimeTo12HourFormat(timeString) {
    const [hour24, minutes] = timeString.split(':').map(Number);

    let hour12 = hour24 % 12 || 12; // Convert 0 to 12
    const period = hour24 < 12 ? 'AM' : 'PM';

    // Pad single-digit minutes with leading zero
    const paddedMinutes = String(minutes).padStart(2, '0');

    return `${hour12}:${paddedMinutes} ${period}`;
}
const PopoverContainer = styled.div`
  padding: 8px;
  width: 145px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const DeleteMessageButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-direction: row-reverse;
  border: none !important;
  direction: rtl;
`
const EditMessageButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-direction: row-reverse;
  color: var(--Neutral-Gray9);
`