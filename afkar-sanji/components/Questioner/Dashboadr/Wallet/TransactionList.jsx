import {TransactionContainer} from "@/styles/questioner/dashboard/Wallet/transactionList";

// component
import TransactionItem from "@/components/Questioner/Dashboadr/Wallet/TransactionItem";

export default function () {
    return (
        <TransactionContainer>
            <TransactionItem />
            <TransactionItem />
            <TransactionItem />
            <TransactionItem />
            <TransactionItem />
        </TransactionContainer>
    )
}