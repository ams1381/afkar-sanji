import { UserInfoContainer , InfoBox 
    , EditInfoBox , UserBoldInfoContainer } from '@/styles/Questioner/profile'
import { Icon } from '@/styles/icons'
import { Upload } from 'antd'
import React from 'react'
import { InfoContainer } from './InfoBox';

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
export const UserInfoBox = ({ userData }) => {
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
          });
        }
      };
  return (
    <UserInfoContainer>
        <h3>اطلاعات کاربری</h3>
        <div style={{ marginTop : 12 }}>
            <div className='info_box_header'>
                <UserBoldInfoContainer>
                    <InfoContainer bold BoxName='نام' UserData={userData}
                     BoxDataName='first_name' />
                     <InfoContainer bold BoxName='نام خانوادگی'
                      BoxDataName='last_name' UserData={userData} />
                    </UserBoldInfoContainer>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}>
                    آپلود پروفایل
                    
                </Upload>    
            </div>
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
            {/* <InfoBox>
                 <p>استان محل سکونت </p>
                <EditInfoBox>
                    <input />
                    <Icon name='ProfilePen' />
                </EditInfoBox>
            </InfoBox> */}
        </div>
    </UserInfoContainer>
  )
}
