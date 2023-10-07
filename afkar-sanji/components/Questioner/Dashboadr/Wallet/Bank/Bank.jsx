// style
import {Bank, BankCard, BankHead} from "@/styles/questioner/dashboard/Wallet/Bank/Bank";
// icon
import bank from 'public/Icons/Building Bank.svg'
import edit from 'public/Icons/EditCard.svg'
import {Skeleton} from "antd";
import React from "react";

export default function ({loading}) {
    return (
        <Bank>
            <BankHead>
                <img src={bank?.src} alt=""/>
                <div className={`text`}>اطلاعات بانکی</div>
            </BankHead>
            {[0, 0].map(card => {
                if (loading) return <Skeleton.Input style={{width: '100%', height: '50px'}} loading active/>
                else {
                    return <BankCard>
                        <img src={edit?.src} alt=""/>
                        <div className="type_text">IR۰۰۰۰۰۰۰۰۱۴۲۱۳۴۱۲۶۷۸۹</div>
                        <div className="type_text">شماره شبا</div>
                    </BankCard>
                }

            })}
        </Bank>
    )
}