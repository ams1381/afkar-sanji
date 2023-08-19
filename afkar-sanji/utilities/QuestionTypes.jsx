import { Icon } from "@/styles/icons"
import { styled } from "styled-components"

export const QuestionTypeContainer = styled.div`
  display : flex;
  justify-content : space-between;
  color : black;
  font-family : IRANSans;
  font-size : 13px;
  align-items: center;
`
const QuestionTypeComponent = (Type  , TypeText) => 
  <QuestionTypeContainer>
    <p>{TypeText}</p>
    <Icon name={Type}/>
  </QuestionTypeContainer>


export const Question_types = [
    {
      value: 'خوش آمد گویی',
      label: QuestionTypeComponent('welcome','خوش آمد گویی'),
      type : 'Welcome'
    },
    {
      value: 'طیفی',
      label: QuestionTypeComponent('range','طیفی'),
      type : 'Integer_range'
    },
    {
        value: 'چند گزینه ای',
        label: QuestionTypeComponent('optional','چند گزینه ای'),
        type : 'Optional'
      },
      {
        value: 'متنی با پاسخ',
        label: QuestionTypeComponent('QWAnswer','متنی با پاسخ'),
        type : 'Free'
      },
      {
        value: 'درجه بندی',
        label: QuestionTypeComponent('Link',' لینک'),
        type : 'Link'
      },
      {
        value: 'ایمیل',
        label: QuestionTypeComponent('Email','ایمیل'),
        type : 'multiple-option'
      },
      
      {
        value: 'صفحه ی تشکر',
        label: QuestionTypeComponent('Thanks','صفحه ی تشکر'),
        type : 'Thanks'
      },

  ]