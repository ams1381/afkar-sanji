import { Icon } from '@/styles/icons'
import { RateContainer } from '@/styles/questionnairePanel/QuestionComponent'
import { Rate } from 'antd'
import persianNumberMin from 'persian-number'
import React from 'react'

const RateQuestion = ({ QuestionInfo }) => {
  return (
    <RateContainer>
      <div className='rate_selector'> 
        <Rate count={QuestionInfo.max} character={
        <Icon name={ShapeIconName(QuestionInfo.shape)} style={{ width : 25 , height : 25 }} />}/>
      </div>
      <div className='rate_number_indicator'>
         {persianNumberMin.convertEnToPe(QuestionInfo.max)}
      </div>
       
    </RateContainer>
  )
}
const ShapeIconName = (Shape) => {
  switch(Shape)
  {
    case 'S':
        return 'Star';
    case 'L':
        return 'Like';
    case 'D':
        return 'Dislike'
    case 'SM':
        return 'Smile'
  }
}
export default RateQuestion