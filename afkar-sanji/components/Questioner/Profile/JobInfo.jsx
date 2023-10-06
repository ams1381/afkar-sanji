import { EditButton, InfoBox, UserInfoContainer , ConfirmButtonContainer , LocationSelectorContainer } from '@/styles/Questioner/profile'
import Link from 'next/link'
import React from 'react'
import { Cascader , Button } from 'antd'
import { axiosInstance } from '@/utilities/axios';
import { useEffect } from 'react';
import { useState } from 'react';
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
export const JobInfo = ({ Countries }) => {
  const [ countriesData , setCountriesData ] = useState(null);
    useEffect(() => {
     const getCountries = async () => {
      let { data } = await axiosInstance.get('/user-api/countries/');
      setCountriesData(data);
      } 
      getCountries();
    },[])
    const { SHOW_CHILD } = Cascader;
  return (
    <UserInfoContainer>
        <h3>اطلاعات شغلی</h3>
        <div style={{ marginTop : 12 }}>
            <InfoBox bold>
                <p>رزومه  آخرین بروز رسانی </p>
                <Link href={'/'}>
                    <EditButton>
                        ویرایش
                    </EditButton>
                </Link>
            </InfoBox>
        </div>
        <LocationSelectorContainer>
            <p>منطقه پرسشگری</p>
            <Cascader options={options}
             showSearch  
             onChange={(e) => console.log(e)}
             showCheckedStrategy={SHOW_CHILD}
             placeholder="انتخاب کنید" />
            
            <ConfirmButtonContainer style={{ textAlign : 'left' }}>
                <Button type='primary'>
                ثبت
            </Button>
            </ConfirmButtonContainer>
            
        </LocationSelectorContainer>
    </UserInfoContainer>
  )
}