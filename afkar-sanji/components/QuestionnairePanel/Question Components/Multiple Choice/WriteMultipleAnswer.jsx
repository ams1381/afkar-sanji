import { Icon } from '@/styles/icons'
import { InputOptionsContainer, OptionalInputItem ,
  AddOptionButton, OptionWritingContainer} from '@/styles/questionnairePanel/QuestionDesignPanel';
import React from 'react'

const MultipleAnswer = () => {
  return (
    <OptionWritingContainer>
      <p>گزینه ها</p>
      <InputOptionsContainer>
        <OptionalInputItem type='text' placeholder='چیزی بنویسید'/>
        <div className='option_button_container'>
          <button>
            <Icon name='CirclePlus' />
          </button>
          <button>
            <Icon name='CircleMinus' />
          </button>
        </div>
      </InputOptionsContainer>
      <AddOptionButton>
        برای افزودن گزینه ضربه بزنید
      </AddOptionButton>
    </OptionWritingContainer>
  )
}
export default MultipleAnswer;
