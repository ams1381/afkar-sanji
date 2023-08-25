import React from 'react'
import { CommonSetting } from '../Common/CommonSetting'
import { InputNumber } from 'antd'
import { FileSizeTypeSelector , FileSizeContainer } from '@/styles/questionnairePanel/QuestionComponent'

export const FileQuestionSetting = ({ QuestionInfo }) => {
  return (
    <>
      <FileSizeContainer>
        <p>حجم فایل</p>
      <div className='file_size_selector'>
          <div className='file_size_input'>
              <InputNumber min={0} />
          </div>
          <FileSizeTypeSelector>
            <input type='radio' name='sizeType' id='KBSize' />
              <label htmlFor='KBSize' className='size_type_label'>
                KB
              </label>

              <input  type='radio' name='sizeType' id='MBSize'/>
              <label htmlFor='MBSize' className='size_type_label'>
                MB
              </label>
           </FileSizeTypeSelector>
        </div>
      </FileSizeContainer>
        
        <CommonSetting QuestionInfo={QuestionInfo}/>
        
    </>
  )
}
