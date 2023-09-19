import { ChangeDegreeHandler } from '@/utilities/QuestionStore';
import { Slider } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import PN from 'persian-number';
import { digitsEnToFa } from '@persian-tools/persian-tools';
import { RangeWriteContainer } from '@/styles/questionnairePanel/QuestionSetting';

export const RateQuestionWrite = ({ QuestionInfo }) => {
    const dispatcher = useDispatch();

    const DegreeChangeHandler = (newValue) => {
      dispatcher(ChangeDegreeHandler({ QuestionID : QuestionInfo.id , DegreeValue : newValue }))
    };
    
  return (
    <RangeWriteContainer>
      <p>تنظیم درجه</p>
        <Slider
          min={1}
          max={7}
          step={1}
          marks={generateObject(1,7)}
          trackStyle={{ background : '#A4ABFF' }}
          draggableTrack={true}
          tipFormatter={(e) => <span style={{ width : '100%'}}>{digitsEnToFa(e)}</span>}
          dots={true}
          onChange={DegreeChangeHandler}
          value={QuestionInfo.max}
          onDrag={(e) => console.log(e)}
        />
    </RangeWriteContainer>
  )
}
const generateObject = (start, end) => {
  const result = {};

  for (let i = start; i <= end; i++) {
    result[i] = {
      label: digitsEnToFa(i),
      style: {
        fontFamily: 'IRANSans'
      }
    };
  }

  return result;
};

// return  {
//   4: {
//     label : PN.convertEnToPe(4),
//     style : {
//       fontFamily : 'IRANSans'
//     }
//   } ,
//   5: {
//     label : PN.convertEnToPe(5),
//     style : {
//       fontFamily : 'IRANSans'
//     }
//   },
//   6: {
//     label : PN.convertEnToPe(6),
//     style : {
//       fontFamily : 'IRANSans'
//     }
//   },
//   7: {
//     label : PN.convertEnToPe(7),
//     style : {
//       fontFamily : 'IRANSans'
//     }
//   },
//   8: {
//     label : PN.convertEnToPe(8),
//     style : {
//       fontFamily : 'IRANSans'
//     }
//   },
//   9 : {
//     label : PN.convertEnToPe(9),
//     style : {
//       fontFamily : 'IRANSans'
//     }
//   } ,
//   10 : {
//     label : PN.convertEnToPe(10),
//     style : {
//       fontFamily : 'IRANSans'
//     } 
//   } ,
//   11 : {
//     label : PN.convertEnToPe(11),
//     style : {
//       fontFamily : 'IRANSans'
//     }
//   },
//   12 : {
//     label : PN.convertEnToPe(12),
//     style : {
//       fontFamily : 'IRANSans'
//     }
//   },
// };