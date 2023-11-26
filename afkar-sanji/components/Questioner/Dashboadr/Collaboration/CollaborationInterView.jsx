import {
    AddBtnContainer, CollaborationItem, CollaborationItemHeader, CollaborationItemLeft, CollaborationItemRight,
} from "@/styles/questioner/dashboard/Collaboration/collaboration";
import {Icon} from "@/styles/icons";
import React, {useState} from "react";
import {Button, Modal} from 'antd';
import Link from "next/link";
import addIcon from '@/public/Icons/AddDark.svg'
import {useRouter} from "next/router";
import {digitsEnToFa} from "@persian-tools/persian-tools";


export default function ({data}) {
    console.log(data)
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [chatModal, setChatModal] = useState(false)

    return (<>
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
                            <div className="text">{digitsEnToFa(data?.price_pack?.price)}</div>
                            {/*<img src={wallet?.src} alt=""/>*/}
                            <Icon name={'Wallet3'}/>
                        </div>
                    </CollaborationItemLeft>
                    <CollaborationItemRight color={data?.is_active ? '#5360ED' : 'red'}>
                        <div
                            className={`title`}>{data?.owner?.first_name ? `${data?.owner?.first_name}  ${data?.owner?.last_name}` : 'ناشناس'}</div>
                        <div className={`caption`}>{data?.name}</div>
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
        </>)
}