import {ChatHeaderTitle, ChatMask, ChatMessageContainer} from "@/styles/common";
import {PopupContainer,
    PopupHeader,
    PricePacksItemsContainer,
    PopupInfoContainer ,
    PricePackHeader ,
    PricePack,
    PricePaakEditButton,
    PricePackDeleteButton,
    PricePackEditButtonsContainer,
    PricePackContainer } from "@/styles/Admin/userInfoPopup";
import {Icon} from "@/styles/icons";
import React, {useEffect, useState} from "react";
import {message, Modal, Skeleton, Tooltip} from "antd";
import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/utilities/axios";
import {digitsEnToFa} from "@persian-tools/persian-tools";

export const PricePopup = ({ setActivePricePopup , setEditPricePack , refetch , activePricePopup , setPackPopupType , QuestionnaireList }) => {
    const [ ActivePricePack , setActivePricePack ] = useState(null);
    const [ selectedPricePack , setSelectedPricePack ] = useState(null)
    const [ MessageApi , MessageContext ] = message.useMessage();
    const PricePacksQuery = useQuery(['PricePacksQuery'],
        async () => await axiosInstance.get('/admin-api/price-packs/'),{
            refetchOnWindowFocus : false,
            retry : false
        })
    const [ errMessage , setErrMessage ] = useState(null);
    useEffect(() => {
        if(activePricePopup && QuestionnaireList.find(item => item.id === activePricePopup.id)) {
            setSelectedPricePack(QuestionnaireList.find(item => item.id === activePricePopup.id).price_pack.id)
            // console.log(QuestionnaireList.find(item => item.id === activePricePopup.id).price_pack)
        }

    }, [activePricePopup]);
    // console.log(QuestionnaireList.find(item => item.id === activePricePopup.id),selectedPricePack)
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
                // setErrMessage(Object.values(err?.response?.data)[0])
        }
    }
    // useEffect(() => {
    //     if(document.querySelector(".price-items-container") && document.querySelector(".popupbody"))
    //         ScrollByDrag()
    // }, [document.querySelector(".price-items-container")]);

    return <>
        {/*<ChatMask onClick={() => setActivePricePopup(null)} />*/}
        {MessageContext}
        <Modal mask={true}
               preserve={false}
               destroyOnClose={true}
               onCancel={() => setActivePricePopup(false)}
               modalRender={(ReactNode) => <div style={{ direction : 'ltr' }}>{ReactNode}</div>}
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
                    <div onClick={() => setPackPopupType('add-pack')} style={{ textAlign : 'right' , fontSize : 14 , color : 'var(--primary-color)' , cursor : 'pointer' }}>
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
                                        <PricePackDeleteButton>
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
const ScrollByDrag = () => {
    const slider = document.querySelector(".price-items-container");
    const body = document.querySelector(".popupbody");
    let isDown = false;
    let startX;
    let startY;
    let scrollTop;
    let scrollLeft;
    if(!slider)
        return
    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - body.offsetLeft;
        startY = e.pageY - body.offsetTop;
        scrollLeft = body.scrollLeft;
        scrollTop = body.scrollTop;

    });
    slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - body.offsetLeft;
        const y = e.pageY - body.offsetTop;
        const yWalk = (y - startY) * 3;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
        slider.scrollTop = scrollTop - yWalk;
    });
}