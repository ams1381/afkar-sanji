import { ErrorContainer, ErrorPageTitle } from '@/styles/ErroPage';
import { LoginContainer } from '@/styles/auth/Login';
import { Button } from 'antd';
import Link from 'next/link';
import React from 'react'

const NotFound = () => {
  return (
    <LoginContainer>
      <ErrorContainer>
        <ErrorPageTitle>
          404
        </ErrorPageTitle>
        <p>صفحه یافت نشد</p>
        <Button type='primary'>
          <Link href='/'>
            باز گشت به صفحه اصلی
          </Link>
        </Button>
       
      </ErrorContainer>
      
    </LoginContainer>
  )
}
export default NotFound;