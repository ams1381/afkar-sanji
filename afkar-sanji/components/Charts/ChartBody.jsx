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
import { faker } from '@faker-js/faker'
import { Icon } from '@/styles/icons';
import { ResultButton } from '@/styles/Result/ResultPage';
import { ChartSelectItem, TopBar, TopBarButtonsContainer, TopBarChartSelectorContainer } from '@/styles/Charts/ChartsPage';
import Link from 'next/link';
import { Popover } from 'antd';
import { SortPopoverContent } from './SortPopoverContent';
import { QuestionChart } from './QuestionChart';
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const ChartsBody = ({ ChartQuery , QuestionnaireQuery }) => {
  const [ filterPopover , setFilterPopover ] = useState(false);
  console.log(ChartQuery.data)
  return (
    ChartQuery.isLoading ? 'Loading'
     : <div>
        <TopBar>
          <TopBarChartSelectorContainer>
            <ChartSelectItem>
              <p>جدول</p>
              <span>
                <Icon name='tablePlot' />
              </span>
            </ChartSelectItem>
            <ChartSelectItem>
              <p>دایره‌‌ای</p>
              <span>
                <Icon name='circlePlot' />
              </span>
            </ChartSelectItem>
            <ChartSelectItem>
              <p>خطی</p>
              <span>
                <Icon name='linearPlot' /> 
              </span>
            </ChartSelectItem>
            <ChartSelectItem>
              <p>عمودی</p>
              <span>
                <Icon name='verticalPlot' />
              </span>
            </ChartSelectItem>
            <ChartSelectItem>
              <p>افقی</p>
              <span>
                <Icon name='horizontalPlot' />
              </span>
            </ChartSelectItem>
          </TopBarChartSelectorContainer>
          <TopBarButtonsContainer>
            <div style={{ display : 'flex' , gap : '12px' }}>
            <ResultButton className='download_charts_btn'>
                <p>دانلود نمودار‌ها</p>
                <Icon name='Upload'/>
              </ResultButton>
              <Link href={`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/Results/`}>
                <ResultButton>
                  <p>نتایج</p>
                </ResultButton>
              </Link>
            </div>
            <Popover content={<SortPopoverContent />}
            className='test'
            trigger="click"
            onOpenChange={() => setFilterPopover(false)}
             placement='bottom'
             open={filterPopover}>
              <ResultButton onClick={() => setFilterPopover(!filterPopover)}>
              <Icon name='filter' />
            </ResultButton>
            </Popover>
            

          </TopBarButtonsContainer>
        </TopBar>
        <div style={{ marginTop : 24 }}>
          {
            ChartQuery.data?.data?.map(item => <QuestionChart key={item.question_id} PlotDetail={item} />)
          }
          
        </div>
      {/* <Bar options={options} data={data} /> */}
     </div>
  )
}
export default ChartsBody;