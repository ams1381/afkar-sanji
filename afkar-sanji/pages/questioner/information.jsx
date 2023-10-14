import React, {useEffect, useState} from "react";
// style
import {Container, Form, FromItem, Row, Title, TextAreaCom} from 'styles/questioner/information'
import {TextAnswerInputBox} from 'styles/questionnairePanel/QuestionComponent'
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import {InputCom} from "@/styles/questioner/resume/resume";
// context
import {themeContext} from "@/utilities/ThemeContext";
// antd
import {message, Select} from 'antd';
import {Button, ConfigProvider} from "antd";
import {axiosInstance} from "@/utilities/axios";
import {yearDete} from "@/utilities/data/date";
import {useQuery} from "@tanstack/react-query";
import {informationSchema} from "@/utilities/validators/information";
// motion
import {AnimatePresence, motion} from 'framer-motion';
// style
import {LeftLight, RightLight} from "@/styles/auth/Login";

export default function () {
    const [userData, setUserData] = useState([
        {
            first_name: undefined,
            last_name: undefined,
            email: undefined,
            gender: undefined,
            address: undefined,
            nationality: undefined,
            province: undefined
        }
    ])


    // const [errors, setErrors] = useState([]);
    // useEffect(() => {
    //     setErrors([]);
    //     let errorsValus = [];
    //     let result = informationSchema.validate(object, {abortEarly: false});
    //     if (result.error?.details?.length > 0) errorsValus.push(errors)
    //     setErrors(errorsValus);
    // }, [userData]);


    const [errors, setErrors] = useState([]);
    useEffect(() => {
        setErrors([]);
        const result = informationSchema.validate(
            userData
        );
        console.log(result)
        // setErrors(
        //     result.error?.details?.length > 0
        //         ? result.error?.details?.map((err) => err.message)
        //         : []
        // );
    }, [userData]);

    useEffect(() => {
        console.log(userData)
    }, [userData]);


    useEffect(() => {
        errors.forEach(err => {
            message.error('casdgfnh')
        })
    }, [errors]);


    // state for values
    // const [userData, setUserData] = useState([])
    const [name, setName] = useState('')
    const [family, setFamily] = useState('')
    const [email, setEmail] = useState('')
    const [countrySelect, setcountrySelect] = useState('')
    const [provinceSelect, setprovinceSelect] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [province, setProvince] = useState('')
    const [loadingState, setLoadingState] = useState(false)
    const [isOk, setIsOk] = useState(false)
    const [isDisable, setIsDisable] = useState(false)
    const [year, setYear] = useState(yearDete)
    const [genders, setGenders] = useState([{
        value: 'f', label: 'زن',
    }, {
        value: 'm', label: 'مرد',
    },])
    // email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/


    const {data, isLoading, error, refetch} = useQuery(['Me'],
        async () => await axiosInstance.get('/user-api/users/me/'))
    // useEffect(() => {
    //     setUserData(data?.data)
    //     setName(data?.data?.first_name)
    //     setFamily(data?.data?.last_name)
    //     setEmail(data?.data?.email)
    //     setGender(data?.data?.gender)
    //     setAddress(data?.data?.address)
    // }, [data]);

    useEffect(() => {
        if (
            name !== data?.first_name ||
            family !== data?.last_name ||
            gender !== data?.gender ||
            email !== data?.email ||
            address !== data?.address ||
            country !== data?.natinality ||
            province !== data?.province
        ) {
            setIsOk(true)
            setIsDisable(true);
        } else {
            setIsOk(false)
            setIsDisable(false);
        }
    }, [name,
        family,
        email,
        address,
        country,
        province, gender]);


    useEffect(() => {

    }, []);


    const submit = (e) => {
        let fromData = new FormData()
        // append
        fromData.append('first_name', name)
        fromData.append('last_name', family)
        fromData.append('gender', gender)
        fromData.append('email', email)
        fromData.append('address', address)
        fromData.append('nationality', '1')
        fromData.append('province', '1')
        // if state was ok send req
        if (!emailRegex.test(email)) message.error('ایمیل وارد شده نامعتبر است');
        if (isOk)
            setLoadingState(true)
        axiosInstance.patch('/user-api/users/me/', fromData).then(res => {
            message.success('با موفقیت انجام شد')
            // false loading
            setLoadingState(false)
        }).catch(err => {
            if (err === 400) {
                message.error('مشکلی پیش آمده داریم بررسی میکنیم')
            }
            setLoadingState(false)
        })

    }
    return (
        <>
            <RightLight/>
            <LeftLight/>
            <AnimatePresence>
                <motion.div transition={{duration: 1}} initial={{y: 220}} animate={{y: 0}}>
                    <Container>
                        <Title>لطفا اطلاعات خود را کامل‌کنید</Title>
                        <Form>
                            <Row direction={'rtl'}>
                                <FromItem>
                                    <div className="title">نام</div>
                                    <InputCom required value={name} onChange={(e) => setName(e?.target?.value)}/>
                                </FromItem>
                                <FromItem>
                                    <div className="title">نام خانوادگی</div>
                                    <InputCom required value={family} onChange={(e) => setFamily(e?.target?.value)}/>
                                </FromItem>
                            </Row>

                            <Row direction={'rtl'}>
                                <FromItem>
                                    <div className="title">ایمیل</div>
                                    <InputCom value={email} onChange={(e) => setEmail(e?.target?.value)}
                                              type={'email'}/>
                                </FromItem>
                            </Row>

                            <Row direction={'rtl'}>
                                <FromItem>
                                    <div className="title">جنسیت</div>
                                    <Select
                                        style={{
                                            width: '100%',
                                            textAlign: 'right',
                                            height: '40px',
                                            padding: '0',
                                            boxShadow: 'none'
                                        }}
                                        placeholder={'انتخاب کنید'}
                                        options={genders}
                                        onChange={(e) => setGender(e)}
                                    />
                                </FromItem>
                            </Row>

                            <Row direction={'rtl'}>
                                <FromItem>
                                    <div className="title">آدرس محل سکونت</div>
                                    <TextAreaCom required value={address} onChange={(e) => setAddress(e?.target?.value)}
                                                 direction={`rtl`} placeholder="آدرس خود را بنویسید"/>
                                </FromItem>
                            </Row>

                            <Row direction={'rtl'}>
                                <FromItem>
                                    <div className="title">ملیت</div>
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
                                        onChange={(e) => setcountrySelect(e)}
                                    />
                                </FromItem>
                                <FromItem>
                                    <div className="title">استان محل سکونت</div>
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
                                        onChange={(e) => setprovinceSelect(e)}
                                    />
                                    {/*<TextAnswerInputBox required value={province}*/}
                                    {/*                    onChange={(e) => setProvince(e?.target?.value)}/>*/}
                                </FromItem>
                            </Row>
                            <ConfigProvider theme={themeContext}>
                                <Button onClick={submit} type='submit'
                                        loading={loadingState} className={StyleModules['confirm_button']}
                                        type="primary">
                                    ارسال اطلاعات
                                </Button>
                            </ConfigProvider>
                        </Form>
                    </Container>
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export async function getServerSideProps(context) {
    const {req} = context;
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