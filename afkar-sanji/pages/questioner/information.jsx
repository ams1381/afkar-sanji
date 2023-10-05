import {useEffect, useState} from "react";
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

export default function () {
    // state for values
    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [family, setFamily] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [province, setProvince] = useState('')
    const [loadingState, setLoadingState] = useState(false)
    const [isDisable, setIsDisable] = useState(false)
    const [genders, setGenders] = useState([{
        value: 'f', label: 'زن',
    }, {
        value: 'm', label: 'مرد',
    },])
    // email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    useEffect(() => {
        axiosInstance.get('/user-api/users/me/').then(res => {
            setData(res?.data)
            setName(res?.data?.first_name)
            setFamily(res?.data?.last_name)
            setEmail(res?.data?.email)
            setGender(res?.data?.gender)
            setAddress(res?.data?.address)
            // setCountry(data?.nationality)
            // setProvince(data?.province)
        })
    }, []);


    // check change inputs
    useEffect(() => {
        if (
            name !== data?.first_name ||
            family !== data?.last_name ||
            email !== data?.email ||
            address !== data?.address ||
            country !== data?.natinality ||
            province !== data?.province
        ) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [name,
        family,
        email,
        address,
        country,
        province]);


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
        if (!name && !family || !gender || !address || !province) message.error('شما همه اطلاعات اجباری را پر نکرده اید');
        if (!emailRegex.test(email)) message.error('ایمیل وارد شده نامعتبر است');
        else {
            setLoadingState(true)
            axiosInstance.patch('/user-api/users/me/', fromData).then(res => {
                message.success('با موفقیت انجام شد')
                // get again
                getUserData()
                // false loading
                setLoadingState(false)
            }).catch(err => {
                message.error('مشکلی پیش آمده داریم بررسی میکنیم')
                setLoadingState(false)
            })
        }
    }
    return (<Container>
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
                {/*<FromItem>*/}
                {/*    <div className="title">نام کاربری</div>*/}
                {/*    <InputCom/>*/}
                {/*</FromItem>*/}
                <FromItem>
                    <div className="title">ایمیل</div>
                    <InputCom value={email} onChange={(e) => setEmail(e?.target?.value)} type={'email'}/>
                </FromItem>
            </Row>

            <Row direction={'rtl'}>
                <FromItem>
                    <div className="title">جنسیت</div>
                    <Select
                        style={{
                            width: '100%', textAlign: 'right', height: '40px', padding: '0', boxShadow: 'none'
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
                    <TextAnswerInputBox value={country} onChange={(e) => setCountry(e?.target?.value)}/>
                </FromItem>
                <FromItem>
                    <div className="title">استان محل سکونت</div>
                    <TextAnswerInputBox required value={province}
                                        onChange={(e) => setProvince(e?.target?.value)}/>
                </FromItem>
            </Row>
            <ConfigProvider theme={themeContext}>
                <Button onClick={submit} type='submit'
                        loading={loadingState}  className={StyleModules['confirm_button']}
                        type="primary">
                    ارسال اطلاعات
                </Button>
            </ConfigProvider>
        </Form>
    </Container>)
}

export async function getServerSideProps(context) {
    const {req} = context;
    const cookies = req.headers.cookie;
    const data = await axiosInstance.get('/user-api/users/me/')

    return {props: {data: data?.data || []}};
}
