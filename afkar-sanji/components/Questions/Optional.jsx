import { OptionalAnswerBlockContainer } from '@/styles/questionnairePanel/QuestionComponent';
import { Checkbox, Input } from 'antd';
import React from 'react'

const OptionalComponent = ({QuestionInfo}) => {
  const regex = /(<([^>]+)>)/gi;
  return (
    <OptionalAnswerBlockContainer vertical={QuestionInfo.is_vertical ? 'active' : null}>
      {QuestionInfo.options.map(item => <div className='OptionalAnswerItemContainer' key={item.id}>
        <Checkbox />
        <p>{item.text?.replace(regex,"")}</p>
      </div>)}
    </OptionalAnswerBlockContainer>
  )
}
export default OptionalComponent;