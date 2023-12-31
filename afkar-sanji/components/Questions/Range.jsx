import { QuestionnaireBodyStat } from '@/styles/folders/Questionnaire'
import { RangeLabelText, RangeQuestionAnswerItem, QuestionRangeLabel,
  RangeQuestionContainer, RangeQuestionLabelContainer , RangeQuestion} from '@/styles/questionnairePanel/QuestionComponent'
import { NumberSelect } from '@/utilities/stores/AnswerStore'
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
  const [ longestlabelheight , setlongestlabelheight ] = useState(null)

  useEffect(() => {
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
      setRangeAnswerValue(QuestionsAnswerSet.find(item => item.question == QuestionInfo.id).answer?.integer_range);

      window.addEventListener('resize',() => {
        const labelRefs = [leftLabelRef, midLabelRef, rightLabelRef];
        const labelsHeightArray = labelRefs
          .map(ref => (ref && ref.current ? ref.current.offsetHeight : null))
          .filter(height => height !== null);
  
      const longestlabelheight = labelsHeightArray.reduce((a, b) => Math.max(a, b), -Infinity);
  
      setlongestlabelheight(longestlabelheight);
      })
  },[])
  useEffect(() => {
      const labelRefs = [leftLabelRef, midLabelRef, rightLabelRef];
      const labelsHeightArray = labelRefs
        .map(ref => (ref && ref.current ? ref.current.offsetHeight : null))
        .filter(height => height !== null);

    const longestlabelheight = labelsHeightArray.reduce((a, b) => Math.max(a, b), -Infinity);

    setlongestlabelheight(longestlabelheight);
  },[QuestionInfo , leftLabelRef.current , midLabelRef.current , rightLabelRef.current])
  const RangeAnswerHandler = (RangeNumber) => {
    if(QuestionInfo.min == 0)
      setRangeAnswerValue(RangeNumber)
    else
      setRangeAnswerValue(RangeNumber + 1)
      if(QuestionsAnswerSet && QuestionsAnswerSet.length)
      {
        dispatcher(NumberSelect({
          QuestionID : QuestionInfo.id ,
           NumberValue : QuestionInfo.min == 0 ? RangeNumber : RangeNumber + 1 ,
            NumberName : 'integer_range' 
          }))
      }
  }
  return (
    <RangeQuestion longestlabelheight={longestlabelheight}>
  <RangeQuestionContainer >
        {Array.from({ length : (QuestionInfo.max) }).map((_,index) => 
        <>
        {/* { console.log((index == 0 || index == QuestionInfo.max || index == QuestionInfo.max / 2) ||index ==  QuestionInfo.max - 1) } */}
        <RangeQuestionAnswerItem key={index}
         haslabel={(index == 0 || index == QuestionInfo.max || index == Math.floor(QuestionInfo.max / 2) ||index ==  QuestionInfo.max - 1) ? true : null}>
            <input name='range_item' checked={QuestionInfo.min == 0 ? index == RangeAnswerValue : index + 1 == RangeAnswerValue } readOnly
            type='radio' id={'range_answer_option' + index}/>
            <label htmlFor={'range_answer_option' + index} onClick={() => RangeAnswerHandler(index)}>
              {digitsEnToFa(QuestionInfo.min == 0 ? index : index + 1)}
            </label>
            {<QuestionRangeLabel>
              <RangeQuestionLabelContainer>
         {index == 0 && QuestionInfo.min_label && <RangeLabelText leftL ref={leftLabelRef}>{QuestionInfo.min_label}</RangeLabelText>}
         {QuestionInfo.max % 2 != 0 && QuestionInfo.mid_label && index == Math.floor(QuestionInfo.max / 2) && 
         <RangeLabelText midL ref={midLabelRef}>{QuestionInfo.mid_label}</RangeLabelText>}
         {index == QuestionInfo.max -1  && QuestionInfo.max_label && 
         <RangeLabelText rightL ref={rightLabelRef}>{QuestionInfo.max_label}</RangeLabelText>}
         </RangeQuestionLabelContainer>
      </QuestionRangeLabel>}
          </RangeQuestionAnswerItem>
          
        </>
        
          )}
      </RangeQuestionContainer>
    </RangeQuestion>
    
  )
}
