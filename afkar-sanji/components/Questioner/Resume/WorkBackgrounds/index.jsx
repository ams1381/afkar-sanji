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

export default function ({setWork_backgrounds, setCurrent,
                             setTitle, year, setGender, work_backgrounds}) {

    // work
    function addWork() {
        setWork_backgrounds(prevItems => [...prevItems, {id: prevItems.length + 1}]);
        message.success('با موفقیت اضافه شد')
    }

    function removeWork(id) {
        setWork_backgrounds(prevItems => prevItems.filter(item => item.id !== id));
        message.success('با موفقیت حذف شد')
    }

    return (
        <>
            <FromStepScroll>
                {work_backgrounds.map(item => (
                    <FromResumeItem key={item.id}>
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
                    </FromResumeItem>
                ))}
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
                    type="primary">
                بعدی
            </Button>
        </>
    )
}