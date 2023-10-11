import { Icon } from '@/styles/icons';
import { OptionalAnswerBlockContainer , OptionsContainer} from '@/styles/questionnairePanel/QuestionComponent';
import React, { useEffect, useState } from 'react'
import { DragDropContext , Droppable , Draggable } from '@hello-pangea/dnd';
import { useDrag } from 'react-dnd'
import { useDispatch  , useSelector} from 'react-redux';
import { SortOptions } from '@/utilities/stores/AnswerStore';


const Prioritize = ({ QuestionInfo }) => {
  const dispatcher = useDispatch();
  const [sortedOptionArray, setSortedOptionArray] = useState(QuestionInfo.options);
  const QuestionsAnswerSet = useSelector(state => state.reducer.AnswerSet);
  
  useEffect(() => {
    setSortedOptionArray(QuestionInfo.options)
  },[QuestionInfo.options])
  useEffect(() => {
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
    {
      if(QuestionsAnswerSet.find(item => item.question == QuestionInfo.id)?.answer?.sorted_options)
          setSortedOptionArray(QuestionsAnswerSet.find(item => item.question == QuestionInfo.id).answer?.sorted_options);
      else
        dispatcher(SortOptions({ QuestionID : QuestionInfo.id ,  NewOptionsArray : sortedOptionArray.map((item,index) => ({ id : item.id , placement : index + 1 })) }))
    }
  },[QuestionInfo])
  
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
    // console.log(reorderedItems)
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
      dispatcher(SortOptions({ QuestionID : QuestionInfo.id , NewOptionsArray : reorderedItems.map((item,index) => ({ id : item.id , placement : index + 1 })) }))
  };
  const onDragStartHandler = (E) => {
  } 
  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
    userSelect: 'none',
    position: 'static',
    // padding: 8 * 2,
    // margin: `0 0 8px 0`,
    // background: isDragging ? 'lightgreen' : 'red',    
  });
  return (
    <OptionsContainer>
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStartHandler}>
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
                    // style={getItemStyle(
                    //   draggableSnapshot.isDragging,
                    //   draggableProvided.draggableProps.style
                    // )}
                  >
                    <label
                      className='OptionalAnswerItemContainer Prioritize'
                      style={{ cursor: 'pointer' }}
                    >
                      <Icon name='DND' />
                      <p style={{ marginRight: 15 }}>{item.text && item.text != 'null' ? item.text : ''}</p>
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
    </OptionsContainer>
  );
};

export default Prioritize;