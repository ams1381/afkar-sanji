import {MessageMenuToggle, SentMessageContainer, SentMessageTextContainer} from "@/styles/common";
import {Icon} from "@/styles/icons";
import {convertToRegularTime} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingPanel";
import {axiosInstance} from "@/utilities/axios";
import {Button, Popover} from "antd";
import {useState} from "react";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {styled} from "styled-components";

export const SentMessage = ({ messageData , Questionnaire , setEditableMessage }) => {
    const [ messagePopover , setMessagePopover ] = useState(false);
    const [ deleteMessageLoading , setDeleteLoading ] = useState(false);
    const deleteMessage = async () => {
        setDeleteLoading(true)
        try {
            await axiosInstance.delete(`/admin-api/tickets/${messageData.id}/`)
        } catch (err) {

        } finally {
            setDeleteLoading(false);
        }
    }

    // console.log(convertToRegularTime(messageData.sent_at).split(' ')[1])
    return <div style={{ display : 'flex' , justifyContent : 'flex-end' }}>
        <SentMessageContainer>
        <SentMessageTextContainer>
            <Popover open={messagePopover}
                     onOpenChange={() => setMessagePopover(false)}
                     trigger={'click'}
                     placement={'bottomRight'}
                     content={<PopoverContainer>
                         <DeleteMessageButton style={{ width : '100%' }} loading={deleteMessageLoading} danger onClick={deleteMessage}>
                             <p>حذف</p>
                             <Icon name={'OutlineTrashRed'} />
                         </DeleteMessageButton>
                         <EditMessageButton onClick={() => setEditableMessage({ id : messageData.id , text : messageData.text })}>
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
                    {digitsEnToFa(convertToRegularTime(messageData.sent_at).split(' ')[1])}
                </p>
                <span>
                    <Icon style={{ width : 12 , height : 12 }} name={'GrayCheck'} />
                </span>
            </div>

    </SentMessageContainer>
    </div>
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