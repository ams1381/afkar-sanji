import { QuestionChartContainer , QuestionChartContainerHeader  } from '@/styles/Charts/ChartsPage'
import { Icon } from '@/styles/icons'
import { QuestionTypeIcon } from '@/utilities/QuestionTypes'
import { Popover } from 'antd'
import React from 'react'
import { useState } from 'react'
import { SortPopoverContent } from './SortPopoverContent'
import { ChartTypePopover } from './ChartTypePopover'
import 'chart.js/auto'
import { ChartGenerator } from './ChartGenerator'
import { useEffect } from 'react'
import { useRef } from 'react'
import html2canvas from 'html2canvas'
import {ChartDataGenerator, ChartOptionGenerator} from "@/utilities/Charts/ChartConfigGenerator";
const regex = /(<([^>]+)>)/gi;

const exportChart = async (ChartID,ChartType) => {
  if(!ChartID)
      return
    try 
    {
      let canvas;
      if(ChartType == 'Table')
      {
        canvas = await html2canvas(document.querySelector(`#Table${ChartID}`));
      } 
      else
        canvas = document.getElementById(ChartID);
     
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'chart.png';
      link.click();
    }
    catch(err)
    {
      console.log(err)
    }
}

export const QuestionChart = ({ PlotDetail , totalChartType , totalChartSort}) => {
    const [ FilterPopover , setFilterPopover ] = useState(false);
    const [ ChangeChartTypePopover , setChangeChartTypePopover ] = useState(false);
    const [ currentChartType , setCurrentChartType ] = useState(totalChartType ? totalChartType :'Pie');
    const [ currentSort , setCurrentSort ] = useState(totalChartSort ? totalChartSort : 'default');
    const indexAxis = (currentChartType == 'HorizontalBar' ? 'y' : 'x');
    const [ ChartData , setChartData ] = useState(null);
    const chartRef = useRef(null);
    let data;
    
    useEffect(() => {
      setChartData(ChartDataGenerator(PlotDetail,currentSort,currentChartType,
        ChartData?.datasets[0]?.backgroundColor,
        ChartData?.datasets[0]?.borderColor))
      // ,PlotDetail.datasets[0]?.backgroundColor

    },[currentChartType, currentSort])
    useEffect(() => {
        if(totalChartType)
            setCurrentChartType(totalChartType)
    },[totalChartType])
    useEffect(() => {
        if(totalChartSort)
          setCurrentSort(totalChartSort)
    },[totalChartSort])
    

  return (
    
    <QuestionChartContainer>
        <QuestionChartContainerHeader>
            <div className='question_chart_title'>
                { QuestionTypeIcon(PlotDetail.question_type) }
                <p>{PlotDetail.question}</p>
            </div>
            <div className='question_chart_buttons'>
                <Popover 
                open={FilterPopover}
                placement='bottom'
                content={<SortPopoverContent setCurrentSort={setCurrentSort} />}
                onOpenChange={() => setFilterPopover(false)}
                 trigger='click'>
                    <button onClick={() => setFilterPopover(!FilterPopover)}>
                        <Icon name='Filter' />
                </button>
                </Popover>
                <Popover open={ChangeChartTypePopover}
                placement='bottom'
                content={<ChartTypePopover setCurrentChartType={setCurrentChartType} 
                closePopover={() => setChangeChartTypePopover(false)} />}
                onOpenChange={() => setChangeChartTypePopover(false)}
                 rigger='click'>
                    <button onClick={() => setChangeChartTypePopover(!ChangeChartTypePopover)}>
                        <Icon name='CircleSlice' />
                    </button>
                </Popover>
               <button className='ExportChart' onClick={() => exportChart(PlotDetail.question_id,currentChartType)}>
                <Icon name='Upload' />
               </button>
            </div>
        </QuestionChartContainerHeader>
        <div>
            <div style={{ width : 'fit-content' , margin : '0 auto' }}>
            { ChartData && ChartGenerator(currentChartType,ChartData,PlotDetail,
                ChartOptionGenerator(indexAxis , currentChartType , PlotDetail , currentSort)
                ,chartRef) }
         
            </div>
        </div>
    </QuestionChartContainer>
  )
}
export const generateRandomColors = (count) => {
    const colors = [];
    const letters = '0123456789ABCDEF';
  
    while (colors.length < count) {
      const color = '#' + Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('');
      colors.push(color);
    }
  
    return colors;
 };
export function fillArrayWithObject(obj, length) {
  const resultArray = new Array(length).fill(0); // Create an array of length with all zeros

  for (const key in obj) {
    const index = parseInt(key) - 1;
    if (!isNaN(index) && index >= 0 && index < length) {
      resultArray[index] = obj[key];
    }
  }

  return resultArray;
}

export function objectToSparseArray(obj, length) {
  const resultArray = Array(length).fill(0);

  for (const key in obj) {
    const index = parseInt(key, 10) - 1; // Adjust index to start from 0
    if (!isNaN(index) && index >= 0 && index < length) {
      resultArray[index] = obj[key];
    }
  }

  return resultArray;
}
