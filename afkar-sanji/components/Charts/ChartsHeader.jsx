import { PanelHeader, QuestionnaireDirectoryPath , QuestionnaireDirectoryContainer } from '@/styles/questionnairePanel/QuestionnairePanelHeader'
import { Skeleton } from 'antd'
import Link from 'next/link'
import React from 'react'

export const ChartsHeader = ({ QuestionnaireQuery }) => {
    return (
        QuestionnaireQuery.isLoading ? <>
             <PanelHeader>
                <QuestionnaireDirectoryContainer loading='active'>
                <QuestionnaireDirectoryPath>
                    <Skeleton.Input active  style={{ borderRadius : 2 }} />
                </QuestionnaireDirectoryPath>
                    <div>
                    <Skeleton.Input active style={{ borderRadius : 2 }}/>
                    </div>
                </QuestionnaireDirectoryContainer>
            </PanelHeader> 
            </>:
       <>
       <PanelHeader>
              <QuestionnaireDirectoryContainer>
                <QuestionnaireDirectoryPath>
                  <p style={{ marginRight : '0.5rem' }}>نمودار </p> /
                  <Link style={{ marginRight : '0.5rem' , color : '#00000073' }} href={{
                    pathname : `/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/`
                  }}> {QuestionnaireQuery.data?.data?.name} </Link> 
                  /
                  <Link style={{ color : '#A3A3A3' }} href={{
                    pathname : '/'
                  }}> {QuestionnaireQuery.data?.data?.folder} </Link>
                </QuestionnaireDirectoryPath>
              </QuestionnaireDirectoryContainer>
              
            </PanelHeader>
            </> 
      )
}
