import React from 'react'
import { ToggleContainer } from '@/styles/questionnairePanel/QuestionSetting';

const ToggleCheckBoxItem = ({ ToggleText }) => {
  return (
    <ToggleContainer>
        <div className='checkbox_container'>
            <p>{ToggleText}</p>
            <Checkbox/>
        </div>
    </ToggleContainer>
  )
}
export default ToggleCheckBoxItem;