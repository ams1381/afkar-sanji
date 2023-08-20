import { AddOptionButton, InputOptionsContainer, OptionWritingContainer, OptionalInputItem } from '@/styles/questionnairePanel/QuestionDesignPanel'
import { Icon } from '@chakra-ui/react'
import React from 'react'

export const WriteDropDownAnswer = () => {
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
