import close from "@/public/Icons/Close.svg";
import {
    FromResumeItem,
    InputCom,
    ResumeInputCom,
    FromStepScroll,
    ButtonContainer, AddBtn
} from "@/styles/questioner/resume/resume";
import {Button, message, Select} from "antd";
import React from "react";
import add from "@/public/Icons/addBlue.svg";
import StyleModules from "@/styles/auth/LoginStyles.module.css";


export default function ({
                             score,
                             setSelectScore,
                             setSkills, skills,
                             setCurrent,
                             setTitle
                         }) {

    // skills
    function addSkills() {
        setSkills(prevItems => [...prevItems, {id: prevItems.length + 1}]);
        message.success('با موفقیت اضافه شد')
    }

    function removeSkills(id) {
        setSkills(prevItems => prevItems.filter(item => item.id !== id));
        message.success('با موفقیت حذف شد')
    }

    return (
        <>
            <FromStepScroll>
                {skills?.map(item => (
                    <FromResumeItem key={item.id}>
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
                    </FromResumeItem>
                ))}
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
                    type="primary">
                بعدی
            </Button>
        </>

    )
}
