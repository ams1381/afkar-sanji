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


export default function () {
    const [educational_backgrounds, setEducational_backgrounds] = useState([{id: 1}]);
    const [skills, setSkills] = useState([{id: 1}])
    const [achievements, setAchievements] = useState([{id: 1}])
    const [work_backgrounds, setWork_backgrounds] = useState([{id: 1}])
    const [research_histories, setResearch_histories] = useState([{id: 1}])
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('سوابق تحصیلی')
    const [year, setYear] = useState([{value: '1350', label: '۱۳۵۰'},
        {value: '1972', label: '۱۳۵۱'},
        {value: '1973', label: '۱۳۵۲'},
        {value: '1974', label: '۱۳۵۳'},
        {value: '1975', label: '۱۳۵۴'},
        {value: '1976', label: '۱۳۵۵'},
        {value: '1977', label: '۱۳۵۶'},
        {value: '1978', label: '۱۳۵۷'},
        {value: '1979', label: '۱۳۵۸'},
        {value: '1980', label: '۱۳۵۹'},
        {value: '1981', label: '۱۳۶۰'},
        {value: '1982', label: '۱۳۶۱'},
        {value: '1983', label: '۱۳۶۲'},
        {value: '1984', label: '۱۳۶۳'},
        {value: '1985', label: '۱۳۶۴'},
        {value: '1986', label: '۱۳۶۵'},
        {value: '1987', label: '۱۳۶۶'},
        {value: '1988', label: '۱۳۶۷'},
        {value: '1989', label: '۱۳۶۸'},
        {value: '1990', label: '۱۳۶۹'},
        {value: '1991', label: '۱۳۷۰'},
        {value: '1992', label: '۱۳۷۱'},
        {value: '1993', label: '۱۳۷۲'},
        {value: '1994', label: '۱۳۷۳'},
        {value: '1995', label: '۱۳۷۴'},
        {value: '1996', label: '۱۳۷۵'},
        {value: '1997', label: '۱۳۷۶'},
        {value: '1998', label: '۱۳۷۷'},
        {value: '1999', label: '۱۳۷۸'},
        {value: '2000', label: '۱۳۷۹'},
        {value: '2001', label: '۱۳۸۰'},
        {value: '2002', label: '۱۳۸۱'},
        {value: '2003', label: '۱۳۸۲'},
        {value: '2004', label: '۱۳۸۳'},
        {value: '2005', label: '۱۳۸۴'},
        {value: '2006', label: '۱۳۸۵'},
        {value: '2007', label: '۱۳۸۶'},
        {value: '2008', label: '۱۳۸۷'},
        {value: '2009', label: '۱۳۸۸'},
        {value: '2010', label: '۱۳۸۹'},
        {value: '2011', label: '۱۳۹۰'},
        {value: '2012', label: '۱۳۹۱'},
        {value: '2013', label: '۱۳۹۲'},
        {value: '2014', label: '۱۳۹۳'},
        {value: '2015', label: '۱۳۹۴'},
        {value: '2016', label: '۱۳۹۵'},
        {value: '2017', label: '۱۳۹۶'},
        {value: '2018', label: '۱۳۹۷'},
        {value: '2019', label: '۱۳۹۸'},
        {value: '2020', label: '۱۳۹۹'},
        {value: '2021', label: '۱۴۰۰'},
        {value: '2022', label: '۱۴۰۱'},
        {value: '2023', label: '۱۴۰۲'}])
    const [educations, setEducations] = useState([
        {value: 'DP', label: 'دیپلم'},
        {value: 'AD', label: 'فوق دیپلم'},
        {value: 'BD', label: 'لیسانس'},
        {value: 'MD', label: 'فوق لیسانس'},
        {value: 'PhD', label: 'دکترا'},
    ])
    const [selectedEducation, setSelectedEducation] = useState();
    const [score, setScore] = useState([
        {value: '1', label: '۱'},
        {value: '2', label: '۲'},
        {value: '3', label: '۳'},
        {value: '4', label: '۴'},
        {value: '5', label: '۵'},
        {value: '6', label: '۶'},
        {value: '7', label: '۷'},
        {value: '8', label: '۸'},
        {value: '9', label: '۹'},
        {value: '10', label: '۱۰'},
    ])
    const [selectScore, setSelectScore] = useState()
    const [gender, setGender] = useState('')

    const onChange = (value) => {
        setCurrent(value);
        value === 0 && setTitle('سوابق تحصیلی')
        value === 1 && setTitle('مهارت')
        value === 2 && setTitle('افتخارات')
        value === 3 && setTitle('سابقه شغلی')
        value === 4 && setTitle('سابقه پژوهشی')
    };

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
                                            setSelectedEducation={setSelectedEducation}
                                            year={year}
                                            setGender={setGender}

                                            setCurrent={setCurrent}
                                            setTitle={setTitle}/>
                </>)}

                {current === 1 && (<>
                    <div className="title"> : مهارت ۲</div>
                    <Skills setCurrent={setCurrent}
                            setTitle={setTitle} skills={skills} score={score}
                            setSelectScore={score}
                            setSkills={setSkills}/>
                </>)}
                {current === 2 && (<>
                    <div className="title"> : افتخارات ۳</div>
                    <Achievements setCurrent={setCurrent}
                                  setTitle={setTitle} achievements={achievements} setAchievements={setAchievements}
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