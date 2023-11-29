import close from "@/public/Icons/Close.svg";
import {
    FromResumeItem,
    InputCom,
    ResumeInputCom,
    FromStepScroll,
    ButtonContainer,
    AddBtn,
    BtnComponent,
    LoadingMakerMobile,
    LoadingMaker
} from "@/styles/questioner/resume/resume";
import {Button, message, Select, Skeleton, Spin} from "antd";
import React, {useEffect, useState} from "react";
import add from "@/public/Icons/addBlue.svg";
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import { skillsSchema} from "@/utilities/validators/resumeMaker";
import {axiosInstance} from "@/utilities/axios";
import arrowDownIcon from '@/public/Icons/selectDown.svg'
import editIcon from "@/public/Icons/editEesume.svg";

export default function ({
                             score, setCurrent, setTitle, me
                         }) {
    const [skillsData, setSkillsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const getData = () => {
        setIsLoading(true)
        axiosInstance.get(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/skills/`).then(res => {
            setSkillsData([...res?.data,
                {
                    level: undefined, field: undefined
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
        skillsData.forEach(object => {
            let result = skillsSchema.validate(object, {abortEarly: false});
            if (result.error?.details?.length > 0) errorsValus.push(errors)
        })
        setErrors(errorsValus);
    }, [skillsData]);

    function addSkills() {
        axiosInstance.post(`user-api/users/${me?.id}/resume/${me?.resume?.id}/skills/`, skillsData[skillsData.length - 1]).then(res => {
            if (res?.status === 201) {
                setSkillsData([...skillsData.slice(0, skillsData.length - 1), res.data, {
                    level: undefined, field: undefined
                }]);
                message.success('با موفقیت اضافه شد')
            }
        }).catch(error => {
            const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
            message.error(ERROR_MESSAGE)
        })
    }

    async function removeSkills(id) {
        if (id) {
            await axiosInstance.delete(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/skills/${id}/`).then(res => {
                if (res?.status === 204) {
                    message.error('حذف شد')
                    setSkillsData(skillsData.filter(item => item.id !== id))
                }
            })
        } else {
            setSkillsData(prevItems => prevItems.filter((item, index) => index !== id));
            message.success('با موفقیت حذف شد')
        }
    }

    const editEducation = async (id) => {
        try {
            const updatedItem = skillsData.find(item => item.id === id);
            const index = skillsData.findIndex(item => item.id === id);
            const response = await axiosInstance.put(`/user-api/users/${me?.id}/resume/${me?.resume?.id}/skills/${id}/`, updatedItem);
            if (response.status === 200) {
                setSkillsData(prevData => {
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

    function submit() {
        if (skillsData.some(skill => !skill.level || !skill.field)) {
            setCurrent(p => p + 1)
            setTitle("افتخارات مرتبط با پرسش‌گری را در این بخش اضافه کنید")
        } else {
            axiosInstance.post(`user-api/users/${me?.id}/resume/${me?.resume?.id}/skills/`, skillsData[skillsData.length - 1]).then(res => {
                if (res?.status === 201) {
                    setSkillsData([...skillsData.slice(0, skillsData.length - 1), res.data, {
                        level: undefined, field: undefined
                    }]);
                    message.success('با موفقیت اضافه شد')
                    setCurrent(p => p + 1)
                    setTitle("افتخارات مرتبط با پرسش‌گری را در این بخش اضافه کنید")
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
                        <Skeleton.Input active style={{height: '40px', minWidth: 'auto', width: '312px'}}/>
                        <Skeleton.Input active style={{height: '40px', minWidth: 'auto', width: '313px'}}/>
                    </LoadingMaker>
                    <LoadingMakerMobile>
                        <Spin/>
                    </LoadingMakerMobile>
                </>
            ) : (
                <FromStepScroll>
                    {skillsData?.map((item, index) => (<FromResumeItem key={index}>
                        {index > 0 && index + 1 !== skillsData.length &&
                            <BtnComponent onClick={() => removeSkills(item?.id || '')}>
                                <img
                                    className="close"
                                    src={close.src}
                                    alt=""
                                />
                            </BtnComponent>
                        }
                        {skillsData.length && index !== skillsData.length - 1 &&
                            <BtnComponent onClick={() => editEducation(item.id || '')}>
                                <img
                                    className="close"
                                    src={editIcon.src}
                                    alt=""
                                />
                            </BtnComponent>
                        }
                        <ResumeInputCom>
                            <div className="title">سطح مهارت</div>
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
                                placeholder='از ۱ تا ۵'
                                options={score}
                                value={skillsData[index]?.level}
                                onChange={e => setSkillsData(prevData => {
                                    const updatedData = [...prevData];
                                    updatedData[index].level = e;
                                    return updatedData;
                                })}
                            />
                        </ResumeInputCom>
                        <ResumeInputCom>
                            <div className="title">نام مهارت</div>
                            <InputCom value={skillsData[index]?.field} onChange={e => setSkillsData(prevData => {
                                const updatedData = [...prevData];
                                updatedData[index].field = e?.target?.value;
                                return updatedData;
                            })} direction="rtl" placeholder='مثال: ریاضی‌محض'/>
                        </ResumeInputCom>
                    </FromResumeItem>))}
                </FromStepScroll>
            )}

            <ButtonContainer justify={`flex-end`}>
                <AddBtn
                    color={skillsData.some(skill => !skill.level || !skill.field) ? '#D9D9D9' : 'var(--primary-color)'}
                    disabled={skillsData.some(skill => !skill.level || !skill.field)} onClick={addSkills}>
                    <h2 className={`text`}>افزودن</h2>
                    <img style={{opacity: skillsData.some(skill => !skill.level || !skill.field) ? '0.2' : '1'}}
                         src={add.src} alt="" className="icon"/>
                </AddBtn>
            </ButtonContainer>

            <Button disabled={skillsData.length < 2 && skillsData.some(skill => !skill.level || !skill.field)}
                    typeof='submit'
                    onClick={submit}
                    className={StyleModules['confirm_button']}
                    type="primary">
                بعدی
            </Button>
        </>

    )
}
