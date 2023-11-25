import React, {useContext, useEffect, useRef, useState} from 'react'
import {
    QuestionnaireHeader,
    QuestionnaireBodyStat,
    QuestionnaireNameContainer,
    QuestionnaireNameInput,
    QuestionnairePreviewButton,
    QuestionnaireBedgeTextContainer,
    QuestionnaireBadgeTextContainer, InterviewerBadgeText
} from '@/styles/folders/Questionnaire';
import { QuestionnaireDiv , QuestionnaireSeeResultButton , RenameSpan } from '@/styles/folders/Questionnaire';
import BadgeStyle from '@/styles/folders/Questionnaire.module.css'
import jalaali from 'jalaali-js';
import {Badge, Card, message, Skeleton, Space} from 'antd';
import QuestionnaireFooterPart from './questionnaireFooter';
import { axiosInstance } from '@/utilities/axios';
import { Icon } from '@/styles/icons';
import { handleInputWidth } from '@/utilities/RenameFunctions';
import { digitsEnToFa } from '@persian-tools/persian-tools';
import Link from 'next/link';
import { convertToRegularTime } from '../QuestionnairePanel/QuestionnaireSetting/SettingPanel';
import {TailSpin} from "react-loader-spinner";
import {AuthContext} from "@/utilities/AuthContext";
import {useLocalStorage} from "@/utilities/useLocalStorage";

