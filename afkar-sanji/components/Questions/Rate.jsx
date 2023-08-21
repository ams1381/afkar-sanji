import { Icon } from '@/styles/icons'
import { Rate } from 'antd'
import React from 'react'

const RateQuestion = ({ QuestionInfo }) => {
  return (
    <div>
        <Rate count={QuestionInfo.max} character={<Icon name={QuestionInfo.shapeIcon} />}/>
    </div>
  )
}
export default RateQuestion