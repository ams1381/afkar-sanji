import {StatisticsHead} from "@/styles/questioner/dashboard/Wallet/Statistics/StatisticsHead";
import {Skeleton} from "antd";

export default function ({loading, data}) {
    return (
        <>
            {loading ? (
                <Skeleton.Input style={{width: '100%', height: '65px'}}/>
            ) : (
                <StatisticsHead>
                    <div className={`text`}>{data?.balance?.toLocaleString('fa-IR')}</div>
                    <div className={`text`}>موجودی</div>
                </StatisticsHead>
            )}

        </>
    )
}