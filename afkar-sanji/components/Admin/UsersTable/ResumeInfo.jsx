import {
    PopupContainer,
    PopupFooter, PopupFooterButton,
    PopupHeader,
    PopupInfoContainer,
    PopupRowContainer,
    PopupTopButtonsContainer
} from "@/styles/Admin/userInfoPopup";
import {Icon} from "@/styles/icons";
import {ChatHeaderTitle, ChatMask, ChatMessageContainer} from "@/styles/common";
import {Button, message, Modal} from "antd";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {styled} from "styled-components";
import React, {useState} from "react";
import {convertDate} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingPanel";
import {axiosInstance} from "@/utilities/axios";

export const ResumeInfo = ({ SetActivePopupUser , setPopupType , ActivePopupUser , usersLists }) => {
    const [ MessageApi , MessageContext ] = message.useMessage();
    const [ resumeData , setResumeData ] = useState(usersLists.find(item => item.id === ActivePopupUser.id).resume);
    const [ interviewAcceptLoading , setInterviewAcceptLoading ] = useState(false);
    // console.log(resumeData)
    const AcceptInterviewRole = async () => {
        setInterviewAcceptLoading(true)
        try {
            await axiosInstance.post(`/admin-api/users/${usersLists.find(item => item.id === ActivePopupUser.id).id}/grant-interviewer-role/`)
        }
        catch (err) {
            if(err?.response?.status === 500)
                MessageApi.error({
                    content : 'خطای داخلی سرور',
                    duration : 10 ,
                    style : {
                        borderRadius : 2,
                        zIndex : 66668888888
                    }
                })
            MessageApi.error({
                content : Object.values(err?.response?.data)[0]
            })
        }
        finally {
            setInterviewAcceptLoading(false);
        }
    }
    return <>
        {/*<ChatMask onClick={() => SetActivePopupUser(null)} />*/}
        <Modal mask={true}
               preserve={false}
               destroyOnClose={true}
               onCancel={() => SetActivePopupUser(null)}
               modalRender={(ReactNode) => <div style={{ direction : 'ltr' }}>{ReactNode}</div>}
               centered={true}
               closeIcon={true}
               title={<></>}
               maskClosable={true}
               footer={<></>}
               open={ActivePopupUser}>
            <PopupContainer style={{ height : 'auto' }}>
                {MessageContext}
                <PopupHeader style={{ boxShadow : ''}}>
                    <div style={{ cursor : 'pointer' }} onClick={() => {
                        SetActivePopupUser(null)
                        setPopupType('user-info')
                    }}>
                        <Icon style={{ width : 12 , height : 12 }} name={'GrayClose'} />
                    </div>
                    <ChatHeaderTitle>
                        <p className={'admin-name'}>
                            رزومه
                        </p>
                    </ChatHeaderTitle>
                </PopupHeader>
                <ChatMessageContainer style={{ maxHeight : 400 , overflow : 'auto' }}>
                    <ReusmeContainer>
                        <div>
                            <p style={{ fontSize : 20 }}>تحصیلات</p>
                            {
                                resumeData.educational_backgrounds.map(EducationItem => (<ResumeDataSubContainer>
                                    <p style={{ direction : 'rtl' }}>
                                        {EducationItem.degree === 'd' && ' دیپلم '}
                                        {EducationItem.field + ' '}
                                        {EducationItem.university + ' '}
                                        سال  { digitsEnToFa(convertDate(EducationItem.start_date,'jalali'))}  تا
                                        {' ' + digitsEnToFa(convertDate(EducationItem.end_date,'jalali')) + ' '}
                                    </p>
                                </ResumeDataSubContainer>))
                            }
                            {/*<ResumeDataSubContainer>*/}
                            {/*    <p>لیسانس روانشناسی دانشگاه آزاد قم</p>*/}
                            {/*</ResumeDataSubContainer>*/}
                        </div>
                        <div>
                            <p style={{ fontSize : 20 }}>مهارت‌ها</p>
                            {
                                resumeData.skills.map(SkillItem => (<ResumeDataSubContainer>
                                    <p style={{ direction : 'rtl' }}>
                                        {SkillItem.field + ' '}
                                        سطح:
                                        {SkillItem.level ? ' ' + digitsEnToFa(SkillItem.level) + ' ' : ''}
                                    </p>
                                </ResumeDataSubContainer>))
                            }
                        </div>
                        <div>
                            <p style={{ fontSize : 20 }}>افتخارات</p>
                            {
                                resumeData.achievements.map(AchieveItem => (<ResumeDataSubContainer>
                                    <p style={{ direction : 'rtl' }}>
                                        { AchieveItem.field }
                                        {
                                            ' سال' + `(${AchieveItem.year &&  digitsEnToFa(convertDate(AchieveItem.year,'jalali'))})`
                                        }
                                    </p>
                                </ResumeDataSubContainer>))
                            }
                        </div>
                        <div>
                            <p style={{ fontSize : 20 }}>سابقه پژوهشی</p>
                            {
                                resumeData.research_histories.map(ResearhItem => (<ResumeDataSubContainer>
                                    <p style={{ direction : 'rtl' }}>
                                        { ResearhItem.field + ' '}
                                        {
                                            ' سال' + `(${ResearhItem.year &&  digitsEnToFa(convertDate(ResearhItem.year,'jalali'))})`
                                        }
                                        { ' لینک ' + ResearhItem.link }
                                    </p>
                                </ResumeDataSubContainer>))
                            }
                        </div>
                    </ReusmeContainer>
                </ChatMessageContainer>
                <PopupFooter>
                    { usersLists.find(item => item.id === ActivePopupUser.id).ask_for_interview_role &&
                        <PopupFooterButton loading={interviewAcceptLoading}
                                           onClick={AcceptInterviewRole}
                                           type={'primary'}>
                            {!interviewAcceptLoading &&<Icon style={{transform: 'none'}} name={'Check'}/>}
                            <p>تایید ‌درخواست</p>
                        </PopupFooterButton>}
                    <PopupFooterButton onClick={() => setPopupType('user-info')} danger>
                        <p>بازگشت</p>
                    </PopupFooterButton>
                </PopupFooter>
            </PopupContainer>
        </Modal>
       
    </>
}
const ReusmeContainer = styled.div`
    color : var(--Neutral-Gray9);
    text-align: right;
`
const ResumeDataSubContainer = styled.div`
  padding: 10px 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`