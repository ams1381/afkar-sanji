import { WelcomeComponentContainer , QuestionComponentContainer } from '@/styles/questionnairePanel/QuestionComponent';
import { Button } from 'antd'
import React from 'react'

const WelcomeComponent = ({ WelcomeInfo , SetCurrentIndex}) => {
  const regex = /(<([^>]+)>)/gi;
  return (
    <QuestionComponentContainer>
      <WelcomeComponentContainer>
          <p>{WelcomeInfo.title ? WelcomeInfo.title.replace(regex,"") : ''}</p>
          <p>{WelcomeInfo.description ? WelcomeInfo.description.replace(regex,"") : ''}</p>
          <Button type='primary' onClick={SetCurrentIndex ? () => SetCurrentIndex(0) : ''}>
            {WelcomeInfo.button_text ? WelcomeInfo.button_text.replace(regex,"") : ''}
            </Button>
      </WelcomeComponentContainer>
    </QuestionComponentContainer>
  )
}
export default WelcomeComponent;