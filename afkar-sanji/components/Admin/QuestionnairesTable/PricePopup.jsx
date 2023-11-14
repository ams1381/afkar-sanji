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
import {Tooltip} from "antd";

export const PricePopup = ({ setActivePricePopup , activePricePopup , QuestionnaireList }) => {
    const [ ActivePricePack , setActivePricePack ] = useState(null);
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
                        <PricePack>
                            <PricePackEditButtonsContainer>
                                <PricePackDeleteButton>
                                   <Icon name={'WhiteTrash'} />
                                </PricePackDeleteButton>
                                <PricePaakEditButton>
                                   <Icon name={'WhiteEdit'} />
                                </PricePaakEditButton>
                            </PricePackEditButtonsContainer>
                            <PricePackContainer>
                                <PricePackHeader>
                                    <p>داده‌های غذایی</p>
                                    <Tooltip overlayStyle={{ zIndex : 999999 , fontSize : 14 }} title={'لورم ایپسوم یک متن ساختگی است که در صنعت استفاده میشود و به کار می‌آید'}>
                                        <Icon name={'InfoIcon'} />
                                    </Tooltip>
                                </PricePackHeader>
                                <p className={'price-per-each'}>۲،۰۰۰ تومان برای هر پاسخ</p>
                            </PricePackContainer>
                        </PricePack>

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