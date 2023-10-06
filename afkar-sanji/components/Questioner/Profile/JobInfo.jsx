import { EditButton, InfoBox, UserInfoContainer , ConfirmButtonContainer , LocationSelectorContainer } from '@/styles/Questioner/profile'
import Link from 'next/link'
import React from 'react'
import {Cascader, Button, message} from 'antd'
import { axiosInstance } from '@/utilities/axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {convertDate, convertToRegularTime} from "@/components/QuestionnairePanel/SettingPanel";
import {digitsEnToFa} from "@persian-tools/persian-tools";
const options = [
    {
      value: 'zhejiang',
      label: 'تهران',
      children: [
        {
          value: 'hangzhou',
          label: 'کرج',
          children: [
            {
              value: 'xihu',
              label: 'اوشاخلاری ',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
export const JobInfo = ({ Countries , userData , regions }) => {
    const [ selectedRegions , setSelectedRegions ] = useState(null);
    const [ RegionError , setRegionError ] = useState(false);
    const [ countriesData , setCountriesData ] = useState(regions[0].provinces?.map(ProvinceItem => ({
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
    })));
    const [ RegionLoading , setRegionLoading ] = useState(false);
    const [ userInfoMessage , userInfoMessageContext ] = message.useMessage();

    useEffect(() => {
        // let test = async () => {
        //     await
        //     axiosInstance.post('/user-api/countries/1/provinces/4/cities/1/districts/',{ name : 'تست 1' })
        // }
        // test()
    },[])

    const CascaderSelectHandler = async (SelectedList) => {
        console.log(SelectedList)
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
            console.log(err)
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
    <UserInfoContainer>
        {userInfoMessageContext}
        <h3>اطلاعات شغلی</h3>
        <div style={{ marginTop : 12 }}>
            <InfoBox bold>
               <div className='last_update_container'>
                   <span>رزومه </span>
                   <span style={{ display : 'flex' , gap : 5 }}>
                       {digitsEnToFa(convertDate(convertToRegularTime(userData.updated_at).split(' ')[0],'jalali'))}
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
             // showSearch
              defaultValue={[
                  userData.prefered_districts[0].province.name ,
                  userData.prefered_districts[0].city.name ,
                  userData.prefered_districts[0].name
              ]}
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