import React, {useContext, useEffect, useState} from 'react'
import { CommonDrawerContainer ,
    CommonDrawerLogoImageContainer ,
    CommonDrawerItemText ,
    CommonDrawerItemIcon ,
    CommonDrawerTopPartContainer } from '@/styles/common'
import { Icon } from '@/styles/icons'
import { message } from 'antd';
import Rectangle from '../../public/Images/Rectangle.png'
import { motion} from 'framer-motion';
import Link from "next/link";
import {AuthContext} from "@/utilities/AuthContext";
import {useRouter} from "next/router";
import {useLocalStorage} from "@/utilities/useLocalStorage";
import {axiosInstance} from "@/utilities/axios";
export const CommonDrawer = ({ setRightDrawerOpen , RightDrawerOpen , isAdmin }) => {
    const Auth = useContext(AuthContext);
    const router = useRouter();
    const { setItem , getItem } = useLocalStorage()
    const [ MessageApi , MessageContext ] = message.useMessage();
    const [ drawerSelectedItem , setDrawerSelecteditem ] = useState(null);
    console.log(Auth)
    useEffect(() => {
        if(router.pathname === '/' || router.pathname.includes('questionnaire')) {
            if(getItem('roleReq') === 'question-api/questionnaires')
                setDrawerSelecteditem('create-questionnaire')
            else
                setDrawerSelecteditem('employer-panel')
        }
        else {
            if(router.pathname.includes('profile'))
                setDrawerSelecteditem('profile')
            else if(router.pathname.includes('collaboration'))
                setDrawerSelecteditem('interview-panel')
        }

    }, [router]);
    useEffect(() => {
        window.addEventListener('scroll',(e) => {
            if(window.pageYOffset >= 57) {
                document.querySelector('.drawer-column.icons-container').style.height = '100%';
                if(document.querySelector('.drawer-text-column'))
                    document.querySelector('.drawer-text-column').style.height = '100%';
            }
            else {
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
    // console.log(Auth.hasResume)
  return (
    <CommonDrawerContainer open={RightDrawerOpen ? 'active' : null} >
        <div className={'drawer-inner-container'}>
            {MessageContext}
            <div className='drawerLogo' onClick={() => setRightDrawerOpen(!RightDrawerOpen)}>
                <div className={'drawer-logo-container'}>
                     { RightDrawerOpen && <div className={'drawer-logo-inner-container'}>
                        <p>پنل کاربری ماح</p>
                    </div>}
                    <CommonDrawerLogoImageContainer draweropen={RightDrawerOpen}>
                        <Icon name='MahLogo' />
                    </CommonDrawerLogoImageContainer>
                </div>

            </div>
            <CommonDrawerTopPartContainer>
                { RightDrawerOpen &&
                    <motion.div className={'drawer-text-column'} style={{ width : '100%' , height : '91.5%' , transition : '0.3s' }}
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
                                {/*<Link href={Auth.hasResume ? '/' : '/questioner/'} >*/}
                                    <CommonDrawerItemText
                                        onClick={() => {
                                            if(Auth.role === 'e' || Auth.role === 'ie') {
                                                Auth.setReqRole('interview-api/interviews');
                                                setItem('roleReq','interview-api/interviews')
                                                router.push('/')
                                            }
                                        }}
                                        className='drawer_item_text employer'
                                        active={drawerSelectedItem === 'employer-panel'}>
                                        <p>پنل کارفرمایی</p>
                                    </CommonDrawerItemText>
                                {/*</Link>*/}
                                <Link href={(Auth.role === 'e' || Auth.role === 'n' || !Auth.hasResume) ? '/questioner/' : '/questioner/dashboard/collaboration/'}>
                                    <CommonDrawerItemText active={drawerSelectedItem === 'interview-panel'} className='drawer_item_text interviewer'>
                                        <p>پنل پرسشگری</p>
                                    </CommonDrawerItemText>
                                </Link>
                                <Link href={'/questioner/dashboard/wallet/'}>
                                    <CommonDrawerItemText className='drawer_item_text wallet'>
                                        <p>کیف پول</p>
                                    </CommonDrawerItemText>
                                </Link>
                                <Link href={'/'}
                                    // question-api/questionnaires
                                      onClick={() => {
                                          setItem('roleReq','question-api/questionnaires')
                                          Auth.setReqRole('question-api/questionnaires')
                                      }}>
                                    <CommonDrawerItemText active={drawerSelectedItem === 'create-questionnaire'}
                                                          className='drawer_item_text create-questionaire'>
                                        <p>ساخت پرسشنامه</p>
                                    </CommonDrawerItemText>
                                </Link>
                            </> :
                            <>
                                <Link href={'/admin/users-list'}>
                                    <CommonDrawerItemText
                                                          className='drawer_item_text'>
                                        <p>لیست کاربران</p>
                                    </CommonDrawerItemText>
                                </Link>
                                    <Link href={'/admin/questionnaires-list'}>
                                        <CommonDrawerItemText
                                            className='drawer_item_text'>
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
                            <CommonDrawerItemText logout={true} onClick={() => LogoutHandler()} className='drawer_item_text'>
                                <p>خروج</p>
                            </CommonDrawerItemText>
                    </div>
                </div>
                    </motion.div>}
                <div style={{ width : RightDrawerOpen ? '22.5%' : '100%'  , boxShadow : '-1px 0px 0px 0px #F0F0F0' }}
                     className={'drawer-column icons-container'}>
                    <div>
                        <CommonDrawerItemIcon open={RightDrawerOpen ? 'active' : null}
                          className={'drawer_item dashboard'} onClick={() => MessageApi.info({
                            content : 'این قابلیت به زودی فعال میشود'
                        })}>
                            <Icon name='DrawerHome' />
                        </CommonDrawerItemIcon>
                        { !isAdmin ? <>
                            <CommonDrawerItemIcon
                                onClick={() => {
                                    if (Auth.role === 'e' || Auth.role === 'ie') {
                                        Auth.setReqRole('interview-api/interviews');
                                        setItem('roleReq', 'interview-api/interviews');
                                        router.push('/')
                                    }
                                }}
                                open={RightDrawerOpen ? 'active' : null}
                                  active={drawerSelectedItem === 'employer-panel'}
                                  className='drawer_item i_employer'>
                                <Icon name='Projects'/>
                            </CommonDrawerItemIcon>
                            <Link href={(Auth.role === 'e' || Auth.role === 'n' || !Auth.hasResume)
                                ? '/questioner/' : '/questioner/dashboard/collaboration/'}>
                        <CommonDrawerItemIcon open={RightDrawerOpen ? 'active' : null}
                              onClick={() => {
                                  if (Auth.hasResume) {
                                      Auth.setReqRole('question-api/questionnaires');
                                      setItem('roleReq', 'question-api/questionnaires')
                                  }
                              }}
                              active={drawerSelectedItem === 'interview-panel'}
                              className='drawer_item i_interviewer'>
                            <Icon name='InterviewerPanel'/>
                        </CommonDrawerItemIcon>
                    </Link>
                        <Link href={'/questioner/dashboard/wallet/'}>
                            <CommonDrawerItemIcon open={RightDrawerOpen ? 'active' : null} className='drawer_item i_wallet'>
                                <Icon name='DrawerWallet'/>
                            </CommonDrawerItemIcon>
                        </Link>
                        <Link href={'/'} onClick={() => {
                            setItem('roleReq','question-api/questionnaires')
                            Auth.setReqRole('question-api/questionnaires')
                        }}>
                            <CommonDrawerItemIcon open={RightDrawerOpen ? 'active' : null} active={drawerSelectedItem === 'create-questionnaire'}
                                  className='drawer_item i_create-questionaire'>
                                <Icon name='CreateQuestionnaire' />
                            </CommonDrawerItemIcon>
                        </Link>
                    </>
                    : <>
                        <Link href={'/admin/users-list/'}>
                            <CommonDrawerItemIcon open={RightDrawerOpen ? 'active' : null} className='drawer_item i_wallet'>
                                <Icon name='UsersList'/>
                            </CommonDrawerItemIcon>
                        </Link>
                        <Link href={'/admin/questionnaires-list/'}>
                            <CommonDrawerItemIcon  open={RightDrawerOpen ? 'active' : null} className='drawer_item i_wallet'>
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
                                                 className='drawer_item'>
                               <Icon name='UserProfile'/>
                           </CommonDrawerItemIcon>
                       </Link>}
                       <CommonDrawerItemIcon onClick={() => LogoutHandler()} className='drawer_item i_logout'>
                           <Icon name='Logout' />
                       </CommonDrawerItemIcon>
                   </div>
                </div>
            </CommonDrawerTopPartContainer>
            <div className={'trapezoid'} onClick={() => setRightDrawerOpen(!RightDrawerOpen)}>
                {/*<img src={Rectangle.src} />*/}
                <Icon name={'ArrowDown'} />
            </div>
        </div>

    </CommonDrawerContainer>
  )
}
