import {
    BtnComponent,
    FromResumeItem,
    InputCom,
    ResumeInputCom,
    RowCom,
    FromStepScroll,
    ButtonContainer,
    AddBtn,
    Btn,
    LoadingMaker, LoadingMakerMobile
} from "@/styles/questioner/resume/resume";
import {Row} from "@/styles/questioner/resume/resume";
import {Button, message, Select, Skeleton} from "antd";
import close from "@/public/Icons/Close.svg";
import React, {useEffect, useState} from "react";
import add from "@/public/Icons/addBlue.svg";
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import {educationalSchema} from "@/utilities/validators/resumeMaker";
import {axiosInstance} from "@/utilities/axios";
import arrowDownIcon from '@/public/Icons/selectDown.svg'
import editIcon from '@/public/Icons/editEesume.svg'
import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';

export default function ({
                             educations, year, setCurrent, me, setTitle
                         }) {
    const [resumeData, setResumeData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const getData = () => {
        setIsLoading(true)
        axiosInstance.get(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/educational-backgrounds/`).then(res => {
            setIsLoading(false)
            // setIsData(res?.data)
            setResumeData([...res?.data, {
                university: undefined,
                field: undefined,
                end_date: undefined,
                start_date: undefined,
                degree: undefined,
                edu_type: undefined
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
            let result = educationalSchema.validate(object, {abortEarly: false});
            if (result.error?.details?.length > 0) errorsValus.push(errors)
        })
        setErrors(errorsValus);
    }, [resumeData]);

    function addEducational() {
        axiosInstance.post(`user-api/users/${me?.id}/resume/${me?.resume?.id}/educational-backgrounds/`, resumeData[resumeData.length - 1]).then(res => {
            if (res?.status === 201) {
                setResumeData([...resumeData.slice(0, resumeData.length - 1), res.data, {
                    university: undefined,
                    field: undefined,
                    end_date: undefined,
                    start_date: undefined,
                    degree: undefined,
                    edu_type: undefined
                }]);
                message.success('با موفقیت اضافه شد')
            }
        }).catch(error => {
            const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
            message.error(ERROR_MESSAGE)
        })
    }

    async function removeEducational(id) {
        if (id) {
            await axiosInstance.delete(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/educational-backgrounds/${id}/`).then(res => {
                if (res?.status === 204) {
                    message.error('حذف شد')
                    setResumeData(resumeData.filter(item => item.id !== id))
                }
            })
        } else {
            const index = resumeData.findIndex(item => item.id === id);
            const updatedData = [...resumeData];
            updatedData.splice(index, 1);
            setResumeData(updatedData);
        }

    }

    const editEducation = async (id) => {
        try {
            const updatedItem = resumeData.find(item => item.id === id);
            const index = resumeData.findIndex(item => item.id === id);
            const response = await axiosInstance.put(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/educational-backgrounds/${id}/`, updatedItem);
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

    const educationHandler = () => {
        if (errors.length) {
            setCurrent(p => p + 1)
            setTitle('مهارت‌های خود را در این بخش وارد کنید')
        } else {
            axiosInstance.post(`user-api/users/${me?.id}/resume/${me?.resume?.id}/educational-backgrounds/`, resumeData[resumeData.length - 1]).then(res => {
                if (res?.status === 201) {
                    setResumeData([...resumeData.slice(0, resumeData.length - 1), res.data, {
                        university: undefined,
                        field: undefined,
                        end_date: undefined,
                        start_date: undefined,
                        degree: undefined,
                        edu_type: undefined
                    }]);
                    message.success('با موفقیت اضافه شد')
                    setCurrent(p => p + 1)
                    setTitle('مهارت‌های خود را در این بخش وارد کنید')
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

    return (<>
            {isLoading ? (
                <>
                    <LoadingMaker>
                        <Skeleton.Input active style={{height: '40px', minWidth: 'auto', width: '200px'}}/>
                        <Skeleton.Input active style={{height: '40px', minWidth: 'auto', width: '200px'}}/>
                        <Skeleton.Input active style={{height: '40px', minWidth: 'auto', width: '200px'}}/>
                        <Skeleton.Input active style={{height: '40px', minWidth: 'auto', width: ' 646px'}}/>
                    </LoadingMaker>
                    <LoadingMakerMobile>
                        <Spin/>
                    </LoadingMakerMobile>
                </>
            ) : (<FromStepScroll>
                {resumeData.map((item, index) => (<FromResumeItem flexDirection={'column'} key={index}>
                    <Row>
                        <ResumeInputCom>
                            <div className="title">مقطع مدرک</div>
                            <Select
                                suffixIcon={<img src={arrowDownIcon?.src}/>}
                                className={'ant-select-selector'}
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
                                value={resumeData[index]?.degree}
                                onChange={e => setResumeData(prevData => {
                                    const updatedData = [...prevData];
                                    updatedData[index].degree = e;
                                    return updatedData;
                                })}
                            />
                        </ResumeInputCom>
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
                                value={resumeData[index]?.end_date}
                                onChange={e => setResumeData(prevData => {
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
                                value={resumeData[index]?.start_date}
                                onChange={e => setResumeData(prevData => {
                                    const updatedData = [...prevData];
                                    updatedData[index].start_date = e;
                                    return updatedData;
                                })}
                            />
                        </ResumeInputCom>
                        <ResumeInputCom>
                            <div className="title">نام مرکز</div>
                            <InputCom placeholder={`مثال: دانشگاه‌قم`} value={resumeData[index].university}
                                      onChange={e => setResumeData(prevData => {
                                          const updatedData = [...prevData];
                                          updatedData[index].university = e?.target?.value;
                                          return updatedData;
                                      })} direction="rtl"/>
                        </ResumeInputCom>
                    </Row>
                    <RowCom>
                        {(index > 0 && index + 1 !== resumeData.length) &&
                            <BtnComponent onClick={() => removeEducational(item.id || '')} className="close"
                                          shape={'circle'}>
                                <img
                                    src={close.src}
                                    alt=""
                                />
                            </BtnComponent>}
                        {resumeData.length && index !== resumeData.length - 1 &&
                            <BtnComponent onClick={() => editEducation(item.id || '')}>
                                <img
                                    className="close"
                                    src={editIcon.src}
                                    alt=""/>
                            </BtnComponent>}
                        <ResumeInputCom style={{
                            width: '100%', display: 'flex', alignItems: 'flex-end'
                        }}>
                            <div className="title">رشته</div>
                            <InputCom style={{width: '67%'}} direction="rtl"
                                      value={resumeData[index].field || ''}
                                      onChange={e => setResumeData(prevData => {
                                          const updatedData = [...prevData];
                                          updatedData[index].field = e?.target?.value;
                                          return updatedData;
                                      })}
                                      placeholder="مثال: زبان انگلیسی، زبان عربی و"/>
                        </ResumeInputCom>
                    </RowCom>
                </FromResumeItem>))}
            </FromStepScroll>)}
            <ButtonContainer justify={`flex-end`}>
                <AddBtn color={errors?.length ? '#D9D9D9' : 'var(--primary-color)'}
                        disabled={errors.length ? true : false}
                        onClick={addEducational}>
                    <h2 className={`text`}>افزودن</h2>
                    <img style={{opacity: errors?.length ? '0.2' : '1'}} src={add.src} alt="" className="icon"/>
                </AddBtn>
            </ButtonContainer>
            <Button
                disabled={resumeData.length < 2 && errors.length ? true : false}
                typeof='submit'
                onClick={educationHandler}
                className={StyleModules['confirm_button']}
                type="primary">
                بعدی
            </Button>
        </>

    )
}