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
import {useEffect, useState} from "react";
import {Skeleton, Tooltip} from "antd";
import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/utilities/axios";
import {digitsEnToFa} from "@persian-tools/persian-tools";

export const PricePopup = ({ setActivePricePopup , activePricePopup , QuestionnaireList }) => {
    const [ ActivePricePack , setActivePricePack ] = useState(null);
    const [ seletedPricePack , setSelectedPricePack ] = useState(null)
    const PricePacksQuery = useQuery(['PricePacksQuery'],
        async () => await axiosInstance.get('/admin-api/price-packs/'),{
            refetchOnWindowFocus : false,
            retry : false
        })
    console.log(PricePacksQuery)
    // useEffect(() => {
    //     if(document.querySelector(".price-items-container") && document.querySelector(".popupbody"))
    //         ScrollByDrag()
    // }, [document.querySelector(".price-items-container")]);

    return <>
        <ChatMask onClick={() => setActivePricePopup(null)} />
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
                <div style={{ textAlign : 'right' , fontSize : 14 , color : 'var(--primary-color)' , cursor : 'pointer' }}>
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
                            </> : PricePacksQuery.data.data.map(item => (<PricePack>
                                { item.id === seletedPricePack && <PricePackEditButtonsContainer>
                                    <PricePackDeleteButton>
                                        <Icon name={'WhiteTrash'}/>
                                    </PricePackDeleteButton>
                                    <PricePaakEditButton>
                                        <Icon name={'WhiteEdit'}/>
                                    </PricePaakEditButton>
                                </PricePackEditButtonsContainer>}
                                <PricePackContainer onClick={() => setSelectedPricePack(item.id)}
                                        selected={item.id === seletedPricePack}>
                                    <PricePackHeader>
                                        <p>{item.name}</p>
                                        <Tooltip overlayStyle={{ zIndex : 999999 , fontSize : 14 }} title={item.description ? item.description : ''}>
                                            <Icon name={'InfoIcon'} />
                                        </Tooltip>
                                    </PricePackHeader>
                                    <p className={'price-per-each'}>{digitsEnToFa(item.price)} تومان برای هر پاسخ </p>
                                </PricePackContainer>
                            </PricePack>))
                        }


                    </PricePacksItemsContainer>
                </PopupInfoContainer>
            </ChatMessageContainer>

        </PopupContainer>
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