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
import {Button, Modal} from 'antd';
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

const text = `۱. نام کامل شما چیست؟
`;
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

export default function ({data}) {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [chatModal, setChatModal] = useState(false)
    const onChange = (key) => {
        console.log(key);
    };

    return (
        <>
            <CollaborationItem>
                <CollaborationItemHeader>
                    <CollaborationItemLeft>
                        <div onClick={() => router.push(`/questioner/dashboard/${data?.uuid}/questioner-result`)}
                             className={`result`}>
                            {/*<img src={arrow?.src} alt=""/>*/}
                            <Icon name={'ArrowLeftBlue'}/>
                            <div className="text">نتایج</div>
                        </div>
                        <div className={`price`}>
                            <div className="text">۲۱،۷۰۰،۲۴۲</div>
                            {/*<img src={wallet?.src} alt=""/>*/}
                            <Icon name={'Wallet3'}/>
                        </div>
                    </CollaborationItemLeft>
                    <CollaborationItemRight color={data?.is_active ? '#5360ED' : 'red'}>
                        <div className={`title`}>علی عباس آبادی</div>
                        <div className={`caption`}>داده‌های غذایی نامی‌نو</div>
                    </CollaborationItemRight>
                </CollaborationItemHeader>
                <Link style={{textDecoration: 'none'}} href={`/questioner/dashboard/${data?.uuid}/add-result`}>
                    <AddBtnContainer>
                        <Button className={'addBtn'}>
                            <img src={addIcon?.src} alt=""/>
                            <div>افزودن نتیجه</div>
                        </Button>
                    </AddBtnContainer>
                </Link>
            </CollaborationItem>
        </>
    )
}