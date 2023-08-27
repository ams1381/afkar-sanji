import { Icon } from '@/styles/icons'
import { FileQuestionContainer } from '@/styles/questionnairePanel/QuestionComponent'
import { Button, Upload } from 'antd'
import React from 'react'

export const FileQuestionComponent = ({ QuestionInfo }) => {
  return (
    <FileQuestionContainer>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
          previewFile={QuestionInfo.media ? QuestionInfo.media : ''}
          className="upload-list-inline"
          style={{ fontFamily : 'IRANSans' }}>
            <Button  icon={<Icon name='upload' style={{ width : 12 }} />}>کلیک برای آپلود</Button>
        </Upload>
    </FileQuestionContainer>
  )
}
