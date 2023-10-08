import close from "@/public/Icons/Close.svg";
import {
    AddBtn,
    ButtonContainer,
    FromResumeItem,
    FromStepScroll,
    InputCom,
    ResumeInputCom
} from "@/styles/questioner/resume/resume";
import {Button, message, Select} from "antd";
import React from "react";
import add from "@/public/Icons/addBlue.svg";
import StyleModules from "@/styles/auth/LoginStyles.module.css";

export default function ({
                             setAchievements, setCurrent,
                             setTitle, year, achievements,
                             setGender
                         }) {


    // achievements
    function addAchievements() {
        setAchievements(prevItems => [...prevItems, {id: prevItems.length + 1}]);
        message.success('با موفقیت اضافه شد')
    }

    function removeAchievements(id) {
        setAchievements(prevItems => prevItems.filter(item => item.id !== id));
        message.success('با موفقیت حذف شد')
    }


    return (
        <>
            <FromStepScroll>
                {achievements?.map(item => (
                    <FromResumeItem key={item.id}>

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
                    </FromResumeItem>
                ))}
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
                    type="primary">
                بعدی
            </Button>
        </>
    )
}