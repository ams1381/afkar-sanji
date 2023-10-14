import React, { useState, useMemo } from 'react';
// style
import {TransactionBody, TransactionHead, TransactionItem} from "@/styles/questioner/dashboard/Wallet/transactionItem";
// icons
import upIcon from 'public/Icons/Arrow Up.svg'
import downIcon from 'public/Icons/ArrowDownRed.svg'
import {digitsEnToFa} from "@persian-tools/persian-tools";


export default function ({data}) {
    // convert date
    const date = new Date(data?.created_at).toLocaleString('fa-IR').slice(0, 16).split(',')

    return (
        <TransactionItem>
            <TransactionHead>
                <div className={`date`}>
                    <div>dsvs</div>
                </div>
                <div className={`title`}>پرکردن پرس‌نامه</div>
            </TransactionHead>
            <TransactionBody success={data?.transaction_type === 'i' ? '#52C41A' : '#FF4D4F'}>
                <div className="text">
                    {/*{data?.amount?.toLocaleString('fa-IR')}*/}
                    { digitsEnToFa(3000) }
                </div>
                {data?.transaction_type === 'i' && (
                    <img src={upIcon?.src} alt=""/>
                )}
                {data?.transaction_type === 'o' && (
                    <img src={downIcon?.src} alt=""/>
                )}
            </TransactionBody>
        </TransactionItem>
    )
}