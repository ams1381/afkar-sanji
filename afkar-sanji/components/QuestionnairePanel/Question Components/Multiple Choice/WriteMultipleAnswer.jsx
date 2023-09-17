import { Icon } from '@/styles/icons'
import { InputOptionsContainer, OptionalInputItem ,
  AddOptionButton, OptionWritingContainer} from '@/styles/questionnairePanel/QuestionDesignPanel';
import { OptionAdder, OptionModifier, OptionRemover, ReorderOptions } from '@/utilities/QuestionStore';
import React from 'react'
import { DragDropContext , Droppable , Draggable } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const MultipleAnswer = ({ QuestionInfo }) => {
  const Dispatcher = useDispatch();
  const RandomIdGenerator = () => {
   let ID = Date.now();
   QuestionInfo.options.forEach(item => {
    if(item.id == ID)
      return RandomIdGenerator();
   })
   return ID;
  }
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1); 
    result.splice(endIndex, 0, removed);
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
    Dispatcher(ReorderOptions({ QuestionID : QuestionInfo.id , NewOptionsPlacement : reorderedItems  }))
  }
  const OptionItem = (OptionItem) => {
    if(QuestionInfo.options.length > 2)
      Dispatcher(OptionRemover({ QuestionID : QuestionInfo.id , OptionID : OptionItem.id }))
  }
  
  return (
    <OptionWritingContainer>
      <p>گزینه ها</p>
      <DragDropContext onDragEnd={onDragEnd}>
         <Droppable droppableId='dropboard'> 
          {(provided, snapshot) => <div provided={provided} {...provided.droppableProps} 
        ref={provided.innerRef}>
            {
          QuestionInfo.options.map((item,index) => !item.text?.includes('<span>','</span>') ?
           <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
            {(provided, snapshot) => <div key={item.id}>
              <InputOptionsContainer ref={provided.innerRef} 
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <OptionalInputItem  type='text' autoFocus={item.newOption ? true : false} key={item.id}
            onChange={e => Dispatcher(OptionModifier({ QuestionID : QuestionInfo.id , OptionID : item.id , OptionText : e.target.value }))}
            defaultValue={(item.text != 'null') ? item.text : ''} placeholder='چیزی بنویسید'/>
            <div className='option_button_container'>
              <button onClick={() => Dispatcher(OptionAdder({ QuestionID : QuestionInfo.id , NewOptionID : RandomIdGenerator() , OptionID : item.id , newOption : true
                , OptionText : null }))}>
                <Icon name='CirclePlus'/>
              </button>
              <button onClick={() => OptionItem(item)}>
                <Icon name='CircleMinus' />
              </button>
            </div>
          </InputOptionsContainer></div>}
          
          </Draggable> : '')}
          {provided.placeholder}
          </div>
          }
          
        </Droppable>
      </DragDropContext>
      <AddOptionButton onClick={() => Dispatcher(OptionAdder({ 
        QuestionID : QuestionInfo.id , NewOptionID : RandomIdGenerator() , OptionText : null , newOption : true
        }))}>
        برای افزودن گزینه ضربه بزنید
      </AddOptionButton>
    </OptionWritingContainer>
  )
}
export default MultipleAnswer;
