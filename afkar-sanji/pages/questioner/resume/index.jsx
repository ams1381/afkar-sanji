import React, {useEffect, useState, useRef} from "react";
import {useRouter} from "next/router";
import {
    ButtonUploader,
    Container,
    ContainerResumeIndex,
    CreateResume,
    Email,
    Header,
    InputCom,
    ResumeBg,
    Uploader,
    UploaderHeader
} from "@/styles/questioner/resume/resume";
import ResumeBox from "@/components/Questioner/Resume/ResumeBox";
import Linkedin from 'public/Icons/2.svg'
import UploaderIcon from 'public/Icons/wrapper.svg'
import closeIcon from "public/Icons/Dismiss.svg";
import arrowUrl from 'public/Icons/arrowUrl.svg'
import {Button, message, Upload} from 'antd';
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import {axiosInstance} from "@/utilities/axios";
import {Input} from 'antd';
import {AnimatePresence, motion} from 'framer-motion';
import {LeftLight, RightLight} from "@/styles/auth/Login";
import Image from "next/image";
import arrowRightIcon from "@/public/Icons/Chevron Double.svg";
import {ResumeActiveBox, BtnCom} from '@/styles/questioner/resume/resume'

export default function ({meData, cookies}) {
    const [fileSize, setFileSize] = useState(null)
    const [link, setLink] = useState(meData?.resume?.linkedin || '')
    const [isUpload, setIsUpload] = useState(false)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploadOk, setUploadOk] = useState(false);
    const [isHaveResume, setIsHaveResume] = useState(false);
    const status = useRef(true);
    const [resumeData, setResumeData] = useState(null)

    useEffect(() => {
        if (meData?.resume?.file) setIsUpload(true)
        else setIsUpload(false)
    }, []);

    useEffect(() => {
        if (!meData.resume) {
            let formData = new FormData();
            formData.append('linkedin', '')
            if (meData?.resume === null) {
                axiosInstance.post(`/user-api/users/${meData?.id}/resume/`, formData)
                    .then(res => {
                        setResumeData(res?.data)
                    })
                    .catch(error => {
                        const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
                        message.error(ERROR_MESSAGE)
                    });
            }
        } else {
            setResumeData(meData.resume)
        }
    }, []);
    const urlHandler = () => {
        if (link.length > 0) {
            resumeHandler('patch', 'linkedin', link.trim(), false)
        } else {
            message.info('لطفا لینک را وارد کنید')
        }
    }

    const resumeHandler = (method, type, value, is_file) => {
        let formData = new FormData()
        formData.append(type, value)
        if (method === 'patch') {
            axiosInstance.patch(`/user-api/users/${meData?.id}/resume/${resumeData?.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                message.success('موفقیت آمیز بود')
                setLoading(false)
            }).catch(error => {
                const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
                message.error(ERROR_MESSAGE)
                setLoading(false)
            })
            if (is_file) {
                setIsUpload(true)
            }

        }

        if (method === 'post') {
            // send req
            axiosInstance.post(`/user-api/users/${meData?.id}/resume/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                message.success('موفقیت آمیز بود')
                setLoading(false)
            }).catch(error => {
                const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
                message.error(ERROR_MESSAGE)
                setLoading(false)
            })
            setIsUpload(true)
            message.success(`با موفقیت آپلود شد`);
        }
    }

    useEffect(() => {
        if (meData?.resume !== null) {
            if (meData?.resume?.is_empty) {
                setIsHaveResume(true);
            } else {
                setIsHaveResume(false);
            }
        }
    }, [isHaveResume]);

    const props = {
        name: 'file', headers: {
            'Content-Type': 'multipart/form-data'
        }, onChange(info) {
            if (info.file.status !== 'uploading') {
                const sizeInBytes = info.file.size;
                const sizeInMegabytes = sizeInBytes / (1024 * 1024);
                setFileSize(`${sizeInMegabytes.toFixed(2)}`);
            }
            if (info.file.status === 'done' && uploadOk) {
                resumeHandler('patch', 'file', info?.file?.originFileObj, true)
            }
        },
    };

    const removeFileHandler = () => {
        if (meData?.resume?.file) {
            axiosInstance.patch(`/user-api/users/${meData?.resume?.id}/resume/${resumeData?.id}`, {
                file: null
            }).catch(err => {
                console.log(err)
            })
        }
        setIsUpload(false);
    }

    const [reqLoading, setReqLoading] = useState(false)
    const [reqBtnValue, setReqBtnValue] = useState(meData?.ask_for_interview_role ? "رفتن به صفحه اصلی" : "ارسال به ادمین")

    console.log(meData?.ask_for_interview_role)

    useEffect(() => {
        setReqBtnValue((meData?.role === 'n' || meData?.role === 'e') ?  "ارسال به ادمین" : "رفتن به صفحه اصلی")
    }, [meData?.ask_for_interview_role]);
    const sendReqHandler = async () => {
        if (meData?.role === 'i' || meData?.role === 'ie') {
            await router.push('/')
            return
        }
        if (!meData?.ask_for_interview_role) {
            setReqLoading(true)
            await axiosInstance.patch('user-api/users/me', {
                ask_for_interview_role: true
            }).then(res => {
                message.success('درخواست شما به ادمین ارسال شد')
                setReqLoading(false)
                setReqBtnValue('رفتن به صفحه اصلی')
            }).catch(error => {
                const errorMessage = error.response?.data[Object.keys(error.response.data)[0]][0];
                if (error.status !== 400) {
                    setReqLoading(false)
                    message.error(errorMessage)
                }
                if (error.status === 400) router.push('/')
            })
        }

    }


    return (<>
            <RightLight/>
            <LeftLight/>
            <AnimatePresence>
                <motion.div transition={{duration: 1}} initial={{y: 220}} animate={{y: 0}}>
                    <Image
                        width={28}
                        height={28}
                        className={"close"}
                        src={closeIcon?.src}
                        alt={"بستن"}
                        style={{
                            position: 'absolute', top: '20px', right: '20px', cursor: 'pointer',
                        }}
                    />
                    <Header>
                        <div className="title">نحوه‌ی تحویل رزومه‌ی خود را انتخاب کنید</div>
                        <div className="caption"> حداقل یک مورد را کامل کنید</div>
                    </Header>
                    <ContainerResumeIndex>
                        <div className={`container_box`}>
                            <div className={'head'}>
                                <div className="title">نحوه‌ی تحویل رزومه‌ی خود را انتخاب کنید</div>
                                <div className="caption"> حداقل یک مورد را کامل کنید</div>
                            </div>
                            <ResumeBox padding={'true'}>
                                <Email>
                                    <img className={'icon'} src={Linkedin?.src} alt=""/>
                                    <div className="email">
                                        <div className="title">لینک پروفایل لینکدین</div>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', flexDirection: 'row-reverse'
                                        }} className={''}>
                                            <BtnCom onClick={urlHandler}>
                                                <img style={{
                                                    transform: 'rotate(-180deg)'
                                                }} src={arrowUrl?.src} alt=""/>
                                            </BtnCom>
                                            <InputCom
                                                onChange={(e) => setLink(e?.target?.value)} value={link}
                                                direction={'ltr'}
                                                placeholder={'linkedin.com'}/>
                                        </div>
                                    </div>
                                </Email>
                            </ResumeBox>
                            <ResumeBox style={{
                                position: 'relative'
                            }} scale={1}>
                                {meData?.resume && !meData?.resume?.is_empty && (<ResumeActiveBox>
                                    <div className="text">رزومه‌ شما با موفقیت ایجاد شد</div>
                                </ResumeActiveBox>)}
                                <ResumeBg>
                                    <div className="one"></div>
                                    <div className="two"></div>
                                    <div className="three"></div>
                                    <div className="four"></div>
                                    <div className="five"></div>
                                </ResumeBg>
                                <CreateResume>
                                    <div className="resume">
                                        <div className="title">رزومه‌ی خود را در اینجا بنویسید</div>
                                        <div className="caption">
                                            (پیشنهاد ما)
                                        </div>
                                    </div>

                                    <div className={`button`}>
                                        <Button onClick={() => router.push(`/questioner/resume/make/`)} typeof='submit'
                                                className={StyleModules['confirm_button']}
                                                type="primary">
                                            ورود به روزمه‌ساز
                                        </Button>
                                    </div>
                                </CreateResume>
                            </ResumeBox>
                            <ResumeBox padding={'true'}>
                                <Uploader>
                                    <UploaderHeader>
                                        <div className="title">فایل رزومه‌ی خود را آپلود کنید</div>
                                        <div className={`fileSize`}>حداکثر حجم فایل: ۲۰ مگابایت</div>
                                    </UploaderHeader>
                                    <Upload {...props}
                                            maxCount={1}
                                            className="upload-list-inline"
                                            listType="text"
                                            multiple={false}
                                            method={null}
                                            accept=".pdf,image/*"
                                            defaultFileList={meData?.resume?.file ? [{
                                                name: meData?.resume?.file?.split('http://mah-api.codintofuture.ir/media/resume/'),
                                                url: meData?.resume?.file
                                            }] : null}
                                            beforeUpload={file => {
                                                const isImageOrPDF = file.type.includes('pdf') || file.type.includes('image/');
                                                if (!isImageOrPDF) {
                                                    message.error('فقط فایل پی دی اف یا تصویر قابل بارگذاری است');
                                                    setUploadOk(false);
                                                    return false;
                                                }
                                                setUploadOk(true);
                                                return true;
                                            }}
                                            onRemove={() => {
                                                removeFileHandler()
                                            }}
                                    >
                                        {isUpload ? ('') : (<ButtonUploader disabled={false}>
                                            <p className="text">آپلود</p>
                                            <img src={UploaderIcon?.src} alt=""/>
                                        </ButtonUploader>)}
                                    </Upload>
                                </Uploader>
                            </ResumeBox>
                            <div className={'bottom_mobile_container'}>
                                <Button
                                    disabled={meData?.resume?.is_empty}
                                    className={`bottom_mobile`}
                                    onClick={sendReqHandler}
                                    loading={reqLoading}
                                >
                                    {reqBtnValue}
                                    <img src={arrowRightIcon?.src}/>

                                </Button>
                            </div>
                        </div>
                        <div className={'btnContainer'}>
                            <Button
                                disabled={meData?.resume?.is_empty}
                                className={`bottom`}
                                onClick={sendReqHandler}
                                loading={reqLoading}
                            >
                                {reqBtnValue}
                                <img src={arrowRightIcon?.src}/>
                            </Button>
                        </div>
                    </ContainerResumeIndex>
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export async function getServerSideProps(context) {
    const {req} = context;
    const cookies = req.headers.cookie;
    let MeData;
    const urlDest = req.url;
    // Check if cookies are present
    if (cookies) {
        // Parse the cookies
        const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});

        let MeResponse = await fetch('https://mah-api.codintofuture.ir/user-api/users/me/', {
            headers: {
                Authorization: `Bearer ${parsedCookies.access_token}`,
            }
        })

        MeData = await MeResponse.json();
        return {
            props: {
                // Pass the cookies as props to the component
                cookies: parsedCookies,
                meData: MeData ? MeData : null
            },
        };
    }

    return {
        redirect: {
            permanent: false, destination: "/auth?returnUrl=" + urlDest
        }
    };
}