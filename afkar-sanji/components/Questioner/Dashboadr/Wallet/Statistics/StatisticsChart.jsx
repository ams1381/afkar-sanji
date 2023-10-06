import React, {useState} from "react";
// style
import {
    CharContainer,
    ChartBody,
    ChartFilter, ChartFilterRight, ChartFilterRightText, ChartFilterLeft,
    ChartHeader, Income,
    Cost, ChartBox
} from "@/styles/questioner/dashboard/Wallet/Statistics/StatisticsChart";
// lib
import {Doughnut, ArcElement} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

// icon
import income from 'public/Icons/ArrowGren.svg'
import cost from 'public/Icons/Arrow Circle Down.svg'

export default function () {
    const [incomeActive, setIncomeActive] = useState(false)
    const [costActive, setCostActive] = useState(false)
    const [chartData, setChartData] = useState({
        datasets: [
            {
                data: [400, 100],
                backgroundColor: ['#52C41A', '#1890FF']
            }
        ]
    });

    const incomeChart = () => {
        setIncomeActive(p => p = !p)
        setCostActive(false)
        const updatedData = {
            datasets: [
                {
                    data: [100, 0], // filtered data
                    backgroundColor: ['#52C41A', '#1890FF']
                }
            ]
        };

        setChartData(updatedData);
    }

    const costChart = () => {
        setCostActive(p => p = !p)
        setIncomeActive(false)
        const updatedData = {
            datasets: [
                {
                    data: [0, 100], // filtered data
                    backgroundColor: ['#52C41A', '#1890FF']
                }
            ]
        };
        setChartData(updatedData);
    }


    return (
        <CharContainer>

            <ChartHeader>
                <div className="text">
                    وضعیت کیف پول
                </div>
            </ChartHeader>
            <ChartBody>
                <ChartFilter>
                    <ChartFilterLeft>
                        <Income onClick={incomeChart} filter={incomeActive ? 'grayscale(100%) contrast(500%)' : ''}
                                background={incomeActive ? '#52C41A' : 'transparent'}
                                color={!incomeActive ? '#52C41A' : '#fff'}>
                            <div className="text">
                                <img className={`icon`} src={income?.src} alt=""/>
                                <div>درآمد</div>
                            </div>
                        </Income>
                        <Cost onClick={costChart} filter={costActive ? 'brightness(103.5)' : ''}
                              background={costActive ? '#FF4D4F' : 'transparent'}
                              color={!costActive ? '#FF4D4F' : '#fff'}>
                            <div className="text">
                                <img className={`icon`} src={cost?.src} alt=""/>
                                <div>هزینه</div>
                            </div>
                        </Cost>
                    </ChartFilterLeft>
                    <ChartFilterRight>
                        <ChartFilterRightText color={`#52C41A`}>انجام پروژه پرسش‌گری</ChartFilterRightText>
                        <ChartFilterRightText color={`#1890FF`}>پر کردن پرسش‌نامه</ChartFilterRightText>
                    </ChartFilterRight>
                </ChartFilter>
                <ChartBox>
                    <Doughnut data={chartData}/>
                    <div className="text">۲،۴۲۱،۵۳۱</div>
                </ChartBox>
            </ChartBody>
        </CharContainer>
    )
}