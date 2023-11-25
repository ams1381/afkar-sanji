import React from "react";
import {Button, Modal} from "antd";
import {PopupContainer, PopupHeader} from "@/styles/Admin/userInfoPopup";
import {Icon} from "@/styles/icons";
import {ChatMessageContainer} from "@/styles/common";
import {styled} from "styled-components";

export const DeletePricePackPopup = ({ pricePackRemovable , packPopupType , setPackPopupType  }) => {
    return  <Modal mask={true}
                   preserve={false}
                   destroyOnClose={true}
                   onCancel={() => setPackPopupType('')}
                   modalRender={(ReactNode) => <DeletePricePackContainer>{ReactNode}</DeletePricePackContainer>}
                   centered={true}
                   closeIcon={false}
                   title={<></>}
                   maskClosable={true}
                   footer={<></>}
                   open={packPopupType === 'delete'}>
        {/*<PopupContainer style={{ height : 'auto' }}>*/}
            <ChatMessageContainer style={{ padding : 32 }}>
                <div style={{ display : 'flex' , flexDirection : 'column' , gap : 24 }}>
                    <div style={{ display : 'flex' , gap : 10 , flexDirection : 'row-reverse' }}>
                        <div>
                            <Icon name={'RedTrash'} />
                        </div>
                        <div style={{ display : 'flex' , textAlign : 'right' , flexDirection : 'column' , gap : 8 , color  : '#8F8F8F' }}>
                            <p style={{ color : 'black' , fontSize : 16 , fontWeight : 700 }}>!امکان حذف این بسته وجود ندارد</p>
                            <p>این بسته به پرسش‌نامه های     ‍                                 ،                         اختصاص یافته است. برای حذف آن ابتدا بسته پرسش‌نامه‌ها ذکر شده را تغییر دهید.</p>
                        </div>
                    </div>
                    <div style={{ width : '100%' , display : 'flex' , gap : 8 , justifyContent : 'flex-start'}}>
                        <Button type={'primary'}>
                            <p>مشاهده پرسش‌نامه‌ها</p>
                        </Button>
                        <Button onClick={() => setPackPopupType('view')}>
                            <p>بازگشت</p>
                        </Button>
                    </div>
                </div>


            </ChatMessageContainer>
        {/*</PopupContainer>*/}
    </Modal>
}
const DeletePricePackContainer = styled.div`
  direction : ltr;
  width: 416px;
  margin: 0 auto;
  
  .ant-modal-content
  {
    padding: 0 !important;
  }
`