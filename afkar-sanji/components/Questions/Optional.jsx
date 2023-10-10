import {
  OptionalAnswerBlockContainer,
  OptionalItemContainer,
  QuestionTitle
} from '@/styles/questionnairePanel/QuestionComponent';
import { ChoseOption, OtherOptionHandler } from '@/utilities/AnswerStore';
import { Checkbox, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

const OptionalComponent = ({ QuestionInfo }) => {
  const dispatcher = useDispatch();
  const QuestionsAnswerSet = useSelector(state => state.reducer.AnswerSet);
  const [selectedValues, setSelectedValues] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState("");
  const [ isRandom , setIsRandom ] = useState(QuestionInfo.is_random_options);
  const [ QuestionOptions , setQuestionOptions ] = useState(QuestionInfo.options);
  const regex = /(<([^>]+)>)/gi;
  // let shuffledOptions = QuestionInfo.is_random_options
  // ? shuffleArray(QuestionInfo.options) : QuestionInfo.options;
  useEffect(() => {
    if(QuestionInfo.is_random_options)
    {
      // setIsRandom(true);
      setQuestionOptions(shuffleArray(QuestionInfo.options))
    }
    else
      setQuestionOptions((QuestionInfo.options))
    
  },[QuestionInfo])
  const cleanText = (text) => {
    return text?.replace(regex, '');
  };
  useEffect(() => {
      if(QuestionsAnswerSet && QuestionsAnswerSet.length)
      {
        dispatcher(ChoseOption({ 
           QuestionID : QuestionInfo.id ,
           ChoseOptionsArray : selectedValues ,
           other_text : otherInputValue
        }))
      }
  },[selectedValues , otherInputValue])
  useEffect(() => {
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
    {
      let selected_options_array = QuestionsAnswerSet.find(item => item.question == QuestionInfo.id).answer?.selected_options;
      setSelectedValues(QuestionInfo.options.filter(OptionItem => selected_options_array?.includes(OptionItem.id)));
      if(QuestionsAnswerSet.find(item => item.question == QuestionInfo.id).answer?.other_text)
      {

        setShowInput(true);
        setOtherInputValue(QuestionsAnswerSet.find(item => item.question == QuestionInfo.id).answer?.other_text)
      }
    }
  },[])
  const handleCheckboxChange = (item) => {
    const max_selected_options = QuestionInfo.max_selected_options || 1;
    const cleanedValue = cleanText(item.text);
  
    if (
      item.text === '<span>همه گزینه ها</span>' ||
      item.text === '<span>هیچ کدام</span>' ||
      item.text === '<span>سایر</span>'
    ) {
      setSelectedValues([item]); 
      
      if (item.text === '<span>سایر</span>') {
        setShowInput(true);
        setOtherInputValue("");
      } else {
        setShowInput(false);
      }
    } else {
      setSelectedValues(prevSelected => {
        let updatedSelected;

        if (max_selected_options === 1) {
          updatedSelected = prevSelected[0]?.id === item.id ? [] : [item];
        } else {
          updatedSelected = prevSelected.filter(val =>
            cleanText(val.text) !== 'همه گزینه ها' &&
            cleanText(val.text) !== 'هیچ کدام' &&
            cleanText(val.text) !== 'سایر'
          );
  
          if (
            updatedSelected.some(val => cleanText(val.text) === 'همه گزینه ها') ||
            updatedSelected.some(val => cleanText(val.text) === 'هیچ کدام')
          ) {
            updatedSelected.length = 0;
            setShowInput(false);
          }
  
          if (!updatedSelected.some(val => (cleanText(val.text) === cleanedValue && item.id === val.id))) {
            if (!max_selected_options || updatedSelected.length < max_selected_options) {
              updatedSelected.push(item);
            }
          } else {
            updatedSelected = updatedSelected.filter(val => (val.id !== item.id));
          }
        }
  
        return updatedSelected;
      });
  
      setShowInput(false);
      setOtherInputValue("");
    }

  };


  return (
    <OptionalAnswerBlockContainer vertical={QuestionInfo.is_vertical ? 'active' : null}>
      {QuestionOptions.map(item => (
        <OptionalItemContainer key={item.id}>
          <Checkbox
            value={item.text}
            onChange={() => handleCheckboxChange(item)}
            key={item.id}
            name='optional_answer_item'
            checked={selectedValues.some(val => val.id === item.id)}
          />
          {item.text !== 'null' &&
            <>{(item.text?.replace(regex,'') === 'سایر' && showInput) ? <Input onChange={(e) => setOtherInputValue(e.target.value)}
             placeholder='چیزی بنویسید' value={otherInputValue} />
            : <p>{cleanText(item.text)}</p>
            }</>}
        </OptionalItemContainer>
      ))}
    </OptionalAnswerBlockContainer>
  );
};

export default OptionalComponent;