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


export default function () {
    // achievements دستاوردها
    // educational-backgrounds پیشینه تحصیلی
    // research-histories تحقیق-تاریخ
    // skills مهارت ها
    // work-backgrounds پیشینه شغلی
    // step items
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

    // educational-backgrounds
    function removeEducational(id) {
        setEducational_backgrounds(prevItems => prevItems.filter(item => item.id !== id));
        message.success('با موفقیت حذف شد')
    }

    function addEducational() {
        setEducational_backgrounds(prevItems => [...prevItems, {id: prevItems.length + 1}]);
        message.success('با موفقیت اضافه شد')
    }

    // skills
    function removeSkills(id) {
        setSkills(prevItems => prevItems.filter(item => item.id !== id));
        message.success('با موفقیت حذف شد')
    }

    function addSkills() {
        setSkills(prevItems => [...prevItems, {id: prevItems.length + 1}]);
        message.success('با موفقیت اضافه شد')
    }

    // achievements
    function removeAchievements(id) {
        setAchievements(prevItems => prevItems.filter(item => item.id !== id));
        message.success('با موفقیت حذف شد')
    }

    function addAchievements() {
        setAchievements(prevItems => [...prevItems, {id: prevItems.length + 1}]);
        message.success('با موفقیت اضافه شد')
    }

    // work
    function removeWork(id) {
        setWork_backgrounds(prevItems => prevItems.filter(item => item.id !== id));
        message.success('با موفقیت حذف شد')
    }

    function addWork() {
        setWork_backgrounds(prevItems => [...prevItems, {id: prevItems.length + 1}]);
        message.success('با موفقیت اضافه شد')
    }

    // research_histories
    function removeResearch_histories(id) {
        setResearch_histories(prevItems => prevItems.filter(item => item.id !== id));
        message.success('با موفقیت حذف شد')
    }

    function addResearch_histories() {
        setResearch_histories(prevItems => [...prevItems, {id: prevItems.length + 1}]);
        message.success('با موفقیت اضافه شد')
    }

    const onChange = (value) => {
        console.log(value)
        // setCurrent(value);
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
                    <FromStepScroll>
                        {educational_backgrounds.map(item => (
                            <FromResumeItem flexDirection={'column'} key={item.id}>
                                <Row>
                                    <ResumeInputCom>
                                        <div className="title">مقطع مدرک</div>
                                        <Select
                                            style={{
                                                width: '100%',
                                                height: '40px',
                                                textAlign: 'right',
                                                padding: '0',
                                                boxShadow: 'none',
                                                direction: 'rtl'
                                            }}
                                            placeholder={'PHD : مثال'}
                                            options={educations}
                                            onChange={(e) => setSelectedEducation(e)}
                                        />
                                    </ResumeInputCom>
                                    <ResumeInputCom>
                                        <div className="title">سال پایان</div>
                                        <Select
                                            style={{
                                                width: '100%',
                                                height: '40px',
                                                textAlign: 'right',
                                                padding: '0',
                                                boxShadow: 'none',
                                                direction: 'rtl'
                                            }}
                                            placeholder={'انتخاب کنید'}
                                            options={year}
                                            onChange={(e) => setGender(e)}
                                        />
                                    </ResumeInputCom>
                                    <ResumeInputCom>
                                        <div className="title">سال شروع</div>
                                        <Select
                                            style={{
                                                width: '100%',
                                                height: '40px',
                                                textAlign: 'right',
                                                padding: '0',
                                                boxShadow: 'none',
                                                direction: 'rtl'
                                            }}
                                            placeholder={'انتخاب کنید'}
                                            options={year}
                                            onChange={(e) => setGender(e)}
                                        />
                                    </ResumeInputCom>
                                    <ResumeInputCom>
                                        <div className="title">نام مرکز</div>
                                        <InputCom direction="rtl" placeholder="مثال: زبان انگلیسی، زبان عربی و"/>
                                    </ResumeInputCom>
                                </Row>
                                <RowCom>
                                    {item.id !== 1 && <img
                                        onClick={() => removeEducational(item.id)}
                                        className="close"
                                        src={close.src}
                                        alt=""
                                    />}
                                    <ResumeInputCom style={{
                                        width: '100%'
                                    }}>
                                        <div className="title">رشته</div>
                                        <InputCom direction="rtl"
                                                  placeholder="مثال: زبان انگلیسی، زبان عربی و"/>
                                    </ResumeInputCom>
                                </RowCom>
                            </FromResumeItem>))}
                    </FromStepScroll>
                    <ButtonContainer justify={`flex-end`}>
                        <AddBtn onClick={addEducational}>
                            <h2 className={`text`}>افزودن</h2>
                            <img src={add.src} alt="" className="icon"/>
                        </AddBtn>
                    </ButtonContainer>
                    <Button typeof='submit'
                            onClick={() => {
                                setCurrent(1)
                                setTitle('مهارت')
                            }}
                            className={StyleModules['confirm_button']}
                            type="primary" loading={loading}>
                        بعدی
                    </Button>
                </>)}

                {current === 1 && (<>
                    <div className="title"> : مهارت ۲</div>
                    <FromStepScroll>
                        {skills.map(item => (<FromResumeItem key={item.id}>
                            {item.id !== 1 && <img
                                onClick={() => removeSkills(item.id)}
                                className="close"
                                src={close.src}
                                alt=""
                            />}
                            <ResumeInputCom>
                                <div className="title">سطح</div>
                                <Select
                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        textAlign: 'right',
                                        padding: '0',
                                        boxShadow: 'none',
                                        direction: 'rtl'
                                    }}
                                    placeholder='از ۱ تا ۱۰'
                                    options={score}
                                    onChange={(e) => setSelectScore(e)}
                                />
                            </ResumeInputCom>
                            <ResumeInputCom>
                                <div className="title">نام مهارت</div>
                                <InputCom direction="rtl" placeholder="مثال: زبان انگلیسی، زبان عربی و"/>
                            </ResumeInputCom>
                        </FromResumeItem>))}
                    </FromStepScroll>

                    <ButtonContainer justify={`flex-end`}>
                        <AddBtn onClick={addSkills}>
                            <h2 className={`text`}>افزودن</h2>
                            <img src={add.src} alt="" className="icon"/>
                        </AddBtn>
                    </ButtonContainer>
                    <Button typeof='submit'
                            onClick={() => {
                                setCurrent(2)
                                setTitle('افتخارات')
                            }}
                            className={StyleModules['confirm_button']}
                            type="primary" loading={loading}>
                        بعدی
                    </Button>
                </>)}
                {current === 2 && (<>
                    <div className="title"> : افتخارات ۳</div>
                    <FromStepScroll>
                        {achievements.map(item => (<FromResumeItem key={item.id}>
                            {item.id !== 1 && <img
                                onClick={() => removeAchievements(item.id)}
                                className="close"
                                src={close.src}
                                alt=""
                            />}
                            <ResumeInputCom>
                                <div className="title">سال دریافت</div>
                                <Select
                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        textAlign: 'right',
                                        padding: '0',
                                        boxShadow: 'none',
                                        direction: 'rtl'
                                    }}
                                    placeholder={'انتخاب کنید'}
                                    options={year}
                                    onChange={(e) => setGender(e)}
                                />
                            </ResumeInputCom>
                            <ResumeInputCom>
                                <div className="title">مرکز دریافت</div>
                                <InputCom direction="rtl" placeholder={`مثال: وزارت علوم`}/>
                            </ResumeInputCom>
                            <ResumeInputCom>
                                <div className="title">نوع افتخار</div>
                                <InputCom direction="rtl" placeholder={`مثال: دریافت جایزه‌ی زکریا`}/>
                            </ResumeInputCom>
                        </FromResumeItem>))}
                    </FromStepScroll>

                    <ButtonContainer justify={`flex-end`}>
                        <AddBtn onClick={addAchievements}>
                            <h2 className={`text`}>افزودن</h2>
                            <img src={add.src} alt="" className="icon"/>
                        </AddBtn>
                    </ButtonContainer>
                    <Button typeof='submit'
                            onClick={() => {
                                setCurrent(3)
                                setTitle('سابقه شغلی')
                            }}
                            className={StyleModules['confirm_button']}
                            type="primary" loading={loading}>
                        بعدی
                    </Button>
                </>)}
                {current === 3 && (<>
                    <div className="title"> : سابقه شغلی ۴</div>
                    <FromStepScroll>
                        {work_backgrounds.map(item => (<FromResumeItem key={item.id}>
                            {item.id !== 1 && <img
                                onClick={() => removeWork(item.id)}
                                className="close"
                                src={close.src}
                                alt=""
                            />}
                            <ResumeInputCom>
                                <div className="title">سال پژوهش</div>
                                <Select
                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        textAlign: 'right',
                                        padding: '0',
                                        boxShadow: 'none',
                                        direction: 'rtl'
                                    }}
                                    placeholder={'انتخاب کنید'}
                                    options={year}
                                    onChange={(e) => setGender(e)}
                                />
                            </ResumeInputCom> <ResumeInputCom>
                            <div className="title">لینک</div>
                            <InputCom direction="ltr" placeholder={`https://google.com`}/>
                        </ResumeInputCom>
                            <ResumeInputCom>
                                <div className="title">عنوان</div>
                                <InputCom direction="rtl" placeholder={`وارد کنید`}/>
                            </ResumeInputCom>
                        </FromResumeItem>))}
                    </FromStepScroll>

                    <ButtonContainer justify={`flex-end`}>
                        <AddBtn onClick={addWork}>
                            <h2 className={`text`}>افزودن</h2>
                            <img src={add.src} alt="" className="icon"/>
                        </AddBtn>
                    </ButtonContainer>
                    <Button typeof='submit'
                            onClick={() => {
                                setCurrent(4)
                                setTitle('سابقه پژوهشی')
                            }}
                            className={StyleModules['confirm_button']}
                            type="primary" loading={loading}>
                        بعدی
                    </Button>
                </>)}
                {current === 4 && (<>
                    <div className="title"> : سابقه پژوهشی ۵</div>
                    <FromStepScroll>
                        {research_histories.map(item => (<FromResumeItem key={item.id}>
                            {item.id !== 1 && <img
                                onClick={() => removeResearch_histories(item.id)}
                                className="close"
                                src={close.src}
                                alt=""
                            />}
                            <ResumeInputCom>
                                <div className="title">سال دریافت</div>
                                <Select
                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        textAlign: 'right',
                                        padding: '0',
                                        boxShadow: 'none',
                                        direction: 'rtl'
                                    }}
                                    placeholder={'انتخاب کنید'}
                                    options={year}
                                    onChange={(e) => setGender(e)}
                                />
                            </ResumeInputCom>
                            <ResumeInputCom>
                                <div className="title">مرکز دریافت</div>
                                <InputCom direction="rtl" placeholder={`مثال: وزارت علوم`}/>
                            </ResumeInputCom>
                            <ResumeInputCom>
                                <div className="title">نوع افتخار</div>
                                <InputCom direction="rtl" placeholder={`مثال: دریافت جایزه‌ی زکریا`}/>
                            </ResumeInputCom>
                        </FromResumeItem>))}
                    </FromStepScroll>
                    <ButtonContainer justify={`flex-end`}>
                        <AddBtn onClick={addResearch_histories}>
                            <h2 className={`text`}>افزودن</h2>
                            <img src={add.src} alt="" className="icon"/>
                        </AddBtn>
                    </ButtonContainer>
                    <Button typeof='submit'
                            className={StyleModules['confirm_button']}
                            type="primary" loading={loading}>
                        اتمام
                    </Button>
                </>)}
            </FromStep>

        </Container>

    </>)
}

