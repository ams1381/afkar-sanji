import { Icon } from '@/styles/icons'
import { QuestionFileUploadContainer } from '@/styles/questionnairePanel/QuestionSetting'
import { UploadFileHandler } from '@/utilities/QuestionStore'
import { Button, Upload } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const FileUpload = ({ QuestionInfo }) => {
  const dispatcher = useDispatch();
  const [ FileUploadedState , SetFileUploadedState ] = useState(QuestionInfo.media ? true : false);
  const [fileList, setFileList] = useState(QuestionInfo.media ? [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: QuestionInfo.media,
    },
  ] : null);
  const FileUploadHandler = ({ fileList }) => {
    dispatcher(UploadFileHandler({ QuestionID : QuestionInfo.id , FileObject : fileList[0] }))
    setFileList(fileList[0]);
  }
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <QuestionFileUploadContainer>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture/video"
          previewFile={QuestionInfo.media ? QuestionInfo.media : ''}
          defaultFileList={fileList}
          className="upload-list-inline"
          // onPreview={onPreview}
          beforeUpload={() => false}
          onChange={e => FileUploadHandler(e)}
        >
          <Button  icon={<Icon name='upload' style={{ width : 12 }} />}>آپلود کنید</Button>
        </Upload>
        <p> آپلود عکس یا فیلم </p>
          </QuestionFileUploadContainer>
  )
}
export default FileUpload;