import { ChangeDegreeHandler, ChangeLabelHandler } from '@/utilities/stores/QuestionStore';
import { Input, Slider } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import PN from 'persian-number';
import { RangeLabelContainer, RangeLabelInput , SliderContainer } from '@/styles/questionnairePanel/QuestionDesignPanel';
import { digitsEnToFa } from '@persian-tools/persian-tools';

export const RangeWrite = ({ QuestionInfo }) => {
    const dispatcher = useDispatch();

    const DegreeChangeHandler = (newValue) => {
      dispatcher(ChangeDegreeHandler({
         QuestionID : QuestionInfo.id , 
         DegreeValue : newValue ,
         group : QuestionInfo.group
        }))
    };
    const LabelValueChangeHandler = (e,LabelName) => {
        dispatcher(ChangeLabelHandler({ 
          QuestionID : QuestionInfo.id , 
          Label : LabelName , 
          LabelValue : e.target.value ,
          group : QuestionInfo.group
        }))
    }
  return (
    <div style={{ textAlign : 'right' , color : 'var(--Neutral-Gray9)' }}>
    <p>تنظیم طیف</p>
    <SliderContainer>
        <Slider
          min={3}
          max={11}
          step={1}
          marks={SlideMarkGenerator(3,12)}
          trackStyle={{ background : '#A4ABFF' }}
          draggableTrack={true}
          dots={true}
          onChange={DegreeChangeHandler}
          value={QuestionInfo.max ? QuestionInfo.max  : 3}
          tipFormatter={(e) => <span style={{ width : '100%'}}>{digitsEnToFa(e)}</span>}
          style={{ marginTop : 20 }}
          className="custom-slider"/>
    </SliderContainer>
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
    </div>   
  )
}
const SlideMarkGenerator = (start, end) => {
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