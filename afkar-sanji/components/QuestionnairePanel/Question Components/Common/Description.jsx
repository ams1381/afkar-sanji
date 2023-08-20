import { QuestionDescriptionContainer , DescriptionTextField} from '@/styles/questionnairePanel/QuestionSetting'
import { Checkbox } from 'antd'
import React, { useState } from 'react'

const QuestionDescription = ({ questionDescription }) => {
    const [ openDescriptionField , SetOpenDescriptionField ] = useState(questionDescription);
  return (
    <QuestionDescriptionContainer>
        <div className='Description_checkbox_container' onClick={() => SetOpenDescriptionField(!openDescriptionField)}>
            <p>توضیحات</p>
            <Checkbox checked={openDescriptionField}/>
        </div>
        { openDescriptionField ? <div className='DescriptionInputContainer'>
            <DescriptionTextField value={questionDescription} />
      </div> : ''}
    </QuestionDescriptionContainer>
  )
}
export default QuestionDescription;