import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React, { useState } from 'react'
import EmptyImage from '../../public/Images/empty-image.png'
import { Icon } from '@/styles/icons';
import { EmptyButtonPage, ResultButton , EmptyResultContainer } from '@/styles/Result/ResultPage';
import { ChartSelectItem, TopBar, TopBarButtonsContainer,
  QuestionChartBodyContainer ,  TopBarChartSelectorContainer
   , QuestionChartContainer, QuestionChartContainerHeader } from '@/styles/Charts/ChartsPage';
import Link from 'next/link';
import { Popover, Skeleton } from 'antd';
import { SortPopoverContent } from './SortPopoverContent';
import { QuestionChart } from './QuestionChart';
import html2canvas from "html2canvas";
import { useLocalStorage } from '@/utilities/useLocalStorage';
import { useEffect } from 'react';
import { QuestionTypeIcon } from '@/utilities/QuestionTypes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};


const ChartsBody = ({ ChartQuery , QuestionnaireQuery }) => {
  const [ filterPopover , setFilterPopover ] = useState(false);
  const [ totalChartType , setTotalChartType ] = useState(null);
  const [ totalChartSort , setTotalSort ] = useState(null);
  const [ ChartsDataArray , setChartsDataArray ] = useState(null);
  const { setItem } = useLocalStorage();
  const DownloadAllCharts = async () => {
    let ChartArrayHTML = '';
    let ChartsArray = document.querySelectorAll('canvas');
    if(!ChartQuery?.data?.data?.length)
      return
   
    try 
    {
      ChartsArray.forEach(async (item) => {
        const canvas = await html2canvas(item);
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'chart.png';
        link.click();
      });
    }
    catch(err)
    {
      console.log(err)
    }   
  }
  useEffect(() => {
    if(ChartQuery?.data?.data)
    {
      let arrayOfObjects = ChartQuery?.data?.data
      
      const groupedObjects = {};
      
      // Group objects based on group_id
      arrayOfObjects.forEach(obj => {
        const groupId = obj.group_id;
        if (!groupedObjects[groupId]) {
          groupedObjects[groupId] = [];
        }
        groupedObjects[groupId].push(obj);
      });
      
      // Remove grouped objects from the original array
      const groupIdsToRemove = Object.keys(groupedObjects);
      groupIdsToRemove.forEach(groupId => {
        arrayOfObjects = arrayOfObjects.filter(obj => obj.group_id !== parseInt(groupId));
      });
      
      // console.log('Grouped Objects:', groupedObjects);
      Object.keys(groupedObjects).map(item => {
        if(item != 'null')
        arrayOfObjects.push({
          ChildQuestions : groupedObjects[item] ,
          question_title : groupedObjects[item][0].group_title
      })
        // console.log(groupedObjects[item])
      })
      setChartsDataArray(arrayOfObjects)
    }
  },[ChartQuery?.data?.data])

  return (
    ChartQuery.isLoading ? <div>
       <TopBar>
    <TopBarChartSelectorContainer loading={true}>
        <Skeleton.Input style={{ width : '65%' }} loading active />
        <Skeleton.Input style={{ width : '65%' }} loading active />
        <Skeleton.Input style={{ width : '65%' }} loading active />
        <Skeleton.Input style={{ width : '65%' }} loading active />
        <Skeleton.Input style={{ width : '65%' }} loading active />
    </TopBarChartSelectorContainer>
    <TopBarButtonsContainer>
      <div style={{ display : 'flex' , gap : '12px' }}>
        <Skeleton.Button loading active />
        <Skeleton.Button loading active />
      </div>
        <Skeleton.Button active />
    </TopBarButtonsContainer>
  </TopBar>
  <QuestionChartBodyContainer>  
        <QuestionChartContainer loading={true}>
          <QuestionChartContainerHeader>
          <div className='question_chart_title'>
                <Skeleton.Input />
            </div>
            <div className='question_chart_buttons'>
              <Skeleton.Button active />
              <Skeleton.Button active />
            </div>
          </QuestionChartContainerHeader>
        </QuestionChartContainer>
        <QuestionChartContainer loading={true}>
          <QuestionChartContainerHeader>
          <div className='question_chart_title'>
                <Skeleton.Input />
            </div>
            <div className='question_chart_buttons'>
              <Skeleton.Button active />
              <Skeleton.Button active />
            </div>
          </QuestionChartContainerHeader>
        </QuestionChartContainer>
        <QuestionChartContainer loading={true}>
          <QuestionChartContainerHeader>
          <div className='question_chart_title'>
                <Skeleton.Input />
            </div>
            <div className='question_chart_buttons'>
              <Skeleton.Button active />
              <Skeleton.Button active />
            </div>
          </QuestionChartContainerHeader>
        </QuestionChartContainer>
      </QuestionChartBodyContainer>
  </div>
     : <div>
        <TopBar>
          <TopBarChartSelectorContainer>
            <ChartSelectItem onClick={() => setTotalChartType('Table')}>
              <p>جدول</p>
              <span>
                <Icon name='tablePlot' />
              </span>
            </ChartSelectItem>
            <ChartSelectItem onClick={() => setTotalChartType('Pie')}>
              <p>دایره‌‌ای</p>
              <span>
                <Icon name='circlePlot' />
              </span>
            </ChartSelectItem>
            <ChartSelectItem onClick={() => setTotalChartType('Line')}>
              <p>خطی</p>
              <span>
                <Icon name='linearPlot' /> 
              </span>
            </ChartSelectItem>
            <ChartSelectItem onClick={() => setTotalChartType('Bar')}>
              <p>عمودی</p>
              <span>
                <Icon name='verticalPlot' />
              </span>
            </ChartSelectItem>
            <ChartSelectItem onClick={() => setTotalChartType('HorizontalBar')}>
              <p>افقی</p>
              <span>
                <Icon name='horizontalPlot' />
              </span>
            </ChartSelectItem>
          </TopBarChartSelectorContainer>
          <TopBarButtonsContainer>
            <div style={{ display : 'flex' , gap : '12px' }}>
            <ResultButton className='download_charts_btn' onClick={DownloadAllCharts}>
                <p>دانلود نمودار‌ها</p>
                <Icon name='Upload'/>
              </ResultButton>
              <Link href={`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/results/`}>
                <ResultButton>
                  <p>نتایج</p>
                </ResultButton>
              </Link>
            </div>
            <Popover content={<SortPopoverContent setCurrentSort={setTotalSort}/>}
            className='test'
            trigger="click"
            onOpenChange={() => setFilterPopover(false)}
             placement='bottom'
             open={filterPopover}>
              <ResultButton onClick={() => setFilterPopover(!filterPopover)}>
              <Icon name='Filter' />
            </ResultButton>
            </Popover>
          </TopBarButtonsContainer>
        </TopBar>
        <QuestionChartBodyContainer>
          {
            ChartQuery.data?.data?.length && ChartsDataArray ?
            ChartsDataArray.map(item =>
              !item?.ChildQuestions ? <QuestionChart totalChartType={totalChartType} totalChartSort={totalChartSort}
               key={item.question_id} PlotDetail={item} />
               : <QuestionChartContainer>
                  <QuestionChartContainerHeader style={{ paddingBottom : 0 , padding : '12px' , border : '1px solid var(--Outline-variant, #CCC)' }}>
                  <div className='question_chart_title'>
                    { QuestionTypeIcon('group') }
                    <p>{item.question_title}</p>
                    </div>
                  </QuestionChartContainerHeader>
                  <div>
                  
                  <div className='childChartsContainer' style={{ width : '95%' , margin : '12px auto' }}>
                      {
                          item?.ChildQuestions.map(ChildItem => <QuestionChart totalChartType={totalChartType} totalChartSort={totalChartSort}
                            key={ChildItem.question_id} PlotDetail={ChildItem} />)
                      }
                    </div>
                  </div>
               </QuestionChartContainer>)
               : (!QuestionnaireQuery.data?.data?.questions?.length) ? <EmptyResultContainer>
              <img src={EmptyImage.src} />
              <p>هنوز هیچ سوالی نساختید</p>
              <Link onClick={() => setItem('tabType','question_design')}
              href={`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/`}>
                <EmptyButtonPage type='primary'>الان بسازید</EmptyButtonPage>
              </Link>
            </EmptyResultContainer>
            : <EmptyResultContainer>
            <img src={EmptyImage.src} />
            <p>نتیجه‌ای جهت نمایش وجود ندارد</p>
            <Link href={`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/answer-page`} target='_blank'>
              <EmptyButtonPage type='primary'>به پرسشنامه پاسخ دهید</EmptyButtonPage>
            </Link>
          </EmptyResultContainer> 
          }
        </QuestionChartBodyContainer>
     </div>
  )
}
export default ChartsBody;