import React, {useState} from "react";
import {Button, Modal} from "antd";
import {PopupContainer, PopupHeader} from "@/styles/Admin/userInfoPopup";
import {Icon} from "@/styles/icons";
import {ChatMessageContainer} from "@/styles/common";
import {styled} from "styled-components";
import {axiosInstance} from "@/utilities/axios";

export const DeletePricePackPopup = ({ pricePackRemovable ,
         pricePacksList ,
         setPricePackFilter,
         setSelectedPricePack,
         selectedPricePack ,
         deletePricePackStatus,
         packPopupType ,
         setPackPopupType  }) => {
    const [ deletePricePackLoading , setDeletePricePackLoading ] = useState(false);
    const [ errMessage , setErrMessage ] = useState(null);
    const DeletePricePackHandler = async () => {
        try {
            await axiosInstance.delete(`/admin-api/price-packs/${selectedPricePack}/`)
            setDeletePricePackLoading(true)
            setPackPopupType('view')
        } catch (err) {
            if(err?.response?.data && typeof err?.response?.data === 'object') {
                setErrMessage(Object.values(err?.response?.data)[0])
            }
        }
        finally {
            setDeletePricePackLoading(false)
        }
    }

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
                { deletePricePackStatus === 'forbidden' ? <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
                    <div style={{display: 'flex', gap: 10, flexDirection: 'row-reverse'}}>
                        <div>
                            <Icon name={'RedTrash'}/>
                        </div>
                        <div style={{
                            display: 'flex',
                            textAlign: 'right',
                            flexDirection: 'column',
                            gap: 8,
                            color: '#8F8F8F'
                        }}>
                            <p style={{color: 'black', fontSize: 16, fontWeight: 700}}>!امکان حذف این بسته وجود
                                ندارد</p>
                            <p>این بسته به پرسش‌نامه های {
                                pricePacksList.find(item => item.id === selectedPricePack).interviews.
                                map(InterviewItem => <span style={{ color : 'var(--primary-color)' }}>
                                    {InterviewItem.name}</span>)
                            } ، اختصاص یافته است. برای حذف آن ابتدا بسته پرسش‌نامه‌ها ذکر
                                شده را تغییر دهید.</p>
                        </div>
                    </div>
                    <div style={{width: '100%', display: 'flex', gap: 8, justifyContent: 'flex-start'}}>
                        <Button type={'primary'} onClick={() => {
                            setSelectedPricePack(null);
                            setPackPopupType(null);
                            let InterviewIDsArray = pricePacksList.find(item => item.id === selectedPricePack).interviews
                                .map(InterviewItem => InterviewItem.id);
                            setPricePackFilter('&price_pack_id=' + InterviewIDsArray.join('&price_pack_id='))
                        }}>
                            <p>مشاهده پرسش‌نامه‌ها</p>
                        </Button>
                        <Button onClick={() => setPackPopupType('view')}>
                            <p>بازگشت</p>
                        </Button>
                    </div>
                </div>
                : <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
                        <div style={{display: 'flex', gap: 10, flexDirection: 'row-reverse'}}>
                            <div>
                                <Icon name={'RedTrash'}/>
                            </div>
                            <div style={{
                                display: 'flex',
                                textAlign: 'right',
                                flexDirection: 'column',
                                gap: 8,
                                color: '#8F8F8F'
                            }}>
                                <p style={{color: 'black', fontSize: 16, fontWeight: 700}}>
                                    این بسته حذف شود؟
                                </p>
                                { errMessage &&  <p style={{color: 'var(--Error-color)'}}>{errMessage}</p>}
                            </div>
                        </div>
                        <div style={{width: '100%', display: 'flex', gap: 8, justifyContent: 'flex-start'}}>
                            <Button onClick={DeletePricePackHandler} loading={deletePricePackLoading} danger type={'primary'}>
                                <p>حذف</p>
                            </Button>
                            <Button onClick={() => setPackPopupType('view')}>
                                <p>بازگشت</p>
                            </Button>
                        </div>
                    </div>}


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
  @media screen and (max-width: 600px) {
    width: fit-content;
  }
`