import { Icon } from '@/styles/icons';
import { OptionalAnswerBlockContainer } from '@/styles/questionnairePanel/QuestionComponent';
import React, { useEffect, useState } from 'react'
import { DragDropContext , Droppable , Draggable } from '@hello-pangea/dnd';
import { useDrag } from 'react-dnd'
import { useDispatch  , useSelector} from 'react-redux';
import { SortOptions } from '@/utilities/AnswerStore';


const Prioritize = ({ QuestionInfo }) => {
  const dispatcher = useDispatch();
  const [sortedOptionArray, setSortedOptionArray] = useState(QuestionInfo.options);
  const QuestionsAnswerSet = useSelector(state => state.reducer.AnswerSet);

  useEffect(() => {
    setSortedOptionArray(QuestionInfo.options)
  },[QuestionInfo.options])
  useEffect(() => {
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
       dispatcher(SortOptions({ QuestionID : QuestionInfo.id , NewOptionsArray : sortedOptionArray }))
  },[sortedOptionArray])
  
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = reorder(
      sortedOptionArray,
      result.source.index,
      result.destination.index
    );
    setSortedOptionArray(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='prioritize_droppable'>
        {(droppableProvided, droppableSnapshot) => (
          <OptionalAnswerBlockContainer
            vertical='true'
            ref={droppableProvided.innerRef}
            
            {...droppableProvided.droppableProps}
          >
            {sortedOptionArray.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}
              >
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <label
                      className='OptionalAnswerItemContainer Prioritize'
                      style={{ cursor: 'pointer' }}
                    >
                      <Icon name='DND' />
                      <p style={{ marginRight: 15 }}>{item.text}</p>
                    </label>
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </OptionalAnswerBlockContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Prioritize;