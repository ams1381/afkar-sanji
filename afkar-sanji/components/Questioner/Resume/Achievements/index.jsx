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
import {achievementsSchema, skillsSchema} from "@/utilities/validators/resumeMaker";

export default function ({
                             setAchievements, setCurrent,
                             setTitle, year, achievements,
                             setGender
                         }) {

    const [data, setData] = useState([{field: undefined, year: undefined,}
    ])

    const [errors, setErrors] = useState([]);
    useEffect(() => {
        setErrors([]);
        let errorsValus = [];
        data.forEach(object => {
            let result = achievementsSchema.validate(object, {abortEarly: false});
            if (result.error?.details?.length > 0) errorsValus.push(errors)
        })
        setErrors(errorsValus);
    }, [data]);

    function addAchievements() {
        if (errors.length > 0) message.error('اطلاعات فعلی شما کامل نیست')
        else
            setData(prevItems => [...prevItems, {field: undefined, year: undefined,}]);
        message.success('با موفقیت اضافه شد')
    }

    function removeAchievements(id) {
        setData(prevItems => prevItems.filter((item,index) => index !== id));
        message.success('با موفقیت حذف شد')
    }


    const submit = () => {
        if (errors.length > 0) return
        else
            setCurrent(3)
        setTitle('سابقه شغلی')
    }

    return (
        <>
            <FromStepScroll>
                {data?.map((item, index) => (
                    <FromResumeItem key={item.id}>

                        {index + 1 !== 1 && <img
                            onClick={() => removeAchievements(index)}
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
                                onChange={e => setData(prevData => {
                                    const updatedData = [...prevData];
                                    updatedData[index].year = e;
                                    return updatedData;
                                })}
                            />
                        </ResumeInputCom>
                        <ResumeInputCom>
                            <div className="title">مرکز دریافت</div>
                            <InputCom value={data?.field} onChange={e => setData(prevData => {
                                    const updatedData = [...prevData];
                                    updatedData[index].field = e?.target?.value;
                                    return updatedData;
                                })} direction="rtl" placeholder={`مثال: وزارت علوم`}/>
                        </ResumeInputCom>
                        <ResumeInputCom>
                            <div className="title">نوع افتخار</div>
                            <InputCom value={data?.field} onChange={e => setData(prevData => {
                                    const updatedData = [...prevData];
                                    updatedData[index].field = e?.target?.value;
                                    return updatedData;
                                })} direction="rtl" placeholder={`مثال: دریافت جایزه‌ی زکریا`}/>
                        </ResumeInputCom>
                    </FromResumeItem>
                ))}
            </FromStepScroll>
            <ButtonContainer justify={`flex-end`}>
                <AddBtn disabled={errors.length ? true : false} onClick={addAchievements}>
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