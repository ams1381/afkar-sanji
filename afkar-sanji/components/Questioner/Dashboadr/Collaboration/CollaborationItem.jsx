import Link from "next/link";
// style
import {
    CollaborationItem,
    CollaborationItemLeft,
    CollaborationItemRight
} from "@/styles/questioner/dashboard/Collaboration/collaboration";
// icon
import wallet from 'public/Icons/Wallet3.svg'
import arrow from 'public/Icons/ArrowLeftBlue.svg'


export default function () {
    return (
            <CollaborationItem>
                <CollaborationItemLeft>
                    <div className={`result`}>
                        <img src={arrow?.src} alt=""/>
                        <div className="text">نتایج</div>
                    </div>
                    <div className={`price`}>
                        <div className="text">۲۱،۷۰۰،۲۴۲</div>
                        <img src={wallet?.src} alt=""/>
                    </div>
                </CollaborationItemLeft>
                <CollaborationItemRight>
                    <div className={`title`}>علی عباس آبادی</div>
                    <div className={`caption`}>داده‌های غذایی نامی‌نو</div>
                </CollaborationItemRight>
            </CollaborationItem>
    )
}