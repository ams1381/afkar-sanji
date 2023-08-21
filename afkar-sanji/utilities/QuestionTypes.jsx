import { Icon } from "@/styles/icons"
import { styled } from "styled-components"

export const QuestionTypeContainer = styled.div`
  display : flex;
  justify-content : space-between;
  font-family : IRANSans;
  font-size : 13px;
  align-items: center;
  color: var(--primary-color);
`
export const QuestionTypeComponent = (Type  , TypeText) => 
  <QuestionTypeContainer>
    <p>{TypeText}</p>
    <Icon name={Type}/>
  </QuestionTypeContainer>


export const Question_types = [
    {
      value: 'welcome_page',
      label: QuestionTypeComponent('welcome','خوش آمد گویی'),
    },
    {
      value: 'integer_range',
      label: QuestionTypeComponent('range','طیفی'),
    },
    {
      value: 'number',
      label: QuestionTypeComponent('Number','عدد'),
    },
    {
        value: 'چند گزینه ای',
        label: QuestionTypeComponent('optional','چند گزینه ای'),
      },
      {
        value: 'textanswer',
        label: QuestionTypeComponent('QWAnswer','متنی با پاسخ'),
      },
      {
        value: 'link',
        label: QuestionTypeComponent('Link','لینک'),
      },
      {
        value: 'email_field',
        label: QuestionTypeComponent('Email','ایمیل'),
      },
      {
        // value: 'متنی بدون پاسخ',
        label: QuestionTypeComponent('QWOutAnswer','متنی بدون پاسخ'),
      },
      {
        // value: 'ایمیل',
        label: QuestionTypeComponent('Email','ایمیل'), 
      },
      {
        value: 'sort',
        label: QuestionTypeComponent('Prioritize','اولویت دهی'),
      },
      {
        value: 'thanks_page',
        label: QuestionTypeComponent('Thanks','صفحه ی تشکر'),
      },

]