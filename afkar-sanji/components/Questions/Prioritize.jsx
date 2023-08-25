import { Icon } from '@/styles/icons';
import { OptionalAnswerBlockContainer } from '@/styles/questionnairePanel/QuestionComponent';
import React from 'react'
import { useDrag } from 'react-dnd'

const Prioritize = ({ QuestionInfo }) => {
  return (
    <OptionalAnswerBlockContainer vertical='true'>
        {QuestionInfo.options.map(item => <div 
         className='OptionalAnswerItemContainer Prioritize' key={item.id} style={{ cursor : 'pointer' }}>
        <Icon name='DND' />
        <p style={{ marginRight : 15 }}>{item.text}</p>
      </div>)}
    </OptionalAnswerBlockContainer>
  )
}
export default Prioritize;