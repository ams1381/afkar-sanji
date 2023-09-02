import { Icon } from '@/styles/icons'
import { FileQuestionContainer } from '@/styles/questionnairePanel/QuestionComponent'
import { FileRemoveHandler, FileUploadHandler } from '@/utilities/AnswerStore'
import { digitsEnToFa } from '@persian-tools/persian-tools'
import { Button, Upload, message, Modal } from 'antd'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const convertFileObjectToFile = (fileObject, newFileName) =>
  new File([fileObject], newFileName, { type: fileObject.type });

export const FileQuestionComponent = ({ QuestionInfo }) => {
  const dispatcher = useDispatch();
  const QuestionsAnswerSet = useSelector(state => state.reducer.AnswerSet)
  const [FileAnswer, setFileAnswer] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [ uploadError , setUploadError ] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const FileAnswerHandler = (info) => {
    if(info.file.percent == 0 || info.file.status == 'removed')
    {
      setFileAnswer(null)
      setUploadError(false);
      return
    }
    if(QuestionInfo.volume_unit == 'mb' && (info.file.size / 1024000 > QuestionInfo.max_volume)
    || QuestionInfo.volume_unit == 'kb' && (info.file.size / 1024 > QuestionInfo.max_volume))
    {
      messageApi.error({
        content :
         `فایل آپلود شده بیشتر از ${digitsEnToFa(QuestionInfo.max_volume)} ${QuestionInfo.volume_unit == 'mb' ? 'مگابایت' : 'کیلوبایت'} است`,
         style: {
          fontFamily: 'IRANSans',
          direction: 'rtl'
        }
      })
      setFileAnswer([{
        name : info.file.name,
        status: 'error',
        url: URL.createObjectURL(info.file),
        thumbUrl : URL.createObjectURL(info.file)
      }]);
      return;
    }
    // console.log(URL.createObjectURL(convertFileObjectToFile(info.file,info.file.name)))
    const newFile = {
      uid: info.file.uid,
      name: info.file.name,
      status: info.file.status,
      url: URL.createObjectURL(convertFileObjectToFile(info.file,info.file.name)),
      thumbUrl : URL.createObjectURL(convertFileObjectToFile(info.file,info.file.name))
    };

    if (QuestionsAnswerSet && QuestionsAnswerSet.length) {
      dispatcher(FileUploadHandler({ QuestionID: QuestionInfo.id, file: info.file}));
    }

    setFileAnswer([newFile]);
  }

  useEffect(() => {
    if (QuestionsAnswerSet && QuestionsAnswerSet.length) {
      const Uploaded_file = QuestionsAnswerSet.find(item => item.question === QuestionInfo.id)?.file;
      console.log(Uploaded_file)
      if (Uploaded_file) {
        const initialFile = {
          uid: 'uploaded-file',
          name: Uploaded_file.name,
          status: 'done',
          url: URL.createObjectURL(Uploaded_file),
          thumbUrl : URL.createObjectURL(Uploaded_file)
        };
        setFileAnswer([initialFile]);
      }
    }
  }, [])


  const handleCancel = () => {
    setPreviewVisible(false);
  };

  return (
    <FileQuestionContainer uploaderror={uploadError ? 'occur' : null}>
      {contextHolder}
      <Upload
        listType="picture"
        multiple={false}
        method={null}
        fileList={FileAnswer}
        showUploadList={{
          showTooltip: false, // Hide the tooltip
        }}
        onChange={e => FileAnswerHandler(e)}
        maxCount={1}
        tipFormatter={(e) => <span style={{ width : '100%'}}>خطا در آپلود</span>}
        // onPreview={handlePreview}
        beforeUpload={beforeUpload}
        onRemove={() => {
            console.log('check')
            dispatcher(FileRemoveHandler(
            { QuestionID : QuestionInfo.id }
          ))
        }}
        className="upload-list-inline"
        style={{ fontFamily: 'IRANSans' }}
      >
        <Button icon={<Icon name='upload' style={{ width: 12 }} />}>کلیک برای آپلود</Button>
      </Upload>
      {/* <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal> */}
    </FileQuestionContainer>
  );
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