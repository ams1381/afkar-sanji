import { PanelHeader, QuestionnaireDirectoryContainer, 
    QuestionnaireDirectoryPath } from '@/styles/questionnairePanel/QuestionnairePanelHeader'
import { Skeleton , Select, ConfigProvider } from 'antd'
import { QuestionSearchContainer } from '@/styles/questionnairePanel/QuestionDesignPanel'
import Link from 'next/link'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Icon } from '@/styles/icons'
import { axiosInstance } from '@/utilities/axios'

export const ResultHeader = ({ QuestionnaireQuery }) => {
    const [ SearchValue , setSearchValue ] = useState('')
    const { refetch, data , isLoading } = useQuery(
        ["key", "ResultSearch"],
       async () => 
       await axiosInstance.get(`/result-api/${QuestionnaireQuery.data?.data?.uuid}/answer-sets/search/?search=${SearchValue}`),
        {
          enabled: false,
        }
      );

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
        <QuestionSearchContainer>
            <Skeleton.Input active loading />
        </QuestionSearchContainer>
        </>:
   <>
   <PanelHeader>
          <QuestionnaireDirectoryContainer>
            <QuestionnaireDirectoryPath>
              <p style={{ marginRight : '0.5rem' }}>نتایج </p> <span style={{ color : '#00000073' }}>/</span>
              <Link style={{ marginRight : '0.5rem' , color : '#00000073'  }} href={{
                pathname : `/questionnaire/${QuestionnaireQuery.data.data.uuid}/`
              }}> {QuestionnaireQuery.data.data.name} </Link> 
              <span style={{ color : '#00000073' }}>/</span>
              <Link style={{ color : '#A3A3A3' }} href={{
                    pathname : '/'
                  }}> {QuestionnaireQuery.data.data.folder} </Link>
            </QuestionnaireDirectoryPath>
          </QuestionnaireDirectoryContainer>
          
        </PanelHeader>
        
        </> 
  )
}
