import React from 'react'
import { CommonSetting } from '../Common/CommonSetting'
import { InputNumber } from 'antd'
import { FileSizeTypeSelector , FileSizeContainer } from '@/styles/questionnairePanel/QuestionComponent'
import { useDispatch } from 'react-redux'
import { ChangeUploadSizeHandler, FileVolumeTypeHandler } from '@/utilities/stores/QuestionStore'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export const FileQuestionSetting = ({ QuestionInfo }) => {
  const OcurredError = useSelector(state => state.reducer.Error);
  const [ inputError , setInputError ] = useState(null);
  const [ MaxValue , setMaxValue ] = useState(QuestionInfo.max_volume)
  const dispatcher = useDispatch();
  const ChangeFileSizeHandler = (e) => {
    //  ? 100 : 1024000

      setMaxValue(e)
      dispatcher(ChangeUploadSizeHandler({ 
          QuestionID : QuestionInfo.id , 
          uploadSize : e , 
          group : QuestionInfo.group
        }))
      
  }
  useEffect(() => {
    if(OcurredError)
    {
        if(OcurredError?.find(item => item.qid == QuestionInfo?.id && item.err_object.max_volume))
        {
            setInputError('active');
            // document.querySelector(`.QuestionItem${QuestionInfo?.id}`).setAttribute('style','max-height : initial');
        }
        else
            setInputError(null)
    }
    else
        setInputError(null)
},[OcurredError])

  return (
    <>
      <FileSizeContainer>
        <p>حجم فایل</p>
      <div className='file_size_selector'>
          <div className='file_size_input'>
              <InputNumber type='number' min={1} onChange={ChangeFileSizeHandler}
              status={inputError ? 'error' : null}
              max={QuestionInfo.volume_unit == 'mb' ? 100 : 1024000}
              value={MaxValue}/>
          </div>
          <FileSizeTypeSelector>
            <input type='radio' name='sizeType' id='KBSize' defaultChecked={QuestionInfo.volume_unit == 'kb'} />
              <label htmlFor='KBSize' onClick={() =>  dispatcher(FileVolumeTypeHandler({
                 QuestionID : QuestionInfo.id ,
                  NewVolumeType : 'kb' ,
                  group : QuestionInfo.group
                }))}
               className='size_type_label'>
                KB
              </label>
              <input  type='radio' name='sizeType' id='MBSize'  defaultChecked={QuestionInfo.volume_unit == 'mb'}/>
              <label htmlFor='MBSize'  onClick={() =>  dispatcher(FileVolumeTypeHandler({ 
                QuestionID : QuestionInfo.id , 
                NewVolumeType : 'mb' ,
                group : QuestionInfo.group
              }))}
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
