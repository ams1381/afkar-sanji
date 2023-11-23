import React, {useState, useMemo, useRef, useEffect} from 'react';
import {Bank, BankCard, BankHead} from "@/styles/questioner/dashboard/Wallet/Bank/Bank";
import bank from 'public/Icons/Building Bank.svg'
import edit from 'public/Icons/EditCard.svg'
import {message, Skeleton} from "antd";
import {CheckOutlined, HighlightOutlined, SmileFilled, SmileOutlined} from '@ant-design/icons';
import {Divider, Radio, Typography} from 'antd';

const {Paragraph} = Typography;
import styled from 'styled-components'
import {QuestionnaireNameInput, RenameSpan} from "@/styles/folders/Questionnaire";
import {Icon} from "@/styles/icons";
import {handleInputWidth} from "@/utilities/RenameFunctions";
import {axiosInstance} from "@/utilities/axios";
import {digitsEnToFa, digitsFaToEn} from "@persian-tools/persian-tools";

export default function ({loading, data}) {
    const ibanRef = useRef(null);
    const [IBAN, setIBAN] = useState('');
    const [ibanActive, setChangeIban] = useState(false);
    const cardNumberRef = useRef(null);
    const [card_number, setCard_number] = useState('');
    const [card_numberActive, setCard_numberActive] = useState(false);
    const [ibanLoading, setibanLoading] = useState(false)
    const [cart_NumberLoading, setCard_NumberLoading] = useState(false)
    useEffect(() => {
        setIBAN(data?.IBAN || 'ندارد')
        setCard_number(data?.card_number || 'ندارد')
    }, [data]);
    const ibanRenameHandler = () => {
        setChangeIban(!ibanActive)
        setTimeout(() => {
            ibanRef.current.select();
        }, 100)
        if (ibanActive) ibanRename();
    }
    // IR300170000000363644566000
    const ibanRename = async () => {
        setibanLoading(true)
        await axiosInstance.patch('/wallet-api/wallet/my-wallet/', {
            IBAN: IBAN.trim(),
        }).then(res => {
            message.success('موفقیت آمیز بود')
            setibanLoading(false)
        }).catch(err => {
            message.error(err?.response?.data[Object.keys(err?.response?.data)[0]])
            setibanLoading(false)
        })
    }
    const ibanInputHanlder = async (e) => {
        handleInputWidth(ibanRef, e.target.value);
        setIBAN(e.target.value)
    }

    const cardNumberRenameHandler = () => {
        setCard_numberActive(!card_numberActive)
        setTimeout(() => {
            cardNumberRef.current.select();
        }, 100)
        if (card_numberActive) cardNumberRename();
    }
    // IR300170000000363644566000
    const cardNumberRename = async () => {
        setCard_NumberLoading(false)
        await axiosInstance.patch('/wallet-api/wallet/my-wallet/', {
            card_number: card_number.trim()
        }).then(res => {
            message.success('موفقیت آمیز بود')
            setCard_NumberLoading(true)
        }).catch(err => {
            message.error(err?.response?.data[Object.keys(err?.response?.data)[0]])
            setCard_NumberLoading(true)
        })
    }
    const cardNumberInputHanlder = async (e) => {
        handleInputWidth(cardNumberRef, e.target.value);
        setCard_number(e.target.value)
    }

    // styles
    const QuestionnaireNameInputStyle = {
        display: 'flex',
        alignItems: 'center',
        width: '70%',
        height: '50%',
        color: '#525252',
        fontFamily: 'IRANSans',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '24px',
    }

    const BankCardStyle = {
        display: "flex", alignItems: 'center', flexDirection: 'row-reverse', justifyContent: 'flex-end', width: '68%',
    }

    const RenameStyle = {
        display: "flex", height: '50%', width: '20px',
    }

    return (<Bank>
        <BankHead>
            <img src={bank?.src} alt=""/>
            <div className={`text`}>اطلاعات بانکی</div>
        </BankHead>
        {loading && (<>
            <Skeleton.Input style={{width: '100%', height: '50px'}} loading active/>
            <Skeleton.Input style={{width: '100%', height: '50px'}} loading active/>
        </>)}
        {!loading && (<>
            <BankCard>
                <div className="type_text" style={BankCardStyle}>
                    <QuestionnaireNameInput style={QuestionnaireNameInputStyle} ref={ibanRef}
                                            onKeyDown={e => e.key == 'Enter' ? ibanRename() : 'ندارد'}
                                            type="text" onChange={ibanInputHanlder}
                                            value={IBAN ? digitsEnToFa(IBAN) : ''} disabled={!ibanActive}/>
                    <RenameSpan style={RenameStyle}
                                clickable={(ibanActive && !IBAN) ? null : 'active'}
                                onClick={ibanRenameHandler}>
                        {!ibanActive ? <img src={edit?.src} alt=""/> : <div>
                            <Icon name='RenameQuestionnaireCheck'/>
                        </div>}
                    </RenameSpan>
                    {ibanActive && <RenameSpan clickable={true}
                                               onClick={() => {
                                                   setIBAN(IBAN)
                                                   setChangeIban(false)
                                                   handleInputWidth(ibanRef, IBAN);
                                               }} style={{marginRight: 10}}>
                        <Icon name='BlackClose' style={{width: 14}}/>
                    </RenameSpan>}
                </div>
                <div className="type_text">شماره شبا</div>
            </BankCard>
            <BankCard>
                <div className="type_text" style={BankCardStyle}>
                    <QuestionnaireNameInput className={'input'}
                                            style={QuestionnaireNameInputStyle}
                                            ref={cardNumberRef}
                                            onKeyDown={e => e.key == 'Enter' ? cardNumberRename() : 'ندارد'}
                                            type="text"
                                            onChange={cardNumberInputHanlder}
                                            value={card_number ? digitsEnToFa(card_number) : ''}
                                            disabled={!card_numberActive}/>
                    <RenameSpan style={RenameStyle}
                                clickable={(card_numberActive && !card_number) ? null : 'active'}
                                onClick={cardNumberRenameHandler}>
                        {!card_numberActive ? <img src={edit?.src} alt=""/> : <div>
                            <Icon name='RenameQuestionnaireCheck'/>
                        </div>}
                    </RenameSpan>
                    {card_numberActive && <RenameSpan clickable={true}
                                                      onClick={() => {
                                                          setCard_number(card_number)
                                                          setCard_numberActive(false)
                                                          handleInputWidth(cardNumberRef, card_number);
                                                      }} style={{marginRight: 10}}>
                        <Icon name='BlackClose' style={{width: 14}}/>
                    </RenameSpan>}
                </div>
                <div className="type_text">شماره کارت</div>
            </BankCard>
        </>)}

    </Bank>)
}

