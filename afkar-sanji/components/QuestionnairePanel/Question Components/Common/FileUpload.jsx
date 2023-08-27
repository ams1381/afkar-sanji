import { Icon } from '@/styles/icons'
import { QuestionFileUploadContainer } from '@/styles/questionnairePanel/QuestionSetting'
import { RemoveFileHandler, UploadFileHandler } from '@/utilities/QuestionStore'
import { Button, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const FileUpload = ({ QuestionInfo }) => {
  const dispatcher = useDispatch();
  const [ FileUploadedState , SetFileUploadedState ] = useState(QuestionInfo.media ? true : false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileUploaded, setFileUploaded] = useState(null);
  const [fileList, setFileList] = useState(QuestionInfo.media && (typeof (QuestionInfo.media) == 'string') ? [
    {
      name: QuestionInfo.media.split('/')[8],
      status: 'done',
      url: QuestionInfo.media,
      thumbUrl : QuestionInfo.media
    },
  ] : (!QuestionInfo.media) ? null : [
    {
      name: QuestionInfo.media.name,
      status: 'done',
      url: URL.createObjectURL(QuestionInfo.media),
      thumbUrl : URL.createObjectURL(QuestionInfo.media)
      // url: URL.createObjectURL(QuestionInfo.media),
    },
  ]);

  const FileUploadHandler = (file, fileList , event) => {
    file.fileList.length ? setFileUploaded(true) : setFileUploaded(null);
    dispatcher(UploadFileHandler(
      { QuestionID : QuestionInfo.id , FileObject : file.file ,
         IsQuestion : (QuestionInfo.question_type != 'welcome_page' && QuestionInfo.question_type != 'thanks_page') }
      ))
  }
  const handlePreview = async (file) => {
    if (file.url) {
      setPreviewImage(file.url);
    } else {
      setPreviewImage(await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      }));
    }
    setPreviewVisible(true);
  };
  // ant-upload ant-upload-select
  return (
    <QuestionFileUploadContainer fileuploaded={fileUploaded}>
      <p className='file_upload_title'> آپلود عکس یا فیلم </p>
      <div>
       <Upload
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          // previewFile={QuestionInfo.media ? QuestionInfo.media : ''}
          defaultFileList={fileList}
          className="upload-list-inline"
          listType="picture"
          multiple={false}
          method={null}
          maxCount={1}
          onPreview={handlePreview}
          beforeUpload={beforeUpload}
          onChange={e => FileUploadHandler(e)}
          onRemove={() => {
            dispatcher(RemoveFileHandler(
            { QuestionID : QuestionInfo.id ,
               IsQuestion :(QuestionInfo.question_type != 'welcome_page' && QuestionInfo.question_type != 'thanks_page') }
            ))
           
          }}
        >
          <Button  icon={<Icon name='upload' style={{ width : 12 }} />}>آپلود کنید</Button>
        </Upload>
      </div>
        
        
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