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
import {axiosInstance} from "@/utilities/axios";

export default function ({
                             setCurrent,
                             setTitle, year, me
                         }) {


    const [workData, setWorkData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const getData = () => {
        setIsLoading(true)
        axiosInstance.get(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/work-backgrounds/`).then(res => {
            setIsLoading(false)
            setWorkData([...res?.data,
                {
                    position: undefined, company: undefined, start_date: undefined, end_date: undefined
                }
            ])
        })
    }

    useEffect(() => {
        getData()
    }, []);

    const [errors, setErrors] = useState([]);
    useEffect(() => {
        setErrors([]);
        let errorsValus = [];
        workData.forEach(object => {
            let result = workBackgroundstsSchema.validate(object, {abortEarly: false});
            if (result.error?.details?.length > 0) errorsValus.push(errors)
        })
        setErrors(errorsValus);
    }, [workData]);


    function addWork() {
        axiosInstance.post(`user-api/users/${me?.id}/resume/${me?.resume?.id}/work-backgrounds/`, workData[workData.length - 1]).then(res => {
            if (res?.status === 201) {
                setWorkData([...workData, {
                    position: undefined, company: undefined, start_date: undefined, end_date: undefined
                }]);
                message.success('با موفقیت اضافه شد')
            }
        }).catch(error => {
            console.log(error)
            // const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
            message.error('مشکلی پیش آمد')
        })
        // setWorkData(prevItems => [...prevItems, {position: undefined, company: undefined, start_date: undefined,end_date:undefined}]);
        // message.success('با موفقیت اضافه شد')
    }

    async function removeWork(id) {
        if (id) {
            await axiosInstance.delete(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/work-backgrounds/${id}/`).then(res => {
                if (res?.status === 204) {
                    message.error('حذف شد')
                    setWorkData(workData.filter(item => item.id !== id))
                }
            })
        } else {
            const index = workData.findIndex(item => item.id === id);
            const updatedData = [...workData];
            updatedData.splice(index, 1);
            setWorkData(updatedData);
        }
        // setWorkData(prevItems => prevItems.filter((item, index) => index !== id));
        // message.success('با موفقیت حذف شد')
    }


    const submit = () => {
        setCurrent(4)
        setTitle('سابقه پژوهشی')
    }

    return (
        <>
            <FromStepScroll>
                {workData.map((item, index) => (
                    <FromResumeItem key={index}>
                        {(index > 0 && index + 1 !== workData.length) && <img
                            onClick={() => removeWork(index)}
                            className="close"
                            src={close.src}
                            alt=""
                        />}
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
                                onChange={e => setWorkData(prevData => {
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
                                onChange={e => setWorkData(prevData => {
                                    const updatedData = [...prevData];
                                    updatedData[index].start_date = e;
                                    return updatedData;
                                })}
                            />
                        </ResumeInputCom>
                        {/*    <ResumeInputCom>*/}
                        {/*    <div className="title">لینک</div>*/}
                        {/*    <InputCom value={data?.company}   onChange={e => setData(prevData => {*/}
                        {/*        const updatedData = [...prevData];*/}
                        {/*        updatedData[index].company = e?.target?.value;*/}
                        {/*        return updatedData;*/}
                        {/*    })} direction="ltr" placeholder={`https://google.com`}/>*/}
                        {/*</ResumeInputCom>*/}
                        <ResumeInputCom>
                            <div className="title">شرکت</div>
                            <InputCom value={workData?.company} onChange={e => setWorkData(prevData => {
                                const updatedData = [...prevData];
                                updatedData[index].company = e?.target?.value;
                                return updatedData;
                            })} direction="rtl" placeholder={`مثال: دانشگاه قم`}/>
                        </ResumeInputCom>
                        <ResumeInputCom>
                            <div className="title">عنوان</div>
                            <InputCom value={workData?.position} onChange={e => setWorkData(prevData => {
                                const updatedData = [...prevData];
                                updatedData[index].position = e?.target?.value;
                                return updatedData;
                            })} direction="rtl" placeholder={`مثال: ریاضی‌محض`}/>
                        </ResumeInputCom>
                    </FromResumeItem>
                ))}
            </FromStepScroll>
            <ButtonContainer justify={`flex-end`}>
                <AddBtn
                    disabled={!workData[workData.length - 1]?.position || !workData[workData.length - 1]?.company || !workData[workData.length - 1]?.start_date || !workData[workData.length - 1]?.end_date}
                    onClick={addWork}>
                    <h2 className={`text`}>افزودن</h2>
                    <img src={add.src} alt="" className="icon"/>
                </AddBtn>
            </ButtonContainer>
            <Button disabled={workData.length < 2} typeof='submit'
                    onClick={submit}
                    className={StyleModules['confirm_button']}
                    type="primary">
                بعدی
            </Button>
        </>
    )
}