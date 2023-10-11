import { Icon } from '@/styles/icons'
import { QuestionFileUploadContainer } from '@/styles/questionnairePanel/QuestionSetting'
import { RemoveFileHandler, UploadFileHandler } from '@/utilities/stores/QuestionStore'
import { digitsEnToFa } from '@persian-tools/persian-tools'
import { Button, Upload , message} from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const FileUpload = ({ QuestionInfo }) => {
  const dispatcher = useDispatch();
  const [ FileUploadedState , SetFileUploadedState ] = useState(QuestionInfo.media ? true : false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [ uploadError , setUploadError ] = useState(false);
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
    if(file.file.percent == 0)
    {
      setFileUploaded(null)
      setUploadError(false);
      return
    }

    if(detectFileFormat(file.file?.name) == 'UNKNOWN' || detectFileFormat(file.file?.name) == 'Zip' ||
    detectFileFormat(file.file?.name) == 'Audio')
    {
      messageApi.error({
        content : `لطفا عکس یا فیلم آپلود کنید`,
        style: {
          fontFamily: 'IRANSans',
          direction: 'rtl'
        }
      })
      setFileList([{
        name : file.file.name,
        status: 'error',
        url: URL.createObjectURL(file.file),
        thumbUrl : URL.createObjectURL(file.file)
      }]);
      setFileUploaded(null)
      setUploadError(true);
      return
    }
    if(file.file.size / 1024000 > 30)
    {
      messageApi.error({
        content : `فایل آپلودی بیشتر از ${digitsEnToFa(30)} مگابایت است`,
        style: {
          fontFamily: 'IRANSans',
          direction: 'rtl'
        }
      })
      setFileList([{
        name : file.file.name,
        status: 'error',
        url: URL.createObjectURL(file.file),
        thumbUrl : URL.createObjectURL(file.file)
      }]);
      setFileUploaded(null)
      setUploadError(true);
      return
    }
    file.fileList.length ? setFileUploaded(true) : setFileUploaded(null);
    dispatcher(UploadFileHandler(
      {
         QuestionID : QuestionInfo.id , 
         FileObject : file.file ,
         IsQuestion : (QuestionInfo.question_type != 'welcome_page' && QuestionInfo.question_type != 'thanks_page') ,
         group : QuestionInfo.group
         }
      ))
      setUploadError(false);
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
    <QuestionFileUploadContainer uploaderror={uploadError ? 'occur' : null}
    fileuploaded={(fileUploaded || QuestionInfo.media) ? 'true' : null}>
      {contextHolder}
      <p className='file_upload_title'> آپلود عکس یا فیلم </p>
      <div>
       <Upload
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
               IsQuestion :(QuestionInfo.question_type != 'welcome_page' && QuestionInfo.question_type != 'thanks_page'),
               group : QuestionInfo.group 
              }
            ))
          }}
        >
          <Button  icon={<Icon name='Upload' style={{ width : 12 }} />}>آپلود کنید</Button>
        </Upload>
      </div>
        
        
          </QuestionFileUploadContainer>
  )
}
export const beforeUpload = (file) => {
  return new Promise((resolve, reject) => {
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

export const detectFileFormat = (fileName) => {
  if(!fileName)
   return
   fileName = fileName.toLowerCase();
  let pictureFormats = ['jpg', 'jpeg', 'png', 'gif'];
  let videoFormats = ['mp4', 'avi', 'mkv', 'mov', 'flv', 'wmv'];
  let zip_formats  = ['zip','rar','7z'];
  let audio_formats = ['mp3','wav','ogg','mpeg-1']
  let fileFormat = fileName.split(".")[fileName.split(".").length - 1];

  return pictureFormats.includes(fileFormat) ? 'Picture' :
         videoFormats.includes(fileFormat) ? 'Video' : zip_formats.includes(fileFormat) ?
          'Zip' : audio_formats.includes(fileFormat) ? 'Audio' : 'UNKNOWN';
}