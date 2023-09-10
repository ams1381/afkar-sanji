import { Icon } from "@/styles/icons"
import { styled } from "styled-components"

export const QuestionTypeContainer = styled.div`
  display : flex;
  justify-content : space-between;
  font-family : IRANSans;
  font-size : 13px;
  align-items: center;
  color: ${p => p.activetype ? 'var(--primary-color)' : 'auto'};

  & p 
  {
    margin-right : 0.5rem;
  }
  & i 
  {
    filter: ${p => p.activetype ? 'invert(37%) sepia(74%) saturate(1045%) hue-rotate(210deg) brightness(91%) contrast(105%)' : 'none'};
  }
`
export const QuestionTypeComponent = (Type  , TypeText , ActiveType) => 
  <QuestionTypeContainer activetype={ActiveType}>
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
export const QuestionTypeComponentGenerator = (Type,ActiveType) => {
  switch(Type)
    {
        case 'optional':
            return QuestionTypeComponent('optional','چند گزینه ای',ActiveType)
        case 'drop_down':
            return QuestionTypeComponent('SlideList','لیست کشویی',ActiveType);
        case 'integer_selective':
            return QuestionTypeComponent('Degree','درجه بندی',ActiveType)
        case 'integer_range':
            return QuestionTypeComponent('range','طیفی',ActiveType)
        case 'sort':
            return QuestionTypeComponent('Prioritize','اولویت دهی',ActiveType);
        case 'link':
            return QuestionTypeComponent('Link','لینک',ActiveType)
        case 'email_field':
            return QuestionTypeComponent('Email','ایمیل',ActiveType);
        case 'file':
            return QuestionTypeComponent('Upload','فایل',ActiveType);
        case 'number_answer':
            return QuestionTypeComponent('Number','عدد',ActiveType)
        case 'text_answer':
            return QuestionTypeComponent('QWAnswer','متنی با پاسخ',ActiveType);
        case 'group':
            return QuestionTypeComponent('GroupQuestion','سوال گروهی',ActiveType)
        case 'noanwser':
            return QuestionTypeComponent('QWOut','متنی بدون پاسخ',ActiveType);
        case 'thanks_page' : 
            return QuestionTypeComponent('Thanks','صفحه ی تشکر',ActiveType);
        case 'welcome_page' : 
            return QuestionTypeComponent('welcome','خوش آمد گویی',ActiveType);
  }
}
export const QuestionTypeIcon = (Type) => {
  switch(Type)
    {
        case 'optional':
            return <Icon name='optional' />
        case 'drop_down':
            return <Icon name='SlideList' />
        case 'integer_selective':
            return <Icon name='Degree' />
        case 'integer_range':
            return <Icon name='range' />
        case 'sort':
            return <Icon name='Prioritize' />
        case 'link':
            return <Icon name='Link' />
        case 'email_field':
            return <Icon name='Email' />
        case 'file':
            return <Icon name='Upload' />
        case 'number_answer':
            return <Icon name='Number' />
        case 'text_answer':
            return <Icon name='QWAnswer' />
        case 'group':
            return <Icon name='GroupQuestion' />
        case 'noanwser':
            return <Icon name='QWOut' />
  }
}