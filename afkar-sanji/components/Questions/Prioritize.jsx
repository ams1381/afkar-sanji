import { Icon } from '@/styles/icons';
import { OptionalAnswerBlockContainer } from '@/styles/questionnairePanel/QuestionComponent';
import React from 'react'
import { DragDropContext , Droppable , Draggable } from '@hello-pangea/dnd';
import { useDrag } from 'react-dnd'

const Prioritize = ({ QuestionInfo }) => {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex + 1, 0, removed);
    return result;
  };
  const onDragEnd = async (result) =>  {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      QuestionInfo.options,
      result.source.index,
      result.destination.index
    );  
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='dropboard'> 
      {(provided, snapshot) => <OptionalAnswerBlockContainer vertical='true' 
      provided={provided} {...provided.droppableProps} 
        ref={provided.innerRef}>
          {QuestionInfo.options.map((item,index) => <Draggable  key={item.id} 
          draggableId={item.id.toString()} index={index}>
            {(provided, snapshot) => <div ref={provided.innerRef} 
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
               <label  
            className='OptionalAnswerItemContainer Prioritize' key={item.id} style={{ cursor : 'pointer' }}>
            <Icon name='DND' />
            <p style={{ marginRight : 15 }}>{item.text}</p>
           
          </label></div>}
        </Draggable> 
        )}
        {provided.placeholder}
      </OptionalAnswerBlockContainer>}
    </Droppable>
    </DragDropContext>
  )
}
export default Prioritize;