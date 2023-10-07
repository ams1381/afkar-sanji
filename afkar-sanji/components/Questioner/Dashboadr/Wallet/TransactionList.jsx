import {TransactionContainer} from "@/styles/questioner/dashboard/Wallet/transactionList";
// component
import TransactionItem from "@/components/Questioner/Dashboadr/Wallet/TransactionItem";
// antd
import {Skeleton} from "antd";

export default function ({loading}) {
    return (
        <TransactionContainer>
            {[0, 0, 0, 0].map(item => {
                if (loading) return <Skeleton.Input style={{width: '100%', height: '100px'}} loading active/>
                else {
                    return <TransactionItem/>
                }
            })}

        </TransactionContainer>
    )
}