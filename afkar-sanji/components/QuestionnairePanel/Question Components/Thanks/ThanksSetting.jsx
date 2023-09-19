import { ToggleContainer } from '@/styles/questionnairePanel/QuestionSetting';
import { ChangeToggleHandler } from '@/utilities/QuestionStore';
import { Switch } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'

export const ThanksSetting = ({ QuestionInfo }) => {
  const dispatcher = useDispatch();
  const RegularToggleHandler = (Event , TName) => {

    dispatcher(ChangeToggleHandler({ 
      QuestionID : QuestionInfo.id , 
      ToggleName : TName ,
      notQuestion : true,
      ToggleValue : Event
    }))
} 
  
  return (
    <ToggleContainer>
      <div className='checkbox_container'  onClick={e => RegularToggleHandler(!QuestionInfo.share_link,'share_link')}>
            <p>اشتراک گذاری لینک</p>
            <Switch checked={QuestionInfo.share_link}/>
      </div>
</ToggleContainer>
  )
}
