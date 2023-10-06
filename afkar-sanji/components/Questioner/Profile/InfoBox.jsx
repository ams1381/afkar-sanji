import React from 'react'
import { UserInfoContainer , InfoBox 
    , EditInfoBox , UserBoldInfoContainer } from '@/styles/Questioner/profile'
import { Icon } from '@/styles/icons'
import { digitsEnToFa } from '@persian-tools/persian-tools'
import { useState } from 'react'
import { message } from 'antd'
import { axiosInstance } from '@/utilities/axios'

export const InfoContainer = ({ BoxName , BoxDataName , UserData , bold}) => {
    const [ editState , setEditState ] = useState(false);
    const [ userInfoMessage , userInfoMessageContext ] = message.useMessage();
    const [ InputData , setInputData ] = useState(UserData[BoxDataName])
    const EditHandler = async () => {
      setEditState(false)

      try 
      {
        const dataToUpdate = {
          [BoxDataName]: InputData  // Use computed property name here
        };
        await axiosInstance.patch('/user-api/users/me/',dataToUpdate)
      }
      catch(err)
      {
        if(err?.response?.data)
        userInfoMessage.error({
          content : Object.values(err?.response?.data)[0] ,
          style : {
            fontFamily : 'IRANSans'
          }
        })
      }
    }

  return (
    <InfoBox bold={bold}>
        <p>{BoxName}</p>
        {userInfoMessageContext}
        <EditInfoBox>
            <input style={{ pointerEvents : editState ? 'all' : 'none' }}
            value={InputData ? digitsEnToFa(InputData) : ''} 
            onChange={(e) => setInputData(e.target.value)}/>
            { !editState ? <Icon name='ProfilePen' onClick={() => setEditState(true)} /> 
            : <Icon name='GrayCheck' onClick={() => EditHandler()} />}
        </EditInfoBox>
    </InfoBox>
  )
}
