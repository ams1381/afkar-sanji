import {Button, Input, message, Modal} from "antd";
import {RemoveModalButtonsContainer} from "@/styles/folders/Popup";
import React, {useState} from "react";
import {styled} from "styled-components";
import {axiosInstance} from "@/utilities/axios";

export const PricePopup = ({ Questionnaire , rejectPopup , setRejectPopup }) => {
    const [ MessageApi , MessageContext ] = message.useMessage();
    const [ inputValue , setInputValue  ] = useState(null);
    const  [ confirmLoading , setConfirmLoading ] = useState(false)
    const ConfirmComment = async () => {
        setConfirmLoading(true)
        try {
            await axiosInstance.post(`/interview-api/interviews/${Questionnaire.uuid}/reject-price/`,{
                message : inputValue
            })
            setRejectPopup(false)

        }
        catch (err) {
            setConfirmLoading(false);
            MessageApi.error({
                content : Object.values(err.response?.data)[0]
            })
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
                   <Button type='primary' onClick={ConfirmComment} loading={confirmLoading}>
                       ثبت
                   </Button>
                   <Button style={{ border : '1px solid var(--neutral-5, #D9D9D9) !important' , color : 'auto !important' }}
                           onClick={() => setRejectPopup(false)}>
                       انصراف
                   </Button>
               </RemoveModalButtonsContainer>}
               open={rejectPopup}>
            <ContentContainer>
                <p>چرا این قیمت را تایید نمی‌کنید؟</p>
                <CommentInput placeholder={'کوتاه و مختصر بنویسید'}
                              inputValue={inputValue}
                              onKeyDown={e => e.key === 'Enter' ? ConfirmComment() : ''}
                              onChange={(e) => setInputValue(e.target.value)} />
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