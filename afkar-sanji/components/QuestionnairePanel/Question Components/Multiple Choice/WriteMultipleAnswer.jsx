import { Icon } from '@/styles/icons'
import { InputOptionsContainer, OptionalInputItem ,
  AddOptionButton, OptionWritingContainer} from '@/styles/questionnairePanel/QuestionDesignPanel';
import { OptionAdder, OptionModifier, OptionRemover } from '@/utilities/QuestionStore';
import React from 'react'
import { DragDropContext , Droppable , Draggable } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';

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
  const OptionItem = (OptionItem) => {
    if(QuestionInfo.options.length > 2)
      Dispatcher(OptionRemover({ QuestionID : QuestionInfo.id , OptionID : OptionItem.id}))
  }
  return (
    <OptionWritingContainer>
      <p>گزینه ها</p>
      <DragDropContext onDragEnd={onDragEnd}>
         <Droppable droppableId='dropboard'> 
          {(provided, snapshot) => <div provided={provided} {...provided.droppableProps} 
        ref={provided.innerRef}>
            {
          QuestionInfo.options.map(item => !item.text?.includes('<span>','</span>') ?
           <Draggable key={item.id}>
            {(provided, snapshot) => <div><InputOptionsContainer ref={provided.innerRef} 
            {...provided.draggableProps}
            {...provided.dragHandleProps} key={item.id}>
            <OptionalInputItem  type='text' 
            onChange={e => Dispatcher(OptionModifier({ QuestionID : QuestionInfo.id , OptionID : item.id , OptionText : e.target.value }))}
            defaultValue={(item.text != 'null') ? item.text : ''} placeholder='چیزی بنویسید'/>
            <div className='option_button_container'>
              <button onClick={() => Dispatcher(OptionAdder({ QuestionID : QuestionInfo.id , NewOptionID : RandomIdGenerator() , OptionID : item.id 
                , OptionText : null }))}>
                <Icon name='CirclePlus'/>
              </button>
              <button onClick={() => OptionItem(item)}>
                <Icon name='CircleMinus' />
              </button>
            </div>
          </InputOptionsContainer></div>}
          </Draggable> : '')}</div>
          }
        </Droppable>
      </DragDropContext>
      <AddOptionButton onClick={() => Dispatcher(OptionAdder({ QuestionID : QuestionInfo.id , NewOptionID : RandomIdGenerator() , OptionText : null }))}>
        برای افزودن گزینه ضربه بزنید
      </AddOptionButton>
    </OptionWritingContainer>
  )
}
export default MultipleAnswer;
