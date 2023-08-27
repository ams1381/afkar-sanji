import { OptionalAnswerBlockContainer } from '@/styles/questionnairePanel/QuestionComponent';
import { Checkbox, Input } from 'antd';
import React, { useState } from 'react';

const OptionalComponent = ({ QuestionInfo }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState("");
  const regex = /(<([^>]+)>)/gi;
  const cleanText = (text) => {
    
    return text.replace(regex, '');
  };

  const handleCheckboxChange = (value) => {
    const { max_selected_options } = QuestionInfo;
  
    if (value === '<span>همه گزینه ها</span>' || value === '<span>هیچ کدام</span>' || value === '<span>سایر</span>') {
      setSelectedValues([value]); // Select only the special value
      
    (value == '<span>سایر</span>') ? setShowInput(true) : setOtherInputValue("");
    } else {
      setSelectedValues(prevSelected => {
        const cleanedValue = cleanText(value);
  
        let updatedSelected = prevSelected.filter(
          val =>
            cleanText(val) !== 'همه گزینه ها' &&
            cleanText(val) !== 'هیچ کدام' &&
            cleanText(val) !== 'سایر'
        );
        if (updatedSelected.includes('همه گزینه ها') || updatedSelected.includes('هیچ کدام')) {
          updatedSelected.length = 0;
          setShowInput(false);
        }
        if (!updatedSelected.includes(cleanedValue)) {
          if (!max_selected_options || updatedSelected.length < max_selected_options) {
            updatedSelected.push(cleanedValue);
          }
        } else {
          updatedSelected = updatedSelected.filter(val => val !== cleanedValue);
        }
  
        return updatedSelected;
      });
      setShowInput(false);
      setOtherInputValue("");
    }
  };

  return (
    <OptionalAnswerBlockContainer vertical={QuestionInfo.is_vertical ? 'active' : null}>
      {QuestionInfo.options.map(item => (
        <label className='OptionalAnswerItemContainer' key={item.id}>
          <Checkbox
            value={item.text}
            onChange={() => handleCheckboxChange(item.text)}
            name='optional_answer_item'
            checked={selectedValues.includes(item.text)}
          />
            {item.text !== 'null'
              && 
              <>{(item.text?.replace(regex,'') === 'سایر' && showInput) ? <Input placeholder='چیزی بنویسید' />
              : <p>{cleanText(item.text)}</p>
             }</>}
    
        </label>
      ))}
    </OptionalAnswerBlockContainer>
  );
};

export default OptionalComponent;