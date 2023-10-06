// style
import StatisticsHead from "@/components/Questioner/Dashboadr/Wallet/Statistics/StatisticsHead";
import {StatisticsContainer} from "@/styles/questioner/dashboard/Wallet/Statistics/Statistics";
// component
import StatisticsChart from "@/components/Questioner/Dashboadr/Wallet/Statistics/StatisticsChart";

export default function () {
    return (
        <StatisticsContainer>
            <StatisticsHead/>
            <StatisticsChart/>
        </StatisticsContainer>

    )
}