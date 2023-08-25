import { QuestionnaireBodyStat } from '@/styles/folders/Questionnaire'
import { RangeLabelText, RangeQuestionAnswerItem, QuestionRangeLabel,
  RangeQuestionContainer, RangeQuestionLabelContainer } from '@/styles/questionnairePanel/QuestionComponent'
import PN from 'persian-number'
import React from 'react'

export const RangeQuestionComponent = ({ QuestionInfo }) => {
  
  return (
    <div>
  <RangeQuestionContainer>
        {Array.from({ length : QuestionInfo.max }).map((_,index) => 
        <RangeQuestionAnswerItem key={index}>
            <input type='checkbox' id={'range_answer_option' + index}/>
            <label htmlFor={'range_answer_option' + index}>
              {PN.convertEnToPe(index + 1)}
            </label>

          </RangeQuestionAnswerItem>
          )}
      </RangeQuestionContainer>
      <RangeQuestionLabelContainer>

      { QuestionInfo.min_label ? <QuestionRangeLabel>
         <RangeLabelText>{QuestionInfo.min_label}</RangeLabelText>
      </QuestionRangeLabel> : ''}
      { QuestionInfo.mid_label ?  <QuestionRangeLabel>
      <RangeLabelText>{QuestionInfo.mid_label}</RangeLabelText>
      </QuestionRangeLabel> : ''}
      { QuestionInfo.max_label ? <QuestionRangeLabel>
        <RangeLabelText>{QuestionInfo.max_label}</RangeLabelText>
      </QuestionRangeLabel> : '' }
      </RangeQuestionLabelContainer>
    </div>
    
  )
}
