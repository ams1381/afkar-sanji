import React, { useContext, useEffect, useState } from 'react'
import { HeaderComponent, UserAvatarLogout , 
    SideBarToggleButton , LogoutPopOverInfo, LogoutPopOverLayout} from '@/styles/common';
import { Button, ConfigProvider, Popover } from 'antd';
import { AuthContext } from '@/utilities/AuthContext';
import { themeContext } from '@/utilities/ThemeContext';
import { useLocalStorage } from '@/utilities/useLocalStorage';
import { Icon } from '@/styles/folders/icons';
import AvatarComponent from './LogoutPopover';

export const Header = ({SetSideBar}) => {
    const [ logoutPopOver , switchPopover ] = useState(false);
    const { getItem , setItem} = useLocalStorage();
    const Auth = useContext(AuthContext);
    useEffect(() => {
        Auth.changePhone(getItem('phoneNumber'))
    },[])
    
    // const AvatarComponent = 
  return (
    <HeaderComponent>
        <ConfigProvider theme={themeContext}>
            <Popover
            content={AvatarComponent}
            trigger="click"
            open={logoutPopOver}
            overlayInnerStyle={{ marginLeft : 15}}
            onOpenChange={() => switchPopover(false)}
            style={{width : 190}}
            >
                <UserAvatarLogout onClick={() => switchPopover(!logoutPopOver)}>
                    <Icon name='User' />
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
