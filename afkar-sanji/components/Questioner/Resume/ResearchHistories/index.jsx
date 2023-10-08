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

export default function ({year, setGender, research_histories,setResearch_histories}) {

    // research_histories
    function addResearch_histories() {
        setResearch_histories(prevItems => [...prevItems, {id: prevItems.length + 1}]);
        message.success('با موفقیت اضافه شد')
    }
    function removeResearch_histories(id) {
        setResearch_histories(prevItems => prevItems.filter(item => item.id !== id));
        message.success('با موفقیت حذف شد')
    }

    return (
        <>
            <FromStepScroll>
                {research_histories.map(item => (
                    <FromResumeItem key={item.id}>
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
                    </FromResumeItem>
                ))}
            </FromStepScroll>
            <ButtonContainer justify={`flex-end`}>
                <AddBtn onClick={addResearch_histories}>
                    <h2 className={`text`}>افزودن</h2>
                    <img src={add.src} alt="" className="icon"/>
                </AddBtn>
            </ButtonContainer>
            <Button typeof='submit'
                    className={StyleModules['confirm_button']}
                    type="primary" >
                اتمام
            </Button>
        </>
    )
}