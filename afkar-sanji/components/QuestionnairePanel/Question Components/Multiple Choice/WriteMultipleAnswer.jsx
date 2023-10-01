import { Icon } from '@/styles/icons'
import { InputOptionsContainer, OptionalInputItem ,
  AddOptionButton, OptionWritingContainer} from '@/styles/questionnairePanel/QuestionDesignPanel';
import { DeleteOptionsError, OptionAdder, OptionModifier, OptionRemover, ReorderOptions } from '@/utilities/QuestionStore';
import React from 'react'
import { DragDropContext , Droppable , Draggable } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const MultipleAnswer = ({ QuestionInfo }) => {
  const OcurredError = useSelector(state => state.reducer.Error);
  const [ inputError , setInputError ] = useState(null);
  const [ ErrorObject , setErrorObject ] = useState(null)
  const Dispatcher = useDispatch();
  const RandomIdGenerator = () => {
   let ID = Date.now();
   QuestionInfo.options.forEach(item => {
    if(item.id == ID)
      return RandomIdGenerator();
   })
   return ID;
  }
  useEffect(() => {
    if(OcurredError)
    {
        if(OcurredError?.find(item => item.qid == QuestionInfo?.id))
        {
            setInputError('active');

            setErrorObject(OcurredError?.find(item => item.qid == QuestionInfo?.id).err_object)
            document.querySelector(`.QuestionItem${QuestionInfo?.id}`).setAttribute('style','max-height : initial');
        }
        else
            setInputError(null)
    }
    else
        setInputError(null)
},[OcurredError])

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
      Dispatcher(OptionRemover({ 
    QuestionID : QuestionInfo.id , 
    OptionID : OptionItem.id ,
    group : QuestionInfo?.group
  }))
    else
      setInputError('برای ذخیره‌ سوال حداقل ۲ گزینه ایجاد کنید.')
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
           <Draggable key={item.id} draggableId={item.id.toString()} index={index} className='draggable_item'>
            {(provided, snapshot) => <div key={item.id}>
              <InputOptionsContainer ref={provided.innerRef} 
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
              <div className='option_container'>
                  <OptionalInputItem  type='text'
                  tabIndex={index + 1}
                  onKeyDown={e => e.key == 'Tab' && index == QuestionInfo.options.length - 1 ? 
                   Dispatcher(OptionAdder({ 
                    QuestionID : QuestionInfo.id , 
                    NewOptionID : RandomIdGenerator() , 
                    OptionText : null , 
                    newOption : true ,
                    group : QuestionInfo.group
                })) : ''}
                  autoFocus={item.newOption ? true : false} key={item.id}
            onChange={e => {
              Dispatcher(OptionModifier({
                 QuestionID : QuestionInfo.id , 
                 OptionID : item.id , 
                 OptionText : e.target.value ,
                 group : QuestionInfo?.group
                }))
              Dispatcher(DeleteOptionsError({ errID : QuestionInfo.id , optionID : item.id }))
            }}
            defaultValue={(item.text != 'null') ? item.text : ''} placeholder='چیزی بنویسید'/>
            <div className='option_button_container'>
              <button onClick={() => {
                Dispatcher(OptionAdder({
                   QuestionID : QuestionInfo.id ,
                    NewOptionID : RandomIdGenerator() , 
                    OptionID : item.id , newOption : true
                , OptionText : null ,
                group : QuestionInfo.group
               }))
                Dispatcher(DeleteOptionsError({ errID : QuestionInfo.id }))
              }}>
                <Icon name='CirclePlus'/>
              </button>
              <button onClick={() => OptionItem(item)}>
                <Icon name='CircleMinus' />
              </button>
            </div>
              </div>
            { ErrorObject?.length ? ErrorObject.find(OptionItem => OptionItem?.optionID == item?.id) && 
            <p className='options_error_message'>
              متن گزینه نمیتواند خالی باشد
              </p> : ''} 
          </InputOptionsContainer>
          
          </div>}
          
          </Draggable> : '')}
          {provided.placeholder}
          </div>
          }
          
        </Droppable>
      </DragDropContext>
      <AddOptionButton onClick={() => {
        Dispatcher(OptionAdder({ 
            QuestionID : QuestionInfo.id , 
            NewOptionID : RandomIdGenerator() , 
            OptionText : null , 
            newOption : true ,
            group : QuestionInfo.group
        }))
        Dispatcher(DeleteOptionsError({ errID : QuestionInfo.id }))
        }}>
        برای افزودن گزینه ضربه بزنید
      </AddOptionButton>
    </OptionWritingContainer>
  )
}
export default MultipleAnswer;
