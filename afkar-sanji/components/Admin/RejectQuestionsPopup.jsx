import {Button, Input, message, Modal} from "antd";
import {RemoveModalButtonsContainer} from "@/styles/folders/Popup";
import React, {useState} from "react";
import {styled} from "styled-components";
import {axiosInstance} from "@/utilities/axios";

export const RejectQuestionsPopup = ({ rejectPopup , setRejectPopup , Questionnaire }) => {
    const [ MessageApi , MessageContext ] = message.useMessage();
    const  [ confirmLoading , setConfirmLoading ] = useState(false)
    const [ inputValue , setInputValue  ] = useState(null);


    const RejectContent = async  () => {
        setConfirmLoading(true)
        try {
            await axiosInstance.post(`admin-api/interviews/${Questionnaire.uuid}/reject-content/`,{
                message : inputValue
            })
        }
        catch (err) {
            console.log(err)
            // setConfirmLoading(false);
            // MessageApi.error({
            //     content : Object.values(err.response?.data)[0]
            // })
        }
        finally {
            setConfirmLoading(false)
        }
    }
    return <>
        {MessageContext}
        <Modal mask={true}
               preserve={false}
               destroyOnClose={true}
               onCancel={() => setRejectPopup(false)}
               modalRender={(ReactNode) => <div style={{ direction : 'rtl' }}>{ReactNode}</div>}
               centered={true}
               closeIcon={true}
               title={<p>پرسشگران موردنیاز</p>}
               maskClosable={true}
               footer={<RemoveModalButtonsContainer style={{ direction : 'ltr' }}>
                   <Button type='primary' onClick={RejectContent} loading={confirmLoading}>
                       ارسال به پرسش‌گر
                   </Button>
                   <Button  danger onClick={() => setRejectPopup(false)}>
                       انصراف
                   </Button>
               </RemoveModalButtonsContainer>}
               open={rejectPopup}>
            <ContentContainer>
                <p>چرا این قیمت را تایید نمی‌کنید؟</p>
                <CommentInput placeholder={'کوتاه و مختصر بنویسید'} inputValue={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            </ContentContainer>
        </Modal>
    </>
}
const CommentInput = styled(Input)`
  direction: ltr;
  width: 100%;
  border-radius: 2px;
  font-family: IRANSans;
  text-align: right;
`
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 24px 0;
`