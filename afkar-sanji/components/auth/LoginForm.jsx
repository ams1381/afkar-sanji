import React, { useContext, useEffect, useRef, useState } from 'react'
import LoginFormHeader from './LoginFormHeader';
import LoginFormBody from './LoginFormBody';
import LoginFormInput from './LoginFormInput';
import StyleModules from '@/styles/auth/LoginStyles.module.css'
import {  LoginForm} from '@/styles/auth/Login';
import { LoginFormOTPInput } from './LoginFormOTPInput';
import { AuthContext } from '@/utilities/AuthContext';
import { Button , ConfigProvider , message } from 'antd';
import { themeContext } from '@/utilities/ThemeContext';
import { AuthValidator } from '@/utilities/validators/AuthValidators';
import persianNumberMin from 'persian-number';
import { AnimatePresence, motion } from 'framer-motion';
import { FormChildDiv } from '@/styles/auth/Login';
import { setCookie } from 'react-use-cookie';

export const Login_form = ({ setLoggedIn }) => {
  const [ loadingState , setLoading ] = useState(false);
  const [ errMessage , setErMessage ] = useState(null);
  const [messageApi, contextHolder] = message.useMessage()
  const LoginContext =  useContext(AuthContext);
  // const [cookies, setCookie, removeCookie] = useCookie();
  const [ showTransitionLine , setShowTransitionLine ] = useState(null);
  const InputRef = useRef(null)
  // phoneNumber
  useEffect(() => {
      window.addEventListener('keypress',(e) => {
        if(e.key == 'Enter')
          e.preventDefault();
      })
      if(LoginContext.Login_Context_value.FormType == 'OTP_SMS')
      {
        setShowTransitionLine(true);
        setTimeout(() => {
          setShowTransitionLine(null)
        },200)
      }
  },[])
  const authentication = async (value) => {
    setLoading(true)
    try 
    {
      if(LoginContext.Login_Context_value.FormType == 'PhoneNumber')
          setCookie('numberPhone',persianNumberMin.convertEnToPe(LoginContext.PhoneNumber))
      let form_input = LoginContext.Login_Context_value.FormType == 'PhoneNumber' ? 
      persianNumberMin.convertPeToEn(LoginContext.PhoneNumber) : persianNumberMin.convertPeToEn(value);
      if(AuthValidator(form_input,LoginContext.Login_Context_value.FormType))
        throw AuthValidator(form_input,LoginContext.Login_Context_value.FormType)
      
      await LoginContext.Login_Function(value);
      if(LoginContext.Login_Context_value.FormType == 'OTP_SMS')
        setLoggedIn();
    }
    catch(error)
    { 
      if(error?.response?.status == 500)
        setErMessage('مشکلی پیش آمد')
      else {
        if(typeof error == 'string')
          setErMessage(error)
        if(typeof error == 'object' && error.response)
          setErMessage(error.response.data[0].split('.')[0])
      }     
    }
    finally
    {
      setLoading(false)
    }
  }
  return (
    <LoginForm onSubmit={authentication} transitionLine={showTransitionLine}>
      {contextHolder}
      
        <LoginFormHeader title="ورود با رمز یکبار مصرف" />
        {/* <LoginFormBody body_message={LoginContext.Login_Context_value.FormBodyMessage} /> */}
          <FormChildDiv>
          <p style={{ marginTop : 12 }}>!سلام</p>
      </FormChildDiv>
        <div className='animation_container'>
        <AnimatePresence >
          <motion.div
          initial={LoginContext.Login_Context_value.FormType == 'OTP_SMS' ? { x : -270 } : { opacity : 1 }}
          animate={LoginContext.Login_Context_value.FormType == 'OTP_SMS' ? {
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
          } : { opacity : 1 }}
          transition={{ duration: 0.4 }}>
            
            <p className='input_label_message' style={{ padding : '10px 0' }}>{LoginContext.Login_Context_value.FormBodyMessage}</p>
          { LoginContext.Login_Context_value.FormType == 'PhoneNumber' ? 
          <LoginFormInput ErrorHandler={{message : errMessage , SetNull : setErMessage}} authentication={authentication}/> :
            <LoginFormOTPInput ErrorHandler={{message : errMessage , SetNull : setErMessage}} authentication={authentication}  />
          }
         
         </motion.div>
         </AnimatePresence>
        </div>
      
        <ConfigProvider theme={themeContext}>
              <Button typeof='submit' onClick={authentication}
               className={StyleModules['confirm_button']}
               type="primary" loading={loadingState}>
                    {LoginContext.Login_Context_value.ButtonText}
                </Button>
          </ConfigProvider>
        
    </LoginForm>
  )
}
export default Login_form;