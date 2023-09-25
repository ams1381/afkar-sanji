import { ToggleContainer } from '@/styles/questionnairePanel/QuestionSetting'
import { ChangeToggleHandler } from '@/utilities/QuestionStore';
import { Switch } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux';

export const CommonSetting = ({ QuestionInfo }) => {
    const Dispatcher = useDispatch();

    const RegularToggleHandler = (Event , TName) => {
        Dispatcher(ChangeToggleHandler({
             QuestionID : QuestionInfo.id , 
             ToggleName : TName ,
             ToggleValue : Event ,
             group : QuestionInfo.group
            }))
    }
  return (
    <>
    <ToggleContainer>
        <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.show_number,'show_number')}>
            <p>عدم نمایش شماره سوال</p>
            <Switch checked={QuestionInfo.show_number}/>
        </div>
    </ToggleContainer>
    <ToggleContainer>
        <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.is_required,'is_required')}>
            <p>پاسخ به سوال اجباری باشد</p>
            <Switch checked={QuestionInfo.is_required}/>
        </div>
    </ToggleContainer>
    </>
    
    
  )
}
