import React, {useEffect, useState} from "react";
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
import {digitsEnToFa} from "@persian-tools/persian-tools";
import styled from "styled-components";

export default function ({data, setFilterParams}) {

    const [incomeActive, setIncomeActive] = useState(false)
    const [costActive, setCostActive] = useState(false)
    const [chartData, setChartData] = useState({
        datasets: [
            {
                data: [data?.plot?.answering, data?.plot?.interviewing],
                backgroundColor: ['#52C41A', '#1890FF']
            }
        ]
    });

    useEffect(() => {
        setChartData(
            {
                datasets: [
                    {
                        data: [data?.plot?.answering, data?.plot?.interviewing],
                        backgroundColor: ['#52C41A', '#1890FF']
                    }
                ]
            }
        )
    }, [data]);

    return (
        <CharContainer>

            <ChartHeader>
                <div className="text">
                    وضعیت کیف پول
                </div>
            </ChartHeader>
            <ChartBody>
                {data?.plot?.answering && data?.plot?.interviewing ? (
                    <ChartFilter>
                        <ChartFilterLeft>
                            <Income onClick={() => {
                                setIncomeActive(p => p = !p)
                                setCostActive(false)
                                setFilterParams(p => ({
                                    ...p,
                                    transaction_type: 'i'
                                }))
                            }} filter={incomeActive ? 'grayscale(100%) contrast(500%)' : ''}
                                    background={incomeActive ? '#52C41A' : 'transparent'}
                                    color={!incomeActive ? '#52C41A' : '#fff'}>
                                <div className="text">
                                    <img className={`icon`} src={income?.src} alt=""/>
                                    <div>درآمد</div>
                                </div>
                            </Income>
                            <Cost onClick={() => {
                                setCostActive(p => p = !p)
                                setIncomeActive(false)
                                setFilterParams(p => ({
                                    ...p,
                                    transaction_type: 'o'
                                }))
                            }} filter={costActive ? 'brightness(103.5)' : ''}
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
                ) : (<EmptyBox>خالی از دیتا</EmptyBox>)}
                <ChartBox>
                    {data?.plot?.answering && data?.plot?.interviewing ? (
                        <>
                            <Doughnut data={chartData}/>
                            <div className="text">{digitsEnToFa(data?.balance)}</div>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </ChartBox>
            </ChartBody>
        </CharContainer>
    )
}

export const EmptyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #474747;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`