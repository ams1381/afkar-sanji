import React, {useEffect, useState, useMemo} from "react";
import {useRouter} from "next/router";
// style
import {
    ButtonUploader,
    Container, CreateResume,
    Email,
    Header,
    InputCom, ResumeBg,
    Uploader,
    UploaderHeader
} from "@/styles/questioner/resume/resume";
// component
import ResumeBox from "@/components/Questioner/Resume/ResumeBox";
// icons
import Linkedin from 'public/Icons/2.svg'
import UploaderIcon from 'public/Icons/wrapper.svg'
// ant design
import {Button, message, Upload} from 'antd';
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import {axiosInstance} from "@/utilities/axios";


export default function () {
    const [file, setFile] = useState()
    const [fileSize, setFileSize] = useState(null)
    const [link, setLink] = useState('')
    const router = useRouter()

    const props = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                setFileSize(info.file)
                const sizeInBytes = info.file.size;
                const sizeInMegabytes = sizeInBytes / (1024 * 1024);
                setFileSize(`${sizeInMegabytes.toFixed(2)}`);
            }
            if (info.file.status === 'done') {
                setFile(info)
                message.success(`با موفقیت آپلود شد`);
            } else if (info.file.status === 'error') {
                message.error(`با شکست مواجه شد `);
            }
        },
    };


    const submit = () => {
        let formData = new FormData()
        formData.append('linkedin', link.trim() || '')
        formData.append('file', file?.file?.originFileObj|| '')

        // send req
        axiosInstance.post('/user-api/users/3/resume/', formData).then(res => {
            message.success('موفقیت آمیز بود')
        }).catch(err => {
            message.error('مشکلی پیش آمده است   ')
        })
        console.log(Object.fromEntries(formData))

        router.push('/questioner/resume/make')
    }

    return (
        <>
            <Header>
                <div className="title">نحوه‌ی تحویل رزومه‌ی خود را انتخاب کنید</div>
                <div className="caption">حداقل یک مورد را کامل کنید</div>
            </Header>
            <Container>
                <ResumeBox padding={'true'}>
                    <Email>
                        <img className={'icon'} src={Linkedin?.src} alt=""/>
                        <div className="email">
                            <div className="title">لینک پروفایل لینکدین</div>
                            <InputCom onChange={(e) => setLink(e?.target?.value)} value={link} direction={'ltr'}
                                      placeholder={'linkedin.com'}/>
                        </div>
                    </Email>
                </ResumeBox>
                <ResumeBox style={{
                    position: 'relativ'
                }} scale={1.1}>
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
                            <Button onClick={submit} typeof='submit'
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
                            {fileSize && <div className="fileSize">حداکثر حجم فایل: {fileSize} مگابایت</div>}
                            {!fileSize && ''}
                        </UploaderHeader>
                        <Upload {...props}>
                            <ButtonUploader disabled={false}>
                                <p className="text">آپلود</p>
                                <img src={UploaderIcon?.src} alt=""/>
                            </ButtonUploader>
                        </Upload>
                    </Uploader>
                </ResumeBox>
            </Container>
        </>

    )
}

export async function getServerSideProps(context) {
    const { req } = context;
    const cookies = req.headers.cookie;

    // Check if cookies are present
    if (cookies) {
        // Parse the cookies
        const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});
        return {
            props: {
                // Pass the cookies as props to the component
                cookies: parsedCookies,
            },
        };
    }

    return {
        redirect: {
            permanent: false,
            destination: "/auth"
        }
    };
}