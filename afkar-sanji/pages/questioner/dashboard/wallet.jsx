import {
    QuestionerPageContainer, PageBox, QuestionerContentBox
} from '@/styles/common';
import React, {useEffect} from 'react'
import {useState} from 'react';
import {CommonDrawer} from '@/components/common/CommonDrawer';
import QuestionerHeader from '@/components/common/QuestionerHeader';
import {useRouter} from 'next/router';
import {
    WalletHeader, Refresh, Title, Container, WalletContainer, ModalContainer
} from "@/styles/questioner/dashboard/Wallet/wallet";
import refresh from '@/public/Icons/ArrowCounterclockwise.svg'
import TransactionList from "@/components/Questioner/Dashboadr/Wallet/TransactionList";
import Statistics from "@/components/Questioner/Dashboadr/Wallet/Statistics/Statistics";
import Bank from "@/components/Questioner/Dashboadr/Wallet/Bank/Bank"
import {axiosInstance} from "@/utilities/axios";
import {useQueries, useQuery} from "@tanstack/react-query";
import SetQueryParams from "@/utilities/filtering/filter";
import {Icon} from "@/styles/icons";
import {Button, Modal, Space} from 'antd';
import {Input, Tooltip} from 'antd';
import {digitsEnToFa, digitsFaToEn} from "@persian-tools/persian-tools";

const formatNumber = (value) => new Intl.NumberFormat().format(value);
const NumericInput = (props) => {
    const {value, onChange} = props;
    const handleChange = (e) => {

        const {value: inputValue} = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            onChange(inputValue);
        }
    };

    return (<Input
        {...props}
        onChange={onChange}
    />);
};
export default function () {
    const [chargingWallet, setChargingWallet] = useState(false)
    const [RightDrawerOpen, setRightDrawerOpen] = useState(false);
    const [chargingWalletValue, setChargingWalletValue] = useState(0)
    const router = useRouter()
    const [meData, setMeData] = useState([])
    const [filterParams, setFilterParams] = useState({
        transaction_type: undefined,
        transaction_created_at_from: undefined,
        transaction_created_at_to: undefined,
        amount_ordering: undefined
    })

    const [filterChart, setFilterChart] = useState({
        transaction_type: undefined,
    })
    useEffect(() => {
        axiosInstance.get('/user-api/users/me/').then(res => {
            setMeData(res?.data)
        })
    }, []);


    const [walletData, walletChart] = useQueries({
        queries: [
            {
                queryKey: ['wallet'],
                queryFn: async () => await axiosInstance.get(`/wallet-api/wallet/my-wallet/${SetQueryParams(filterParams)}`),
                refetchOnWindowFocus: false,
                retry: false
            },
            {
                queryKey: ['walletChart'],
                queryFn: async () =>
                    await axiosInstance.get(`/wallet-api/wallet/my-wallet/${SetQueryParams(filterChart)}`),
                refetchOnWindowFocus: false,
                retry: false
            },
        ],
    });

    useEffect(() => {
        walletData.refetch()
    }, [filterParams]);


    useEffect(() => {
        walletChart.refetch()
    }, [filterChart]);


    return (<PageBox>
        <CommonDrawer RightDrawerOpen={RightDrawerOpen} setRightDrawerOpen={setRightDrawerOpen}/>
            <QuestionerHeader meData={meData} pageName='wallet'/>
        <main style={{width: RightDrawerOpen ? '80%' : '100%', transition: '0.3s'}}>
            <QuestionerPageContainer>
                <QuestionerContentBox>
                    <Container>
                        <Modal
                            modalRender={(ReactNode) => <ModalContainer>{ReactNode}</ModalContainer>}
                            open={chargingWallet}
                            centered
                            onOk={void 0}
                            onCancel={() => setChargingWallet(false)}
                            footer={(<div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                            }}>
                                <Button onClick={() => setChargingWallet(false)} type="default">
                                    لغو
                                </Button>
                                <Button type="primary">
                                    صفحه‌ پرداخت
                                </Button>
                            </div>)}
                            width={416}
                        >
                            <div className="modal_title">چقدر حساب شما شارژ شود؟</div>
                            <div className="bodyOfWalletModal">
                                <div className="head">
                                    <Button onClick={() => setChargingWalletValue(chargingWalletValue + 10)}
                                            className={'icon'} shape={'circle'}>+</Button>
                                    <NumericInput
                                        value={chargingWalletValue ? digitsEnToFa(chargingWalletValue) : ''}
                                        onChange={(e) => {
                                            setChargingWalletValue(e.target.value)
                                        }}
                                        rootClassName={'input'}
                                    />
                                    <Button disabled={!chargingWalletValue} onClick={() => {
                                        if (chargingWalletValue > 0) setChargingWalletValue(chargingWalletValue - 10)
                                    }} className={'icon'} shape={'circle'}>-</Button>
                                </div>
                                <div className="body">
                                    <div
                                        className="title">{chargingWalletValue === 0 ? 'صفر' : digitsEnToFa(chargingWalletValue)} تومان
                                    </div>
                                    <div className="offers">
                                        <Button
                                            onClick={(e) => {
                                                setChargingWalletValue(20000)
                                            }}>{digitsEnToFa(20000).toLocaleString()}</Button>
                                        <Button
                                            onClick={(e) => {
                                                setChargingWalletValue(40000)
                                            }}>{digitsEnToFa(40000).toLocaleString()}</Button>
                                        <Button
                                            onClick={(e) => {
                                                setChargingWalletValue(60000)
                                            }}>{digitsEnToFa(60000).toLocaleString()}</Button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <WalletHeader>
                            <Refresh onClick={() => router.reload()}>
                                <Icon style={{width: '14px', height: '14px'}} name={'ArrowCounterclockwise'}/>
                            </Refresh>
                            <Title>کیف پول</Title>
                            <Button onClick={() => setChargingWallet(true)} className={`flex notBorder wallet_head_btn`}
                                    typeof='submit'
                                    type="primary">
                                <div className="text">شارژ کیف‌پول</div>
                                <Icon name={'Wallet2'}/>
                            </Button>
                        </WalletHeader>
                        <WalletContainer>
                            <Bank filterParams={filterParams} setFilterParams={setFilterParams}
                                  data={walletData?.data?.data}
                                  loading={walletData?.isLoading}/>
                            <Statistics filterParams={filterChart} setFilterParams={setFilterChart}
                                        data={walletChart?.data?.data}
                                        loading={walletChart?.isLoading}/>
                            <TransactionList filterParams={filterParams} setFilterParams={setFilterParams}
                                             data={walletData?.data?.data} loading={walletData?.isLoading}/>
                        </WalletContainer>
                    </Container>
                </QuestionerContentBox>
            </QuestionerPageContainer>
        </main>
    </PageBox>)
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
        // const {data} = await axios.get(`https://mah-api.ariomotion.com/wallet-api/wallet/my-wallet/`, {headers:{
        //     Authorization: `Bearer ${parsedCookies}`
        //     }})
        // console.log('wallet: ', data)
        return {
            props: {
                // Pass the cookies as props to the component
                cookies: parsedCookies, // wallet: data
            },
        };
    }

    return {
        redirect: {
            permanent: false, destination: "/auth?returnUrl=" + urlDest
        }
    };
}