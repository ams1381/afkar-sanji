import { Icon } from '@/styles/icons'
import React from 'react'
import { SortPopoverContainer } from '@/styles/Charts/ChartsPage'

export const ChartTypePopover = () => {
  return (
    <SortPopoverContainer>
        <div>
            <p>جدول</p>
            <Icon name='tablePlot' style={{ width : 14  , height : 14}} />
        </div>
        <div>
            <p>دایره‌‌ای</p>
            <Icon name='circlePlot' style={{ width : 14  , height : 14}} />
        </div>
        <div>
            <p>خطی</p>
            <Icon name='linearPlot' style={{ width : 14  , height : 14}} /> 
        </div>
        <div>
            <p>عمودی</p>
            <Icon name='verticalPlot' style={{ width : 14  , height : 14}} />
        </div>
        <div>
            <p>افقی</p>
            <Icon name='horizontalPlot' style={{ width : 14  , height : 14}} />
        </div>
    </SortPopoverContainer>
  )
}
