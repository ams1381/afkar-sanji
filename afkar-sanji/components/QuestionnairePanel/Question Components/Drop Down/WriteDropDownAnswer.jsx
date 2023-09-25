import { AddOptionButton, InputOptionsContainer, OptionWritingContainer, OptionalInputItem } from '@/styles/questionnairePanel/QuestionDesignPanel'
import { DeleteOptionsError, OptionAdder, OptionModifier, OptionRemover } from '@/utilities/QuestionStore';
import { Icon } from '@/styles/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const WriteDropDownAnswer = ({ QuestionInfo }) => {
  const OcurredError = useSelector(state => state.reducer.Error);
  const [ inputError , setInputError ] = useState(null);

  const Dispatcher = useDispatch();
  const RandomIdGenerator = () => {
   let ID = Math.floor(Math.random() * 100);
   QuestionInfo.options?.forEach(item => {
    if(item.id == ID)
      return RandomIdGenerator();
   })
   return ID;
  }
  useEffect(() => {

    if(OcurredError)
    {
        if(OcurredError?.find(item => item.qid == QuestionInfo?.id && item.err_object.options))
        {
            setInputError('active');
            document.querySelector(`.QuestionItem${QuestionInfo?.id}`).setAttribute('style','max-height : initial');
        }
        else
            setInputError(null)
    }
    else
        setInputError(null)
},[OcurredError])
  const QuestionRemover = (OptionItem) => {
    if(QuestionInfo?.options?.length > 2)
      Dispatcher(OptionRemover({ 
    QuestionID : QuestionInfo.id , 
    OptionID : OptionItem.id ,
    group : QuestionInfo?.group
  }))
  }
  return (
    <OptionWritingContainer>
      <p>گزینه ها</p>
      {QuestionInfo.options?.map(item => <InputOptionsContainer key={item.id}
       >
        <div className='option_container'>
        <OptionalInputItem type='text' autoFocus={item.newOption ? true : false} key={item.id} placeholder='چیزی بنویسید' 
        value={(item.text != 'null') ? item.text : ''}
         onChange={e => {
          Dispatcher(OptionModifier({
           QuestionID : QuestionInfo.id , 
           OptionID : item.id , 
           OptionText : e.target.value ,
           group : QuestionInfo?.group
           }))
           Dispatcher(DeleteOptionsError({ errID : QuestionInfo.id }))
          }}/>
        <div className='option_button_container'>
          <button onClick={() => { 
            Dispatcher(OptionAdder({ 
            QuestionID : QuestionInfo.id , 
             NewOptionID : RandomIdGenerator() ,
             newOption : true , OptionID : item.id ,
              OptionText : null ,
              group : QuestionInfo?.group
             }))
             Dispatcher(DeleteOptionsError({ errID : QuestionInfo.id }))
            }}>
            <Icon name='CirclePlus' />
          </button>
          <button onClick={() => QuestionRemover(item)}>
            <Icon name='CircleMinus' />
          </button>
        </div>
        </div>
        
        { (inputError && OcurredError?.find(item => item.qid == QuestionInfo?.id)) && 
            <p className='options_error_message'>
              {OcurredError?.find(item => item.qid == QuestionInfo?.id).err_object.options}
              </p> } 
      </InputOptionsContainer>
      )}
      
      <AddOptionButton onClick={() => {
          Dispatcher(OptionAdder({
          QuestionID : QuestionInfo.id ,
            NewOptionID : RandomIdGenerator() , 
            newOption : true ,
            OptionText : null ,
            group : QuestionInfo.group
          }))
          Dispatcher(DeleteOptionsError({ errID : QuestionInfo.id }))
         }  }>
        برای افزودن گزینه ضربه بزنید
      </AddOptionButton>
    </OptionWritingContainer>
  )
}
