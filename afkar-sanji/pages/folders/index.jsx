import Head from 'next/head';
import React, { useContext, useState } from 'react'
import { Header } from '@/components/common/Header';
import SideBar from '@/components/common/SideBar';
import { ScreenMask } from '@/styles/common';
import { CornerAddButton } from '@/styles/folders/cornerAdd';
import { Popover } from 'antd';
import AddPopoverContent from '@/components/Folders/AddPopoverContent';
import { axiosInstance } from '@/utilities/axios';
import { AuthContext } from '@/utilities/AuthContext';

const Folders = (props) => {
  const [ SideBarOpen , setOpen ] = useState(false);
  const [ addPopOver , setPopOver ]= useState(false);
  const Auth = useContext(AuthContext);

  return (
    <>
    <Head>
        <title>Afkar Sanji</title>
    </Head>
      <Header SetSideBar={() => setOpen(!SideBarOpen)} />
      <SideBar IsOpen={SideBarOpen} SetSideBar={() => setOpen(!SideBarOpen)}/>
      <ScreenMask shown={SideBarOpen ? 'true' : null} onClick={() => setOpen(false)}/>
      <Popover
            content={AddPopoverContent}
            trigger="click"
            open={addPopOver}
            onOpenChange={() => setPopOver(false)}
            style={{marginRight : 15}}
            >
                <CornerAddButton clicked={addPopOver ? 'true' : null} onClick={() => setPopOver(!addPopOver)}>
                <i>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.88338 0.0067277L9 0C9.51284 0 9.93551 0.38604 9.99327 0.883379L10 1V8H17C17.5128 8 17.9355 8.38604 17.9933 8.88338L18 9C18 9.51284 17.614 9.93551 17.1166 9.99327L17 10H10V17C10 17.5128 9.61396 17.9355 9.11662 17.9933L9 18C8.48716 18 8.06449 17.614 8.00673 17.1166L8 17V10H1C0.487164 10 0.0644928 9.61396 0.0067277 9.11662L0 9C0 8.48716 0.38604 8.06449 0.883379 8.00673L1 8H8V1C8 0.487164 8.38604 0.0644928 8.88338 0.0067277L9 0L8.88338 0.0067277Z" fill="#EEF0FF"/>
                    </svg>                        
                </i>
                </CornerAddButton>
        </Popover>
    </>
    
  )
}
export default Folders;