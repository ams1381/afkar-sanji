import { ChangeDegreeHandler } from '@/utilities/QuestionStore';
import { Slider } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import PN from 'persian-number';

export const RateQuestionWrite = ({ QuestionInfo }) => {
    const dispatcher = useDispatch();

    const DegreeChangeHandler = (newValue) => {
      dispatcher(ChangeDegreeHandler({ QuestionID : QuestionInfo.id , DegreeValue : newValue }))
    };
    
  return (
    <div draggable={false}>
        <Slider
          min={4}
          max={12}
          step={1}
          marks={SlideMarkGenerator()}
          trackStyle={{ background : 'var(--primary-color)' }}
          draggableTrack={true}
          dots={true}
          onChange={DegreeChangeHandler}
          value={QuestionInfo.max}
          onDrag={(e) => console.log(e)}
        />
    </div>
  )
}
const SlideMarkGenerator = () => {
  return  {
    4: {
      label : PN.convertEnToPe(4),
      style : {
        fontFamily : 'IRANSans'
      }
    } ,
    5: {
      label : PN.convertEnToPe(5),
      style : {
        fontFamily : 'IRANSans'
      }
    },
    6: {
      label : PN.convertEnToPe(6),
      style : {
        fontFamily : 'IRANSans'
      }
    },
    7: {
      label : PN.convertEnToPe(7),
      style : {
        fontFamily : 'IRANSans'
      }
    },
    8: {
      label : PN.convertEnToPe(8),
      style : {
        fontFamily : 'IRANSans'
      }
    },
    9 : {
      label : PN.convertEnToPe(9),
      style : {
        fontFamily : 'IRANSans'
      }
    } ,
    10 : {
      label : PN.convertEnToPe(10),
      style : {
        fontFamily : 'IRANSans'
      } 
    } ,
    11 : {
      label : PN.convertEnToPe(11),
      style : {
        fontFamily : 'IRANSans'
      }
    },
    12 : {
      label : PN.convertEnToPe(12),
      style : {
        fontFamily : 'IRANSans'
      }
    },
  };
}