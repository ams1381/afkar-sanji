import {
    FromResumeItem, InputCom, ResumeInputCom, RowCom, FromStepScroll, ButtonContainer, AddBtn
} from "@/styles/questioner/resume/resume";
import {Row} from "@/styles/questioner/information";
import {Button, message, Select} from "antd";
import close from "@/public/Icons/Close.svg";
import React, {useEffect, useState} from "react";
import add from "@/public/Icons/addBlue.svg";
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import {educationalSchema} from "@/utilities/validators/resumeMaker";
import {axiosInstance} from "@/utilities/axios";

export default function ({
                             setSelectedEducation, educations, year, setGender, setCurrent, setTitle,
                         }) {
    const [data, setData] = useState([{
        university: undefined, end_date: undefined, start_date: undefined, degree: undefined, edu_type: undefined
    }]);

    const [errors, setErrors] = useState([]);
    useEffect(() => {
        setErrors([]);
        let errorsValus = [];
        data.forEach(object => {
            let result = educationalSchema.validate(object, {abortEarly: false});
            if (result.error?.details?.length > 0)
                errorsValus.push(errors)
        })
        setErrors(errorsValus);
    }, [data]);


    function addEducational() {
        if (errors.length > 0) message.error('اطلاعات فعلی شما کامل نیست')
        else {
            setData(prevItems => [...prevItems, {
                university: undefined,
                end_date: undefined,
                start_date: undefined,
                degree: undefined,
                edu_type: undefined
            }]);
            message.success('با موفقیت اضافه شد')
        }
    }


    function removeEducational(degree) {
        const index = data.findIndex(item => item.degree === degree);
        const updatedData = [...data];
        updatedData.splice(index, 1);
        setData(updatedData);
    }

    const educationHandler = () => {
        // let formData = new FormData()
        // formData.append(JSON.stringify(data))

        axiosInstance.post('user-api/users/3/resume/1/educational-backgrounds/', JSON.stringify(data)).then(res => {
            console.log(res)
            if (res?.status === 201) setCurrent(p => p + 1)
        }).catch(err => {
            message.error('از بک انده')
        })
    }

    return (<>
            <FromStepScroll>
                {data.map((item, index) => (<FromResumeItem flexDirection={'column'} key={index}>
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
                                onChange={e => setData(prevData => {
                                    const updatedData = [...prevData];
                                    updatedData[index].degree = e;
                                    return updatedData;
                                })}
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
                                onChange={e => setData(prevData => {
                                    const updatedData = [...prevData];
                                    updatedData[index].end_date = e;
                                    return updatedData;
                                })}
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
                                onChange={e => setData(prevData => {
                                    const updatedData = [...prevData];
                                    updatedData[index].start_date = e;
                                    return updatedData;
                                })}
                            />
                        </ResumeInputCom>
                        <ResumeInputCom>
                            <div className="title">نام مرکز</div>
                            <InputCom value={data[index].university} onChange={e => setData(prevData => {
                                const updatedData = [...prevData];
                                updatedData[index].university = e?.target?.value;
                                return updatedData;
                            })} direction="rtl" placeholder="مثال: زبان انگلیسی، زبان عربی و"/>
                        </ResumeInputCom>
                    </Row>
                    <RowCom>
                        {index + 1 !== 1 && <img
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
                                      value={data[index].edu_type} onChange={e => setData(prevData => {
                                const updatedData = [...prevData];
                                updatedData[index].edu_type = e?.target?.value;
                                return updatedData;
                            })}
                                      placeholder="مثال: زبان انگلیسی، زبان عربی و"/>
                        </ResumeInputCom>
                    </RowCom>
                </FromResumeItem>))}
            </FromStepScroll>
            <ButtonContainer justify={`flex-end`}>
                <AddBtn disabled={errors.length ? true : false} onClick={addEducational}>
                    <h2 className={`text`}>افزودن</h2>
                    <img src={add.src} alt="" className="icon"/>
                </AddBtn>
            </ButtonContainer>
            <Button disabled={errors.length ? true : false} typeof='submit'
                    onClick={educationHandler}
                    className={StyleModules['confirm_button']}
                    type="primary">
                بعدی
            </Button>
        </>

    )
}