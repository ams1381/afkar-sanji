import Image from 'next/image'
import React, {useState} from "react";
// style component
import {
    AfterBox, Container, ImageWallpaper, QuestionBox, Header, RightHeader, LeftHeader
} from 'styles/questioner/questioner'
// icons
import closeIcon from 'public/Icons/Dismiss.svg'
import arrowRightIcon from 'public/Icons/Chevron Double.svg'
// image
import backGround from 'public/Images/Group 1 1.png'
// data
import {liListData} from "@/utilities/data/questioner";
// ant design
import {Button} from 'antd';

const Questioner = () => {
    return (<Container>
            <QuestionBox>
                <Header>
                    <RightHeader>
                        <p>ثبت درخواست پرسشگری</p>
                        <h2>با جمع‌آوری دیدگاه‌های مختلف کسب درآمد کنید!</h2>

                        <Button className={`bottom`}
                        >
                            <img src={arrowRightIcon?.src}/>
                            تکمیل اطلاعات
                        </Button>
                    </RightHeader>
                    <LeftHeader>
                        {liListData?.map(item => (<li key={item?.id}>
                                <img className={`icon`} src={item?.icon} alt=""/>
                                <div className="text">{item?.text}</div>
                            </li>))}
                    </LeftHeader>
                </Header>
                <AfterBox/>
                <ImageWallpaper
                    src={backGround?.src} alt={''}/>
            </QuestionBox>
            <Image width={28}
                   height={28} className={'close'} src={closeIcon?.src} alt={'بستن'}/>
        </Container>)
}

export default Questioner