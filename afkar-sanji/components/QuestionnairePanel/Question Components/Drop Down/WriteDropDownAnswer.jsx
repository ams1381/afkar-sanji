import { AddOptionButton, InputOptionsContainer, OptionWritingContainer, OptionalInputItem } from '@/styles/questionnairePanel/QuestionDesignPanel'
import { OptionAdder, OptionModifier, OptionRemover } from '@/utilities/QuestionStore';
import { Icon } from '@/styles/icons';
import React from 'react'
import { useDispatch } from 'react-redux';

export const WriteDropDownAnswer = ({ QuestionInfo }) => {
  const Dispatcher = useDispatch();
  const RandomIdGenerator = () => {
   let ID = Math.floor(Math.random() * 100);
   QuestionInfo.options.forEach(item => {
    if(item.id == ID)
      return RandomIdGenerator();
   })
   return ID;
  }
  const QuestionRemover = (OptionItem) => {
    if(QuestionInfo.options.length > 2)
      Dispatcher(OptionRemover({ QuestionID : QuestionInfo.id , OptionID : OptionItem.id}))
  }
  return (
    <OptionWritingContainer>
      <p>گزینه ها</p>
      {QuestionInfo.options.map(item => <InputOptionsContainer key={item.id}>
        <OptionalInputItem type='text' key={item.id} placeholder='چیزی بنویسید' defaultValue={item.text}
         onChange={e => Dispatcher(OptionModifier({ QuestionID : QuestionInfo.id , OptionID : item.id , OptionText : e.target.value }))}/>
        <div className='option_button_container'>
          <button onClick={() => Dispatcher(OptionAdder({ QuestionID : QuestionInfo.id , NewOptionID : RandomIdGenerator() , OptionID : item.id , OptionText : null }))}>
            <Icon name='CirclePlus' />
          </button>
          <button onClick={() => QuestionRemover(item)}>
            <Icon name='CircleMinus' />
          </button>
        </div>
      </InputOptionsContainer>)}
      
      <AddOptionButton onClick={() => Dispatcher(OptionAdder({ QuestionID : QuestionInfo.id , NewOptionID : RandomIdGenerator() , OptionText : null }))}>
        برای افزودن گزینه ضربه بزنید
      </AddOptionButton>
    </OptionWritingContainer>
  )
}
