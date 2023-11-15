import {
    AddBtnContainer,
    CollaborationItem, CollaborationItemHeader,
    CollaborationItemLeft,
    CollaborationItemRight, CollaborationResult,
    CollapseItem, CollapseTitle,
    ColumnOfData,
    DateOfCreate,
    GetResult,
    Level,
    ModalBody, ModalBtnParent,
    ModalContainer,
    ModalHeader
} from "@/styles/questioner/dashboard/Collaboration/collaboration";
import {Icon} from "@/styles/icons";
import React, {useState} from "react";
import {Button, message, Modal} from 'antd';
import icon from '@/public/Icons/CellularData.svg'
import levelIcon from '@/public/Icons/ShiftsQuestionMark.svg'
import {Collapse} from 'antd';
import {digitsEnToFa} from "@persian-tools/persian-tools";
import eye from '@/public/Icons/EyeModal.svg'
import chat from '@/public/Icons/ChatMultiple.svg'
import {ChatModal} from "@/components/Questioner/ChatModal/ChatModal";
import {convertDate} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingPanel";
import Link from "next/link";
import addIcon from '@/public/Icons/AddDark.svg'
import {useRouter} from "next/router";
import {axiosInstance} from "@/utilities/axios";

export default function ({data, isInterview, getRecommended}) {
    console.log(data)
    const text = `۱. نام کامل شما چیست؟`;
    const items = [
        {
            key: '1',
            label: 'سخت',
            children: <CollapseItem>
                <div className="text">{text}</div>
            </CollapseItem>,
        },
        {
            key: '2',
            label: 'متوسط',
            children: <CollapseItem>
                <div className="text">{text}</div>
            </CollapseItem>,
        },
        {
            key: '3',
            label: 'راحت',
            children: <CollapseItem>
                <div className="text">{text}</div>
            </CollapseItem>,
        },
    ];
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [chatModal, setChatModal] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const confiremHandler = () => {
        setModalLoading(true)
        axiosInstance.post(`/interview-api/interviews/${data?.uuid}/add-interviewer/`).then(res => {
            setModalLoading(false)
            message.success("با موفقیت ارسال شد")
            setOpen(false)
            getRecommended()
        })
            .catch(error => {
                setModalLoading(false)
                const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
                message.error(ERROR_MESSAGE)
            })
    }

    return (
        <>

            <CollaborationItem>
                <CollaborationItemHeader>
                    <CollaborationItemLeft>
                        {isInterview ? (
                            <>
                                <div
                                    onClick={() => router.push(`/questioner/dashboard/${data?.uuid}/questioner-result`)}
                                    className={`result`}>
                                    {/*<img src={arrow?.src} alt=""/>*/}
                                    <Icon name={'ArrowLeftBlue'}/>
                                    <div className="text">نتایج</div>
                                </div>
                                <div className={`price`}>
                                    <div className="text">{digitsEnToFa(data?.price_pack?.price)}</div>
                                    {/*<img src={wallet?.src} alt=""/>*/}
                                    <Icon name={'Wallet3'}/>
                                </div>
                            </>
                        ) : (
                            <>
                                <Level>
                                    <div className="title">درجه‌ سختی:</div>
                                    <img src={icon?.src} alt=""/>
                                </Level>
                            </>
                        )}

                    </CollaborationItemLeft>
                    <CollaborationItemRight color={data?.is_active ? '#5360ED' : 'red'}>
                        <div className={`title`}>علی عباس آبادی</div>
                        <div className={`caption`}>داده‌های غذایی نامی‌نو</div>
                    </CollaborationItemRight>
                </CollaborationItemHeader>
                {!isInterview ? (
                    <CollaborationResult>
                        <ColumnOfData>
                            <div className={'title'}>دریافتی برای ثبت یک پاسخ:</div>
                            <div
                                className={'data'}>{data?.price_pack?.price ? `${digitsEnToFa(data?.price_pack?.price)}ریال ` : `${digitsEnToFa(555251)} ریال `}</div>
                        </ColumnOfData>
                    </CollaborationResult>
                ) : ''}

                {isInterview && (
                    <Link style={{textDecoration: 'none'}} href={`/questioner/dashboard/${data?.uuid}/add-result`}>
                        <AddBtnContainer>
                            <Button className={'addBtn'}>
                                <img src={addIcon?.src} alt=""/>
                                <div>افزودن نتیجه</div>
                            </Button>
                        </AddBtnContainer>
                    </Link>
                )}

                {!isInterview && (
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}>
                        <ModalBtnParent>
                            <img onClick={() => setChatModal(true)} className={'chat'} src={chat?.src} alt=""/>
                            <img onClick={() => setOpen(true)} src={eye?.src} alt=""/>
                        </ModalBtnParent>
                    </div>
                )}
                <Modal
                    title={(
                        <ModalHeader>
                            <div className={'name'}>علی عباس آبادی
                            </div>
                            <Level>
                                <div className="title">درجه‌ سختی:</div>
                                <img src={icon?.src} alt=""/>
                            </Level>
                        </ModalHeader>
                    )}
                    centered
                    modalRender={(ReactNode) => <ModalContainer>{ReactNode}</ModalContainer>}
                    open={open}
                    onOk={void 0}
                    onCancel={() => setOpen(false)}
                    footer={(
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            padding: '0 24px 15px 24px'
                        }}>
                            <Button loading={modalLoading} onClick={confiremHandler} type="primary">
                                ارسال درخواست
                            </Button>
                            {/*<Button danger onClick={() => setOpen(false)}>رد کردن</Button>*/}
                        </div>
                    )}
                    width={572}
                >
                    <ModalBody>
                        <GetResult>
                            <div className={'title'}>دریافتی برای ثبت یک پاسخ:</div>
                            <div
                                className={'data'}>{data?.price_pack?.price ? `${digitsEnToFa(data?.price_pack?.price)}ریال ` : `${digitsEnToFa(555251)} ریال `}</div>
                        </GetResult>
                        <ColumnOfData>
                            <div className={'title'}>تاریخ ایجاد:</div>
                            <div className={'data'}>{digitsEnToFa(convertDate(data?.pub_date, 'jalali'))}</div>
                        </ColumnOfData>
                        <ColumnOfData>
                            <div className={'title'}>تعداد سوالات:</div>
                            <div
                                className={'data'}>{data?.questions?.length ? digitsEnToFa(data?.questions?.length) + ' عدد ' : 'صفر'}</div>
                        </ColumnOfData>
                        <ColumnOfData>
                            <div className={'title'}>نام پروژه:</div>
                            <div className={'data'}>{data?.name}</div>
                        </ColumnOfData>
                        <Level>
                            <div className="title">درجه‌ سختی:</div>
                            <img src={icon?.src} alt=""/>
                        </Level>
                        <CollapseTitle>
                            <img src={levelIcon?.src} alt=""/>
                            درجه‌بندی سوالات</CollapseTitle>
                        <Collapse style={{direction: 'rtl'}} items={items}
                        />
                    </ModalBody>
                </Modal>
                {chatModal && (
                    <ChatModal isActive={chatModal} setIsActive={setChatModal}/>
                )}
            </CollaborationItem>
        </>
    )
}