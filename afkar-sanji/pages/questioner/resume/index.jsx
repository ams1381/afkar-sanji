import React, {useEffect, useState, useMemo, useRef} from "react";
import {useRouter} from "next/router";
// style
import {
    ButtonUploader, Container, CreateResume, Email, Header, InputCom, ResumeBg, Uploader, UploaderHeader
} from "@/styles/questioner/resume/resume";
// component
import ResumeBox from "@/components/Questioner/Resume/ResumeBox";
// icons
import Linkedin from 'public/Icons/2.svg'
import UploaderIcon from 'public/Icons/wrapper.svg'
import closeIcon from "public/Icons/Dismiss.svg";
import arrowUrl from 'public/Icons/arrowUrl.svg'
// ant design
import {Button, Radio, message, Upload} from 'antd';
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import {axiosInstance} from "@/utilities/axios";
import {Input, Space} from 'antd';
// motion
import {AnimatePresence, motion} from 'framer-motion';
// style
import {LeftLight, RightLight} from "@/styles/auth/Login";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import Image from "next/image";
import arrowRightIcon from "@/public/Icons/Chevron Double.svg";
import {ResumeActiveBox, BtnCom} from '@/styles/questioner/resume/resume'
import {useQuery} from "@tanstack/react-query";

const {Search} = Input;
export default function ({meData, cookies}) {
    const [file, setFile] = useState(null)
    const [fileSize, setFileSize] = useState(null)
    const [link, setLink] = useState('')
    const [isUpload, setIsUpload] = useState(false)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploadOk, setUploadOk] = useState(false);
    const [isHaveResume, setIsHaveResume] = useState(false);
    const [resumeData, setResumeData] = useState([])

    const status = useRef(true);
    useEffect(() => {
        if (status.current) {
            let formData = new FormData()
            formData.append('linkedin', '')
            if (meData?.resume === null) {
                axiosInstance.post(`/user-api/users/${meData?.id}/resume/`, formData)
                    .then(res => {
                        return true
                    })
                    .catch(error => {
                        message.error('مشکلی پیش آمده است')
                    });

            }
        }
        status.current = false;
    }, []);

    const resumeHandler = (method, type, value, is_file) => {
        let formData = new FormData()
        formData.append(type, value)
        if (method === 'patch') {
            axiosInstance.patch(`/user-api/users/${meData?.id}/resume/${meData?.resume?.id}`, formData, {
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

    const urlHandler = () => {
        if (link.length > 0) {
            if (meData?.resume?.id) {
                resumeHandler('patch', 'linkedin', link.trim(), false)
            }

        } else {
            message.info('لطفا لینک را وارد کنید')
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
                        <div className="caption">رزومه‌ساز ماح اجباری هست</div>
                    </Header>
                    <Container>
                        <div className={`container_box`}>
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
                                            listType="picture"
                                            multiple={false}
                                            method={null}
                                            accept=".pdf,image/*"
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
                                                setIsUpload(false);
                                            }}
                                    >
                                        {isUpload ? ('') : (<ButtonUploader disabled={false}>
                                            <p className="text">آپلود</p>
                                            <img src={UploaderIcon?.src} alt=""/>
                                        </ButtonUploader>)}
                                    </Upload>
                                </Uploader>
                            </ResumeBox>
                        </div>
                        <div style={{
                            marginRight: '0', width: '100%', display: 'flex', justifyContent: ' end'
                        }}>
                            <Button
                                disabled={isHaveResume}
                                style={{
                                    marginTop: '100px',
                                    padding: '0 15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}
                                className={`bottom`}
                                // onClick={() => router.push("/questioner/information")}
                            >
                                تکمیل اطلاعات
                                <img src={arrowRightIcon?.src}/>

                            </Button>
                        </div>
                    </Container>
                </motion.div>
            </AnimatePresence>

        </>

    )
}


export async function getServerSideProps(context) {
    const {req} = context;
    const cookies = req.headers.cookie;
    let MeData
    // Check if cookies are present
    if (cookies) {
        // Parse the cookies
        const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});
        let MeResponse = await fetch('https://mah-api.ariomotion.com/user-api/users/me/', {
            headers: {
                Authorization: `Bearer ${parsedCookies.access_token}`,
            }
        })
        MeData = await MeResponse.json();
        return {
            props: {
                // Pass the cookies as props to the component
                cookies: parsedCookies, meData: MeData ? MeData : null
            },
        };
    }

    return {
        redirect: {
            permanent: false, destination: "/auth"
        }
    };
}