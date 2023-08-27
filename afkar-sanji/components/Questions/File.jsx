import { Icon } from '@/styles/icons'
import { FileQuestionContainer } from '@/styles/questionnairePanel/QuestionComponent'
import { Button, Upload } from 'antd'
import React from 'react'

export const FileQuestionComponent = ({ QuestionInfo }) => {
  return (
    <FileQuestionContainer>
        <Upload
          listType="picture"
          multiple={false}
          maxCount={1}
          className="upload-list-inline"
          style={{ fontFamily : 'IRANSans' }}>
            <Button  icon={<Icon name='upload' style={{ width : 12 }} />}>کلیک برای آپلود</Button>
        </Upload>
    </FileQuestionContainer>
  )
}
