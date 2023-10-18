import React from 'react'
import { UserInfoContainer , InfoBox 
    , EditInfoBox , UserBoldInfoContainer } from '@/styles/Questioner/profile'
import { Icon } from '@/styles/icons'
import { digitsEnToFa } from '@persian-tools/persian-tools'
import { useState } from 'react'
import {message, Select} from 'antd'
import { axiosInstance } from '@/utilities/axios'
import {TailSpin} from "react-loader-spinner";

export const InfoContainer = ({ BoxName , BoxDataName ,MeQuery , UserData , bold , regions}) => {
    const [ editState , setEditState ] = useState(false);
    const [ userInfoMessage , userInfoMessageContext ] = message.useMessage();
    const [ InputData , setInputData ] = useState(UserData[BoxDataName]);
    const [ ErrorOccured , setErrorOccured ] = useState(false);
    const [ EditLoadingState , setEditLoadingState ] = useState(false);

    const EditHandler = async () => {
      setEditState(false)
      try 
      {
          if(regions)
          {
              if(BoxDataName == 'province') {
                  setInputData(regions[0].province.find(item => item.name == InputData).id)
              }
              else if(BoxDataName == 'nationality') {
                  setInputData(regions.find(item => item.name == InputData).id)
              }
          }
        const dataToUpdate = {
          [BoxDataName]: InputData  // Use computed property name here
        };
          setEditLoadingState(true)
        await axiosInstance.patch('/user-api/users/me/',dataToUpdate)
          MeQuery?.refetch()
          setEditLoadingState(false)
      }
      catch(err)
      {
          setEditLoadingState(false)
        if(err?.response?.data)
        {
            userInfoMessage.error({
                content : Object.values(err?.response?.data)[0] ,
                duration : 10 ,
                style : {
                    fontFamily : 'IRANSans'
                }
            })
            setErrorOccured(true)
        }

      }
    }
  return (
    <InfoBox bold={bold} error={ErrorOccured ? 'active' : null}>
        <p>{BoxName}</p>
        {userInfoMessageContext}
        <EditInfoBox editstate={editState}>
            { BoxDataName == 'gender' ?
                <Select
                    disabled={!editState}
                    suffixIcon={<Icon name={'suffixIcon'} style={{ width : 11 }} />}
                    value={InputData == 'm' ? { label : 'مرد' , value : 'm' } : { label : 'زن' , value : 'f' }}
                    onChange={(e) => setInputData(e)}
                    options={[
                    { label : 'مرد' , value : 'm' } ,
                    { label : 'زن' , value : 'f' }
                ]}>
                    جنسیت
                </Select>
                :
                BoxDataName == 'province' ?
                    regions && <Select
                        disabled={!editState}
                        showSearch
                        suffixIcon={<Icon name={'suffixIcon'} style={{ width : 11 }} />}
                        placeholder="استان محل سکونت را انتخاب کنید"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        value={InputData ? {
                            label : typeof InputData == 'string' ?
                                InputData
                                : regions[0].provinces.find(Province => Province.id == InputData).name ,
                            value : typeof InputData == 'string' ?
                                regions[0].provinces.find(Province => Province.name == InputData).id
                                : InputData
                        } : null}
                        onSelect={(e) => {
                            setInputData(e)
                        }}
                        options={regions[0].provinces.map(item => ({
                            label : item.name ,
                            value : item.id
                        }))}>
                        استان محل سکونت
                    </Select> :
                    BoxDataName == 'nationality'  ?
                        regions && <Select
                            disabled={!editState}
                            showSearch
                            suffixIcon={<Icon name={'suffixIcon'} style={{ width : 11 }} />}
                            placeholder={'ملیت را انتخاب کنید'}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            value={InputData ? {
                                label : typeof InputData == 'string' ?
                                    InputData
                                        : regions.find(Country => Country.id == InputData).name ,
                                value : typeof InputData == 'string' ?
                                    regions.find(Country => Country.name == InputData).id
                                    : InputData
                            } : null}
                            onSelect={(e) => setInputData(e)}
                            options={regions.map(item => ({
                                label : item.name ,
                                value : item.id
                            }))}>
                            استان محل سکونت
                        </Select>
                : <input style={{pointerEvents: editState ? 'all' : 'none'}} autoFocus
                    value={InputData ? digitsEnToFa(InputData) : ''}

                    onChange={(e) => {
                        setErrorOccured(null)
                        setInputData(e.target.value)
                    }}/>}
            { !editState ? <Icon name='ProfilePen' onClick={() => setEditState(true)} />
            :
               <>
                   { EditLoadingState ? <TailSpin
                           height="10"
                           width="10"
                           color="black"
                           ariaLabel="tail-spin-loading"
                           radius="1"
                           wrapperStyle={{}}
                           wrapperClass=""
                           visible={true}
                       />
                       :<>
                           <Icon name='GrayClose' onClick={() => setEditState(false)}
                                 style={{width: 13, filter: 'brightness(0.6)'}}/>
                           <Icon name='GrayCheck' onClick={() => EditHandler()}/>
                       </> }
               </>}

        </EditInfoBox>
    </InfoBox>
  )
}