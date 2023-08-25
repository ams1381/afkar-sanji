import { Icon } from '@/styles/icons'
import { InputOptionsContainer, OptionalInputItem ,
  AddOptionButton, OptionWritingContainer} from '@/styles/questionnairePanel/QuestionDesignPanel';
import { OptionAdder, OptionModifier, OptionRemover } from '@/utilities/QuestionStore';
import React from 'react'
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
  const OptionItem = (OptionItem) => {
    if(QuestionInfo.options.length > 2)
      Dispatcher(OptionRemover({ QuestionID : QuestionInfo.id , OptionID : OptionItem.id}))
  }
  return (
    <OptionWritingContainer>
      <p>گزینه ها</p>
      {QuestionInfo.options.map(item => !item.text?.includes('<span>','</span>') ? <InputOptionsContainer>
        <OptionalInputItem key={item.id} type='text' 
        onChange={e => Dispatcher(OptionModifier({ QuestionID : QuestionInfo.id , OptionID : item.id , OptionText : e.target.value }))}
        value={(item.text != 'null') ? item.text : ''} placeholder='چیزی بنویسید'/>
        <div className='option_button_container'>
          <button onClick={() => Dispatcher(OptionAdder({ QuestionID : QuestionInfo.id , NewOptionID : RandomIdGenerator() , OptionID : item.id 
            , OptionText : null }))}>
            <Icon name='CirclePlus'/>
          </button>
          <button onClick={() => OptionItem(item)}>
            <Icon name='CircleMinus' />
          </button>
        </div>
      </InputOptionsContainer> : '')}
      <AddOptionButton onClick={() => Dispatcher(OptionAdder({ QuestionID : QuestionInfo.id , NewOptionID : RandomIdGenerator() , OptionText : null }))}>
        برای افزودن گزینه ضربه بزنید
      </AddOptionButton>
    </OptionWritingContainer>
  )
}
export default MultipleAnswer;
