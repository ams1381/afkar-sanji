import React, { useEffect, useRef, useState } from 'react'
import {  QuestionnaireHeader ,  QuestionnaireBodyStat ,
    QuestionnaireNameContainer , QuestionnaireNameInput , QuestionnairePreviewButton} from '@/styles/folders/Questionnaire';
import { QuestionnaireDiv , QuestionnaireSeeResultButton , RenameSpan } from '@/styles/folders/Questionnaire';
import BadgeStyle from '@/styles/folders/Questionnaire.module.css'
import jalaali from 'jalaali-js';
import { Badge, Card, Space } from 'antd';
import QuestionnaireFooterPart from './questionnaireFooter';
import { axiosInstance } from '@/utilities/axios';
import { Icon } from '@/styles/folders/icons';

const convertToJalaliDate = (inputDate) => {
    const [year, month, day] = inputDate.split('-');
    const jDate = jalaali.toJalaali(parseInt(year), parseInt(month), parseInt(day));
    return `${jDate.jy}/${jDate.jm}/${jDate.jd}`;
}
const QuestionnaireBox = ({Questionnaire}) => {
    const [ QuestionnaireInfo , setInfo ] = useState(null);
    const [ ChangeNameActive , setChangeNameState ] = useState(false);
    const [ QuestionnaireName , setQuestionnaireName ] = useState(null);
    const nameRef = useRef(null)
    const RenameStateHandler = () => {
        setChangeNameState(!ChangeNameActive)
        setTimeout(()=> {
            nameRef.current.select();
        }, 100)
        if(ChangeNameActive)
            RenameFolder();
    }
    const RenameFolder = async () => {
        QuestionnaireInfo.name = QuestionnaireName;
        try
        {
            await axiosInstance.patch(`/question-api/questionnaires/${QuestionnaireInfo.uuid}`,QuestionnaireInfo)
        }
       catch(err)
       {
        console.log(err)
       }
       
       
    }
    useEffect(() => {
        const getQuestionnaireInfo = async () => {
           let response = await axiosInstance.get(`/question-api/questionnaires/${Questionnaire.uuid}/`);

           if(response)
           {
            setInfo(response.data);
            setQuestionnaireName(response.data.name);
           }
        }
        getQuestionnaireInfo();
        
    },[])
  return (
     QuestionnaireInfo ? 
     <QuestionnaireDiv>
        <Badge.Ribbon className={BadgeStyle['QuestionnaireBadge']} color="green" text={QuestionnaireInfo.is_active ? 'فعال' : 'غیر فعال'}  
     style={{ marginTop : 30 , fontFamily : 'IRANSans' , fontSize : 13 , color : '#00000040'}}>
         <QuestionnaireHeader>
             <QuestionnaireNameContainer>
                 <QuestionnaireNameInput ref={nameRef} type="text" onChange={(e) => setQuestionnaireName(e.target.value)}
                  value={QuestionnaireName} disabled={!ChangeNameActive} onkeypress="this.style.width = ((this.value.length + 1) * 8) + 'px';"/>
                 <RenameSpan clickable={(ChangeNameActive && !QuestionnaireName) ? null : 'true'} 
                  onClick={RenameStateHandler}>
                    {!ChangeNameActive ? <Icon name='RenameQuestionnaire' /> : <Icon name='RenameQuestionnaireCheck' />}
                 </RenameSpan>
             </QuestionnaireNameContainer>
             <div className="questionnaire_preview">
                 <QuestionnairePreviewButton>
                     پیش نمایش
                 </QuestionnairePreviewButton>
             </div>
         </QuestionnaireHeader>
         <div className="questionnaire_body">
             <div className="questionnaire_stats">
                 <QuestionnaireBodyStat>
                     <p>{convertToJalaliDate(QuestionnaireInfo.pub_date)}</p>
                     <p>درست شده در</p>
                 </QuestionnaireBodyStat>
                 <QuestionnaireBodyStat>
                     <p>۲،۲۳۴</p>
                     <p>تعداد پاسخ دهنده:</p>
                 </QuestionnaireBodyStat>
             </div>
             <div className="questionnaire_see_result">
                 <QuestionnaireSeeResultButton>
                    <Icon name='ArrowRight' />
                     {/* <i><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M6.73464 0.205112C7.03557 -0.0795129 7.51026 -0.0662918 7.79489 0.234642C8.07951 0.535577 8.06629 1.01027 7.76536 1.29489L2.52632 6.25H15.25C15.6642 6.25 16 6.58579 16 7C16 7.41421 15.6642 7.75 15.25 7.75H2.52405L7.76536 12.7073C8.06629 12.9919 8.07951 13.4666 7.79489 13.7675C7.51026 14.0684 7.03557 14.0817 6.73464 13.797L0.317415 7.72759C0.151117 7.57031 0.051116 7.3702 0.0174122 7.16141C0.00601006 7.10942 0 7.05541 0 7C0 6.94241 0.00649261 6.88633 0.0187836 6.83246C0.053772 6.62667 0.153315 6.42976 0.317415 6.27455L6.73464 0.205112Z" fill="#3E4ACB"/>
                         </svg>
                     </i> */}
                     <p>مشاهده نتایج</p>
                 </QuestionnaireSeeResultButton>
                     
                     
             </div>
         </div>
         <QuestionnaireFooterPart />
         </Badge.Ribbon> 
     </QuestionnaireDiv>
 : 'Loading'  
  )
}
export default QuestionnaireBox;