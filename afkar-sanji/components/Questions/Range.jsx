import { QuestionnaireBodyStat } from '@/styles/folders/Questionnaire'
import { RangeLabelText, RangeQuestionAnswerItem, QuestionRangeLabel,
  RangeQuestionContainer, RangeQuestionLabelContainer , RangeQuestion} from '@/styles/questionnairePanel/QuestionComponent'
import { NumberSelect } from '@/utilities/AnswerStore'
import { digitsEnToFa } from '@persian-tools/persian-tools'
import PN from 'persian-number'
import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'

export const RangeQuestionComponent = ({ QuestionInfo }) => {
  const QuestionsAnswerSet = useSelector(state => state.reducer.AnswerSet)
  const dispatcher = useDispatch();
  const [ RangeAnswerValue , setRangeAnswerValue ] = useState(null); 
  
  useEffect(() => {
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
    {
      setRangeAnswerValue(QuestionsAnswerSet.find(item => item.question == QuestionInfo.id).answer?.integer_range);
    }
    // integer_selective
  },[])

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
    <RangeQuestion>
  <RangeQuestionContainer>
        {Array.from({ length : (QuestionInfo.max) }).map((_,index) => 
        <RangeQuestionAnswerItem key={index}> 
            <input name='range_item' checked={index == RangeAnswerValue} readOnly
            type='radio' id={'range_answer_option' + index}/>
            <label htmlFor={'range_answer_option' + index} onClick={() => RangeAnswerHandler(index)}>
              {digitsEnToFa(QuestionInfo.min == 0 ? index : index + 1)}
            </label>

          </RangeQuestionAnswerItem>
          )}
      </RangeQuestionContainer>
      <RangeQuestionLabelContainer>

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
      </RangeQuestionLabelContainer>
    </RangeQuestion>
    
  )
}
