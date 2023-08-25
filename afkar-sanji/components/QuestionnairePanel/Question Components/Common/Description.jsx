import { QuestionDescriptionContainer , DescriptionTextField} from '@/styles/questionnairePanel/QuestionSetting'
import { ChangeDescriptionHandler } from '@/utilities/QuestionStore'
import { Checkbox, Switch } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const QuestionDescription = ({ QuestionInfo , QuestionDataDispatcher , IsQuestion}) => {

    const [ openDescriptionField , SetOpenDescriptionField ] = useState(QuestionInfo.description ? true : false);
    const regex = /(<([^>]+)>)/gi;
    const [ descriptionOpen , setDescriptionOpen ] = useState(false);
    const DescriptionToggleHandler = () => {
      SetOpenDescriptionField(!openDescriptionField)
      setDescriptionOpen(!openDescriptionField)
      if(openDescriptionField)
      {
       QuestionDataDispatcher(ChangeDescriptionHandler({ QuestionID : QuestionInfo.id, NewDesc : null , QuestionChanged : IsQuestion}))
      }
    }
    const DescriptionChangeHandler = (e) => {

      if(!e.target.value)
      {
        SetOpenDescriptionField(false)
        QuestionDataDispatcher(ChangeDescriptionHandler({ QuestionID : QuestionInfo.id, NewDesc : null , QuestionChanged : IsQuestion}))
      }
        
      else
      QuestionDataDispatcher(ChangeDescriptionHandler({ QuestionID : QuestionInfo.id, NewDesc : e.target.value , QuestionChanged : IsQuestion}))
    }
    
  return (
    <QuestionDescriptionContainer>
        <div className='Description_checkbox_container' onClick={DescriptionToggleHandler}>
            <p>توضیحات</p>
            <Switch checked={openDescriptionField}/>
        </div>
        { openDescriptionField ? <div className='DescriptionInputContainer'>
            <DescriptionTextField autoFocus={descriptionOpen ? true : false} value={QuestionInfo.description ? QuestionInfo.description.replace(regex,"") : ''} 
            onChange={DescriptionChangeHandler} />
      </div> : ''}
    </QuestionDescriptionContainer>
  )
}
export default QuestionDescription;