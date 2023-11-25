import close from "@/public/Icons/Close.svg";
import {
    FromResumeItem,
    InputCom,
    ResumeInputCom,
    FromStepScroll,
    ButtonContainer, AddBtn, BtnComponent
} from "@/styles/questioner/resume/resume";
import {Button, message, Select, Skeleton} from "antd";
import React, {useEffect, useState} from "react";
import add from "@/public/Icons/addBlue.svg";
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import {achievementsSchema, workBackgroundstsSchema} from "@/utilities/validators/resumeMaker";
import {axiosInstance} from "@/utilities/axios";
// icon
import arrowDownIcon from '@/public/Icons/selectDown.svg'
import editIcon from "@/public/Icons/editEesume.svg";

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
                setWorkData([...workData.slice(0, workData.length - 1), res.data, {
                    position: undefined, company: undefined, start_date: undefined, end_date: undefined
                }]);
                message.success('با موفقیت اضافه شد')
            }
        }).catch(error => {
            const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
            message.error(ERROR_MESSAGE)
        })
    }

    async function removeWork(id) {
        console.log(id)
        console.log(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/skills/${id}/`)
        if (id) {
            await axiosInstance.delete(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/work-backgrounds/${id}/`).then(res => {
                if (res?.status === 204) {
                    message.error('حذف شد')
                    setWorkData(workData.filter(item => item.id !== id))
                }
            })
        } else {
            setWorkData(prevItems => prevItems.filter((item, index) => index !== id));
            message.success('با موفقیت حذف شد')
        }
    }


    const editEducation = async (id) => {
        try {
            const updatedItem = workData.find(item => item.id === id);
            const index = workData.findIndex(item => item.id === id);

            const response = await axiosInstance.put(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/work-backgrounds/${id}/`, updatedItem);
            if (response.status === 200) {
                setWorkData(prevData => {
                    return prevData.map(item => {
                        if (item.id === id) {
                            return response.data;
                        }
                        return item;
                    });
                });
                message.success('با موفقیت ویرایش شد');
            }
        } catch (error) {
            const errorMessage = error.response?.data[Object.keys(error.response.data)[0]][0];
            message.error(errorMessage);
        }
    };

    const submit = () => {
        if (!workData[workData.length - 1]?.position || !workData[workData.length - 1]?.company || !workData[workData.length - 1]?.start_date || !workData[workData.length - 1]?.end_date) {
            setCurrent(4)
            setTitle('اگر در پژوهشی شرکت داشتید در این بخش وارد کنید')
        } else {
            axiosInstance.post(`user-api/users/${me?.id}/resume/${me?.resume?.id}/work-backgrounds/`, workData[workData.length - 1]).then(res => {
                if (res?.status === 201) {
                    setWorkData([...workData.slice(0, workData.length - 1), res.data, {
                        position: undefined, company: undefined, start_date: undefined, end_date: undefined
                    }]);
                    message.success('با موفقیت اضافه شد')
                    setCurrent(4)
                    setTitle('اگر در پژوهشی شرکت داشتید در این بخش وارد کنید')
                }
            }).catch(error => {
                const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
                message.error(ERROR_MESSAGE)
            })
        }
    }


    const [width, setWidth] = useState(0)

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {isLoading ? (
                <div style={{
                    display: width < 470 ? 'none' : 'flex',
                    alignItems: "center",
                    gap: '20px', flexWrap: 'wrap'
                }}>
                    <Skeleton.Input active style={{height: '40px', minWidth: 'auto', width: '145px'}}/>
                    <Skeleton.Input active style={{height: '40px', minWidth: 'auto', width: '145px'}}/>
                    <Skeleton.Input active style={{height: '40px', minWidth: 'auto', width: '145px'}}/>
                    <Skeleton.Input active style={{height: '40px', minWidth: 'auto', width: ' 145px'}}/>
                </div>
            ) : (
                <FromStepScroll>
                    {workData.map((item, index) => (
                        <FromResumeItem key={index}>
                            {(index > 0 && index + 1 !== workData.length) &&
                                <BtnComponent onClick={() => removeWork(item?.id)}>
                                    <img
                                        className="close"
                                        src={close.src}
                                        alt=""
                                    />
                                </BtnComponent>
                            }
                            {workData.length && index !== workData.length - 1 &&
                                <BtnComponent onClick={() => editEducation(item?.id)}>
                                    <img
                                        className="close"
                                        src={editIcon.src}
                                        alt=""
                                    />
                                </BtnComponent>
                            }
                            <ResumeInputCom>
                                <div className="title">سال پایان</div>
                                <Select
                                    suffixIcon={<img src={arrowDownIcon?.src}/>}
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
                                    value={workData[index]?.end_date}
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
                                    suffixIcon={<img src={arrowDownIcon?.src}/>}
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
                                    value={workData[index]?.start_date}
                                    onChange={e => setWorkData(prevData => {
                                        const updatedData = [...prevData];
                                        updatedData[index].start_date = e;
                                        return updatedData;
                                    })}
                                />
                            </ResumeInputCom>
                            <ResumeInputCom>
                                <div className="title">شرکت</div>
                                <InputCom value={workData[index]?.company} onChange={e => setWorkData(prevData => {
                                    const updatedData = [...prevData];
                                    updatedData[index].company = e?.target?.value;
                                    return updatedData;
                                })} direction="rtl" placeholder={`مثال: دانشگاه قم`}/>
                            </ResumeInputCom>
                            <ResumeInputCom>
                                <div className="title">عنوان</div>
                                <InputCom value={workData[index]?.position} onChange={e => setWorkData(prevData => {
                                    const updatedData = [...prevData];
                                    updatedData[index].position = e?.target?.value;
                                    return updatedData;
                                })} direction="rtl" placeholder={`مثال: ریاضی‌محض`}/>
                            </ResumeInputCom>
                        </FromResumeItem>
                    ))}
                </FromStepScroll>
            )}
            <ButtonContainer justify={`flex-end`}>
                <AddBtn
                    color={!workData[workData.length - 1]?.position || !workData[workData.length - 1]?.company || !workData[workData.length - 1]?.start_date || !workData[workData.length - 1]?.end_date ? '#D9D9D9' : 'var(--primary-color)'}
                    disabled={!workData[workData.length - 1]?.position || !workData[workData.length - 1]?.company || !workData[workData.length - 1]?.start_date || !workData[workData.length - 1]?.end_date}
                    onClick={addWork}>
                    <h2 className={`text`}>افزودن</h2>
                    <img
                        style={{opacity: !workData[workData.length - 1]?.position || !workData[workData.length - 1]?.company || !workData[workData.length - 1]?.start_date || !workData[workData.length - 1]?.end_date ? '0.2' : '1'}}
                        src={add.src} alt="" className="icon"/>
                </AddBtn>
            </ButtonContainer>
            <Button disabled={workData.length < 2 && errors.length} typeof='submit'
                    onClick={submit}
                    className={StyleModules['confirm_button']}
                    type="primary">
                بعدی
            </Button>
        </>
    )
}