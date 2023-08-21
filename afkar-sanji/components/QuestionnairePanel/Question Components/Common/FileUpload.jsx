import { Icon } from '@/styles/icons'
import { QuestionFileUploadContainer } from '@/styles/questionnairePanel/QuestionSetting'
import { Button, Upload } from 'antd'
import React from 'react'

const FileUpload = ({ QuestionInfo }) => {
  return (
    <QuestionFileUploadContainer>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
          previewFile={QuestionInfo.media ? QuestionInfo.media : ''}
          className="upload-list-inline"
        >
          <Button  icon={<Icon name='upload' style={{ width : 12 }} />}>آپلود کنید</Button>
        </Upload>
        <p> آپلود عکس یا فیلم </p>
          </QuestionFileUploadContainer>
  )
}
export default FileUpload;