import {Button, message, Upload} from "antd";
import {FileRemoveHandler, FileUploadHandler} from "@/utilities/stores/AnswerStore";
import {Icon} from "@/styles/icons";
import {FileQuestionContainer} from "@/styles/questionnairePanel/QuestionComponent";
import React, {useEffect, useState} from "react";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {beforeUpload} from "@/components/Questions/File";
import {useDispatch} from "react-redux";
import {convertFileObjectToFile} from "@/components/Questions/File";
export const FileSubComponent = ({ QuestionData , answerSet , ErrorQuestions , setErrorQuestions , loadableAnswer  }) => {
    const [FileAnswer, setFileAnswer] = useState([]);
    const dispatcher = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const [ uploadError , setUploadError ] = useState(false);
    const [ fileUploadedState , setFileUploadedState ] = useState(false);
    const FileAnswerHandler = (info) => {

        if(info.file.percent == 0 || info.file.status == 'removed')
        {
            setFileAnswer(null)
            setUploadError(false);
            setFileUploadedState(false);
            return
        }
        if(QuestionData.volume_unit == 'mb' && (info.file.size / 1024000 > QuestionData.max_volume)
            || QuestionData.volume_unit == 'kb' && (info.file.size / 1024 > QuestionData.max_volume))
        {
            setFileUploadedState(false)
            messageApi.error({
                content :
                    `فایل آپلود شده بیشتر از ${digitsEnToFa(QuestionData.max_volume)} ${QuestionData.volume_unit == 'mb' ? 'مگابایت' : 'کیلوبایت'} است`,
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

        if (answerSet && answerSet.length) {
            let ErrorQuestionArray = [...ErrorQuestions]
            setErrorQuestions(ErrorQuestionArray.filter(item => item != QuestionData.id))
            dispatcher(FileUploadHandler({ QuestionID: QuestionData.id, file: info.file}));
        }

        setFileUploadedState(true)
        setFileAnswer([newFile]);
    }
    useEffect(() => {
        if(!answerSet.find(item => item.question === QuestionData.id).file && !loadableAnswer) {
            setFileAnswer([])
            setFileUploadedState(false)
        }
        if(answerSet.find(item => item.question === QuestionData.id) &&
            answerSet.find(item => item.question === QuestionData.id).file && loadableAnswer)
        {
            setFileAnswer([{
                name : 'فایل آپلود شده',
                status: 'success',
                url: answerSet.find(item => item.question === QuestionData.id).file,
                thumbUrl : answerSet.find(item => item.question === QuestionData.id).file
            }]);
            setFileUploadedState(true)
        }
    },[ QuestionData , answerSet])
    return <FileQuestionContainer uploaderror={uploadError ? 'occur' : null} fileUploaded={fileUploadedState  ? 'active' : null}>
        {contextHolder}
        <Upload
            listType="picture"
            multiple={false}
            method={null}
            response={false}
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
                let ErrorQuestionArray = [...ErrorQuestions]
                setErrorQuestions(ErrorQuestionArray.filter(item => item != QuestionData.id))
                    dispatcher(FileRemoveHandler(
                        { QuestionID : QuestionData.id }
                    ))
            }}
            className="upload-list-inline"
            style={{ fontFamily: 'IRANSans' }}
        >
            <Button icon={<Icon name='Upload' style={{ width: 12 }} />}>کلیک برای آپلود</Button>
        </Upload>
    </FileQuestionContainer>
}