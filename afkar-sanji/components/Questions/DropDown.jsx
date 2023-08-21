import { Select } from 'antd'
import React from 'react'
import { DropDownContainer } from '@/styles/questionnairePanel/QuestionComponent'
import { styled } from 'styled-components'

const DropDownOption = styled.div`
  color : black;
  width : 100%
  &:hover 
  {
    background : red;
  }
`
const DropDown = ({ QuestionInfo }) => {
    console.log(DropDownOptionsGenerator(QuestionInfo.options))
  return (
    <DropDownContainer>
        <Select
        showSearch
        optionFilterProp="children"
        placeholder="پاسخ خود را انتخاب یا جستجو کنید"
        style={{ width : '100%' , fontFamily : 'IRANSans' , direction : 'rtl'}}
        dropdownStyle={{ fontFamily : 'IRANSans' }}
        options={DropDownOptionsGenerator(QuestionInfo.options)}
        // filterOption={(input, option) =>
        // (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        // }
        />
    </DropDownContainer>
  )
}
const DropDownOptionsGenerator = (Options) => {
  const OptionsArray = Options.map(item => ({
    label : item.text,
    value : item.text
}))
 return OptionsArray;
}
export default DropDown;