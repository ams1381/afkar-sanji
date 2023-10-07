// style
import StatisticsHead from "@/components/Questioner/Dashboadr/Wallet/Statistics/StatisticsHead";
import {StatisticsContainer} from "@/styles/questioner/dashboard/Wallet/Statistics/Statistics";
// component
import StatisticsChart from "@/components/Questioner/Dashboadr/Wallet/Statistics/StatisticsChart";
// antd
import {Skeleton} from "antd";

export default function ({loading}) {
    return (
        <StatisticsContainer>
            <StatisticsHead/>
            {loading ? (
                <Skeleton.Input style={{width: '100%', height: '418px'}}/>
            ) : (
                <StatisticsChart/>
            )}

        </StatisticsContainer>

    )
}