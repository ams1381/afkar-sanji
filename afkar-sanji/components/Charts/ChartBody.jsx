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
              <Link href={`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/Results/`}>
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
            ChartQuery.data?.data?.length ?
            ChartQuery.data?.data?.map(item => <QuestionChart totalChartType={totalChartType} totalChartSort={totalChartSort}
               key={item.question_id} PlotDetail={item} />)
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
            <Link href={`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/AnswerPage`} target='_blank'>
              <EmptyButtonPage type='primary'>به پرسشنامه پاسخ دهید</EmptyButtonPage>
            </Link>
          </EmptyResultContainer> 
          }
        </QuestionChartBodyContainer>
     </div>
  )
}
export default ChartsBody;