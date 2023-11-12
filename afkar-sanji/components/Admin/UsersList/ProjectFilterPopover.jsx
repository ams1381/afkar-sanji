import {Input} from "antd";
import {Icon} from "@/styles/icons";
import React from "react";
import {DateFilterContainer, InterviewerCodeSearchContainer} from "@/styles/Result/ResultPage";

export const ProjectFilterPopover = () => {

    return <DateFilterContainer>
        <InterviewerCodeSearchContainer>
            <Input placeholder={'چیزی بنویسید'} />
            <span style={{cursor : 'pointer' }}>
                                 <Icon style={{ width : 14 , height : 14 }} name={'Search'} />
                             </span>
        </InterviewerCodeSearchContainer>
        {/*<div style={{ textAlign : 'right' , color : 'var(--Neutral-Gray9)' }}>*/}
        {/*    <p>داده‌های غذایی نامی ‌نو</p>*/}
        {/*</div>*/}
    </DateFilterContainer>
}