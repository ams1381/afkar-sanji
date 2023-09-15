import { SortPopoverContainer } from '@/styles/Charts/ChartsPage'
import { Icon } from '@/styles/icons'
import React from 'react'

export const SortPopoverContent = ({ setCurrentSort }) => {
  return (
    <SortPopoverContainer>
        <div onClick={() => setCurrentSort('increase')}>
            <p>صعودی</p>
            <Icon name='incSort' />
        </div>
        <div style={{ margin : '10px 0' }}  onClick={() => setCurrentSort('decrease')}>
            <p>نزولی</p>
            <Icon name='decSort' />
        </div>
        <div  onClick={() => setCurrentSort('default')}>
            <p>پیش فرض</p>
            <Icon name='defaultSort' />
        </div>
    </SortPopoverContainer>
  )
}