const convertToJalaliDate = (inputDate) => {
    const [year, month, day] = inputDate.split('-');
    const jDate = jalaali.toJalaali(parseInt(year), parseInt(month), parseInt(day));
    return `${jDate.jy}/${jDate.jm}/${jDate.jd}`;
}
const QuestionnaireBox = ({Questionnaire , FolderReload , folderNumber}) => {
    const [ ChangeNameActive , setChangeNameState ] = useState(false);
    const [ QuestionnaireName , setQuestionnaireName ] = useState(Questionnaire.name);
    const { getItem } = useLocalStorage();
    const [ RenameLoading , setRenameLoading ] = useState(false);
    const [ MessageApi , MessageContext ] = message.useMessage();
    const Auth = useContext(AuthContext);
    const nameRef = useRef(null);
    useEffect(() => {
        handleInputWidth(nameRef,QuestionnaireName);
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
          if (QuestionnaireName === Questionnaire.name) {
            return;
          }
        handleInputWidth(nameRef,QuestionnaireName)
        try
        {
            setRenameLoading(true)
            setQuestionnaireName(QuestionnaireName);
            await axiosInstance.patch(`/${Auth.reqRole}/${Questionnaire.uuid}/`,{ name : QuestionnaireName });
            FolderReload()
            setChangeNameState(false);
            // handleInputWidth(nameRef,QuestionnaireName);
        }
       catch(err)
       {
            if(err.response?.status == 500)
            {
                MessageApi.error({
                    content : 'مشکل سمت سرور' ,
                    duration : 3,
                    style : {
                        fontFamily : 'IRANSans',
                        direction : 'rtl'
                    }
                })
            }
       }
       finally
       {
        setRenameLoading(false)
       }
    }
    const nameInputChangeHandler = async (e) => {
        handleInputWidth(nameRef,e.target.value);
        setQuestionnaireName(e.target.value)
    }

  return (
     <QuestionnaireDiv>
         {MessageContext}
        <Badge.Ribbon className={BadgeStyle['QuestionnaireBadge']} color={Questionnaire.is_active ? "green" : "red"}
              text={<QuestionnaireBadgeTextContainer>
                  <InterviewerBadgeText>{
                      Questionnaire.is_active ? 'فعال' :'غیر فعال'
                  }</InterviewerBadgeText>
                  {
                      getItem('roleReq') === 'interview-api/interviews' && <InterviewerBadgeText interview={true}>
                          {Questionnaire.approval_status === 'pending_content_admin' &&  'در انتظار تایید محتوا توسط ادمین'}
                          {Questionnaire.approval_status === 'pending_level_admin' && 'در انتظار تعیین سطح توسط ادمین'}
                          {Questionnaire.approval_status === 'pending_price_admin' && 'در انتظار تایید قیمت توسط ادمین' }
                          {Questionnaire.approval_status === 'pending_price_employer' && 'در انتظار تایید قیمت توسط کارفرما'}
                          {Questionnaire.approval_status === 'approved_price_employer' && 'قیمت تایید شده توسط کارفرما'}
                          {Questionnaire.approval_status === 'rejected_price_employer' && 'قیمت رد شده توسط کارفرما'}
                          {Questionnaire.approval_status === 'rejected_content_admin' && 'محتوا رد شده توسط ادمین'}
                          {Questionnaire.approval_status === 'searching_for_interviewers' && 'در جستجوی پرسشگر'}
                      </InterviewerBadgeText>
                  }
              </QuestionnaireBadgeTextContainer>}
            style={{
                marginTop : 30 , fontFamily : 'IRANSans' ,
                fontSize : 13 , color : '#00000040' ,
                height : 24 ,
                borderRadius : 2 ,
                display : 'flex'
                }}>
         <QuestionnaireHeader>
             {Questionnaire ? <QuestionnaireNameContainer>
                 <QuestionnaireNameInput ref={nameRef} onKeyDown={e => e.key == 'Enter' ? RenameQuestionnaire() : ''} 
                 type="text" onChange={nameInputChangeHandler}
                  value={QuestionnaireName} disabled={!ChangeNameActive}/>
                 { RenameLoading ? <TailSpin
                     height="18"
                     width="18"
                     color="black"
                     ariaLabel="tail-spin-loading"
                     radius="1"
                     wrapperStyle={{}}
                     wrapperClass="spiner_loading_wrapper"
                     visible={true}
                 /> : <>
                     <RenameSpan clickable={(ChangeNameActive && !QuestionnaireName) ? null : 'active'}
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
                 </>}

             </QuestionnaireNameContainer> : <Skeleton active /> }
             <div className="questionnaire_preview">
                {Questionnaire.question_count != 0  ? 
                <Link href={`/questionnaire/${Questionnaire.uuid}/view-questions/`} target='_blank'>
                 <QuestionnairePreviewButton disabled={Questionnaire.question_count == 0}>
                     پیش نمایش
                 </QuestionnairePreviewButton>
                </Link> : <QuestionnairePreviewButton disabled={Questionnaire.question_count == 0}>
                     پیش نمایش
                 </QuestionnairePreviewButton>}
             </div>
         </QuestionnaireHeader>
         <div className="questionnaire_body">
             <div className="questionnaire_stats">
                { Questionnaire ?
                <> <QuestionnaireBodyStat>
                     <p>{Questionnaire.created_at ?
                      digitsEnToFa(convertToJalaliDate(convertToRegularTime(Questionnaire.created_at.split(" ")[0]))) 
                      : ''}</p>
                     <p>: ایجاد شده در</p>
                 </QuestionnaireBodyStat>
                 <QuestionnaireBodyStat>
                     <p>{digitsEnToFa(Questionnaire.answer_count)}</p>
                     <p>: تعداد پاسخ دهنده</p>
                 </QuestionnaireBodyStat> </>: <Skeleton active />}
             </div>
             <div className="questionnaire_see_result">
             <Link style={{ width : '117px' , display : 'block' }} href={`/questionnaire/${Questionnaire.uuid}/results/`}>
                 <QuestionnaireSeeResultButton>
                     <p>مشاهده نتایج</p>
                 </QuestionnaireSeeResultButton>
            </Link>      
                     
             </div>
         </div>
         <QuestionnaireFooterPart FolderReload={FolderReload} questionnaire={Questionnaire} folderNumber={folderNumber} />
         </Badge.Ribbon> 
     </QuestionnaireDiv>
  )
}
export default QuestionnaireBox;