import {StatisticsHead} from "@/styles/questioner/dashboard/Wallet/Statistics/StatisticsHead";
import {Skeleton} from "antd";
import {digitsEnToFa} from "@persian-tools/persian-tools";

export default function ({loading, data}) {
    return (
        <>
            {loading ? (
                <Skeleton.Input style={{width: '100%', height: '65px'}}/>
            ) : (
                <StatisticsHead>
                    <div className={`text`}>{digitsEnToFa(data?.balance)}</div>
                    <div className={`text`}>موجودی</div>
                </StatisticsHead>
            )}

        </>
    )
}