import React, { useEffect, useRef, useState } from 'react'
import {  QuestionnaireHeader ,  QuestionnaireBodyStat ,
    QuestionnaireNameContainer , QuestionnaireNameInput , QuestionnairePreviewButton} from '@/styles/folders/Questionnaire';
import { QuestionnaireDiv , QuestionnaireSeeResultButton , RenameSpan } from '@/styles/folders/Questionnaire';
import BadgeStyle from '@/styles/folders/Questionnaire.module.css'
import jalaali from 'jalaali-js';
import { Badge, Card, Skeleton, Space } from 'antd';
import PN from "persian-number";
import QuestionnaireFooterPart from './questionnaireFooter';
import { axiosInstance } from '@/utilities/axios';
import { Icon } from '@/styles/icons';
import { handleInputWidth } from '@/utilities/RenameFunctions';
import { digitsEnToFa } from '@persian-tools/persian-tools';

const convertToJalaliDate = (inputDate) => {
    const [year, month, day] = inputDate.split('-');
    const jDate = jalaali.toJalaali(parseInt(year), parseInt(month), parseInt(day));
    return `${jDate.jy}/${jDate.jm}/${jDate.jd}`;
}
const QuestionnaireBox = ({Questionnaire , FolderReload}) => {
    const [ ChangeNameActive , setChangeNameState ] = useState(false);
    const [ QuestionnaireName , setQuestionnaireName ] = useState(Questionnaire.name);
    const [ NameInputWidth , SetInputWidth ] = useState(null);
    const nameRef = useRef(null);
    
    useEffect(() => {
        handleInputWidth(nameRef,QuestionnaireName);
    },[nameRef])
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
            await axiosInstance.patch(`/question-api/questionnaires/${Questionnaire.uuid}/`,{ name : QuestionnaireName });
            handleInputWidth(nameRef,QuestionnaireName);
        }
       catch(err)
       {
        handleInputWidth(nameRef,QuestionnaireName);
        console.log(err)
       }
    }
    const nameInputChangeHandler = (e) => {
        handleInputWidth(nameRef,QuestionnaireName);
        setQuestionnaireName(e.target.value)
    }
    
  return (
     <QuestionnaireDiv>
        <Badge.Ribbon className={BadgeStyle['QuestionnaireBadge']} color={Questionnaire.is_active ? "green" : "red"} text={Questionnaire.is_active ? 'فعال' : 'غیر فعال'}  
            style={{
                marginTop : 30 , fontFamily : 'IRANSans' , fontSize : 13 , color : '#00000040' , height : 24 , display : 'flex'
                }}>
         <QuestionnaireHeader>
             {Questionnaire ? <QuestionnaireNameContainer>
                 <QuestionnaireNameInput ref={nameRef} type="text" onChange={nameInputChangeHandler}
                  value={QuestionnaireName} disabled={!ChangeNameActive}/>
                 <RenameSpan clickable={(ChangeNameActive && !QuestionnaireName) ? null : 'true'} 
                  onClick={RenameStateHandler}>
                    {!ChangeNameActive ? <Icon name='RenameQuestionnaire' /> : 
                    <div> 
                        <Icon name='RenameQuestionnaireCheck' />
                       
                     </div>}
                 </RenameSpan>
                 {ChangeNameActive && <RenameSpan clickable={true}
                  onClick={() => {
                    setQuestionnaireName(Questionnaire.name)
                    setChangeNameState(false)
                    handleInputWidth(nameRef,Questionnaire.name);
                    }} style={{ marginRight : 10 }}>
                     <Icon name='BlackClose' style={{ width : 14 }} />
                 </RenameSpan>}
             </QuestionnaireNameContainer> : <Skeleton active /> }
             <div className="questionnaire_preview">
                 <QuestionnairePreviewButton disabled={Questionnaire.question_count == 0}>
                     پیش نمایش
                 </QuestionnairePreviewButton>
             </div>
         </QuestionnaireHeader>
         <div className="questionnaire_body">
             <div className="questionnaire_stats">
                { Questionnaire ?
                <> <QuestionnaireBodyStat>
                     <p>{Questionnaire.pub_date ? digitsEnToFa(convertToJalaliDate(Questionnaire.pub_date)) : ''}</p>
                     <p>: ایجاد شده در</p>
                 </QuestionnaireBodyStat>
                 <QuestionnaireBodyStat>
                     <p>{digitsEnToFa(Questionnaire.answer_count)}</p>
                     <p>: تعداد پاسخ دهنده</p>
                 </QuestionnaireBodyStat> </>: <Skeleton active />}
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