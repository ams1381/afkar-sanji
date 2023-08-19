import { Select } from 'antd'
import React from 'react'
import { DropDownContainer } from '@/styles/questionnairePanel/QuestionComponent'

const DropDown = ({ QuestionInfo }) => {
    console.log(QuestionInfo)
  return (
    <DropDownContainer>
        <Select
        showSearch
        optionFilterProp="children"
        placeholder="پاسخ خود را انتخاب یا جستجو کنید"
        style={{ width : '100%' , fontFamily : 'IRANSans'}}
        dropdownStyle={{ fontFamily : 'IRANSans' }}
        // filterOption={(input, option) =>
        // (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        // }
        />
    </DropDownContainer>
  )
}
export default DropDown;