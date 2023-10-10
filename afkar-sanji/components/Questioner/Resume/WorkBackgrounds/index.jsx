import close from "@/public/Icons/Close.svg";
import {
    FromResumeItem,
    InputCom,
    ResumeInputCom,
    FromStepScroll,
    ButtonContainer, AddBtn
} from "@/styles/questioner/resume/resume";
import {Button, message, Select} from "antd";
import React, {useEffect, useState} from "react";
import add from "@/public/Icons/addBlue.svg";
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import {achievementsSchema, workBackgroundstsSchema} from "@/utilities/validators/resumeMaker";

export default function ({setWork_backgrounds, setCurrent,
                             setTitle, year, setGender, work_backgrounds}) {


    const [data, setData] = useState([{position: undefined, company: undefined,start_date:undefined}
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


    function addWork() {
        setData(prevItems => [...prevItems, {position: undefined, company: undefined,start_date:undefined}]);
        message.success('با موفقیت اضافه شد')
    }

    function removeWork(id) {
        setData(prevItems => prevItems.filter((item,index) => index !== id));
        message.success('با موفقیت حذف شد')
    }


    const submit = () => {
        setCurrent(4)
        setTitle('سابقه پژوهشی')
    }

    useEffect(() => {
        console.log(data)
    }, [data]);

    return (
        <>
            <FromStepScroll>
                {data.map((item,index) => (
                    <FromResumeItem key={index}>
                        {index + 1 !== 1 && <img
                            onClick={() => removeWork(index)}
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
                                onChange={e => setData(prevData => {
                                    const updatedData = [...prevData];
                                    updatedData[index].start_date = e;
                                    return updatedData;
                                })}
                            />
                        </ResumeInputCom> <ResumeInputCom>
                        <div className="title">لینک</div>
                        <InputCom value={data?.company}   onChange={e => setData(prevData => {
                            const updatedData = [...prevData];
                            updatedData[index].company = e?.target?.value;
                            return updatedData;
                        })} direction="ltr" placeholder={`https://google.com`}/>
                    </ResumeInputCom>
                        <ResumeInputCom>
                            <div className="title">عنوان</div>
                            <InputCom value={data?.position}   onChange={e => setData(prevData => {
                                const updatedData = [...prevData];
                                updatedData[index].position = e?.target?.value;
                                return updatedData;
                            })} direction="rtl" placeholder={`وارد کنید`}/>
                        </ResumeInputCom>
                    </FromResumeItem>
                ))}
            </FromStepScroll>
            <ButtonContainer justify={`flex-end`}>
                <AddBtn disabled={errors.length ? true : false} onClick={addWork}>
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