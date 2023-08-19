import React, { useContext, useEffect, useState } from 'react'
import { HeaderComponent, UserAvatarLogout , 
    SideBarToggleButton , LogoutPopOverInfo, LogoutPopOverLayout} from '@/styles/common';
import { Button, ConfigProvider, Popover } from 'antd';
import { AuthContext } from '@/utilities/AuthContext';
import { themeContext } from '@/utilities/ThemeContext';
import { useLocalStorage } from '@/utilities/useLocalStorage';
import { Icon } from '@/styles/icons';
import AvatarComponent from './LogoutPopover';
import { Router, useRouter } from 'next/router';
import PN from 'persian-number';

export const Header = ({SetSideBar , goToFolders}) => {
    const [ logoutPopOver , switchPopover ] = useState(false);
    const { getItem , setItem} = useLocalStorage();
    const router = useRouter();
    const Auth = useContext(AuthContext);
    useEffect(() => {
        Auth.changePhone(getItem('phoneNumber'))
    },[])
    const FolderButtonHandler = () => {
        goToFolders ? router.back() : SetSideBar();
    }
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
                    <Icon name='GrayUser' />
                </UserAvatarLogout>
            </Popover>
        </ConfigProvider>
       <SideBarToggleButton onClick={FolderButtonHandler}>
        <p>پوشه ها</p>
        <Icon name='folder' style={{ width : 15 }} />
       </SideBarToggleButton>
    </HeaderComponent>
  )
}
