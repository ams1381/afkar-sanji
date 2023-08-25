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

  return (
    <DropDownContainer>
        <Select
        showSearch
        // optionFilterProp="children"
        placeholder="پاسخ خود را انتخاب یا جستجو کنید"
        style={{ width : '100%' , fontFamily : 'IRANSans' , direction : 'rtl'}}
        dropdownStyle={{ fontFamily : 'IRANSans' }}
        options={DropDownOptionsGenerator(QuestionInfo.options)}
        // filterOption={(input, option) =>
        // (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        // }
        optionLabelProp='label'
        />
    </DropDownContainer>
  )
}
const DropDownOptionsGenerator = (Options) => {
  const OptionsArray = []
   Options.forEach(item => {
    if(item.text != 'null')
    OptionsArray.push({
        label : item.text,
        value : item.text
    })
  })
  return OptionsArray
}
export default DropDown;