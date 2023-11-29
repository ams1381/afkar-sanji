import {Button, Cascader, message, Modal, Switch} from "antd";
import {
    InterviewInnerContainer
    , InterviewerHeader
    , InterViewAnswerPriceContainer
    , InterViewerNumber
    , InterviewerActivator
    , InterviewContainer
    , InterViewerStatusContainer
    , InterviewerBodyRow, DistrictSeletorContainer, DistrictSelectorContainer
} from "@/styles/questionnairePanel/QuestionSetting";
import {Icon} from "@/styles/icons";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import React, {useEffect, useRef, useState} from "react";
import {
    AnswerCountPopup
} from "@/components/QuestionnairePanel/QuestionnaireSetting/InterviwerSettings/AnswerCountPopup";
import {axiosInstance} from "@/utilities/axios";
import {PricePopup} from "@/components/QuestionnairePanel/QuestionnaireSetting/InterviwerSettings/PricePopup";
import {generateOutputArray} from "@/components/Questioner/Profile/JobInfo";

export const Interviewers = ({ Questionnaire , ChangeDistrict , refetch , ToggleCheckBoxHandler , regions }) => {
    const [ countPopupOpen , setCountPopupOpen ] = useState(false)
    const [ editPrice , setEditPrice ] = useState(false);
    const [ countriesData , setCountriesData ] = useState( []);
    const [ rejectPopup , setRejectPopup ] = useState(false);
    const [ MessageApi , MessageContext ] = message.useMessage();
    const [ confirmPriceLoading ,setConfirmLoading ] = useState(false);
    const [ caseCaderOpen , setCaseCaderOpen ] = useState(false);
    const [ RegionError , setRegionError ] = useState(false);
    const [ selectedRegions , setSelectedRegions ] = useState(null);
    const [ SelectedZone , setSelectedZone ] = useState([]);
    const casecaderRef = useRef();
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
    const ConfirmPrice = async () => {
        setConfirmLoading(true)
        try {
            await axiosInstance.post(`/interview-api/interviews/${Questionnaire.uuid}/approve-price/`);
            setConfirmLoading(false);
            setTimeout(() => {
                setEditPrice(false)
            },200)
            MessageApi.success({
                content : 'با موفقیت تایید شد'
            })
        }
        catch(err) {
            setConfirmLoading(false);
            MessageApi.error({
                content : Object.values(err.response?.data)[0]
            })
        }

    }

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
    useEffect(() => {
        if(Questionnaire && Questionnaire.districts['1'])
        {
            setSelectedZone(Questionnaire.districts['1'].provinces)
        }
    },[])
    return <InterviewContainer>
        {MessageContext}
        { rejectPopup && <PricePopup Questionnaire={Questionnaire}
             setRejectPopup={setRejectPopup}
             rejectPopup={rejectPopup} /> }
        <AnswerCountPopup refetch={refetch} Questionnaire={Questionnaire}
              setCountPopupOpen={setCountPopupOpen}
              countPopupOpen={countPopupOpen} />
        <InterviewInnerContainer>

                <InterviewerHeader>
                    <p style={{ fontSize : 18 }}>پرسش‌گران</p>
                </InterviewerHeader>
            {
                Questionnaire.price_pack ? <InterviewerBodyRow>
                    <p>قیمت تعیین شده برای هر پاسخ</p>
                    {
                        (Questionnaire.approval_status === 'pending_price_employer' || editPrice) ?
                    <InterViewAnswerPriceContainer>
                        <Button onClick={ConfirmPrice} loading={confirmPriceLoading} className={'confirm_button'}>
                            <p>تایید</p>
                            <Icon name={'Check'} />
                        </Button>
                        <Button className={'cancel_button'} onClick={() => setRejectPopup(true)}>
                            <p>رد</p>
                            <Icon name={'Close'} />
                        </Button>
                        { <p style={{ display : 'flex' , gap : 5 }}><span>تومان</span>{digitsEnToFa(Questionnaire.price_pack.price)}</p>}
                    </InterViewAnswerPriceContainer> : <InterViewAnswerPriceContainer>
                                <p style={{ display : 'flex' , gap : 5 }}><span>تومان</span>{digitsEnToFa(Questionnaire.price_pack.price)}</p>
                                <Button onClick={() => setEditPrice(true)}>
                                    <p style={{ color : 'var(--primary-color)' }}>درخواست ویرایش</p>
                                    <Icon name={'OutlinePen'} />
                                </Button>
                            </InterViewAnswerPriceContainer>
                    }
                </InterviewerBodyRow> : <p style={{ fontSize : 14 , color : 'var(--Neutral-Gray9)' }}>بسته قیمتی وجود ندارد</p>
            }
                <InterviewerBodyRow>
                    <p>
                        تعداد مورد نیاز
                    </p>
                    <InterViewerNumber>
                        <p>{Questionnaire.required_interviewer_count  && digitsEnToFa(Questionnaire.required_interviewer_count) }</p>
                            <Button onClick={() => setCountPopupOpen(!countPopupOpen)}>
                                <p>ویرایش</p>
                                <Icon name={'ArrowLeftBlue'} />
                            </Button>
                    </InterViewerNumber>
                </InterviewerBodyRow>
                <InterviewerBodyRow>
                    <p>وضعیت پرسشگری</p>
                    <InterViewerStatusContainer>
                        {Questionnaire.approval_status === 'pending_content_admin' &&  'در انتظار تایید محتوا توسط ادمین'}
                        {Questionnaire.approval_status === 'pending_level_admin' && 'در انتظار تعیین سطح توسط ادمین'}
                        {Questionnaire.approval_status === 'pending_price_admin' && 'در انتظار تایید قیمت توسط ادمین' }
                        {Questionnaire.approval_status === 'approved_price_employer' && 'قیمت تایید شده توسط کارفرما'}
                        {Questionnaire.approval_status === 'rejected_price_employer' && 'قیمت رد شده توسط کارفرما'}
                        {Questionnaire.approval_status === 'rejected_content_admin' && 'محتوا رد شده توسط ادمین'}
                        <Button type={'primary'}>
                            شارژ کیف پول
                        </Button>
                    </InterViewerStatusContainer>
                </InterviewerBodyRow>
                <InterviewerBodyRow onClick={() => ToggleCheckBoxHandler(!Questionnaire.is_active,'is_active')}
                        style={{ cursor : 'pointer' }}
                        disabled={(!Questionnaire.required_interviewer_count || !Questionnaire.answer_count_goal)}>
                    <p>فعال سازی برای پرسش‌گری</p>
                    <InterviewerActivator>
                        { !Questionnaire.required_interviewer_count && <p>بخش‌های «هدف گذاری» و «تعداد مورد نیاز» را کامل کنید</p>}
                        <Switch checked={Questionnaire.is_active}
                                onChange={() => ToggleCheckBoxHandler(!Questionnaire.is_active,'is_active')}
                                disabled={(!Questionnaire.required_interviewer_count || !Questionnaire.answer_count_goal)} />
                    </InterviewerActivator>
                </InterviewerBodyRow>
            <DistrictSelectorContainer>
                <p>منطقه پرسگشری</p>
                <Cascader options={countriesData}
                          showSearch
                          multiple
                          ref={casecaderRef}
                          open={caseCaderOpen}
                          onFocus={() => setCaseCaderOpen(true)}
                          onBlur={() => setCaseCaderOpen(false)}
                          defaultValue={
                              (Questionnaire?.districts['1'] &&  Questionnaire.districts['1'].provinces)  ?
                                  generateOutputArray(Questionnaire?.districts['1'].provinces) : []
                          }
                          notFoundContent={'موردی یافت نشد'}
                          onChange={(SelectedList) => {
                              CascaderSelectHandler(SelectedList,regions,setSelectedZone,setSelectedRegions,setRegionError,ChangeDistrict)

                            }}
                          // status={RegionError ? 'error' : null}
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
            </DistrictSelectorContainer>
            </InterviewInnerContainer>
    </InterviewContainer>
}
const CascaderSelectHandler = async (SelectedList,regions,setSelectedZone,setSelectedRegions,setRegionError,ChangeDistrict) => {
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
    ChangeDistrict(DistrictsArray)
    setRegionError(false)


}