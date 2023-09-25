import { QuestionDescriptionContainer , DescriptionTextField} from '@/styles/questionnairePanel/QuestionSetting'
import { ChangeDescriptionHandler } from '@/utilities/QuestionStore'
import { Checkbox, Switch } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const QuestionDescription = ({ QuestionInfo , QuestionDataDispatcher , IsQuestion}) => {

    const [ openDescriptionField , SetOpenDescriptionField ] = useState(QuestionInfo.description ? true : false);
    const [ DescriptionText , SetDescriptionText ] = useState(null);
    const textRef = useRef(QuestionInfo.description)
    const regex = /(<([^>]+)>)/gi;
    const [ descriptionOpen , setDescriptionOpen ] = useState(false);
    const InputValue = useRef(QuestionInfo.description);
    // useEffect(() => {
    //   if(QuestionInfo.description)
    //     SetDescriptionText(QuestionInfo.description)
    // },[QuestionInfo])
    const DescriptionToggleHandler = () => {
      SetOpenDescriptionField(!openDescriptionField)
      setDescriptionOpen(!openDescriptionField)

      if(openDescriptionField)
      {
        // console.log('cleared')
       QuestionDataDispatcher(ChangeDescriptionHandler({ 
        QuestionID : QuestionInfo.id,
         NewDesc : null ,
         QuestionChanged : IsQuestion ,
         group : QuestionInfo.group
      }))
      //  console.log(QuestionInfo)
      }
      // else if(!openDescriptionField && DescriptionText)
      // {
      //   QuestionDataDispatcher(ChangeDescriptionHandler({ QuestionID : QuestionInfo.id, NewDesc : DescriptionText , QuestionChanged : IsQuestion}))
      // }
    }
    const DescriptionChangeHandler = (e) => {

      if(!e.target.value)
      {
        SetOpenDescriptionField(false)
        // QuestionDataDispatcher(ChangeDescriptionHandler({ QuestionID : QuestionInfo.id, NewDesc : null , QuestionChanged : IsQuestion}))
      } 
      else
      {
        // console.log('adfsdfsdg')
        InputValue.current = e.target.value;
        QuestionDataDispatcher(ChangeDescriptionHandler({
           QuestionID : QuestionInfo.id, 
           NewDesc : e.target.value , 
           QuestionChanged : IsQuestion , 
           group : QuestionInfo.group
          }))
      }
        
    }

  return (
    <QuestionDescriptionContainer>
        <div className='Description_checkbox_container' onClick={DescriptionToggleHandler}>
            <p>توضیحات</p>
            <Switch checked={openDescriptionField}/>
        </div>
        { openDescriptionField ? <div className='DescriptionInputContainer'>
            <DescriptionTextField autoFocus={descriptionOpen ? true : false}
            value={InputValue.current && InputValue.current != 'null' ? InputValue.current.replace(regex,"") : ''}
            //  value={QuestionInfo.description ? QuestionInfo.description.replace(regex,"") : ''} 
            onChange={DescriptionChangeHandler} />
      </div> : ''}
    </QuestionDescriptionContainer>
  )
}
export default QuestionDescription;