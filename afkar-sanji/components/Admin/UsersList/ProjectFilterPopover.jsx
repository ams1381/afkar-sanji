import {Input} from "antd";
import {Icon} from "@/styles/icons";
import React, {useState} from "react";
import {DateFilterContainer, InterviewerCodeSearchContainer} from "@/styles/Result/ResultPage";

export const ProjectFilterPopover = ({ setInterviewSearch , InterviewSearch }) => {
    const [ interviewInputValue , setInterviewInputValue ] = useState(null);
    let delayTimer;
    const searchInterviewHadnler = async (e) => {
        setInterviewInputValue(e.target.value)
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function() {

            // Do the ajax stuff
            if(!e.target.value?.length)
                setInterviewSearch(null)
            else
                setInterviewSearch(e.target.value)
        }, 1000);
    }

    return <DateFilterContainer>
        <InterviewerCodeSearchContainer>
            <Input onChange={searchInterviewHadnler} placeholder={'چیزی بنویسید'} value={interviewInputValue} />
            <span style={{cursor : 'pointer' }}>
                                 <Icon style={{ width : 14 , height : 14 }} name={'Search'} />
                             </span>
        </InterviewerCodeSearchContainer>
        {/*<div style={{ textAlign : 'right' , color : 'var(--Neutral-Gray9)' }}>*/}
        {/*    <p>داده‌های غذایی نامی ‌نو</p>*/}
        {/*</div>*/}
    </DateFilterContainer>
}