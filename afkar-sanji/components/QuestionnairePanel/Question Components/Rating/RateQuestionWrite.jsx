import { Slider } from 'antd'
import React, { useState } from 'react'

export const RateQuestionWrite = ({ QuestionInfo }) => {
    const [inputValue, setInputValue] = useState(1);

    const onChange = (newValue) => {
      setInputValue(newValue);
    };
  return (
    <div>
        <Slider
          min={4}
          max={12}
          step={1}
          trackStyle={{ background : 'var(--primary-color)' }}
          draggableTrack={true}
          dots={true}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
    </div>
  )
}
