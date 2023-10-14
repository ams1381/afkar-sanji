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
import {Icon} from "@/styles/icons";

export const JobInfo = ({ Countries , userData ,MeQuery , regions }) => {
    const [ selectedRegions , setSelectedRegions ] = useState(null);
    const [ RegionError , setRegionError ] = useState(false);
    const [ countriesData , setCountriesData ] = useState(regions ? regions[0]?.provinces?.map(ProvinceItem => ({
        label : ProvinceItem.name ,
        value : ProvinceItem.id ,
        disabled: !ProvinceItem.cities.length,
        children : ProvinceItem.cities.map(CityItem => ({
            label : CityItem.name ,
            value : CityItem.id ,
            disabled: !ProvinceItem.cities.length,
            children : CityItem.districts.map(DistrictItem => ({
                label : DistrictItem.name ,
                value : DistrictItem.id
            }))
        }))
    })) : []);
    const [ RegionLoading , setRegionLoading ] = useState(false);
    const [ userInfoMessage , userInfoMessageContext ] = message.useMessage();


    const CascaderSelectHandler = async (SelectedList) => {
        if(!regions)
            return

        let DistrictsArray = [];
        SelectedList.forEach(SelectedItem => {
            if(SelectedItem.length == 1)
            {
                regions[0].provinces.find(item => item.id == SelectedItem[0]).cities.forEach(CityItem => {
                    CityItem.districts.forEach(DistrictItem => {
                        DistrictsArray.push(DistrictItem.id);
                    })
                })
            }
            else if(SelectedItem.length == 2)
            {
                regions[0].provinces.find(item => item.id == SelectedItem[0]).cities.
                find(CityItem => CityItem.id == SelectedItem[1]).districts.forEach(DistrictItem => {
                    DistrictsArray.push(DistrictItem.id)
                })
            }
            else if(SelectedItem.length == 3)
            {
                if(SelectedItem.every=(item => typeof item == 'string'))
                {
                    console.log(SelectedItem[0],regions[0].provinces.find(item => item.name == SelectedItem[0]))
                    DistrictsArray.push(regions[0].provinces.find(item => item.name == SelectedItem[0]).cities.
                    find(CityItem => CityItem.name == SelectedItem[1]).districts.find(DistrictItem => DistrictItem.name == SelectedItem[2]).id)
                }
                else
                    DistrictsArray.push(regions[0].provinces.find(item => item.id == SelectedItem[0]).cities.
                    find(CityItem => CityItem.id == SelectedItem[1]).districts.find(DistrictItem => DistrictItem.id == SelectedItem[2]).id)
            }
        })
        if(!SelectedList)
            return
        // if(SelectedList.length == 3)
        setSelectedRegions(DistrictsArray)
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
      (MeQuery.error || MeQuery.isLoading) ?
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
                       {
                           MeQuery?.data?.data?.updated_at ? digitsEnToFa(convertDate(convertToRegularTime(MeQuery?.data?.data?.updated_at).split(' ')[0],'jalali'))
                           : ''}
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
                      multiple
              defaultValue={MeQuery?.data?.data?.prefered_districts?.length ?  MeQuery?.data?.data?.prefered_districts?.map(item => [
                  item.province.name ,
                  item.city.name ,
                  item.name
              ]) : null}
             onChange={CascaderSelectHandler}
              // displayRender={(label, selectedOptions) => console.log(label, selectedOptions)}
              // tagRender={(label , onClose , value) => console.log(label , onClose , value)}
              status={RegionError ? 'error' : null}
             showCheckedStrategy={Cascader.SHOW_PARENT}
              suffixIcon={<Icon name={'suffixIcon'} style={{ width : 11 }} />}
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