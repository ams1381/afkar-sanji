import {
    UserInfoContainer, InfoBox
    , EditInfoBox, UserBoldInfoContainer, UserInfoBoxHeader
} from '@/styles/Questioner/profile'
import { Icon } from '@/styles/icons'
import {message, Upload} from 'antd'
import React, {useState} from 'react'
import { InfoContainer } from './InfoBox';
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {UploadFileHandler} from "@/utilities/QuestionStore";
import {beforeUpload, detectFileFormat} from "@/components/QuestionnairePanel/Question Components/Common/FileUpload";
import {axiosInstance} from "@/utilities/axios";


export const UserInfoBox = ({ userData }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [fileUploaded, setFileUploaded] = useState(userData?.avatar ? true : null);
    const [ uploadError , setUploadError ] = useState(false);
    const [fileList, setFileList] = useState(userData.avatar ?
        [{
            name : 'عکس پروفایل',
            status: 'success',
            url: 'https://mah-api.ariomotion.com' + userData.avatar,
            thumbUrl : 'https://mah-api.ariomotion.com' + userData.avatar
        }]
        : null);
    const FileUploadHandler = async (file, fileList , event) => {

        // if(file.file.percent == 0) {
        //     setFileUploaded(null)
        //     setUploadError(false);
        //     return
        // }
        try
        {
        if(!file.fileList?.length)
        {
            setFileUploaded(null)
            setUploadError(false)
            await axiosInstance.patch('/user-api/users/me/',{ avatar : null })
            return
        }
        if(detectFileFormat(file.file?.name) != 'Picture')
        {

            messageApi.error({
                content : `لطفا فقط عکس آپلود کنید`,
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
            setFileUploaded(null)
            setUploadError(true);
            setFileList([]);
            return
        }

        setFileList([{
            name : file.file.name,
            status: 'error',
            url: URL.createObjectURL(file.file),
            thumbUrl : URL.createObjectURL(file.file)
        }]);
        setUploadError(false);
        setFileUploaded(true)

            let formData = new FormData();
            formData.append('avatar',file.file);
            axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';
            await axiosInstance.patch('/user-api/users/me/',formData)
        }
       catch (err)
       {
           messageApi.error({
               content : 'مشکل در آپلود پروفایل'
           })
       }

    }

  return (
    <UserInfoContainer>
        {contextHolder}
        <h3>اطلاعات کاربری</h3>
        <div style={{ marginTop : 12 }}>
            <UserInfoBoxHeader fileuploaded={(fileUploaded || uploadError) ? 'true' : null}
                uploaderror={uploadError ? 'occur' : null}>
                <UserBoldInfoContainer>
                    <InfoContainer bold BoxName='نام' UserData={userData}
                     BoxDataName='first_name' />
                     <InfoContainer bold BoxName='نام خانوادگی'
                      BoxDataName='last_name' UserData={userData} />
                    </UserBoldInfoContainer>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    // listType="picture"
                    className="avatar-uploader"
                    defaultFileList={fileList}
                    maxCount={1}

                    onRemove={() => setFileList([])}
                    // showUploadList={false}
                    // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    beforeUpload={beforeUpload}
                    onChange={FileUploadHandler}>
                    آپلود پروفایل
                    
                </Upload>
            </UserInfoBoxHeader>
            <InfoContainer BoxName='شماره تلفن' UserData={userData}
                     BoxDataName='phone_number' />
            <InfoContainer BoxName='ایمیل' UserData={userData}
                     BoxDataName='email' />
            <InfoContainer BoxName='جنسیت' UserData={userData}
                     BoxDataName='gender' />
            <InfoContainer BoxName='آدرس محل سکونت' UserData={userData}
                     BoxDataName='address' />
            <InfoContainer BoxName='ملیت' UserData={userData}
                     BoxDataName='nationality' />
            <InfoContainer BoxName='استان محل سکونت' UserData={userData}
                     BoxDataName='province' />
        </div>
    </UserInfoContainer>
  )
}
