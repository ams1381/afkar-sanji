import {Button, Input, InputNumber, message, Modal} from "antd";
import {RemoveModalButtonsContainer} from "@/styles/folders/Popup";
import React, {useState} from "react";
import styled from 'styled-components'
import {axiosInstance} from "@/utilities/axios";

export const AnswerCountPopup = ({ Questionnaire , refetch , countPopupOpen , setCountPopupOpen }) => {
    const [ answerCount , setAnswerCount ] = useState(Questionnaire.required_interviewer_count);
    const [ MessageApi , MessageContext ] = message.useMessage();
    const [ Loading , setLoading ] = useState(false);
     const ConfirmCount = async () => {
         setLoading(true)
         try {
             await  axiosInstance.patch(`/interview-api/interviews/${Questionnaire.uuid}/`,{
                 required_interviewer_count : answerCount
             })
             refetch()
         }
         catch (err) {
             setLoading(false)
             MessageApi.error({
                 content : Object.values(err?.response?.data)[0]
             })
         }
         finally {
             setLoading(false);
         }
     }

    return <>
        {MessageContext}
        <Modal mask={true}
               preserve={false}
               destroyOnClose={true}
               onCancel={() => setCountPopupOpen(false)}
               modalRender={(ReactNode) => <div style={{ direction : 'rtl' }}>{ReactNode}</div>}
               centered={true}
               closeIcon={true}
               title={<p>پرسشگران موردنیاز</p>}
               maskClosable={true}
               footer={<RemoveModalButtonsContainer style={{ direction : 'ltr' }}>
                   <Button type='primary' loading={Loading} onClick={ConfirmCount}>
                       ثبت
                   </Button>
                   <Button style={{ border : '1px solid var(--neutral-5, #D9D9D9) !important' , color : 'auto !important' }} onClick={() => setCountPopupOpen(false)}>
                       انصراف
                   </Button>
               </RemoveModalButtonsContainer>}
               open={countPopupOpen}>

            <ContentContainer>
                <p>تعداد</p>
                <div>
                    <NumberInput
                        onChange={(e) => setAnswerCount(e)}
                        value={answerCount ? answerCount : ''} />
                </div>
            </ContentContainer>
        </Modal>
    </>

}
const NumberInput = styled(InputNumber)`
  direction: ltr;
  width: 100%;
  border-radius: 2px;
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 24px 0;
`