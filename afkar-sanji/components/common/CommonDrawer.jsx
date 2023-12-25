import React, {useContext, useEffect, useState} from 'react'
import {
    CommonDrawerContainer,
    CommonDrawerLogoImageContainer,
    CommonDrawerItemText,
    CommonDrawerTextItemsContainer,
    CommonDrawerIconItemsContainer,
    CommonDrawerItemIcon,
    CommonDrawerTopPartContainer, AskForAdminSign, AskForAdminText
} from '@/styles/common'
import { Icon } from '@/styles/icons'
import { message } from 'antd';
import Rectangle from '../../public/Images/Rectangle.png'
import { motion} from 'framer-motion';
import Link from "next/link";
import MahLogo from '@/public/Images/logo-maah.png'
import {AuthContext} from "@/utilities/AuthContext";
import {useRouter} from "next/router";
import {useLocalStorage} from "@/utilities/useLocalStorage";
import {axiosInstance} from "@/utilities/axios";
import {WalletPopup} from "@/components/Folders/walletPopup";
import {ChatModal} from "@/components/Questioner/ChatModal/ChatModal";
import Image from "next/image";
export const CommonDrawer = ({ setRightDrawerOpen , RightDrawerOpen , isAdmin }) => {
    const Auth = useContext(AuthContext);
    const router = useRouter();
    const { setItem , getItem } = useLocalStorage();
    const [ walletPopupOpen , setWalletPopupOpen ] = useState(false);
    const [ MessageApi , MessageContext ] = message.useMessage();
    const [ drawerSelectedItem , setDrawerSelecteditem ] = useState(null);
    const [ chatModalActive , setChatModalActive ] = useState(false);
    const [ distPage , setDistPage ] = useState(null);
    useEffect(() => {
        if(router.pathname === '/' || router.pathname.includes('questionnaire') && !router.pathname.includes('questionnaires-list')) {
            if(getItem('roleReq') === 'question-api/questionnaires')
                setDrawerSelecteditem('create-questionnaire')
            else
                setDrawerSelecteditem('employer-panel')
        }
        else {
            if(router.pathname.includes('profile'))
                setDrawerSelecteditem('profile')
            else if(router.pathname.includes('wallet'))
                setDrawerSelecteditem('wallet')
            else if(router.pathname.includes('collaboration'))
                setDrawerSelecteditem('interview-panel')
            else if(router.pathname.includes('users-list'))
                setDrawerSelecteditem('users-list')
            else if(router.pathname.includes('questionnaires-list'))
                setDrawerSelecteditem('questionnaires-list')
            // questionnaires-list
        }

    }, [router]);

    useEffect(() => {
        window.addEventListener('scroll',(e) => {
            if(window.pageYOffset >= 57) {
                if(document.querySelector('.drawer-column.icons-container'))
                    document.querySelector('.drawer-column.icons-container').style.height = '100%';
                if(document.querySelector('.drawer-text-column'))
                    document.querySelector('.drawer-text-column').style.height = '100%';
            }
            else {
                if(document.querySelector('.drawer-column.icons-container'))
                    document.querySelector('.drawer-column.icons-container').style.height = '91.5%';
                if(document.querySelector('.drawer-text-column'))
                    document.querySelector('.drawer-text-column').style.height = '91.5%';
            }
        })
    }, []);
    useEffect(() => {
        if(RightDrawerOpen) {
            if(window.pageYOffset >= 57 && document.querySelector('.drawer-text-column'))
                document.querySelector('.drawer-text-column').style.height = '100%';


           let DrawerTextItems =  document.querySelectorAll('.drawer_item_text');
           if(DrawerTextItems.length)
           {
               DrawerTextItems.forEach(DrawerTextItem => {
                   DrawerTextItem.addEventListener('mouseenter',() => {
                       if(DrawerTextItem.className.split(' ')[3] === 'logout')
                           document.querySelector(`.i_${DrawerTextItem.className.split(' ')[3]} i`)
                               .setAttribute('style','filter : invert(28%) sepia(75%) saturate(4490%) hue-rotate(347deg) brightness(95%) contrast(118%);')
                       else
                           // console.log(DrawerTextItem.className.split(' ')[3])
                        document.querySelector(`.i_${DrawerTextItem.className.split(' ')[3]} i`)
                            .setAttribute('style','filter : invert(37%) sepia(74%) saturate(1045%) hue-rotate(210deg) brightness(91%) contrast(105%);')
                   })
                   DrawerTextItem.addEventListener('mouseleave',() => {
                       document.querySelector(`.i_${DrawerTextItem.className.split(' ')[3]} i`)
                           .setAttribute('style','')
                   })
               })
           }
        }

    },[RightDrawerOpen])
    const LogoutHandler = () => {
        try
        {
            (function(){document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); }); })();
            axiosInstance.post('/user-api/auth/logout/',{
                refresh_token : cookies.refresh_token ,
            })
        }
        catch(Err)
        {
            console.log(Err)
        }
        router.push('/auth')
    }
    // console.log(Auth)
    const QuestionerNavigator = () => {
        if(!Auth.hasResume) {
            router.push('/questioner/')
            return
        }
        else if(Auth.hasResume && !Auth.askForInterviewRole) {
            router.push('/questioner/dashboard/collaboration/')
        }
    }
  return (
    <CommonDrawerContainer open={RightDrawerOpen ? 'active' : null} >
        <ChatModal isAdmin={false}
                  isActive={chatModalActive} setIsActive={setChatModalActive}/>
        <WalletPopup distPage={distPage} walletPopupOpen={walletPopupOpen} setWalletPopupOpen={setWalletPopupOpen} />
        <div className={'drawer-inner-container'}>
            {MessageContext}
            <div className='drawerLogo' onClick={() => setRightDrawerOpen(!RightDrawerOpen)}>
                <div className={'drawer-logo-container'}>
                     { RightDrawerOpen && window.width > 768 && <div className={'drawer-logo-inner-container'}>
                        <p>پنل کاربری ماح</p>
                    </div>}
                    <CommonDrawerLogoImageContainer draweropen={RightDrawerOpen}>
                        {/*<Icon name='MahLogo' />*/}
                        <Image width={40} height={40} src={MahLogo.src} alt={'mah'} />
                    </CommonDrawerLogoImageContainer>
                </div>

            </div>
            <CommonDrawerTopPartContainer>
                { RightDrawerOpen &&
                    <CommonDrawerTextItemsContainer className={'drawer-text-column'}
                            transition={{ duration : 0.1 }} initial={{ x : 300 }} animate={{ x : 0  }}>
                    <div style={{width: RightDrawerOpen ? '100%' : 0 , height : '100%' }} className={'drawer-column '}>
                    <div>
                        <CommonDrawerItemText className='drawer_item_text dashboard'
                              onClick={() => MessageApi.info({
                            content: 'این قابلیت به زودی فعال میشود'
                        })}>
                            <p>داشبورد</p>
                        </CommonDrawerItemText>
                        {
                            !isAdmin ? <>
                                        <CommonDrawerItemText
                                        onClick={() => {
                                            if (getItem('role') === 'e' || getItem('role') === 'ie') {
                                                Auth.setReqRole('interview-api/interviews');
                                                setItem('roleReq', 'interview-api/interviews')
                                                router.push('/')
                                            }
                                            else if(!Auth.hasWallet) {
                                                setWalletPopupOpen(true);
                                                setDistPage('employer')
                                            }
                                        }}
                                        className='drawer_item_text employer'
                                        active={drawerSelectedItem === 'employer-panel'}>
                                        <p>پنل کارفرمایی</p>
                                    </CommonDrawerItemText>
                                    <CommonDrawerItemText active={drawerSelectedItem === 'interview-panel'}
                                          onClick={async () => {
                                              if((Auth.role === 'e' || Auth.role === 'n') && !Auth.askForInterviewRole) {
                                                  await router.push('/questioner/')
                                              }
                                              else if((Auth.role === 'e' || Auth.role === 'n') && Auth.askForInterviewRole) {
                                                  MessageApi.info({
                                                      content : 'درخواست پرسشگری شما تایید نشده'
                                                  })
                                                  return
                                              }
                                              else if(!Auth.askForInterviewRole) {
                                                  await router.push('/questioner/dashboard/collaboration/')
                                              }
                                          }}
                                          className='drawer_item_text interviewer'>
                                        { Auth.askForInterviewRole && <AskForAdminText>
                                            در انتظار تایید
                                        </AskForAdminText>}
                                        <p>پنل پرسشگری</p>
                                    </CommonDrawerItemText>
                                    <CommonDrawerItemText active={drawerSelectedItem === 'wallet'}
                                          onClick={async () => {
                                              if(Auth.hasWallet) {
                                                  await router.push('/questioner/dashboard/wallet/')
                                              }
                                              else  {
                                                  setWalletPopupOpen(true);
                                                  setDistPage('wallet')
                                              }
                                          }}
                                          className='drawer_item_text wallet'>
                                        <p>کیف پول</p>
                                    </CommonDrawerItemText>
                                    <CommonDrawerItemText onClick={async () => {
                                        Auth.setReqRole('question-api/questionnaires')
                                        setItem('roleReq','question-api/questionnaires')
                                        await router.push('/')
                                    }} active={drawerSelectedItem === 'create-questionnaire'}
                                                          className='drawer_item_text create-questionaire'>
                                        <p>ساخت پرسشنامه</p>
                                    </CommonDrawerItemText>
                                    <CommonDrawerItemText onClick={() => setChatModalActive(true)}
                                                          className='drawer_item_text chat'>
                                        <p>گفت و گو با ادمین</p>
                                    </CommonDrawerItemText>
                            </> :
                            <>
                                <Link href={'/admin/users-list'}>
                                    <CommonDrawerItemText active={drawerSelectedItem === 'users-list'}
                                                          className='drawer_item_text users-list'>
                                        <p>لیست کاربران</p>
                                    </CommonDrawerItemText>
                                </Link>
                                    <Link href={'/admin/questionnaires-list'}>
                                        <CommonDrawerItemText
                                            active={drawerSelectedItem === 'questionnaires-list'}
                                            className='drawer_item_text questionnaires-list'>
                                            <p>لیست پرسش‌نامه‌ها</p>
                                        </CommonDrawerItemText>
                                    </Link>
                            </>
                        }
                        {/*UsersList*/}

                    </div>
                    <div>
                        { !isAdmin && <Link href={'/questioner/dashboard/profile'}>
                            <CommonDrawerItemText active={drawerSelectedItem === 'profile'}
                                               className='drawer_item_text profile'>
                            <p>حساب کاربری</p>
                        </CommonDrawerItemText>
                        </Link>}
                            <CommonDrawerItemText logout={true}
                                  onClick={() => LogoutHandler()}
                                  className='drawer_item_text logout'>
                                <p>خروج</p>
                            </CommonDrawerItemText>
                    </div>
                </div>
                    </CommonDrawerTextItemsContainer>}
                <CommonDrawerIconItemsContainer RightDrawerOpen={RightDrawerOpen}
                     className={'drawer-column icons-container'}>
                    <div>
                        <CommonDrawerItemIcon open={RightDrawerOpen ? 'active' : null}
                          className={'drawer_item i_dashboard'} onClick={() => MessageApi.info({
                            content : 'این قابلیت به زودی فعال میشود'
                        })}>
                            <Icon name='DrawerHome' />
                        </CommonDrawerItemIcon>
                        { !isAdmin ? <>
                                    <CommonDrawerItemIcon
                                    onClick={() => {
                                        if (getItem('role') === 'e' || getItem('role') === 'ie') {
                                            Auth.setReqRole('interview-api/interviews');
                                            setItem('roleReq', 'interview-api/interviews');
                                            router.push('/')
                                        }
                                        else if(!Auth.hasWallet) {
                                            setWalletPopupOpen(true);
                                            setDistPage('employer')
                                        }
                                    }}
                                    open={RightDrawerOpen ? 'active' : null}
                                    active={drawerSelectedItem === 'employer-panel'}
                                    className='drawer_item i_employer'>
                                    <Icon name='Projects'/>
                                </CommonDrawerItemIcon>
                        {/*}*/}
                        <CommonDrawerItemIcon open={RightDrawerOpen ? 'active' : null}
                              onClick={async () => {
                                  if((Auth.role === 'e' || Auth.role === 'n') && !Auth.askForInterviewRole) {
                                      await router.push('/questioner/')
                                  }
                                  else if((Auth.role === 'e' || Auth.role === 'n') && Auth.askForInterviewRole) {
                                      MessageApi.info({
                                          content : 'درخواست پرسشگری شما تایید نشده'
                                      })
                                      return
                                  }
                                  else if(!Auth.askForInterviewRole) {
                                      await router.push('/questioner/dashboard/collaboration/')
                                  }
                              }}
                              active={drawerSelectedItem === 'interview-panel'}
                              className='drawer_item i_interviewer'>
                            <Icon name='InterviewerPanel'>
                                { Auth.askForInterviewRole && <AskForAdminSign/>}
                            </Icon>
                        </CommonDrawerItemIcon>
                    {/*</Link>*/}
                            <CommonDrawerItemIcon active={drawerSelectedItem === 'wallet'}
                              onClick={async () => {
                                  if(Auth.hasWallet) {
                                      await router.push('/questioner/dashboard/wallet/')
                                  }
                                  else  {
                                      setWalletPopupOpen(true);
                                      setDistPage('wallet')
                                  }
                              }}
                                  open={RightDrawerOpen ? 'active' : null} className='drawer_item i_wallet'>
                                <Icon name='DrawerWallet'/>
                            </CommonDrawerItemIcon>
                            <CommonDrawerItemIcon onClick={() => {
                                Auth.setReqRole('question-api/questionnaires')
                                setItem('roleReq','question-api/questionnaires')
                                router.push('/')
                            }} open={RightDrawerOpen ? 'active' : null} active={drawerSelectedItem === 'create-questionnaire'}
                                  className='drawer_item i_create-questionaire'>
                                <Icon name='CreateQuestionnaire' />
                            </CommonDrawerItemIcon>
                            <CommonDrawerItemIcon className={'drawer_item i_chat'} onClick={() => setChatModalActive(true)}>
                                <Icon name={'OutlineChat'} />
                            </CommonDrawerItemIcon>
                    </>
                    : <>
                        <Link href={'/admin/users-list/'}>
                            <CommonDrawerItemIcon open={RightDrawerOpen ? 'active' : null}
                                      active={drawerSelectedItem === 'users-list'}
                                      className='drawer_item i_users-list'>
                                <Icon name='UsersList'/>
                            </CommonDrawerItemIcon>
                        </Link>
                        <Link href={'/admin/questionnaires-list/'}>
                            <CommonDrawerItemIcon  open={RightDrawerOpen ? 'active' : null}
                                       active={drawerSelectedItem === 'questionnaires-list'}
                                       className='drawer_item i_questionnaires-list'>
                                <Icon name='QuestionnairesList'/>
                            </CommonDrawerItemIcon>
                        </Link>
                                {/*QuestionnairesList*/}
                    </>}


                    </div>
                   <div>
                       { !isAdmin && <Link href={'/questioner/dashboard/profile'}>
                           <CommonDrawerItemIcon open={RightDrawerOpen ? 'active' : null}
                                                 active={drawerSelectedItem === 'profile'}
                                                 className='drawer_item i_profile' >
                               <Icon name='UserProfile'/>
                           </CommonDrawerItemIcon>
                       </Link>}
                       <CommonDrawerItemIcon logout={true} onClick={() => LogoutHandler()}
                                             className='drawer_item i_logout'>
                           <Icon name='Logout' />
                       </CommonDrawerItemIcon>
                   </div>
                </CommonDrawerIconItemsContainer>
            </CommonDrawerTopPartContainer>
            <div className={'trapezoid'} onClick={() => setRightDrawerOpen(!RightDrawerOpen)}>
                {/*<img src={Rectangle.src} />*/}
                <Icon name={'ArrowDown'} />
            </div>
        </div>

    </CommonDrawerContainer>
  )
}
