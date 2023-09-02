import React, { useContext } from 'react'
import { LogoutPopOverLayout , LogoutPopOverInfo , UserAvatarLogout} from '@/styles/common'
import { AuthContext } from '@/utilities/AuthContext';
import { Button, ConfigProvider } from 'antd';
import { themeContext } from '@/utilities/ThemeContext';
import { useRouter } from 'next/router';
import { axiosInstance } from '@/utilities/axios';
import PN from 'persian-number';
import { digitsEnToFa } from '@persian-tools/persian-tools';

const AvatarComponent = () => {
    const Auth = useContext(AuthContext);
    const router = useRouter();
    const LogoutHandler = () => {
        router.push('/auth')
    }
  return (
    <LogoutPopOverLayout>
    <LogoutPopOverInfo>
        <i>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2ZM5.00873 11C3.90315 11 3 11.8869 3 13C3 14.6912 3.83281 15.9663 5.13499 16.7966C6.41697 17.614 8.14526 18 10 18C11.8547 18 13.583 17.614 14.865 16.7966C16.1672 15.9663 17 14.6912 17 13C17 11.8956 16.1045 11 15 11L5.00873 11Z" fill="#525252"/>
            </svg>
        </i>
        <p>{digitsEnToFa(Auth.PhoneNumber)}</p>
    </LogoutPopOverInfo>
    <ConfigProvider theme={themeContext}>
        <Button type='primary' style={{ fontFamily : 'IRANSans' , fontSize : 13 }}
         onClick={() => LogoutHandler()}> خروج از حساب </Button>
    </ConfigProvider>
    </LogoutPopOverLayout>
  )
}
export default AvatarComponent;
