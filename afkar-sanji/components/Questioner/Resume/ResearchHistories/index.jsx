import close from "@/public/Icons/Close.svg";
import {useRouter} from "next/router";
import {
    AddBtn,
    BtnComponent,
    ButtonContainer,
    FromResumeItem,
    FromStepScroll,
    InputCom,
    LoadingMaker,
    LoadingMakerMobile,
    ResumeInputCom, Row
} from "@/styles/questioner/resume/resume";
import {Button, message, Select, Skeleton, Spin} from "antd";
import React, {useEffect, useState} from "react";
import add from "@/public/Icons/addBlue.svg";
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import {researchHistoriestsSchema, workBackgroundstsSchema} from "@/utilities/validators/resumeMaker";
import {axiosInstance} from "@/utilities/axios";
import arrowDownIcon from '@/public/Icons/selectDown.svg'
import editIcon from "@/public/Icons/editEesume.svg";


export default function ({year, setGender, me}) {

    const router = useRouter()
    const [resumeData, setResumeData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const getData = () => {
        setIsLoading(true)
        axiosInstance.get(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/research-histories/`).then(res => {
            setIsLoading(false)
            setResumeData([...res?.data, {
                link: undefined, year: undefined, field: undefined
            }])
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
            let result = researchHistoriestsSchema.validate(object, {abortEarly: false});
            if (result.error?.details?.length > 0) errorsValus.push(errors)
        })
        setErrors(errorsValus);
    }, [resumeData]);

    function addResearch_histories() {
        axiosInstance.post(`user-api/users/${me?.id}/resume/${me?.resume?.id}/research-histories/`, resumeData[resumeData.length - 1]).then(res => {
            if (res?.status === 201) {
                setResumeData([...resumeData.slice(0, resumeData.length - 1), res.data, {
                    link: undefined, year: undefined, field: undefined
                }]);
                message.success('با موفقیت اضافه شد')
            }
        }).catch(error => {
            const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
            message.error(ERROR_MESSAGE)
        })

    }

    async function removeResearch_histories(id) {
        if (id) {
            await axiosInstance.delete(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/research-histories/${id}/`).then(res => {
                if (res?.status === 204) {
                    message.error('حذف شد')
                    setResumeData(resumeData.filter(item => item.id !== id))
                }
            })
        }
    }

    const editResearch_histories = async (id) => {

        try {
            const updatedItem = resumeData.find(item => item.id === id);
            const index = resumeData.findIndex(item => item.id === id);

            const response = await axiosInstance.put(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/research-histories/${id}/`, updatedItem);
            if (response.status === 200) {
                setResumeData(prevData => {
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


    const finishHandler = async () => {
        if (!resumeData[resumeData.length - 1]?.link || !resumeData[resumeData.length - 1]?.year || !resumeData[resumeData.length - 1]?.field) {
            if (me?.role === 'n') {
                await axiosInstance.patch('user-api/users/me', {
                    ask_for_interview_role: true
                }).then(res => {
                    router.push('/questioner/resume')
                }).catch(error => {
                    const errorMessage = error.response?.data[Object.keys(error.response.data)[0]][0];
                    message.error(errorMessage)
                })
            } else {
                if (location?.href.includes('redirect=1')) {
                    await router.push('/questioner/dashboard/profile')
                } else {
                    await router.push('/questioner/resume')
                }

            }
        } else {
            axiosInstance.post(`user-api/users/${me?.id}/resume/${me?.resume?.id}/research-histories/`, resumeData[resumeData.length - 1]).then(res => {
                if (res?.status === 201) {
                    setResumeData([...resumeData.slice(0, resumeData.length - 1), res.data, {
                        link: undefined, year: undefined, field: undefined
                    }]);
                    message.success('با موفقیت اضافه شد')
                }
            }).catch(error => {
                const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
                message.error(ERROR_MESSAGE)
            })
        }

        if (me?.role === 'n') {
            await axiosInstance.patch('user-api/users/me', {
                ask_for_interview_role: true
            }).then(res => {
                if (location?.href.includes('redirect=1')) {
                    router.push('/questioner/dashboard/profile')
                } else {
                    router.push('/questioner/resume')
                }

            }).catch(error => {
                const errorMessage = error.response?.data[Object.keys(error.response.data)[0]][0];
                message.error(errorMessage)
            })
        } else {
            if (location?.href.includes('redirect=1')) {
                await router.push('/questioner/dashboard/profile')
            } else {
                await router.push('/questioner/resume')
            }

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

    return (<>
        {isLoading ? (
            <>
                <LoadingMaker>
                    <Skeleton.Input active style={{height: '40px', minWidth: 'auto', width: '202px'}}/>
                    <Skeleton.Input active style={{height: '40px', minWidth: 'auto', width: '202px'}}/> <Skeleton.Input
                    active style={{height: '40px', minWidth: 'auto', width: '202px'}}/>
                </LoadingMaker>
                <LoadingMakerMobile>
                    <Spin/>
                </LoadingMakerMobile>
            </>
        ) : (<FromStepScroll>
            {resumeData.map((item, index) => (<FromResumeItem key={item.id}>
                {index > 0 && index + 1 !== resumeData.length &&
                    <BtnComponent onClick={() => removeResearch_histories(item?.id || '')}>
                        <img
                            className="close"
                            src={close.src}
                            alt=""
                        />
                    </BtnComponent>
                }
                {resumeData.length && index !== resumeData.length - 1 &&
                    <BtnComponent onClick={() => editResearch_histories(item.id)}>
                        <img
                            className="close"
                            src={editIcon.src}
                            alt=""
                        />
                    </BtnComponent>}
                <ResumeInputCom>
                    <div className="title">سال پژوهش</div>
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
                        value={resumeData[index]?.year}
                        onChange={e => setResumeData(prevData => {
                            const updatedData = [...prevData];
                            updatedData[index].year = e;
                            return updatedData;
                        })}
                    />
                </ResumeInputCom>
                <ResumeInputCom>
                    <div className="title">لینک</div>
                    <InputCom value={resumeData[index]?.link} onChange={e => setResumeData(prevData => {
                        const updatedData = [...prevData];
                        updatedData[index].link = e?.target?.value;
                        return updatedData;
                    })} direction="ltr" placeholder={`google.come`}/>
                </ResumeInputCom>
                <ResumeInputCom>
                    <div className="title">عنوان</div>
                    <InputCom value={resumeData[index]?.field} onChange={e => setResumeData(prevData => {
                        const updatedData = [...prevData];
                        updatedData[index].field = e?.target?.value;
                        return updatedData;
                    })} direction="rtl"
                              placeholder={`مثال: دریافت جایزه‌ی زکریا`}/>
                </ResumeInputCom>
            </FromResumeItem>))}
        </FromStepScroll>)}

        <ButtonContainer justify={`flex-end`}>
            <AddBtn
                color={!resumeData[resumeData.length - 1]?.link || !resumeData[resumeData.length - 1]?.year || !resumeData[resumeData.length - 1]?.field ? '#D9D9D9' : 'var(--primary-color)'}
                disabled={!resumeData[resumeData.length - 1]?.link || !resumeData[resumeData.length - 1]?.year || !resumeData[resumeData.length - 1]?.field}
                onClick={addResearch_histories}>
                <h2 className={`text`}>افزودن</h2>
                <img
                    style={{opacity: !resumeData[resumeData.length - 1]?.link || !resumeData[resumeData.length - 1]?.year || !resumeData[resumeData.length - 1]?.field ? '0.2' : '1'}}
                    src={add.src} alt="" className="icon"/>
            </AddBtn>
        </ButtonContainer>
        <Button onClick={finishHandler} disabled={resumeData.length < 2 && errors.length} typeof='submit'
                className={StyleModules['confirm_button']}
                type="primary">
            اتمام
        </Button>
    </>)
}