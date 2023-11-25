import React, {useEffect, useState} from "react";
import {
    Container,
    FromStep,
    MakeHead,
} from "@/styles/questioner/resume/resume";
import {Step} from '@/components/Questioner/Resume/Step'
import BgSlide from "@/components/common/BgSlide";
import {yearDete, educationsMenu, lavelMenu, edu_type} from '@/utilities/data/date'
import Achievements from "@/components/Questioner/Resume/Achievements";
import EducationalBackgrounds from "@/components/Questioner/Resume/EducationalBackgrounds";
import Skills from "@/components/Questioner/Resume/Skills";
import WorkBackgrounds from "@/components/Questioner/Resume/WorkBackgrounds";
import ResearchHistories from "@/components/Questioner/Resume/ResearchHistories";
import {edu_types} from '@/utilities/data/date'
import {AnimatePresence, motion} from 'framer-motion';
import {StepMobile} from "@/components/Questioner/Resume/Step";

export default function ({meData}) {
    const [work_backgrounds, setWork_backgrounds] = useState([{id: 1}])
    const [research_histories, setResearch_histories] = useState([{id: 1}])
    const [current, setCurrent] = useState(0);
    const [title, setTitle] = useState('سوابق تحصیلی خود را در این بخش وارد کنید')
    const [year, setYear] = useState(yearDete)
    const [educations, setEducations] = useState(educationsMenu)
    const [score, setScore] = useState(lavelMenu)
    const [gender, setGender] = useState('')
    const [edu_type, setEdu_type] = useState(edu_types)
    const listStatus = {
        0: 'سوابق تحصیلی خود را در این بخش وارد کنید',
        1: 'مهارت‌های خود را در این بخش وارد کنید',
        2: "افتخارات مرتبط با پرسش‌گری را در این بخش اضافه کنید",
        3: 'سوابق شغلی مرتبط با پرسش‌گری را در این بخش اضافه کنید',
        4: 'اگر در پژوهشی شرکت داشتید در این بخش وارد کنید',
    }

    const onChange = (value) => {
        if (value < current) {
            setTitle(listStatus[value])
            setCurrent(value);
        }
    };

    return (<>
        <AnimatePresence>
            <motion.div transition={{duration: 1}} initial={{y: 220}} animate={{y: 0}}>
                <BgSlide/>
                <Step current={current} onChange={onChange}/>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <StepMobile current={current} onChange={onChange}/>
                </div>
                <MakeHead>
                    <div className="title">رزومه‌ساز ماح</div>
                    <div className="caption">{title}</div>
                </MakeHead>
                <Container>
                    <FromStep>
                        {current === 0 && (<>
                            <div className="title"> : تحصیلات شماره ۱</div>
                            <EducationalBackgrounds
                                me={meData}
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
                                    me={meData}
                                    setTitle={setTitle} score={score}
                                    setSelectScore={score}
                            />
                        </>)}
                        {current === 2 && (<>
                            <div className="title"> : افتخارات ۳</div>
                            <Achievements me={meData} setCurrent={setCurrent}
                                          setTitle={setTitle}
                                          setGender={setGender}
                                          year={year}/>

                        </>)}
                        {current === 3 && (<>
                            <div className="title"> : سابقه شغلی ۴</div>
                            <WorkBackgrounds me={meData} setCurrent={setCurrent}
                                             setTitle={setTitle} work_backgrounds={work_backgrounds}
                                             setGender={setGender}
                                             year={year}
                                             setWork_backgrounds={setWork_backgrounds}/>
                        </>)}
                        {current === 4 && (<>
                            <div className="title"> : سابقه پژوهشی ۵</div>
                            <ResearchHistories me={meData} research_histories={research_histories} setGender={setGender}
                                               setResearch_histories={setResearch_histories} year={year}/>
                        </>)}
                    </FromStep>
                </Container>
            </motion.div>
        </AnimatePresence>

    </>)
}

export async function getServerSideProps(context) {
    const {req} = context;
    const cookies = req.headers.cookie;
    let MeData;
    const urlDest = req.url;
    // Check if cookies are present
    if (cookies) {
        // Parse the cookies
        const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});

        let MeResponse = await fetch('https://mah-api.codintofuture.ir/user-api/users/me/', {
            headers: {
                Authorization: `Bearer ${parsedCookies.access_token}`,
            }
        })
        MeData = await MeResponse.json();
        return {
            props: {
                // Pass the cookies as props to the component
                cookies: parsedCookies,
                meData: MeData ? MeData : null
            },
        };
    }

    return {
        redirect: {
            permanent: false,
            destination: "/auth?returnUrl=" + urlDest
        }
    };
}