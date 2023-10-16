import close from "@/public/Icons/Close.svg";
import {
    AddBtn,
    ButtonContainer,
    FromResumeItem,
    FromStepScroll,
    InputCom,
    ResumeInputCom
} from "@/styles/questioner/resume/resume";
import {Button, message, Select, Skeleton} from "antd";
import React, {useEffect, useState} from "react";
import add from "@/public/Icons/addBlue.svg";
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import {achievementsSchema, skillsSchema} from "@/utilities/validators/resumeMaker";
import {axiosInstance} from "@/utilities/axios";
// icon
import arrowDownIcon from '@/public/Icons/selectDown.svg'

export default function ({
                             setCurrent,
                             setTitle, year, me
                         }) {


    const [resumeData, setResumeData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const getData = () => {
        setIsLoading(true)
        axiosInstance.get(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/achievements/`).then(res => {
            setResumeData([...res?.data,
                {
                    field: undefined, year: undefined, institute: undefined
                }
            ])
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, []);

    const [errors, setErrors] = useState([]);
    useEffect(() => {
        setErrors([]);
        let errorsValus = [];
        resumeData.forEach(object => {
            let result = achievementsSchema.validate(object, {abortEarly: false});
            if (result.error?.details?.length > 0) errorsValus.push(errors)
        })
        setErrors(errorsValus);
    }, [resumeData]);

    function addAchievements() {
        axiosInstance.post(`user-api/users/${me?.id}/resume/${me?.resume?.id}/achievements/`, resumeData[resumeData.length - 1]).then(res => {
            if (res?.status === 201) {
                setResumeData([...resumeData, {
                    field: undefined, year: undefined, institute: undefined
                }]);
                message.success('با موفقیت اضافه شد')
            }
        }).catch(error => {
            const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
            message.error(ERROR_MESSAGE)
        })
    }

   async function removeAchievements(id) {
        if (id) {
            await axiosInstance.delete(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/achievements/${id}/`).then(res => {
                if (res?.status === 204) {
                    message.error('حذف شد')
                    setResumeData(resumeData.filter(item => item.id !== id))
                }
            })
        }
    }


    const submit = () => {
        setCurrent(3)
        setTitle('سوابق شغلی مرتبط با پرسش‌گری را در این بخش اضافه کنید')
    }

    return (
        <>
            {isLoading ? (
                <div style={{
                    display: 'flex',
                    alignItems: "center",
                    gap: '20px', flexWrap: 'wrap'
                }}>
                    <Skeleton.Input active style={{height: '40px', minWidth: 'auto', width: '202px'}}/>
                    <Skeleton.Input active style={{height: '40px', minWidth: 'auto', width: '202px'}}/> <Skeleton.Input active style={{height: '40px', minWidth: 'auto', width: '202px'}}/>
                </div>
            ) : (
                <FromStepScroll>
                    {resumeData?.map((item, index) => (
                        <FromResumeItem key={item.id}>

                            {index > 0 && index + 1 !== resumeData.length && <img
                                onClick={() => removeAchievements(item.id || '')}
                                className="close"
                                src={close.src}
                                alt=""
                            />}
                            <ResumeInputCom>
                                <div className="title">سال دریافت</div>
                                <Select
                                    suffixIcon={<img src={arrowDownIcon?.src} />}
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
                                    value={resumeData[index]?.year}
                                    onChange={e => setResumeData(prevData => {
                                        const updatedData = [...prevData];
                                        updatedData[index].year = e;
                                        return updatedData;
                                    })}
                                />
                            </ResumeInputCom>
                            <ResumeInputCom>
                                <div className="title">مرکز دریافت</div>
                                <InputCom value={resumeData[index]?.institute} onChange={e => setResumeData(prevData => {
                                    const updatedData = [...prevData];
                                    updatedData[index].institute = e?.target?.value;
                                    return updatedData;
                                })} direction="rtl" placeholder={`مثال: وزارت علوم`}/>
                            </ResumeInputCom>
                            <ResumeInputCom>
                                <div className="title">نوع افتخار</div>
                                <InputCom value={resumeData[index]?.field} onChange={e => setResumeData(prevData => {
                                    const updatedData = [...prevData];
                                    updatedData[index].field = e?.target?.value;
                                    return updatedData;
                                })} direction="rtl" placeholder={`مثال: دریافت جایزه‌ی زکریا`}/>
                            </ResumeInputCom>
                        </FromResumeItem>
                    ))}
                </FromStepScroll>
            )}
            <ButtonContainer justify={`flex-end`}>
                <AddBtn disabled={!resumeData[resumeData.length - 1]?.year || !resumeData[resumeData.length - 1]?.field || !resumeData[resumeData.length - 1]?.institute} onClick={addAchievements}>
                    <h2 className={`text`}>افزودن</h2>
                    <img src={add.src} alt="" className="icon"/>
                </AddBtn>
            </ButtonContainer>
            <Button disabled={resumeData.length < 2} typeof='submit'
                    onClick={submit}
                    className={StyleModules['confirm_button']}
                    type="primary">
                بعدی
            </Button>
        </>
    )
}