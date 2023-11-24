import React, {useEffect, useState} from "react";
// style
import {
    CharContainer,
    ChartBody,
    ChartFilter, ChartFilterRight, ChartFilterRightText, ChartFilterLeft,
    ChartHeader, Income,
    Cost, ChartBox, ChartFilterRightEmpty
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
    const [isHaveData, setIsHaveState] = useState(false)
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

    const incomeHandler = () => {
        setIncomeActive(p => p = !p)
        setCostActive(false)
        setFilterParams(p => ({
            ...p,
            transaction_type: 'i'
        }))
    }


    const costHandler = () => {
        setCostActive(p => p = !p)
        setIncomeActive(false)
        setFilterParams(p => ({
            ...p,
            transaction_type: 'o'
        }))
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
                        <Income disabled={!data} onClick={incomeHandler}
                                filter={incomeActive ? 'grayscale(100%) contrast(500%)' : ''}
                                background={incomeActive ? '#52C41A' : 'transparent'}
                                color={!incomeActive ? '#52C41A' : '#fff'}>
                            <div className="text">
                                <img className={`icon`} src={income?.src} alt=""/>
                                <div>درآمد</div>
                            </div>
                        </Income>
                        <Cost disabled={!data} onClick={costHandler} filter={costActive ? 'brightness(103.5)' : ''}
                              background={costActive ? '#FF4D4F' : 'transparent'}
                              color={!costActive ? '#FF4D4F' : '#fff'}>
                            <div className="text">
                                <img className={`icon`} src={cost?.src} alt=""/>
                                <div>هزینه</div>
                            </div>
                        </Cost>
                    </ChartFilterLeft>
                    <ChartFilterRight>
                        {data?.plot && data?.plot ? (
                            <>
                                <ChartFilterRightText color={`#52C41A`}>انجام پروژه پرسش‌گری</ChartFilterRightText>
                                <ChartFilterRightText color={`#1890FF`}>پر کردن پرسش‌نامه</ChartFilterRightText>
                            </>
                        ) : <ChartFilterRightEmpty>هنوز هیچ هزینه‌ای نکرده‌اید</ChartFilterRightEmpty>}
                    </ChartFilterRight>
                </ChartFilter>
                <ChartBox>
                    {data?.plot && data?.plot ? (
                        <>
                            <Doughnut options={{
                                elements: {
                                    arc: {
                                        borderColor: '#5360ED'
                                    }
                                }
                            }} data={chartData}/>
                            <div className="text">{digitsEnToFa(data?.balance)}</div>
                        </>
                    ) : (
                        <>
                            <Doughnut options={{
                                elements: {
                                    arc: {
                                        borderColor: '#5360ED'
                                    }
                                }
                            }} data={{
                                datasets: [
                                    {
                                        data: [100, 0],
                                        backgroundColor: ['#fff', '#fff']
                                    }
                                ]
                            }}/>
                            <div className="text">{digitsEnToFa(0)}</div>
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