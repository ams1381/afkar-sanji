import { Icon } from "@/styles/icons"
import { styled } from "styled-components"

export const QuestionTypeContainer = styled.div`
  display : flex;
  justify-content : space-between;
  font-family : IRANSans;
  font-size : 13px;
  align-items: center;
  color: black;

  & p 
  {
    margin-right : 0.5rem;
  }
`
export const QuestionTypeComponent = (Type  , TypeText) => 
  <QuestionTypeContainer>
    <p>{TypeText}</p>
    <Icon name={Type}/>
  </QuestionTypeContainer>


export const Question_types = [
    {
      value: 'integer_range',
      label: QuestionTypeComponent('range','طیفی'),
      url_prefix : 'integerrange-questions'
    },
    {
      value: 'number_answer',
      label: QuestionTypeComponent('Number','عدد'),
      url_prefix : 'numberanswer-questions'
    },
    {
      value: 'integer_selective',
      label: QuestionTypeComponent('Degree','درجه بندی'),
      url_prefix : 'integerselective-questions'
    },
    {
      value: 'group',
      label: QuestionTypeComponent('GroupQuestion','سوال گروهی'),
      url_prefix : 'question-groups'
    },
    {
        value: 'optional',
        label: QuestionTypeComponent('optional','چند گزینه ای'),
        url_prefix : 'optional-questions'
      },
      {
        value: 'text_answer',
        label: QuestionTypeComponent('QWAnswer','متنی با پاسخ'),
        url_prefix : 'textanswer-questions'
      },
      {
        value: 'link',
        label: QuestionTypeComponent('Link','لینک'),
        url_prefix : 'link-questions'
      },
      {
        value: 'email_field',
        label: QuestionTypeComponent('Email','ایمیل'),
        url_prefix : 'email-questions'
      },
      {
        value: 'متنی بدون پاسخ',
        label: QuestionTypeComponent('QWOut','متنی بدون پاسخ'),
        url_prefix : 'noanswer-questions'
      },
      {
        value: 'drop_down',
        label: QuestionTypeComponent('SlideList','لیست کشویی'), 
        url_prefix : 'dropdown-questions'
      },
      {
        value: 'file',
        label: QuestionTypeComponent('Upload','فایل'), 
        url_prefix : 'file-questions'
      },
      {
        value: 'sort',
        label: QuestionTypeComponent('Prioritize','اولویت دهی'),
        url_prefix : 'sort-questions'
      },

]
export const QuestionTypeComponentGenerator = (Type) => {
  switch(Type)
    {
        case 'optional':
            return QuestionTypeComponent('optional','چند گزینه ای')
        case 'drop_down':
            return QuestionTypeComponent('SlideList','لیست کشویی');
        case 'integer_selective':
            return QuestionTypeComponent('Degree','درجه بندی')
        case 'integer_range':
            return QuestionTypeComponent('range','طیفی')
        case 'sort':
            return QuestionTypeComponent('Prioritize','اولویت دهی');
        case 'link':
            return QuestionTypeComponent('Link','لینک')
        case 'email_field':
            return QuestionTypeComponent('Email','ایمیل');
        case 'file':
            return QuestionTypeComponent('Upload','فایل');
        case 'number_answer':
            return QuestionTypeComponent('Number','عدد')
        case 'text_answer':
            return QuestionTypeComponent('QWAnswer','متنی با پاسخ');
        case 'group':
            return QuestionTypeComponent('GroupQuestion','سوال گروهی')
        case 'noanwser':
            return QuestionTypeComponent('QWOut','متنی بدون پاسخ');
        case 'thanks_page' : 
            return QuestionTypeComponent('Thanks','صفحه ی تشکر');
        case 'welcome_page' : 
            return QuestionTypeComponent('welcome','خوش آمد گویی');
  }
}