import {
    ConfirmButtonContainer,
    EditButton,
    InfoBox,
    LocationSelectorContainer,
    UserInfoContainer
} from '@/styles/Questioner/profile'
import Link from 'next/link'
import React, {useEffect, useRef, useState} from 'react'
import {Button, Cascader, message, Skeleton} from 'antd'
import {axiosInstance} from '@/utilities/axios';
import {convertDate, convertToRegularTime} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingPanel";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {Icon} from "@/styles/icons";

export const JobInfo = ({ Countries , userData ,MeQuery , regions }) => {
    const [ selectedRegions , setSelectedRegions ] = useState(null);
    const [ RegionError , setRegionError ] = useState(false);
    const [ countriesData , setCountriesData ] = useState( []);
    const [ caseCaderOpen , setCaseCaderOpen ] = useState(false);
    const [ RegionLoading , setRegionLoading ] = useState(false);
    const [ SelectedZone , setSelectedZone ] = useState([]);
    const casecaderRef = useRef();
    const [ userInfoMessage , userInfoMessageContext ] = message.useMessage();

    useEffect(() => {
        if(MeQuery.data?.data && MeQuery.data?.data.preferred_districts['2'])
        {
            setSelectedZone(MeQuery.data?.data.preferred_districts['2'].provinces)
        }
    },[MeQuery])

    useEffect(() => {
        if(regions)
        setCountriesData(regions[0]?.provinces?.map(ProvinceItem => ({
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
        })))
    },[regions])
    const CascaderSelectHandler = async (SelectedList) => {
        if(!regions)
            return
        let DistrictsArray = [];
        let SelectedZonde = []
        SelectedList.forEach(SelectedItem => {
            if(SelectedItem.length == 1)
            {
                SelectedZonde.push(regions[0]?.provinces.find(item => item.id == SelectedItem[0]))
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
                SelectedZonde.push({
                    name : regions[0].provinces.find(item => item.id == SelectedItem[0]).name ,
                    id : regions[0].provinces.find(item => item.id == SelectedItem[0]).id ,
                    cities : [{
                        name : regions[0].provinces.find(item => item.id == SelectedItem[0]).cities.
                        find(CityItem => CityItem.id == SelectedItem[1]).name ,
                        id : regions[0].provinces.find(item => item.id == SelectedItem[0]).cities.
                        find(CityItem => CityItem.id == SelectedItem[1]).id ,
                        districts : regions[0].provinces.find(item => item.id == SelectedItem[0]).cities.
                        find(CityItem => CityItem.id == SelectedItem[1]).districts
                    }]
                })
            }
            else if(SelectedItem.length == 3)
            {
                if(SelectedItem.every(item => typeof item === 'string'))
                {

                    DistrictsArray.push(regions[0].provinces.find(item => item.name == SelectedItem[0]).cities.
                    find(CityItem => CityItem.name == SelectedItem[1]).districts.find(DistrictItem => DistrictItem.name == SelectedItem[2]).id)

                    SelectedZonde.push({
                        name : regions[0].provinces.find(item => item.name == SelectedItem[0]).name ,
                        id : regions[0].provinces.find(item => item.name == SelectedItem[0]).id ,
                        cities : [{
                            name : regions[0].provinces.find(item => item.name == SelectedItem[0]).cities.
                            find(CityItem => CityItem.name == SelectedItem[1]).name ,
                            id : regions[0].provinces.find(item => item.id == SelectedItem[0]).cities.
                            find(CityItem => CityItem.name == SelectedItem[1]).id ,
                            districts : [regions[0].provinces.find(item => item.name == SelectedItem[0]).cities.
                            find(CityItem => CityItem.name == SelectedItem[1]).districts.find(DistrictItem => DistrictItem.name == SelectedItem[2])]
                        }]
                    })
                }
                else
                    DistrictsArray.push(regions[0].provinces.find(item => item.id == SelectedItem[0]).cities.
                    find(CityItem => CityItem.id == SelectedItem[1]).districts.find(DistrictItem => DistrictItem.id == SelectedItem[2]).id)

                SelectedZonde.push({
                    name : regions[0].provinces.find(item => item.id == SelectedItem[0]).name ,
                    id : regions[0].provinces.find(item => item.id == SelectedItem[0]).id ,
                    cities : [{
                        name : regions[0].provinces.find(item => item.id == SelectedItem[0]).cities.
                        find(CityItem => CityItem.id == SelectedItem[1]).name ,
                        id : regions[0].provinces.find(item => item.id == SelectedItem[0]).cities.
                        find(CityItem => CityItem.id == SelectedItem[1]).id ,
                        districts : [regions[0].provinces.find(item => item.id == SelectedItem[0]).cities.
                        find(CityItem => CityItem.id == SelectedItem[1]).districts.find(DistrictItem => DistrictItem.id == SelectedItem[2])]
                    }]
                })
            }
        })
        if(!SelectedList)
            return
        // if(SelectedList.length == 3)
        // console.log(SelectedZonde)
        setSelectedZone(SelectedZonde)
        setSelectedRegions(DistrictsArray)
        setRegionError(false)
    }

    const RegionConfirmHandler = async () => {
        if(!selectedRegions)
            return
        setRegionLoading(true)
        try {
            await axiosInstance.patch('/user-api/users/me/', {
                'preferred_districts' : selectedRegions
            })
            userInfoMessage.success({
                content : 'با موفقیت ثبت شد'
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

    function generateDistrictsLabel(Provinces) {
        const pTags = [];

        Provinces.forEach((province) => {
            const provinceName = province.name;
            const cities = province.cities;

            cities.forEach((city) => {
                const cityName = city.name;
                const districtNames = city.districts.map((district) => district.name);

                const pTag = <p onClick={() => {
                    setCaseCaderOpen(true)
                    if(casecaderRef.current)
                        casecaderRef.current.focus();
                }} key={city.id}>{cityName + ' / ' + districtNames.join('، ')}</p>;
                pTags.push(pTag);
            });
        });

        return pTags;
    }

  return (
      (!regions && MeQuery.error || MeQuery.isLoading) ?
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
          regions && <UserInfoContainer>
        {userInfoMessageContext}
        <h3>اطلاعات شغلی</h3>
        <div style={{ marginTop : 12 }}>
            { MeQuery?.data?.data?.resume ? <InfoBox bold>
                <div className='last_update_container'>
                    <span>رزومه </span>
                    <span style={{display: 'flex', gap: 5}}>
                       {
                           MeQuery?.data?.data?.updated_at ? digitsEnToFa(convertDate(convertToRegularTime(MeQuery?.data?.data?.updated_at).split(' ')[0], 'jalali'))
                               : ''}
                        <p>:آخرین به روزرسانی</p>
                   </span>
                </div>
                <Link href={'/questioner/resume/make'}>
                    <EditButton>
                        ویرایش
                    </EditButton>
                </Link>
            </InfoBox> :
                <InfoBox bold>
                    <p>برای دریافت پروژه این بخش را کامل کنید</p>
                    <Link href={'/questioner/'}>
                        <Button type={'primary'}>وارد کردن رزومه</Button>
                    </Link>
            </InfoBox>}
        </div>
        <LocationSelectorContainer>
            <p>منطقه پرسشگری</p>
            <Cascader options={countriesData}
             showSearch
              multiple
              ref={casecaderRef}
              open={caseCaderOpen}
              onFocus={() => setCaseCaderOpen(true)}
              onBlur={() => setCaseCaderOpen(false)}
              defaultValue={
                  MeQuery?.data?.data?.preferred_districts['1'] ?
                      generateOutputArray(MeQuery?.data?.data?.preferred_districts['1'].provinces) : []
              }
              notFoundContent={'موردی یافت نشد'}
             onChange={CascaderSelectHandler}
              status={RegionError ? 'error' : null}
             showCheckedStrategy={Cascader.SHOW_PARENT}
              suffixIcon={<Icon name={'suffixIcon'} style={{ width : 11 }} />}
              placement={'bottomRight'}
             placeholder="انتخاب کنید" />
            { (SelectedZone.length) ?
                <div className={'selected_districts'}>
                {
                    generateDistrictsLabel(SelectedZone).map(item => item)
                }
            </div>
            : ''}
            <ConfirmButtonContainer style={{ textAlign : 'left' }}>
                <Button type='primary' loading={RegionLoading} onClick={RegionConfirmHandler}>
                ثبت
            </Button>
            </ConfirmButtonContainer>
            
        </LocationSelectorContainer>
    </UserInfoContainer>
  )
}
export function generateOutputArray(dataArray) {
    const outputArray = [];
    console.log(dataArray)
    if(!dataArray)
        return
    for (const province of dataArray) {
        const provinceId = province.id;

        for (const city of province.cities) {
            const cityId = city.id;

            for (const district of city.districts) {
                const districtIds = [provinceId, cityId, district.id];
                outputArray.push(districtIds);
            }
        }
    }

    return outputArray;
}
