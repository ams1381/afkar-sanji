import React, { useContext, useEffect, useState } from 'react'
import { HeaderComponent, UserAvatarLogout , HeaderContainer ,
    SideBarToggleButton , HeaderFolderButton , LogoutPopOverInfo, LogoutPopOverLayout} from '@/styles/common';
import { Button, ConfigProvider, Popover } from 'antd';
import { AuthContext } from '@/utilities/AuthContext';
import { themeContext } from '@/utilities/ThemeContext';
import { useLocalStorage } from '@/utilities/useLocalStorage';
import { Icon } from '@/styles/icons';
import AvatarComponent from './LogoutPopover';
import { Router, useRouter } from 'next/router';
import PN from 'persian-number';
import Link from 'next/link';

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
    <HeaderContainer>
        <HeaderComponent>
            <ConfigProvider theme={themeContext}>
                <Popover
                content={AvatarComponent}
                trigger="click"
                className='LogoutPopover'
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
        {goToFolders ? <Link href={`/`}>
            <HeaderFolderButton style={{ height : '100%' , gap : 8 , padding: '4px 15px '}}>
                <p>پوشه‌ها</p>
                <Icon name='Folder' style={{ width : 15 }} />
            </HeaderFolderButton>
        </Link> : <HeaderFolderButton onClick={() => SetSideBar()}>
                <p>پوشه‌ها</p>
                <Icon name='Folder' style={{ width : 15 , gap : 8 }} />
            </HeaderFolderButton>}
        </HeaderComponent>
    </HeaderContainer>
  )
}
