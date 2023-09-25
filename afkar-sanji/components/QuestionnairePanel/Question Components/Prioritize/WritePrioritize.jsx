import { Icon } from '@/styles/icons'
import { InputOptionsContainer, OptionalInputItem ,
  AddOptionButton, OptionWritingContainer} from '@/styles/questionnairePanel/QuestionDesignPanel';
import { OptionAdder, OptionModifier, OptionRemover } from '@/utilities/QuestionStore';
import React from 'react'
import { useEffect , useState} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const WritePrioritize = ({ QuestionInfo }) => {
  const OcurredError = useSelector(state => state.reducer.Error);
  const [ inputError , setInputError ] = useState(null);
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
  return (
    <OptionWritingContainer>
      <p>گزینه ها</p>
      {QuestionInfo.options.map(item => <InputOptionsContainer key={item.id}
      style={{ flexDirection : 'row-reverse' , alignItems : 'center' }}>
        <OptionalInputItem key={item.id} type='text'  autoFocus={item.newOption ? true : false}
        placeholder='چیزی بنویسید'  onChange={e => Dispatcher(OptionModifier({
           QuestionID : QuestionInfo.id , 
           OptionID : item.id , 
           OptionText : e.target.value ,
           group : QuestionInfo?.group
          }))}
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
