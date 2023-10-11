import { EditButton, InfoBox, UserInfoContainer , ConfirmButtonContainer , LocationSelectorContainer } from '@/styles/Questioner/profile'
import Link from 'next/link'
import React from 'react'
import {Cascader, Button, message} from 'antd'
import { axiosInstance } from '@/utilities/axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {convertDate, convertToRegularTime} from "@/components/QuestionnairePanel/SettingPanel";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import { Skeleton } from 'antd'

export const JobInfo = ({ Countries , userData ,MeQuery , regions }) => {
    const [ selectedRegions , setSelectedRegions ] = useState(null);
    const [ RegionError , setRegionError ] = useState(false);
    const [ countriesData , setCountriesData ] = useState(regions ? regions[0].provinces?.map(ProvinceItem => ({
        label : ProvinceItem.name ,
        value : ProvinceItem.id ,
        children : ProvinceItem.cities.map(CityItem => ({
            label : CityItem.name ,
            value : CityItem.id ,
            children : CityItem.districts.map(DistrictItem => ({
                label : DistrictItem.name ,
                value : DistrictItem.id
            }))
        }))
    })) : []);
    const [ RegionLoading , setRegionLoading ] = useState(false);
    const [ userInfoMessage , userInfoMessageContext ] = message.useMessage();


    const CascaderSelectHandler = async (SelectedList) => {

        if(!SelectedList)
            return
        if(SelectedList.length == 3)
        setSelectedRegions([SelectedList[2]])
        setRegionError(false)
    }
    const RegionConfirmHandler = async () => {
        setRegionLoading(true)
        try {
            await axiosInstance.patch('/user-api/users/me/', {
                'prefered_districts' :selectedRegions
            })
        }
        catch (err) {
            setRegionLoading(false)
            setRegionError(true)
            if(err?.response?.data)
                userInfoMessage.error({
                    content : Object.values(err?.response?.data)[0] ,
                    style : {
                        fontFamily : 'IRANSans'
                    }
                })
        }
        setRegionLoading(false)
    }
    const { SHOW_CHILD } = Cascader;

  return (
      MeQuery.isLoading ?
          <UserInfoContainer>
              <Skeleton.Input active />
              <div style={{ marginTop : 12 }}>
                  <InfoBox bold loading>
                      <div className='last_update_container'>
                          <Skeleton.Input active />
                      </div>
                      <Skeleton.Button />
                  </InfoBox>
              </div>
              <LocationSelectorContainer loading>
                  <Skeleton.Input active />
                  <div style={{ marginTop : 10 }}>
                      <Skeleton.Input active style={{ minWidth : 'auto' , width : '250px' }} />
                  </div>
                  <ConfirmButtonContainer>
                      <Skeleton.Input active style={{ minWidth : 'auto' , width : '50px' }}/>
                  </ConfirmButtonContainer>
              </LocationSelectorContainer>
          </UserInfoContainer>
          :
    <UserInfoContainer>
        {userInfoMessageContext}
        <h3>اطلاعات شغلی</h3>
        <div style={{ marginTop : 12 }}>
            <InfoBox bold>
               <div className='last_update_container'>
                   <span>رزومه </span>
                   <span style={{ display : 'flex' , gap : 5 }}>
                       {digitsEnToFa(convertDate(convertToRegularTime(MeQuery?.data?.data?.updated_at).split(' ')[0],'jalali'))}
                       <p>:آخرین به روزرسانی</p>
                   </span>
               </div>
                <Link href={'/'}>
                    <EditButton>
                        ویرایش
                    </EditButton>
                </Link>
            </InfoBox>
        </div>
        <LocationSelectorContainer>
            <p>منطقه پرسشگری</p>
            <Cascader options={countriesData}
             showSearch
                      // multiple
              defaultValue={MeQuery?.data?.data?.prefered_districts?.length ? [
                  MeQuery?.data?.data?.prefered_districts[0].province.name ,
                  MeQuery?.data?.data?.prefered_districts[0].city.name ,
                  MeQuery?.data?.data?.prefered_districts[0].name
              ] : null}
             onChange={CascaderSelectHandler}
              status={RegionError ? 'error' : null}
             showCheckedStrategy={SHOW_CHILD}
              placement={'bottomRight'}
             placeholder="انتخاب کنید" />

            <ConfirmButtonContainer style={{ textAlign : 'left' }}>
                <Button type='primary' loading={RegionLoading} onClick={RegionConfirmHandler}>
                ثبت
            </Button>
            </ConfirmButtonContainer>
            
        </LocationSelectorContainer>
    </UserInfoContainer>
  )
}