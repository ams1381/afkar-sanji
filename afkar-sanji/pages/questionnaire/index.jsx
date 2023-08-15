import { axiosInstance } from '@/utilities/axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const QuestionnairePanel = () => {
    const router = useRouter();
    const [ QuestionnaireInfo , SetQuestionnaireInfo ] = useState(null);

    useEffect(() => {
        const QuestionnaireRetriever = async () => {
           let  { data } =  await axiosInstance.get(`/question-api/questionnaires/${router.query.uuid}/`);
           SetQuestionnaireInfo(data);
           console.log(data)
        }
        QuestionnaireRetriever();
    },[])
  return (
    <div>index</div>
  )
}
export default QuestionnairePanel;