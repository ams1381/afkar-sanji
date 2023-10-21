import React, {useEffect, useState} from "react";
// style
import {
    Container,
    Form,
    FromItem,
    Row,
    Title,
    TextAreaCom,
} from "@/styles/questioner/information";
import {TextAnswerInputBox} from "styles/questionnairePanel/QuestionComponent";
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import {InputCom} from "@/styles/questioner/resume/resume";
// context
import {themeContext} from "@/utilities/ThemeContext";
// antd
import {message, Select} from "antd";
import {Button, ConfigProvider} from "antd";
import {axiosInstance} from "@/utilities/axios";
import {yearDete} from "@/utilities/data/date";
import {useQuery} from "@tanstack/react-query";
import {informationSchema} from "@/utilities/validators/information";
// motion
import {AnimatePresence, motion} from "framer-motion";
// style
import {LeftLight, RightLight} from "@/styles/auth/Login";
// icon 
import arrowDownIcon from '@/public/Icons/selectDown.svg'
import Image from "next/image";
import closeIcon from "@/public/Icons/Dismiss.svg";

export default function () {
    const [userData, setUserData] = useState();
    useEffect(() => {
        axiosInstance.get("/user-api/users/me/").then((res) => {
            setUserData(res?.data);
        });
    }, []);

    const [country, setCountry] = useState([])
    const [provinceList, setProvinceList] = useState([])
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        email: '',
        address: '',
        nationality: '',
        province: '',
    });

    useEffect(() => {
        setFormData({
            first_name: userData?.first_name,
            last_name: userData?.last_name,
            gender: userData?.gender,
            email: userData?.email,
            address: userData?.address,
            nationality: userData?.nationality,
            province: userData?.province,
        });
    }, [userData]);

    useEffect(() => {
        axiosInstance.get('/user-api/nested-countries/').then(res => {
            const formattedArrayCountry = res?.data.map((item, index) => ({
                value: item.id,
                label: item.name,
            }))
            res?.data?.map(item => {
                const formattedArrayProvince = item?.provinces?.map((item, index) => ({
                    value: item.id,
                    label: item.name,
                }))
                setProvinceList(formattedArrayProvince)
            })
            setCountry(formattedArrayCountry)
        })
    }, []);

    // email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    const handleSubmit = () => {
        axiosInstance.patch('/user-api/users/me/', formData).then(res => {
            if (res?.status === 200) message.success('با موفقیت انجام شد')
        }).catch(error => {
            const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
            message.error(ERROR_MESSAGE)
        })
    }

    return (
        <>
            <RightLight/>
            <LeftLight/>
            <AnimatePresence>
                <motion.div
                    transition={{duration: 1}}
                    initial={{y: 220}}
                    animate={{y: 0}}
                >
                    <Image
                        width={28}
                        height={28}
                        className={"close"}
                        src={closeIcon?.src}
                        alt={"بستن"}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            cursor: 'pointer',
                        }}
                    />
                    <Container>
                        <Title>لطفا اطلاعات خود را کامل‌کنید</Title>
                        <Form>
                            <Row direction={"rtl"}>
                                <FromItem>
                                    <div className="title">نام</div>
                                    <InputCom
                                        value={formData.first_name}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                first_name: e?.target?.value,
                                            });

                                        }}
                                        required
                                    />
                                </FromItem>
                                <FromItem>
                                    <div className="title">نام خانوادگی</div>
                                    <InputCom
                                        required
                                        value={formData.last_name}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                last_name: e?.target?.value,
                                            });
                                        }}
                                    />
                                </FromItem>
                            </Row>

                            <Row direction={"rtl"}>
                                <FromItem>
                                    <div className="title">ایمیل</div>
                                    <InputCom
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                email: e?.target?.value,
                                            });
                                        }}
                                        type={"email"}
                                    />
                                </FromItem>
                            </Row>

                            <Row direction={"rtl"}>
                                <FromItem>
                                    <div className="title">جنسیت</div>
                                    <Select
                                        suffixIcon={<img src={arrowDownIcon?.src}/>}
                                        options={[
                                            {value: "f", label: "زن"},
                                            {value: "m", label: "مرد"},
                                        ]}
                                        value={formData.gender}
                                        onChange={(e) => {
                                            setFormData({...formData, gender: e});
                                        }}
                                        style={{
                                            width: "100%",
                                            textAlign: "right",
                                            height: "40px",
                                            padding: "0",
                                            boxShadow: "none",
                                        }}
                                        placeholder={"انتخاب کنید"}
                                    />
                                </FromItem>
                            </Row>

                            <Row direction={"rtl"}>
                                <FromItem>
                                    <div className="title">آدرس محل سکونت</div>
                                    <TextAreaCom
                                        value={formData.address}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                address: e?.target?.value,
                                            });
                                        }}
                                        required
                                        direction={`rtl`}
                                        placeholder="آدرس خود را بنویسید"
                                    />
                                </FromItem>
                            </Row>

                            <Row direction={"rtl"}>
                                <FromItem>
                                    <div className="title">ملیت</div>
                                    <Select
                                        options={country}
                                        className={'notBorder'}
                                        suffixIcon={<img src={arrowDownIcon?.src}/>}
                                        value={formData?.nationality}
                                        style={{
                                            width: "100%",
                                            height: "40px",
                                            textAlign: "right",
                                            padding: "0",
                                            boxShadow: "none",
                                            direction: "rtl",
                                        }}
                                        placeholder={"انتخاب کنید"}
                                        onChange={(e) => {
                                            setFormData({...formData, nationality: e});
                                        }}
                                    />
                                </FromItem>
                                <FromItem>
                                    <div className="title">استان محل سکونت</div>
                                    <Select
                                        className={'notBorder'}
                                        suffixIcon={<img src={arrowDownIcon?.src}/>}
                                        options={provinceList}
                                        value={formData.province}
                                        onChange={(e) => {
                                            setFormData({...formData, province: e});
                                        }}
                                        style={{
                                            width: "100%",
                                            height: "40px",
                                            textAlign: "right",
                                            padding: "0",
                                            boxShadow: "none",
                                            direction: "rtl",
                                        }}
                                        placeholder={"انتخاب کنید"}
                                    />
                                </FromItem>
                            </Row>
                            <ConfigProvider theme={themeContext}>
                                <Button
                                    onClick={handleSubmit}
                                    style={{marginTop: '0px'}}
                                    className={StyleModules["confirm_button"]}
                                    type="primary"
                                >
                                    ارسال اطلاعات
                                </Button>
                            </ConfigProvider>
                        </Form>
                    </Container>
                </motion.div>
            </AnimatePresence>
        </>
    );
}

export async function getServerSideProps(context) {
    const {req} = context;
    const cookies = req.headers.cookie;

    // Check if cookies are present
    if (cookies) {
        // Parse the cookies
        const parsedCookies = cookies.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
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
            destination: "/auth",
        },
    };
}
