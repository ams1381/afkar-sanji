import close from "@/public/Icons/Close.svg";
import {
    FromResumeItem, InputCom, ResumeInputCom, FromStepScroll, ButtonContainer, AddBtn
} from "@/styles/questioner/resume/resume";
import {Button, message, Select} from "antd";
import React, {useEffect, useState} from "react";
import add from "@/public/Icons/addBlue.svg";
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import {educationalSchema, skillsSchema} from "@/utilities/validators/resumeMaker";


export default function ({
                             score, setCurrent, setTitle
                         }) {

    const [data, setData] = useState([{
        level: undefined, field: undefined
    }]);

    const [errors, setErrors] = useState([]);
    useEffect(() => {
        setErrors([]);
        let errorsValus = [];
        data.forEach(object => {
            let result = skillsSchema.validate(object, {abortEarly: false});
            if (result.error?.details?.length > 0) errorsValus.push(errors)
        })
        setErrors(errorsValus);
    }, [data]);

    // skills
    function addSkills() {
        if (errors.length > 0) message.error('اطلاعات فعلی شما کامل نیست')
        else
            setData(prevItems => [...prevItems, {
                level: undefined, field: undefined
            }]);
        message.success('با موفقیت اضافه شد')
    }

    function removeSkills(id) {
        setData(prevItems => prevItems.filter((item, index) => index !== id));
        message.success('با موفقیت حذف شد')
    }

    function submit() {
        if (errors.length > 0) return
        else
            setCurrent(p => p + 1)
        setTitle('افتخارات')
    }


    return (<>
            <FromStepScroll>
                {data?.map((item, index) => (<FromResumeItem key={index}>
                    {index + 1 !== 1 && <img
                        onClick={() => removeSkills(index)}
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
                            onChange={e => setData(prevData => {
                                const updatedData = [...prevData];
                                updatedData[index].level = e;
                                return updatedData;
                            })}
                        />
                    </ResumeInputCom>
                    <ResumeInputCom>
                        <div className="title">نام مهارت</div>
                        <InputCom value={data?.field} onChange={e => setData(prevData => {
                            const updatedData = [...prevData];
                            updatedData[index].field = e?.target?.value;
                            return updatedData;
                        })} direction="rtl" placeholder="مثال: زبان انگلیسی، زبان عربی و"/>
                    </ResumeInputCom>
                </FromResumeItem>))}
            </FromStepScroll>
            <ButtonContainer justify={`flex-end`}>
                <AddBtn disabled={errors.length ? true : false} onClick={addSkills}>
                    <h2 className={`text`}>افزودن</h2>
                    <img src={add.src} alt="" className="icon"/>
                </AddBtn>
            </ButtonContainer>
            <Button disabled={errors.length ? true : false} typeof='submit'
                    onClick={submit}
                    className={StyleModules['confirm_button']}
                    type="primary">
                بعدی
            </Button>
        </>

    )
}
