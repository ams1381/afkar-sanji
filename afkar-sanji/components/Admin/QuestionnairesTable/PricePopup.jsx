import {ChatHeaderTitle, ChatMask, ChatMessageContainer} from "@/styles/common";
import {
    PopupContainer,
    PopupHeader,
    PricePacksItemsContainer,
    PopupInfoContainer,
    PricePackHeader,
    PricePack,
    PricePaakEditButton,
    PricePackDeleteButton,
    PricePackEditButtonsContainer,
    PricePackContainer, ModalMainContainer
} from "@/styles/Admin/userInfoPopup";
import {Icon} from "@/styles/icons";
import React, {useEffect, useState} from "react";
import {message, Modal, Skeleton, Tooltip} from "antd";
import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/utilities/axios";
import {digitsEnToFa} from "@persian-tools/persian-tools";

export const PricePopup = ({
           setSelectedPricePack,
           setActivePricePopup,
           selectedPricePack,
           setDeletePricePackStatus,
           activePricePopup ,
           setEditPricePack ,
            setPricePacksList,
           refetch ,
           setPackPopupType
           , QuestionnaireList }) => {
    const [ MessageApi , MessageContext ] = message.useMessage();
    const PricePacksQuery = useQuery(['PricePacksQuery'],
        async () => await axiosInstance.get('/admin-api/price-packs/'),{
            refetchOnWindowFocus : false,
            retry : false
        })
    useEffect(() => {
        if(PricePacksQuery.data?.data)
            setPricePacksList(PricePacksQuery.data?.data)
    }, [PricePacksQuery]);
    useEffect(() => {
        if(activePricePopup && QuestionnaireList.find(item => item.id === activePricePopup.id)) {
            setSelectedPricePack(QuestionnaireList.find(item => item.id === activePricePopup.id).price_pack.id)
        }

    }, [activePricePopup]);
    const setPricePack = async (PackID) => {
        try {
            // if(selectedPricePack)
            await axiosInstance.post(`/admin-api/interviews/${QuestionnaireList.find(item => item.id === activePricePopup.id).uuid}/set-price-pack/`,{
                price_pack : PackID
            })
            setActivePricePopup(null)
            setTimeout(() => {
                refetch()
            },300)
        }
        catch (err) {
            if(err?.response?.data) {
                Object.values(err?.response?.data).forEach(item => {
                    MessageApi.error({
                        content : item
                    })
                })
            }
        }
    }

    return <>
        {MessageContext}
        <Modal mask={true}
               preserve={false}
               destroyOnClose={true}
               onCancel={() => setActivePricePopup(false)}
               modalRender={(ReactNode) => <ModalMainContainer>{ReactNode}</ModalMainContainer>}
               centered={true}
               closeIcon={true}
               title={<></>}
               maskClosable={true}
               footer={<></>}
               open={activePricePopup}>
            <PopupContainer style={{ height : 'auto' }}>
                <PopupHeader style={{ boxShadow : ''}}>
                    <div style={{ cursor : 'pointer' }} onClick={() => setActivePricePopup(null)}>
                        <Icon style={{ width : 12 , height : 12 }} name={'GrayClose'} />
                    </div>
                    <ChatHeaderTitle>
                        <p>
                            انتخاب بسته
                        </p>
                    </ChatHeaderTitle>
                </PopupHeader>
                <ChatMessageContainer>
                    <div onClick={() => {
                        setEditPricePack(false)
                        setPackPopupType('add-pack')
                    }}
                         style={{ textAlign : 'right' , fontSize : 14 , color : 'var(--primary-color)' , cursor : 'pointer' }}>
                        <p>یک بسته‌ جدید بسازید</p>
                    </div>
                    <PopupInfoContainer style={{ alignItems : 'flex-end' }} className={'popupbody'}>
                        <PricePacksItemsContainer className={'price-items-container'}>
                            {
                                PricePacksQuery.isLoading ? <>
                                    <PricePack>
                                        <PricePackContainer>
                                            <Skeleton.Input style={{ width : 40 , minWidth : 126 }} active />
                                        </PricePackContainer>
                                    </PricePack>
                                    <PricePack>
                                        <PricePackContainer>
                                            <Skeleton.Input style={{ width : 40 , minWidth : 126 }} active />
                                        </PricePackContainer>
                                    </PricePack>
                                    <PricePack>
                                        <PricePackContainer>
                                            <Skeleton.Input style={{ width : 40 , minWidth : 126 }} active />
                                        </PricePackContainer>
                                    </PricePack>
                                </> :
                                    PricePacksQuery.data.data.map(item => (<PricePack>
                                    { item.id === selectedPricePack && <PricePackEditButtonsContainer>
                                        <PricePackDeleteButton onClick={() => {
                                            !item.interviews.length ? setDeletePricePackStatus('allow') :
                                                setDeletePricePackStatus('forbidden')
                                            console.log(item)
                                            setPackPopupType('delete')
                                        }}>
                                            <Icon name={'WhiteTrash'}/>
                                        </PricePackDeleteButton>
                                        <PricePaakEditButton onClick={() => {
                                            setEditPricePack(true)
                                            setPackPopupType('add-price')
                                        }}>
                                            <Icon name={'WhiteEdit'}/>
                                        </PricePaakEditButton>
                                    </PricePackEditButtonsContainer>}
                                    <PricePackContainer onClick={async () => {
                                        // console.log(item)
                                        setSelectedPricePack(item.id)
                                        await setPricePack(item.id)

                                        // setTimeout(() =)
                                    }}
                                    selected={item.id === selectedPricePack}>
                                        <PricePackHeader>
                                            <p>{item.name}</p>
                                            <Tooltip overlayStyle={{ zIndex : 999999 , fontSize : 14 }} title={item.description ? item.description : ''}>
                                                <Icon name={'InfoIcon'} />
                                            </Tooltip>
                                        </PricePackHeader>
                                        <p style={{ direction : 'rtl' }} className={'price-per-each'}>{item.price && digitsEnToFa(item.price)} تومان برای هر پاسخ </p>
                                    </PricePackContainer>
                                </PricePack>))
                            }
                        </PricePacksItemsContainer>
                    </PopupInfoContainer>
                </ChatMessageContainer>

            </PopupContainer>
        </Modal>

    </>
}
