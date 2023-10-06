import React from 'react'
import { CommonDrawerContainer } from '@/styles/common'
import { Icon } from '@/styles/icons'
import { message } from 'antd';
import Link from "next/link";

export const CommonDrawer = ({ setRightDrawerOpen , RightDrawerOpen }) => {
    const [ MessageApi , MessageContext ] = message.useMessage();
  return (
    <CommonDrawerContainer open={RightDrawerOpen ? 'active' : null} >
        <div>
        {MessageContext}
            <div className='drawerLogo' onClick={() => setRightDrawerOpen(!RightDrawerOpen)}>
                <button >
                    <Icon name='ArrDown' />
                </button>
                <p>داشبود مرکز افکاری سنجی</p>
                <Icon name='MahLogo' />
            </div>
            <div className='drawer_item' onClick={() => MessageApi.info({
                content : 'این قابلیت به زودی فعال میشود'
            })}>
                <p>خانه</p>
                <Icon name='DrawerHome' />
            </div>
            <div className='drawer_item' onClick={() => MessageApi.info({
                content : 'این قابلیت به زودی فعال میشود'
            })}>
                <p>کیف پول</p>
                <Icon name='DrawerWallet' />
            </div>
            <div className='drawer_item' onClick={() => MessageApi.info({
                content : 'این قابلیت به زودی فعال میشود'
            })}>
                <p>پنل پرسشگری</p>
                <Icon name='InterviewerPanel' />
            </div>
            <div className='drawer_item' onClick={() => MessageApi.info({
                content : 'این قابلیت به زودی فعال میشود'
            })}>
                <p>پروژه ها</p>
                <Icon name='Projects' />
            </div>
            <Link href={'/questioner/dashboard/profile'}>
                <div className='drawer_item'>
                    <p>اطلاعات کاربر</p>
                    <Icon name='UserInfo' />
                </div>
            </Link>
            <Link href={'/'}>
                <div className='drawer_item'>
                    <p>ساخت پرسشنامه</p>
                    <Icon name='CreateQuestionnaire' />
                </div>
            </Link>
        </div>
    </CommonDrawerContainer>
  )
}
