import {FilterParent, TransactionContainer} from "@/styles/questioner/dashboard/Wallet/transactionList";
// component
import TransactionItem from "@/components/Questioner/Dashboadr/Wallet/TransactionItem";
// antd
import {Skeleton} from "antd";
import {DownOutlined} from '@ant-design/icons';
import {Dropdown, Space} from 'antd';
import React, {useEffect, useState} from "react";
import {FilterBox, TimePickerContainer, DropDownItem} from "@/styles/questioner/dashboard/Collaboration/collaboration";
import filter from "@/public/Icons/Arrow Sort Down Lines.svg";
import DatePicker from "react-multi-date-picker";
import {Icon} from "@/styles/icons";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {convertDate} from "@/components/QuestionnairePanel/SettingPanel";
import {digitsFaToEn} from "@persian-tools/persian-tools";
import iconUp from 'public/Icons/icon2Fil.svg'
import iconDownUp from 'public/Icons/iconFil.svg'
import iconDownFil from 'public/Icons/iconDownFil.svg'

export default function ({data, loading, setFilterParams}) {
    const [open, setOpen] = useState(false);
    const items = [{
        label: (<DropDownItem onClick={(e) => {
            setOpen(false)
            setFilterParams(p => ({
                ...p, amount_ordering: 'asc'
            }))
        }}>
            <div>صعودی</div>
            <img src={iconDownUp?.src} alt=""/>
        </DropDownItem>), key: '1',
    }, {
        label: (<DropDownItem onClick={(e) => {
            setOpen(false)
            setFilterParams(p => ({
                ...p, amount_ordering: 'desc'
            }))

        }}>
            <div>نزولی</div>
            <img src={iconDownFil?.src} alt=""/>
        </DropDownItem>), key: '2',
    }, {
        label: (<DropDownItem onClick={(e) => {
            setOpen(false)
            setFilterParams(p => ({
                ...p, amount_ordering: ''
            }))
        }}>
            <div>پیش فرض</div>
            <img src={iconUp?.src} alt=""/>
        </DropDownItem>), key: '3',
    },];

    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('')
    const DateFilterHandler = async (_, filterDate) => {
        // console.log(filterDate.validatedValue)
        if (!filterDate.validatedValue?.length) {
            setStartDate('');
            setEndDate('')
            return
        }
        try {
            // console.log('check')
            setStartDate(convertDate(digitsFaToEn(filterDate.validatedValue[0]), 'gregorian'));
            setEndDate(filterDate.validatedValue[1] ? convertDate(digitsFaToEn(filterDate.validatedValue[1]), 'gregorian') : '')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setFilterParams(p => ({
            ...p,
            transaction_created_at_from: StartDate,
            transaction_created_at_to: EndDate,
        }))
    }, [StartDate, EndDate]);

    return (<TransactionContainer>
        <FilterParent>
            <DatePicker format="YYYY-MM-DD"
                        onChange={DateFilterHandler}
                        render={(value, openCalendar) => {
                            return (<TimePickerContainer style={{
                                width: '115%'
                            }} active={'active'}>
                                <input value={value} onClick={openCalendar}
                                       placeholder='انتخاب تاریخ' readOnly/>
                                <Icon name='Calender'/>
                            </TimePickerContainer>)
                        }}
                        range
                        plugins={[<DatePanel position="left"/>]}
                        calendar={persian}
                        calendarPosition="bottom-left"
                        locale={persian_fa}
            />
            <Dropdown
                menu={{
                    items
                }}
                placement="bottomRight"
            >
                <FilterBox style={{
                    width: '50px', height: '40px'
                }}>
                    <img src={filter?.src} alt=""/>
                </FilterBox>
            </Dropdown>
        </FilterParent>
        {loading && (<>
            <Skeleton.Input style={{width: '100%', height: '100px'}} loading active/>
            <Skeleton.Input style={{width: '100%', height: '100px'}} loading active/>
            <Skeleton.Input style={{width: '100%', height: '100px'}} loading active/>
            <Skeleton.Input style={{width: '100%', height: '100px'}} loading active/>
            <Skeleton.Input style={{width: '100%', height: '100px'}} loading active/>
        </>)}

        {data?.transactions?.map((item, index) => {
            return <TransactionItem data={item} key={item?.id}/>
        })}

    </TransactionContainer>)
}