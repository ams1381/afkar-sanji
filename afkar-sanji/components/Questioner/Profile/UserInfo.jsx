import {
    UserInfoContainer, InfoBox
    , EditInfoBox, UserBoldInfoContainer, UserInfoBoxHeader
} from '@/styles/Questioner/profile'
import { Icon } from '@/styles/icons'
import {message, Skeleton, Upload} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import { InfoContainer } from './InfoBox';
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {UploadFileHandler} from "@/utilities/stores/QuestionStore";
import {beforeUpload, detectFileFormat} from "@/components/QuestionnairePanel/Question Components/Common/FileUpload";
import {axiosInstance} from "@/utilities/axios";


export const UserInfoBox = ({ MeQuery , RightDrawerOpen , regions }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [fileUploaded, setFileUploaded] = useState(MeQuery?.data?.data?.avatar ? true : null);
    const [ uploadError , setUploadError ] = useState(false);
    const [fileList, setFileList] = useState(MeQuery?.data?.data?.avatar ?
        [{
            name : 'عکس پروفایل',
            status: 'success',
            url: MeQuery?.data?.data?.avatar,
            thumbUrl :  MeQuery?.data?.data?.avatar
        }]
        : null);
    useEffect(() => {
        // console.log(MeQuery?.data?.data)
        if(MeQuery.data && MeQuery.data.data?.avatar)
        {
            setFileList([{
                name : 'عکس پروفایل',
                status: 'success',
                url:  MeQuery?.data?.data?.avatar,
                thumbUrl : MeQuery?.data?.data?.avatar
            }])
            setFileUploaded(true)
        }

    },[MeQuery?.data?.data])
    const FileUploadHandler = async (file, fileList , event) => {
        try
        {
        if(file?.file?.status === 'removed')
        {
            setFileUploaded(null)
            setFileList([])
            setUploadError(false)
            axiosInstance.defaults.headers['Content-Type'] = 'application/json';
            try
            {
                await axiosInstance.patch('/user-api/users/me/',{ avatar : null })
                MeQuery.refetch()
            }
            catch (err) {
                messageApi.error({
                    content : `در حذف کردن پروفایل مشکلی پیش آمد`,
                    style: {
                        fontFamily: 'IRANSans',
                        direction: 'rtl'
                    }
                })
            }
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
            status: 'uploading',
            url: URL.createObjectURL(file.file),
            thumbUrl : URL.createObjectURL(file.file)
        }]);
        setUploadError(false);
        setFileUploaded(true)

            let formData = new FormData();
            formData.append('avatar',file.file);
            axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';
            await axiosInstance.patch('/user-api/users/me/',formData)
            MeQuery.refetch();
        }
       catch (err)
       {
           if(err?.response?.status == 500)
               messageApi.error({
                   content : 'مشکل در آپلود پروفایل'
               })
           else if(err?.response?.status == 401)
           {
               setTimeout(() => {
                   MeQuery.refetch();
               },1000)
           }
       }
    }
  return (
      (MeQuery.error || MeQuery.isLoading) ?
          <UserInfoContainer>
              {contextHolder}
              <Skeleton.Input active />
              <div style={{ marginTop : 12 }}>
                  <UserInfoBoxHeader fileuploaded={(fileUploaded || uploadError) ? 'true' : null}
                                     uploaderror={uploadError ? 'occur' : null}>
                      <UserBoldInfoContainer>
                          <Skeleton.Input active style={{ minWidth : 'auto' , width : '100%' }} />
                          <Skeleton.Input active style={{ minWidth : 'auto' , width : '100%' }}/>
                      </UserBoldInfoContainer>
                      <Skeleton.Image active/>
                  </UserInfoBoxHeader>
                  <InfoBox loading>
                      <Skeleton.Input active />
                      <Skeleton.Input active style={{ minWidth : 'auto' , width : '50px' }} />
                  </InfoBox>
                  <InfoBox loading>
                      <Skeleton.Input active />
                      <Skeleton.Input active style={{ minWidth : 'auto' , width : '50px' }} />
                  </InfoBox>
                  <InfoBox loading>
                      <Skeleton.Input active />
                      <Skeleton.Input active style={{ minWidth : 'auto' , width : '50px' }} />
                  </InfoBox>
                  <InfoBox loading>
                      <Skeleton.Input active />
                      <Skeleton.Input active style={{ minWidth : 'auto' , width : '50px' }} />
                  </InfoBox>
                  <InfoBox loading>
                      <Skeleton.Input active />
                      <Skeleton.Input active style={{ minWidth : 'auto' , width : '50px' }} />
                  </InfoBox>
              </div>
          </UserInfoContainer>
          :
    <UserInfoContainer>
        {contextHolder}
        <h3>اطلاعات کاربری</h3>
        <div style={{ marginTop : 12 }}>
            <UserInfoBoxHeader fileuploaded={(fileUploaded || uploadError) ? 'true' : null}
                uploaderror={uploadError ? 'occur' : null}>
                <UserBoldInfoContainer>
                    <InfoContainer MeQuery={MeQuery}  bold BoxName='نام' UserData={MeQuery?.data?.data}
                     BoxDataName='first_name' />
                     <InfoContainer MeQuery={MeQuery}  bold BoxName='نام خانوادگی'
                      BoxDataName='last_name' UserData={MeQuery?.data?.data} />
                    </UserBoldInfoContainer>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    fileList={fileList}
                    maxCount={1}
                    locale={{
                        uploadError : 'خطا در بارگذاری',
                        uploading : 'در حال بارگذاری'
                    }}
                    accept={'image/*'}
                    onRemove={() => setFileList([])}
                    beforeUpload={beforeUpload}
                    onChange={FileUploadHandler}>
                    آپلود پروفایل
                </Upload>
            </UserInfoBoxHeader>
            <InfoContainer BoxName='شماره تلفن' MeQuery={MeQuery} UserData={MeQuery?.data?.data}
                     BoxDataName='phone_number' />
            <InfoContainer BoxName='ایمیل' MeQuery={MeQuery} UserData={MeQuery?.data?.data}
                     BoxDataName='email' />
            <InfoContainer BoxName='جنسیت' MeQuery={MeQuery} UserData={MeQuery?.data?.data}
                     BoxDataName='gender' />
            <InfoContainer BoxName='آدرس محل سکونت' MeQuery={MeQuery} UserData={MeQuery?.data?.data}
                     BoxDataName='address' />
            <InfoContainer BoxName='ملیت' MeQuery={MeQuery} UserData={MeQuery?.data?.data} regions={regions}
                            BoxDataName='nationality'/>
            <InfoContainer RightDrawerOpen={RightDrawerOpen}
                           BoxName='استان محل سکونت'
                           MeQuery={MeQuery}
                           UserData={MeQuery?.data?.data}
                           regions={regions}
                            BoxDataName='province'/>
        </div>
    </UserInfoContainer>
  )
}
