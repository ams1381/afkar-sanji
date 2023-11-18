import React, {useContext, useEffect, useState} from "react";
// style
import {
    Container, Form, FromItem, Row, Title, TextAreaCom,
} from "@/styles/questioner/information";
import StyleModules from "@/styles/auth/LoginStyles.module.css";
import {InputCom} from "@/styles/questioner/resume/resume";
// context
import {themeContext} from "@/utilities/ThemeContext";
// antd
import {message, Select} from "antd";
import {Button, ConfigProvider} from "antd";
import {axiosInstance} from "@/utilities/axios";

import {AnimatePresence, motion} from "framer-motion";

import {LeftLight, RightLight} from "@/styles/auth/Login";

import arrowDownIcon from '@/public/Icons/selectDown.svg'
import Image from "next/image";
import closeIcon from "@/public/Icons/Dismiss.svg";
import {useRouter} from "next/router";
import Head from "next/head";
import {AuthContext} from "@/utilities/AuthContext";
import {WalletPopup} from "@/components/Folders/walletPopup";

export default function () {
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [ confirmButtonLoading , setConfirmButtonLoading ] = useState(false);
    const [ walletPopupOpen , setWalletPopupOpen ] = useState(false);
    const [ distPage , setDistPage ] = useState(null);
    const router = useRouter();
    useEffect(() => {
        setIsLoading(true)
        axiosInstance.get("/user-api/users/me/").then((res) => {
            setUserData(res?.data);
            setIsLoading(false)
        });
    }, []);

    const [country, setCountry] = useState([]);
    const Auth = useContext(AuthContext);
    const [provinceList, setProvinceList] = useState([])
    const [formData, setFormData] = useState({
        first_name: '', last_name: '', gender: '', email: '', address: '', nationality: '', province: '',
    });

    useEffect(() => {
        setFormData({
            first_name: userData?.first_name,
            last_name: userData?.last_name,
            gender: userData?.gender,
            email: userData?.email,
            address: userData?.address,
            nationality: userData?.nationality?.id,
            province: userData?.province?.id,
        });
    }, [userData]);

    useEffect(() => {
        axiosInstance.get('/user-api/nested-countries/').then(res => {
            const formattedArrayCountry = res?.data.map((item, index) => ({
                value: item.id, label: item.name,
            }))
            console.log(formattedArrayCountry)
            res?.data?.map(item => {
                const formattedArrayProvince = item?.provinces?.map((item, index) => ({
                    value: item.id, label: item.name,
                }))
                setProvinceList(formattedArrayProvince)
            })
            setCountry(formattedArrayCountry)
        })
    }, []);

    const handleSubmit = async () => {
        setConfirmButtonLoading(true)

        if(Object.values(formData).some(item => (item === null || item === '' || item === undefined)))  {
            message.error({
                content : 'لطفا اطلاعات را به طور کامل کنید'
            })
            setConfirmButtonLoading(false)
            return
        }

        axiosInstance.patch('/user-api/users/me/', formData).then(res => {
            if (res?.status === 200) {
                // message.success('با موفقیت انجام شد')
                setConfirmButtonLoading(false)
                // router.push('/questioner/resume/')
            }


        }).catch(error => {
            setConfirmButtonLoading(false)
            const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
            message.error(ERROR_MESSAGE)
        })
        if(!Auth.hasWallet) {
            setWalletPopupOpen(true);
            setDistPage('resume')
        }

            if ((userData?.role === 'n' || userData.role === 'e') && !userData.ask_for_interview_role) {
             axiosInstance.patch('user-api/users/me', {
                ask_for_interview_role: true
            }).then(res => {
                 Auth.setAskForInterviewRole(true)
                 if(Auth.hasWallet)
                    router.push('/questioner/resume')
            }).catch(error => {
                const errorMessage = error.response?.data[Object.keys(error.response.data)[0]][0];
                message.error(errorMessage)
            })
        } else {
                if(Auth.hasWallet)
                   router.push('/questioner/resume')
        }
    }

    return (<>
        <Head>
            <title> Afkar Sanji | Information </title>
        </Head>
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
                    onClick={() => router.push('/')}
                    style={{
                        position: 'absolute', top: '20px', right: '20px', cursor: 'pointer',
                    }}
                />
                {userData && (
                    <Container>
                        <WalletPopup distPage={distPage} walletPopupOpen={walletPopupOpen} setWalletPopupOpen={setWalletPopupOpen} />
                        <Title>لطفا اطلاعات خود را کامل‌کنید</Title>
                        <Form>
                            <Row direction={"rtl"}>
                                <FromItem>
                                    <div className="title">نام *</div>
                                    <InputCom
                                        value={formData.first_name}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData, first_name: e?.target?.value,
                                            });

                                        }}
                                        required
                                    />
                                </FromItem>
                                <FromItem>
                                    <div className="title">نام خانوادگی *</div>
                                    <InputCom
                                        required
                                        value={formData.last_name}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData, last_name: e?.target?.value,
                                            });
                                        }}
                                    />
                                </FromItem>
                            </Row>

                            <Row direction={"rtl"}>
                                <FromItem>
                                    <div className="title">ایمیل *</div>
                                    <InputCom
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData, email: e?.target?.value,
                                            });
                                        }}
                                        type={"email"}
                                    />
                                </FromItem>
                            </Row>

                            <Row direction={"rtl"}>
                                <FromItem>
                                    <div className="title">جنسیت *</div>
                                    <Select
                                        suffixIcon={<img src={arrowDownIcon?.src}/>}
                                        options={[{value: "f", label: "زن"}, {value: "m", label: "مرد"},]}
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
                                    <div className="title">آدرس محل سکونت *</div>
                                    <TextAreaCom
                                        value={formData.address}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData, address: e?.target?.value,
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
                                    <div className="title">ملیت *</div>
                                    <Select
                                        options={country}
                                        className={'notBorder'}
                                        suffixIcon={<img src={arrowDownIcon?.src}/>}
                                        value={[formData?.nationality]}
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
                                            console.log(e)
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
                                    loading={confirmButtonLoading}
                                    style={{marginTop: '0px'}}
                                    className={StyleModules["confirm_button"]}
                                    type="primary"
                                >
                                    ارسال اطلاعات
                                </Button>
                            </ConfigProvider>
                        </Form>
                    </Container>
                )}
            </motion.div>
        </AnimatePresence>
    </>);
}

export async function getServerSideProps(context) {
    const {req} = context;
    const cookies = req.headers.cookie;
    const urlDest = req.url;
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
            permanent: false,  destination: "/auth?returnUrl=" + urlDest
        },
    };
}
