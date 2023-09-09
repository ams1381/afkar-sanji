import { SortPopoverContainer } from '@/styles/Charts/ChartsPage'
import { Icon } from '@/styles/icons'
import React from 'react'

export const SortPopoverContent = () => {
  return (
    <SortPopoverContainer>
        <div>
            <p>صعودی</p>
            <Icon name='incSort' />
        </div>
        <div style={{ margin : '10px 0' }}>
            <p>نزولی</p>
            <Icon name='decSort' />
        </div>
        <div>
            <p>پیش فرض</p>
            <Icon name='defaultSort' />
        </div>
    </SortPopoverContainer>
  )
}
