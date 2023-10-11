import React, {useEffect, useState} from "react";
// style
import {
    AddBtn,
    ButtonContainer,
    Container,
    FromResumeItem,
    FromStep,
    FromStepScroll,
    InputCom,
    MakeHead,
    ResumeInputCom,
    RowCom,
} from "@/styles/questioner/resume/resume";
// component
import Step from 'components/Questioner/Resume/Step'
import BgSlide from "@/components/common/BgSlide";
import {yearDete, educationsMenu, lavelMenu, edu_type} from '@/utilities/data/date'
// icons
import close from 'public/Icons/Close.svg'
import add from 'public/Icons/addBlue.svg'
// antd
import {Button, message, Select} from 'antd'
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import {axiosInstance} from "@/utilities/axios";
import {Row} from "@/styles/questioner/information";
import Achievements from "@/components/Questioner/Resume/Achievements";
import EducationalBackgrounds from "@/components/Questioner/Resume/EducationalBackgrounds";
import Skills from "@/components/Questioner/Resume/Skills";
import WorkBackgrounds from "@/components/Questioner/Resume/WorkBackgrounds";
import ResearchHistories from "@/components/Questioner/Resume/ResearchHistories";
import {useQuery} from "@tanstack/react-query";

import {edu_types} from '@/utilities/data/date'

export default function () {
    const [work_backgrounds, setWork_backgrounds] = useState([{id: 1}])
    const [research_histories, setResearch_histories] = useState([{id: 1}])
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('سوابق تحصیلی')
    const [year, setYear] = useState(yearDete)
    const [educations, setEducations] = useState(educationsMenu)
    const [selectedEducation, setSelectedEducation] = useState();
    const [score, setScore] = useState(lavelMenu)
    const [gender, setGender] = useState('')
    const [edu_type,setEdu_type] = useState(edu_types)

    const onChange = (value) => {
        setCurrent(value);
        value === 0 && setTitle('سوابق تحصیلی')
        value === 1 && setTitle('مهارت')
        value === 2 && setTitle('افتخارات')
        value === 3 && setTitle('سابقه شغلی')
        value === 4 && setTitle('سابقه پژوهشی')
    };
// TODO cahnge
    return (<>
        <BgSlide/>
        <Step current={current} onChange={onChange}/>
        <MakeHead>
            <div className="title">رزومه‌ساز ماح</div>
            <div className="caption"> {title} خود را در این بخش وارد کنید</div>
        </MakeHead>
        <Container>
            <FromStep>
                {current === 0 && (<>
                    <div className="title"> : تحصیلات شماره ۱</div>
                    <EducationalBackgrounds
                        educations={educations}
                        year={year}
                        setGender={setGender}
                        setCurrent={setCurrent}
                        setTitle={setTitle}
                        edu_type={edu_type}
                        setEdu_type={setEdu_type}
                    />
                </>)}

                {current === 1 && (<>
                    <div className="title"> : مهارت ۲</div>
                    <Skills setCurrent={setCurrent}
                            setTitle={setTitle} score={score}
                            setSelectScore={score}
                          />
                </>)}
                {current === 2 && (<>
                    <div className="title"> : افتخارات ۳</div>
                    <Achievements setCurrent={setCurrent}
                                  setTitle={setTitle}
                                  setGender={setGender}
                                  year={year}/>

                </>)}
                {current === 3 && (<>
                    <div className="title"> : سابقه شغلی ۴</div>
                    <WorkBackgrounds setCurrent={setCurrent}
                                     setTitle={setTitle} work_backgrounds={work_backgrounds} setGender={setGender}
                                     year={year}
                                     setWork_backgrounds={setWork_backgrounds}/>
                </>)}
                {current === 4 && (<>
                    <div className="title"> : سابقه پژوهشی ۵</div>
                    <ResearchHistories research_histories={research_histories} setGender={setGender}
                                       setResearch_histories={setResearch_histories} year={year}/>
                </>)}
            </FromStep>

        </Container>

    </>)
}

export async function getServerSideProps(context) {
    const {req} = context;
    const cookies = req.headers.cookie;

    // Check if cookies are present
    if (cookies) {
        // Parse the cookies
        const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});
        return {
            props: {
                // Pass the cookies as props to the component
                cookies: parsedCookies,
            },
        };
    }

    return {
        redirect: {
            permanent: false,
            destination: "/auth"
        }
    };
}