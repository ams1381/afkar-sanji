import { Icon } from '@/styles/icons'
import { QuestionFileUploadContainer } from '@/styles/questionnairePanel/QuestionSetting'
import { RemoveFileHandler, UploadFileHandler } from '@/utilities/QuestionStore'
import { Button, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const FileUpload = ({ QuestionInfo }) => {
  const dispatcher = useDispatch();
  const [ FileUploadedState , SetFileUploadedState ] = useState(QuestionInfo.media ? true : false);
  // useEffect(() => {

  // },[])
  const [fileList, setFileList] = useState(QuestionInfo.media && (typeof (QuestionInfo.media) == 'string') ? [
    {
      uid: '-1',
      name: QuestionInfo.media.split('https://mostafarm7.pythonanywhere.com/media/question_media/')[1].split('/')[3],
      status: 'done',
      url: QuestionInfo.media,
    },
  ] : (!QuestionInfo.media) ? null : [
    {
      uid: '-1',
      name: QuestionInfo.media.name,
      status: 'done',
      // url: URL.createObjectURL(QuestionInfo.media),
    },
  ]);
  const FileUploadHandler = (file, fileList , event) => {

    dispatcher(UploadFileHandler(
      { QuestionID : QuestionInfo.id , FileObject : file.file ,
         IsQuestion : (QuestionInfo.question_type != 'welcome_page' && QuestionInfo.question_type != 'thanks_page') }
      ))
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
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          // previewFile={QuestionInfo.media ? QuestionInfo.media : ''}
          defaultFileList={fileList}
          className="upload-list-inline"
          
          multiple={false}
          method={null}
          maxCount={1}
          onPreview={onPreview}
          beforeUpload={beforeUpload}
          onChange={e => FileUploadHandler(e)}
          onRemove={() => dispatcher(RemoveFileHandler(
            { QuestionID : QuestionInfo.id ,
               IsQuestion :(QuestionInfo.question_type != 'welcome_page' && QuestionInfo.question_type != 'thanks_page') }
            ))}
        >
          <Button  icon={<Icon name='upload' style={{ width : 12 }} />}>آپلود کنید</Button>
        </Upload>
        <p> آپلود عکس یا فیلم </p>
          </QuestionFileUploadContainer>
  )
}
const beforeUpload = (file) => {
  return new Promise((resolve, reject) => {
    console.log(ImageOrVideo)
    const ImageOrVideo = file.type === 'image/jpeg' || file.type === 'video/mkv' || file.type === 'video/mp4'
    file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif';
    if (!ImageOrVideo) 
      reject(false);
    
    const isLt5M = file.size / 1024 / 1024 <= 5;
    if (!isLt5M)
      reject(false);
    
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {

      var image = new Image();

      image.src = e.target.result;

      image.onload = function () {
        const height = this.height;
        const width = this.width;

        if((width/height >= 1))
          resolve(true);
        
        else 
          reject(false);
      };
    };
  });
};
export default FileUpload;