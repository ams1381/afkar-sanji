import { Icon } from '@/styles/icons'
import React from 'react'
import { SortPopoverContainer } from '@/styles/Charts/ChartsPage'

export const ChartTypePopover = ({ setCurrentChartType , closePopover }) => {

    return (
    <SortPopoverContainer>
        <div onClick={() => {
            setCurrentChartType('Table');
             closePopover()
            }}>
            <p>جدول</p>
            <Icon name='tablePlot' style={{ width : 14  , height : 14}} />
        </div>
        <div onClick={() => { setCurrentChartType('Pie');
         closePopover() }}>
            <p>دایره‌‌ای</p>
            <Icon name='circlePlot' style={{ width : 14  , height : 14}} />
        </div>
        <div onClick={() => {setCurrentChartType('Line');
         closePopover() }}>
            <p>خطی</p>
            <Icon name='linearPlot' style={{ width : 14  , height : 14}} /> 
        </div>
        <div onClick={() => { setCurrentChartType('Bar');
         closePopover() }}>
            <p>عمودی</p>
            <Icon name='verticalPlot' style={{ width : 14  , height : 14}} />
        </div>
        <div onClick={() => { setCurrentChartType('HorizontalBar');
         closePopover() }}>
            <p>افقی</p>
            <Icon name='horizontalPlot' style={{ width : 14  , height : 14}} />
        </div>
    </SortPopoverContainer>
  )
 
}
