import React from 'react'
import { CommonSetting } from '../Common/CommonSetting'
import { InputNumber } from 'antd'
import { FileSizeTypeSelector , FileSizeContainer } from '@/styles/questionnairePanel/QuestionComponent'
import { useDispatch } from 'react-redux'
import { ChangeUploadSizeHandler, FileVolumeTypeHandler } from '@/utilities/QuestionStore'

export const FileQuestionSetting = ({ QuestionInfo }) => {
  const dispatcher = useDispatch();
  const ChangeFileSizeHandler = (e) => {
    //  ? 100 : 1024000
    if(QuestionInfo.volume_unit == 'mb' && e <= 100)
      dispatcher(ChangeUploadSizeHandler({ QuestionID : QuestionInfo.id , uploadSize : e }))
    else if(QuestionInfo.volume_unit == 'kb' && e >= 1024000)
      dispatcher(ChangeUploadSizeHandler({ QuestionID : QuestionInfo.id , uploadSize : e }))
  }

  return (
    <>
      <FileSizeContainer>
        <p>حجم فایل</p>
      <div className='file_size_selector'>
          <div className='file_size_input'>
              <InputNumber type='number' min={1} onChange={ChangeFileSizeHandler}
              
              value={QuestionInfo.max_volume}/>
          </div>
          <FileSizeTypeSelector>
            <input type='radio' name='sizeType' id='KBSize' defaultChecked={QuestionInfo.volume_unit == 'kb'} />
              <label htmlFor='KBSize' onClick={() =>  dispatcher(FileVolumeTypeHandler({ QuestionID : QuestionInfo.id , NewVolumeType : 'kb' }))}
               className='size_type_label'>
                KB
              </label>
              <input  type='radio' name='sizeType' id='MBSize'  defaultChecked={QuestionInfo.volume_unit == 'mb'}/>
              <label htmlFor='MBSize'  onClick={() =>  dispatcher(FileVolumeTypeHandler({ QuestionID : QuestionInfo.id , NewVolumeType : 'mb' }))}
               className='size_type_label'>
                MB
              </label>
           </FileSizeTypeSelector>
        </div>
      </FileSizeContainer>
        <CommonSetting QuestionInfo={QuestionInfo}/>
        
    </>
  )
}
