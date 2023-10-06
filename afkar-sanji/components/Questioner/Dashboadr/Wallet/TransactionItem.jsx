// style
import {TransactionBody, TransactionHead, TransactionItem} from "@/styles/questioner/dashboard/Wallet/transactionItem";
// icons
import upIcon from 'public/Icons/Arrow Up.svg'

export default function () {
    return (
        <TransactionItem>
            <TransactionHead>
                <div className={`date`}>
                    <div>۱۴۰۱/۰۳/۱۲</div>
                    <div>۱۲:۳۴</div>
                </div>
                <div className={`title`}>پرکردن پرس‌نامه</div>
            </TransactionHead>
            <TransactionBody>
                <div className="text">
                    ۲،۰۰۰
                </div>
                <img src={upIcon?.src} alt=""/>
            </TransactionBody>
        </TransactionItem>
    )
}