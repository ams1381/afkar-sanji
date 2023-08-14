import React, { useContext, useState } from 'react'
import { HeaderComponent, UserAvatarLogout , 
    SideBarToggleButton , LogoutPopOverInfo, LogoutPopOverLayout} from '@/styles/common';
import { Button, ConfigProvider, Popover } from 'antd';
import { AuthContext } from '@/utilities/AuthContext';
import { themeContext } from '@/utilities/ThemeContext';
import { useLocalStorage } from '@/utilities/useLocalStorage';
import { Icon } from '@/styles/folders/icons';

export const Header = ({SetSideBar}) => {
    const [ logoutPopOver , switchPopover ] = useState(false);
    const { getItem , setItem} = useLocalStorage();
    const Auth = useContext(AuthContext);
    Auth.changePhone(getItem('phoneNumber'))
    const AvatarComponent = <LogoutPopOverLayout>
    <LogoutPopOverInfo>
        <i>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2ZM5.00873 11C3.90315 11 3 11.8869 3 13C3 14.6912 3.83281 15.9663 5.13499 16.7966C6.41697 17.614 8.14526 18 10 18C11.8547 18 13.583 17.614 14.865 16.7966C16.1672 15.9663 17 14.6912 17 13C17 11.8956 16.1045 11 15 11L5.00873 11Z" fill="#525252"/>
            </svg>
        </i>
        <p>
            { Auth.PhoneNumber }
        </p>
    </LogoutPopOverInfo>
    <ConfigProvider theme={themeContext}>
        <Button type='primary'> خروج از حساب </Button>
    </ConfigProvider>
    </LogoutPopOverLayout>
  return (
    <HeaderComponent>
        <ConfigProvider theme={themeContext}>
            <Popover
            content={AvatarComponent}
            trigger="click"
            open={logoutPopOver}
            onOpenChange={() => switchPopover(false)}
            style={{width : 190}}
            >
                <UserAvatarLogout onClick={() => switchPopover(!logoutPopOver)}>
                    <Icon name='User' />
                    {/* <i><svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0.5C4.79086 0.5 3 2.29086 3 4.5C3 6.70914 4.79086 8.5 7 8.5C9.20914 8.5 11 6.70914 11 4.5C11 2.29086 9.20914 0.5 7 0.5ZM2.00873 9.5C0.903151 9.5 0 10.3869 0 11.5C0 13.1912 0.83281 14.4663 2.13499 15.2966C3.41697 16.114 5.14526 16.5 7 16.5C8.85474 16.5 10.583 16.114 11.865 15.2966C13.1672 14.4663 14 13.1912 14 11.5C14 10.3956 13.1045 9.50001 12 9.50001L2.00873 9.5Z" fill="#EEF0FF"/>
                        </svg>
                    </i> */}
                </UserAvatarLogout>
            </Popover>
        </ConfigProvider>
        
       <SideBarToggleButton onClick={SetSideBar}>
        <p>پوشه ها</p>
        <i>
            <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.20669 1.5H5.17539L4.06235 0.609566C3.97369 0.53864 3.86354 0.5 3.75 0.5H2C0.89543 0.5 0 1.39543 0 2.5V2.99998H3.5567L5.20669 1.5Z" fill="#EEF0FF"/>
                <path d="M6.6933 1.5L4.08633 3.86995C3.9943 3.95362 3.87438 3.99998 3.75 3.99998H0V8.5C0 9.60457 0.89543 10.5 2 10.5H10C11.1046 10.5 12 9.60457 12 8.5V3.5C12 2.39543 11.1046 1.5 10 1.5H6.6933Z" fill="#EEF0FF"/>
                </svg>
                
        </i>
       </SideBarToggleButton>
    </HeaderComponent>
  )
}
