import React, { useEffect, useRef, useState } from 'react'
import {  QuestionnaireHeader ,  QuestionnaireBodyStat ,
    QuestionnaireNameContainer , QuestionnaireNameInput , QuestionnairePreviewButton} from '@/styles/folders/Questionnaire';
import { QuestionnaireDiv , QuestionnaireSeeResultButton , RenameSpan } from '@/styles/folders/Questionnaire';
import BadgeStyle from '@/styles/folders/Questionnaire.module.css'
import jalaali from 'jalaali-js';
import { Badge, Card, Space } from 'antd';
import PN from "persian-number";
import QuestionnaireFooterPart from './questionnaireFooter';
import { axiosInstance } from '@/utilities/axios';
import { Icon } from '@/styles/folders/icons';

const convertToJalaliDate = (inputDate) => {
    const [year, month, day] = inputDate.split('-');
    const jDate = jalaali.toJalaali(parseInt(year), parseInt(month), parseInt(day));
    return `${jDate.jy}/${jDate.jm}/${jDate.jd}`;
}
const QuestionnaireBox = ({Questionnaire , FolderReload}) => {
    // const [ Questionnaire , setInfo ] = useState(null);
    const [ ChangeNameActive , setChangeNameState ] = useState(false);
    const [ QuestionnaireName , setQuestionnaireName ] = useState(Questionnaire.name);
    const [ NameInputWidth , SetInputWidth ] = useState(null);
    const nameRef = useRef(null);
    
    useEffect(() => {
            nameRef.current ? nameRef.current.style.width = nameRef.current.value.length * 12 + 'px' : ''
    },[])
    const RenameStateHandler = () => {
        setChangeNameState(!ChangeNameActive)
        setTimeout(()=> {
            nameRef.current.select();
        }, 100)
        if(ChangeNameActive)
            RenameQuestionnaire();
    }
    const RenameQuestionnaire = async () => {
        if(QuestionnaireName == Questionnaire.name)
            return
        try
        {
            await axiosInstance.patch(`/question-api/questionnaires/${Questionnaire.uuid}/`,{ name : QuestionnaireName })
        }
       catch(err)
       {
        console.log(err)
       }
    }
    const nameInputChangeHandler = (e) => {
        setQuestionnaireName(e.target.value)
        nameRef.current ? nameRef.current.style.width = nameRef.current.value.length * 10 + 'px' : ''
        nameRef.current.value.length == 0 ? nameRef.current ? nameRef.current.style.width = '20px' : '' : ''
    }
    
  return (
     <QuestionnaireDiv>
        <Badge.Ribbon className={BadgeStyle['QuestionnaireBadge']} color="green" text={Questionnaire.is_active ? 'فعال' : 'غیر فعال'}  
     style={{marginTop : 30 , fontFamily : 'IRANSans' , fontSize : 13 , color : '#00000040'}}>
         <QuestionnaireHeader>
             <QuestionnaireNameContainer>
                 <QuestionnaireNameInput ref={nameRef} type="text" onChange={nameInputChangeHandler}
                  value={QuestionnaireName} disabled={!ChangeNameActive}/>
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
                     <p>{PN.convertEnToPe(convertToJalaliDate(Questionnaire.pub_date))}</p>
                     <p>درست شده در</p>
                 </QuestionnaireBodyStat>
                 <QuestionnaireBodyStat>
                     <p>{PN.convertEnToPe(Questionnaire.answer_count)}</p>
                     <p>تعداد پاسخ دهنده:</p>
                 </QuestionnaireBodyStat>
             </div>
             <div className="questionnaire_see_result">
                 <QuestionnaireSeeResultButton>
                     <p>مشاهده نتایج</p>
                 </QuestionnaireSeeResultButton>
                     
                     
             </div>
         </div>
         <QuestionnaireFooterPart FolderReload={FolderReload} questionnaire={Questionnaire} />
         </Badge.Ribbon> 
     </QuestionnaireDiv>
  )
}
export default QuestionnaireBox;