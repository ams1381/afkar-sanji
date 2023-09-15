import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { DropDownContainer } from '@/styles/questionnairePanel/QuestionComponent'
import { styled } from 'styled-components'
import { useDispatch , useSelector } from 'react-redux'
import { ChoseOption } from '@/utilities/AnswerStore'

const DropDown = ({ QuestionInfo }) => {
  const dispatcher = useDispatch();
  const QuestionsAnswerSet = useSelector(state => state.reducer.AnswerSet);

  const [selectedValues, setSelectedValues] = useState([]);
  useEffect(() => {
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
    {
      let selected_options_array = QuestionsAnswerSet.find(item => item.question == QuestionInfo.id).answer?.selected_options;

      setSelectedValues(QuestionInfo.options.filter(OptionItem => selected_options_array?.includes(OptionItem.id)).map(item => item.text));
    }
  },[])
  const DropDownAnswerHandler = (values) => {
    let maxSelected;
    if(QuestionInfo.max_selected_options && QuestionInfo.max_selected_options > 1)
      maxSelected = QuestionInfo.max_selected_options;
    else
      maxSelected = 1

    let selectedOptions;
    console.log(!Array.isArray(values) && typeof values == 'string' , values , maxSelected)
    if (Array.isArray(values) && values.length <= maxSelected) {
      setSelectedValues(values);
      selectedOptions = values.map(value => {
          const selectedOption = QuestionInfo.options.find(option => option.text === value);

          return { id: selectedOption.id, text: value };
        }) 
      }
       // Log the selectedOptions array, not selectedValues
    else if(!Array.isArray(values) && typeof values == 'string')
    {
      const selectedOption = QuestionInfo.options.find(option => option.text === values);
      selectedOptions = { id: selectedOption.id, text: values };
      setSelectedValues(values);
          
    }

    if (QuestionsAnswerSet && QuestionsAnswerSet.length) {
      dispatcher(ChoseOption({ QuestionID: QuestionInfo.id, ChoseOptionsArray: selectedOptions }));
  };
  }
  return (
    <DropDownContainer>
      <Select
        showSearch
        mode={QuestionInfo.max_selected_options && QuestionInfo.max_selected_options > 1 ? 'multiple' : null}
        value={selectedValues}
        onChange={DropDownAnswerHandler}
        placeholder="پاسخ خود را انتخاب کنید"
        style={{ width: '100%', fontFamily: 'IRANSans', direction: 'rtl' }}
        dropdownStyle={{ fontFamily: 'IRANSans' }}
        options={DropDownOptionsGenerator(QuestionInfo.options)}
        optionLabelProp="label"
      />
    </DropDownContainer>
  );
};
const DropDownOptionsGenerator = (Options) => {
  const OptionsArray = Options
    .filter(item => item.text && item.text !== 'null')
    .map(item => ({
      id: item.id,
      label: item.text,
      value: item.text
    }));
  return OptionsArray
}
export default DropDown;