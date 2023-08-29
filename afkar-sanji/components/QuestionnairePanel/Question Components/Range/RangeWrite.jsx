import { ChangeDegreeHandler, ChangeLabelHandler } from '@/utilities/QuestionStore';
import { Input, Slider } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import PN from 'persian-number';
import { RangeLabelContainer, RangeLabelInput } from '@/styles/questionnairePanel/QuestionDesignPanel';
import { digitsEnToFa } from '@persian-tools/persian-tools';

export const RangeWrite = ({ QuestionInfo }) => {
    const dispatcher = useDispatch();

    const DegreeChangeHandler = (newValue) => {
      dispatcher(ChangeDegreeHandler({ QuestionID : QuestionInfo.id , DegreeValue : newValue }))
    };
    const LabelValueChangeHandler = (e,LabelName) => {
        dispatcher(ChangeLabelHandler({ QuestionID : QuestionInfo.id , Label : LabelName , LabelValue : e.target.value }))
    }
  return (
    <>
    <div>
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
          className="custom-slider"
          tipFormatter={(value) => value.toString()} // Convert the value to string
          tipProps={{ 'data-persian-value': digitsEnToFa(value) }} // Use your digitsEnToFa function
          
        />
    </div>
    <RangeLabelContainer>
        <p>برچسب ها</p>
        <div className='label_container'>
            <Input classNames='label_input' placeholder='چیزی بنویسید' onChange={e => LabelValueChangeHandler(e,'min_label')}
            defaultValue={QuestionInfo.min_label}/>
            <label>
                چپ
            </label>
        </div>
        <div className='label_container'>
            <Input classNames='label_input' placeholder='چیزی بنویسید' onChange={e => LabelValueChangeHandler(e,'mid_label')}
             defaultValue={QuestionInfo.mid_label}/>
            <label>
                وسط
            </label>
        </div>
        <div className='label_container'>
            <Input classNames='label_input' placeholder='چیزی بنویسید' onChange={e => LabelValueChangeHandler(e,'max_label')}
             defaultValue={QuestionInfo.max_label}/>
            <label>
                راست
            </label>
        </div>
    </RangeLabelContainer>
    </>
    
    
  )
}
const SlideMarkGenerator = () => {
    return  {
      4: {
        label : digitsEnToFa(4),
        style : {
          fontFamily : 'IRANSans'
        }
      } ,
      5: {
        label : digitsEnToFa(5),
        style : {
          fontFamily : 'IRANSans'
        }
      },
      6: {
        label : digitsEnToFa(6),
        style : {
          fontFamily : 'IRANSans'
        }
      },
      7: {
        label : digitsEnToFa(7),
        style : {
          fontFamily : 'IRANSans'
        }
      },
      8: {
        label : digitsEnToFa(8),
        style : {
          fontFamily : 'IRANSans'
        }
      },
      9 : {
        label : digitsEnToFa(9),
        style : {
          fontFamily : 'IRANSans'
        }
      } ,
      10 : {
        label : digitsEnToFa(10),
        style : {
          fontFamily : 'IRANSans'
        } 
      } ,
      11 : {
        label : digitsEnToFa(11),
        style : {
          fontFamily : 'IRANSans'
        }
      },
      12 : {
        label : digitsEnToFa(12),
        style : {
          fontFamily : 'IRANSans'
        }
      },
    };
  }