import { Icon } from '@/styles/icons';
import { OptionalAnswerBlockContainer } from '@/styles/questionnairePanel/QuestionComponent';
import React from 'react'
import { useDrag } from 'react-dnd'

const Prioritize = ({ QuestionInfo }) => {
  // const [{ opacity }, dragRef] = useDrag(
  //   () => ({
  //     type: ItemTypes.CARD,
  //     item: { text },
  //     collect: (monitor) => ({
  //       opacity: monitor.isDragging() ? 0.5 : 1
  //     })
  //   }),
  //   []
  // )
  return (
    <OptionalAnswerBlockContainer >
        {QuestionInfo.options.map(item => <div className='OptionalAnswerItemContainer' key={item.id} style={{ cursor : 'pointer' }}>
        <Icon name='DND' />
        <p style={{ marginRight : 15 }}>{item.text}</p>
      </div>)}
    </OptionalAnswerBlockContainer>
  )
}
export default Prioritize;