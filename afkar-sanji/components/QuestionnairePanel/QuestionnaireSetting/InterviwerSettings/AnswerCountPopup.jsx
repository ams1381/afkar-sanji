import {Button, Input, InputNumber, Modal} from "antd";
import {RemoveModalButtonsContainer} from "@/styles/folders/Popup";
import React from "react";
import styled from 'styled-components'

export const AnswerCountPopup = ({ countPopupOpen , setCountPopupOpen }) => {
    return <Modal mask={true}
                  preserve={false}
                  destroyOnClose={true}
                  onCancel={() => setCountPopupOpen(false)}
                  modalRender={(ReactNode) => <div style={{ direction : 'rtl' }}>{ReactNode}</div>}
                  centered={true}
                  closeIcon={true}
                  title={<p>پرسشگران موردنیاز</p>}
                  maskClosable={true}
                  footer={<RemoveModalButtonsContainer style={{ direction : 'ltr' }}>
                      <Button type='primary' onClick={async () => {
                          // SetLoading(true)
                          // onOkay();
                          // setTimeout(() => {
                          //     SetLoading(false)
                          // },2000)

                      }}  >
                          ثبت
                      </Button>
                      <Button style={{ border : '1px solid var(--neutral-5, #D9D9D9) !important' , color : 'auto !important' }} onClick={() => setCountPopupOpen(false)}>
                          انصراف
                      </Button>
                  </RemoveModalButtonsContainer>}
                  open={countPopupOpen}>

        <div>
            <p>تعداد</p>
            <div>
                <NumberInput />
            </div>
        </div>
    </Modal>
}
const NumberInput = styled(InputNumber)`
  direction: ltr;
  width: 100%;
  border-radius: 2px;
`