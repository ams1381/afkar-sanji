import { Icon } from '@/styles/icons'
import { InputOptionsContainer, OptionalInputItem ,
  AddOptionButton, OptionWritingContainer} from '@/styles/questionnairePanel/QuestionDesignPanel';
import React from 'react'

export const WritePrioritize = () => {
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
