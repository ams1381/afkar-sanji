import { Icon } from '@/styles/icons'
import { InputOptionsContainer, OptionalInputItem ,
  AddOptionButton, OptionWritingContainer} from '@/styles/questionnairePanel/QuestionDesignPanel';
import { DeleteOptionsError, OptionAdder, OptionModifier, OptionRemover } from '@/utilities/QuestionStore';
import React from 'react'
import { useEffect , useState} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const WritePrioritize = ({ QuestionInfo }) => {
  const OcurredError = useSelector(state => state.reducer.Error);
  const [ inputError , setInputError ] = useState(null);
  const [ ErrorObject , setErrorObject ] = useState(null);
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
      Dispatcher(OptionRemover({ 
    QuestionID : QuestionInfo.id , 
    OptionID : OptionItem.id ,
    group : QuestionInfo?.group
  }))
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
  return (
    <OptionWritingContainer>
      <p>گزینه ها</p>
      {QuestionInfo.options.map((item,index) => <InputOptionsContainer key={item.id}>
        <div className='option_container'>
          <OptionalInputItem key={item.id} type='text' 
          tabIndex={index + 1}
          onKeyDown={e => e.key == 'Tab' && index == QuestionInfo.options.length - 1 ? 
          Dispatcher(OptionAdder({ 
            QuestionID : QuestionInfo.id , 
            NewOptionID : RandomIdGenerator() , 
            OptionText : null , 
            newOption : true ,
            group : QuestionInfo.group
        })) : ''}
        maxLength={250}
         autoFocus={item.newOption ? true : false}
        placeholder='چیزی بنویسید'  
        onChange={e => {
          Dispatcher(OptionModifier({
           QuestionID : QuestionInfo.id , 
           OptionID : item.id , 
           OptionText : e.target.value ,
           group : QuestionInfo?.group
          }))
          Dispatcher(DeleteOptionsError({ errID : QuestionInfo.id , optionID : item.id }))
        }}
          defaultValue={item.text && item.text != 'null' ? item.text : ''}/>
          <div className='option_button_container'>
            <button onClick={() => Dispatcher(OptionAdder({ 
              QuestionID : QuestionInfo.id ,
              NewOptionID : RandomIdGenerator() ,
              newOption : true,
                OptionID : item.id ,
                OptionText : null ,
                group : QuestionInfo?.group
                }
              ))}>
              <Icon name='CirclePlus' />
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
      </InputOptionsContainer>)}
      <AddOptionButton onClick={() => Dispatcher(OptionAdder({ 
        QuestionID : QuestionInfo.id ,
         NewOptionID : RandomIdGenerator() ,
          newOption : true,
          OptionText : null ,
          group : QuestionInfo?.group
         }))}>
        برای افزودن گزینه ضربه بزنید
      </AddOptionButton>
    </OptionWritingContainer>
  )
}
