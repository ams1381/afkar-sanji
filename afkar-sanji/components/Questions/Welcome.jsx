import { WelcomeComponentContainer , QuestionComponentContainer } from '@/styles/questionnairePanel/QuestionComponent';
import { Button } from 'antd'
import React from 'react'

const WelcomeComponent = ({ WelcomeInfo }) => {
  const regex = /(<([^>]+)>)/gi;
  return (
    <QuestionComponentContainer>
      <WelcomeComponentContainer>
          <p>{WelcomeInfo.title.replace(regex,"")}</p>
          <p>{WelcomeInfo.description.replace(regex,"")}</p>
          <Button type='primary'>{WelcomeInfo.button_text.replace(regex,"")}</Button>
      </WelcomeComponentContainer>
    </QuestionComponentContainer>
  )
}
export default WelcomeComponent;