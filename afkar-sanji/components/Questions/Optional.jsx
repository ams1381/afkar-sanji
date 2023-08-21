import { OptionalAnswerBlockContainer } from '@/styles/questionnairePanel/QuestionComponent';
import { Checkbox, Input } from 'antd';
import React from 'react'

const OptionalComponent = ({QuestionInfo}) => {

  return (
    <OptionalAnswerBlockContainer>
      {QuestionInfo.options.map(item => <div className='OptionalAnswerItemContainer' key={item.id}>
        <Checkbox />
        <p>{item.text}</p>
      </div>)}
    </OptionalAnswerBlockContainer>
  )
}
export default OptionalComponent;