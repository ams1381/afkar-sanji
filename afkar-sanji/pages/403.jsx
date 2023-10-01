import { ErrorContainer, ErrorPageTitle, RotatingLight } from '@/styles/ErroPage';
import ProgressBarLoading from '@/styles/ProgressBarLoading';
import { LoginContainer } from '@/styles/auth/Login';
import { Button } from 'antd';
import Link from 'next/link';
import React from 'react'

const ServerError = () => {
  return (
    <LoginContainer>
      <ProgressBarLoading />
      <RotatingLight />
      <ErrorContainer>
        <div className='error_inner_container'> 
        <ErrorPageTitle>
          403
        </ErrorPageTitle>
        <p>شما دسترسی لازم به این بخش را ندارید</p>
        <Button type='primary'>
          <Link href='/'>
            باز گشت به صفحه اصلی
          </Link>
        </Button>
        </div>
      </ErrorContainer>
    </LoginContainer>
  )
}
export default ServerError;
