import {
    AddBtnContainer,
    CollaborationItem,
    CollaborationItemHeader,
    CollaborationItemLeft,
    CollaborationItemRight,
    CollaborationResult,
    CollapseItem,
    CollapseTitle,
    ColumnOfData,
    GetResult,
    Level,
    ModalBody,
    ModalBtnParent,
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
import hardIcon from '@/public/Icons/questionLevel/hard.svg'
import mediumIcon from '@/public/Icons/questionLevel/medium.svg'
import esIcon from '@/public/Icons/questionLevel/es.svg'

export default function ({data, isInterview, refreshData}) {

    const getQuestions = (difficulty) => {
        return data?.questions?.filter(question => question.question.level === difficulty).map((item) => {
            return (
                <CollapseItem key={item?.id}>
                    <div className="text">{item?.question?.title}</div>
                </CollapseItem>
            );
        });
    }

    // best function
    function shouldInclude(questions) {
        if (!questions || questions.length === 0) {
            return false;
        }
        return true;
    }

    const hardQuestions = getQuestions(3);
    const mediumQuestions = getQuestions(2);
    const esQuestions = getQuestions(1);

    const items = [
        shouldInclude(hardQuestions) && {
            key: '1',
            label: 'سخت',
            children: getQuestions(3)
        },
        shouldInclude(mediumQuestions) && {
            key: '2',
            label: 'متوسط',
            children: getQuestions(2)
        },
        shouldInclude(esQuestions) && {
            key: '3',
            label: 'راحت',
            children: getQuestions(1)
        }
    ].filter(Boolean);
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
            refreshData.refetch()
        })
            .catch(error => {
                setModalLoading(false)
                const ERROR_MESSAGE = error.response.data[Object.keys(error.response.data)[0]][0]
                message.error(ERROR_MESSAGE)
            })
    }

    return (<>

        <CollaborationItem>
            <CollaborationItemHeader>
                <CollaborationItemLeft>
                    {isInterview ? (<>
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
                    </>) : (<>
                        {data?.difficulty && (
                            <Level>
                                <div className="title">درجه‌ سختی:</div>
                                {data?.difficulty === 3 && <img src={hardIcon?.src} alt=""/>}
                                {data?.difficulty === 2 && <img src={mediumIcon?.src} alt=""/>}
                                {data?.difficulty === 1 && <img src={esIcon?.src} alt=""/>}
                            </Level>
                        )}
                    </>)}

                </CollaborationItemLeft>
                <CollaborationItemRight color={data?.is_active ? '#5360ED' : 'red'}>
                    <div
                        className={`title`}>{data?.owner?.first_name ? `${data?.owner?.first_name}  ${data?.owner?.last_name}` : 'ناشناس'}</div>
                    <div className={`caption`}>{data?.name}</div>
                </CollaborationItemRight>
            </CollaborationItemHeader>
            {!isInterview ? (<CollaborationResult>
                <ColumnOfData>
                    <div className={'title'}>دریافتی برای ثبت یک پاسخ:</div>
                    <div
                        className={'data'}>{data?.price_pack?.price ? `${digitsEnToFa(data?.price_pack?.price)}ریال ` : `${digitsEnToFa(555251)} ریال `}</div>
                </ColumnOfData>
            </CollaborationResult>) : ''}

            {isInterview && (
                <Link style={{textDecoration: 'none'}} href={`/questioner/dashboard/${data?.uuid}/add-result`}>
                    <AddBtnContainer>
                        <Button className={'addBtn'}>
                            <img src={addIcon?.src} alt=""/>
                            <div>افزودن نتیجه</div>
                        </Button>
                    </AddBtnContainer>
                </Link>)}

            {!isInterview && (<div style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
            }}>
                <ModalBtnParent>
                    <img onClick={() => setChatModal(true)} className={'chat'} src={chat?.src} alt=""/>
                    <img onClick={() => setOpen(true)} src={eye?.src} alt=""/>
                </ModalBtnParent>
            </div>)}
            <Modal
                title={(<ModalHeader>
                    <div
                        className={'name'}>{data?.owner?.first_name ? `${data?.owner?.first_name}  ${data?.owner?.last_name}` : 'ناشناس'}
                    </div>
                    <Level>
                        <div className="title">درجه‌ سختی:</div>
                        {data?.difficulty === 3 && <img src={hardIcon?.src} alt=""/>}
                        {data?.difficulty === 2 && <img src={mediumIcon?.src} alt=""/>}
                        {data?.difficulty === 1 && <img src={esIcon?.src} alt=""/>}
                    </Level>
                </ModalHeader>)}
                centered
                modalRender={(ReactNode) => <ModalContainer>{ReactNode}</ModalContainer>}
                open={open}
                onOk={void 0}
                onCancel={() => setOpen(false)}
                footer={(<div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0 24px 15px 24px'
                }}>
                    <Button loading={modalLoading} onClick={confiremHandler} type="primary">
                        ارسال درخواست
                    </Button>
                    {/*<Button danger onClick={() => setOpen(false)}>رد کردن</Button>*/}
                </div>)}
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
                        {data?.difficulty === 3 && <img src={hardIcon?.src} alt=""/>}
                        {data?.difficulty === 2 && <img src={mediumIcon?.src} alt=""/>}
                        {data?.difficulty === 2 && <img src={esIcon?.src} alt=""/>}
                    </Level>
                    {data?.questions && (
                        <>
                            <CollapseTitle>
                                <img src={levelIcon?.src} alt=""/>
                                درجه‌بندی سوالات</CollapseTitle>
                            <Collapse style={{direction: 'rtl'}} items={items}
                            />
                        </>
                    )}

                </ModalBody>
            </Modal>
            {chatModal && (<ChatModal isActive={chatModal} setIsActive={setChatModal}/>)}
        </CollaborationItem>
    </>)
}