import { QuestionnaireBodyStat } from '@/styles/folders/Questionnaire'
import { RangeLabelText, RangeQuestionAnswerItem, QuestionRangeLabel,
  RangeQuestionContainer, RangeQuestionLabelContainer , RangeQuestion} from '@/styles/questionnairePanel/QuestionComponent'
import { NumberSelect } from '@/utilities/AnswerStore'
import { digitsEnToFa } from '@persian-tools/persian-tools'
import PN from 'persian-number'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'

export const RangeQuestionComponent = ({ QuestionInfo }) => {
  const QuestionsAnswerSet = useSelector(state => state.reducer.AnswerSet)
  const dispatcher = useDispatch();
  const leftLabelRef = useRef(null);
  const midLabelRef = useRef(null);
  const rightLabelRef = useRef(null);
  const [ RangeAnswerValue , setRangeAnswerValue ] = useState(null); 
  const [ longestLabelHeight , setLongestLabelHeight ] = useState(null)

  useEffect(() => {
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
      setRangeAnswerValue(QuestionsAnswerSet.find(item => item.question == QuestionInfo.id).answer?.integer_range);
    
    // integer_selective
  },[])
  useEffect(() => {
    if(leftLabelRef.current && midLabelRef.current && rightLabelRef.current)
    {
      
      let labelsHeightArray = [ leftLabelRef.current.offsetHeight , midLabelRef.current.offsetHeight  , rightLabelRef.current.offsetHeight ]
      
      setLongestLabelHeight(labelsHeightArray.reduce((a, b) => Math.max(a, b), -Infinity))
      console.log('hi',labelsHeightArray)
      // console.log(longestLabelHeight,labelsHeightArray)
    }
  },[QuestionInfo , leftLabelRef.current , midLabelRef.current , rightLabelRef.current])
  const RangeAnswerHandler = (RangeNumber) => {
    setRangeAnswerValue(RangeNumber)
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
    {
      dispatcher(NumberSelect({
         QuestionID : QuestionInfo.id , NumberValue : RangeNumber , NumberName : 'integer_range' 
        }))
    }
  }
  return (
    <RangeQuestion longestLabelHeight={longestLabelHeight}>
  <RangeQuestionContainer >
        {Array.from({ length : (QuestionInfo.max) }).map((_,index) => 
        <>
        {/* { console.log((index == 0 || index == QuestionInfo.max || index == QuestionInfo.max / 2) ||index ==  QuestionInfo.max - 1) } */}
        <RangeQuestionAnswerItem key={index}
         haslabel={(index == 0 || index == QuestionInfo.max || index == Math.floor(QuestionInfo.max / 2) ||index ==  QuestionInfo.max - 1) ? true : null}>
            <input name='range_item' checked={index == RangeAnswerValue} readOnly
            type='radio' id={'range_answer_option' + index}/>
            <label htmlFor={'range_answer_option' + index} onClick={() => RangeAnswerHandler(index)}>
              {digitsEnToFa(QuestionInfo.min == 0 ? index : index + 1)}
            </label>
            {<QuestionRangeLabel>
              <RangeQuestionLabelContainer>
         {index == 0 && QuestionInfo.min_label && <RangeLabelText ref={leftLabelRef}>{QuestionInfo.min_label}</RangeLabelText>}
         {QuestionInfo.max % 2 != 0 && index == Math.floor(QuestionInfo.max / 2) && <RangeLabelText ref={midLabelRef}>{QuestionInfo.mid_label}</RangeLabelText>}
         {index == QuestionInfo.max -1  && QuestionInfo.max_label && <RangeLabelText ref={rightLabelRef}>{QuestionInfo.max_label}</RangeLabelText>}
         </RangeQuestionLabelContainer>
      </QuestionRangeLabel>}
          </RangeQuestionAnswerItem>
          
        </>
        
          )}
      </RangeQuestionContainer>
      {/* <RangeQuestionLabelContainer>

      { (QuestionInfo.min_label || QuestionInfo.max_label || QuestionInfo.mid_label) && <>
      <QuestionRangeLabel>
         {QuestionInfo.min_label && <RangeLabelText>{QuestionInfo.min_label}</RangeLabelText>}
      </QuestionRangeLabel> 
     <QuestionRangeLabel>
      {QuestionInfo.mid_label && QuestionInfo.max % 2 == 0 && <RangeLabelText>{QuestionInfo.mid_label}</RangeLabelText>}
      </QuestionRangeLabel> 
       <QuestionRangeLabel>
        {QuestionInfo.max_label && <RangeLabelText>{QuestionInfo.max_label}</RangeLabelText>}
      </QuestionRangeLabel> 
      </>}
      </RangeQuestionLabelContainer> */}
    </RangeQuestion>
    
  )
}
