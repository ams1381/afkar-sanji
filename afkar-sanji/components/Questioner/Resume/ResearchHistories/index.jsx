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
import React, {useEffect, useState} from "react";
import add from "@/public/Icons/addBlue.svg";
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import {workBackgroundstsSchema} from "@/utilities/validators/resumeMaker";

export default function ({year, setGender, research_histories,setResearch_histories}) {

    const [data, setData] = useState([{link: undefined, year: undefined,field:undefined}
    ])

    const [errors, setErrors] = useState([]);
    useEffect(() => {
        setErrors([]);
        let errorsValus = [];
        data.forEach(object => {
            let result = workBackgroundstsSchema.validate(object, {abortEarly: false});
            if (result.error?.details?.length > 0) errorsValus.push(errors)
        })
        setErrors(errorsValus);
    }, [data]);

    function addResearch_histories() {
        setData(prevItems => [...prevItems, {link: undefined, year: undefined,field:undefined}]);
        message.success('با موفقیت اضافه شد')
    }
    function removeResearch_histories(id) {
        setData(prevItems => prevItems.filter((item,index) => index !== id));
        message.success('با موفقیت حذف شد')
    }

    return (
        <>
            <FromStepScroll>
                {data.map((item,index) => (
                    <FromResumeItem key={item.id}>
                        {index + 1 !== 1 && <img
                            onClick={() => removeResearch_histories(index)}
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
                <AddBtn disabled={errors.length ? true : false} onClick={addResearch_histories}>
                    <h2 className={`text`}>افزودن</h2>
                    <img src={add.src} alt="" className="icon"/>
                </AddBtn>
            </ButtonContainer>
            <Button disabled={errors.length ? true : false} typeof='submit'
                    className={StyleModules['confirm_button']}
                    type="primary" >
                اتمام
            </Button>
        </>
    )
}