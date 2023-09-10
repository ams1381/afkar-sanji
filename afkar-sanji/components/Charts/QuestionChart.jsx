import { QuestionChartContainer , QuestionChartContainerHeader } from '@/styles/Charts/ChartsPage'
import { Icon } from '@/styles/icons'
import { QuestionTypeIcon } from '@/utilities/QuestionTypes'
import { Popover } from 'antd'
import React from 'react'
import { useState } from 'react'
import { SortPopoverContent } from './SortPopoverContent'
import { ChartTypePopover } from './ChartTypePopover'

export const QuestionChart = ({ PlotDetail }) => {
    const [ FilterPopover , setFilterPopover ] = useState(false);
    const [ ChangeChartTypePopover , setChangeChartTypePopover ] = useState(false);
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
                content={<SortPopoverContent />}
                onOpenChange={() => setFilterPopover(false)}
                 trigger='click'>
                    <button onClick={() => setFilterPopover(!FilterPopover)}>
                        <Icon name='Filter' />
                </button>
                </Popover>
                <Popover open={ChangeChartTypePopover}
                placement='bottom'
                content={<ChartTypePopover />}
                onOpenChange={() => setChangeChartTypePopover(false)}
                 rigger='click'>
                    <button onClick={() => setChangeChartTypePopover(!ChangeChartTypePopover)}>
                        <Icon name='CircleSlice' />
                    </button>
                </Popover>
               
            </div>
        </QuestionChartContainerHeader>
    </QuestionChartContainer>
  )
}
