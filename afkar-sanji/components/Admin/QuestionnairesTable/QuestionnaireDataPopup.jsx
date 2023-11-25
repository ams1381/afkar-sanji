import {ChatHeaderTitle, ChatMask, ChatMessageContainer} from "@/styles/common";
import {Icon} from "@/styles/icons";
import {
    LevelInfoContainer,
    PopupContainer,
    PopupHeader,
    PopupInfoContainer,
    PopupRowContainer
} from "@/styles/Admin/userInfoPopup";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import Link from "next/link";
import {convertDate, convertToRegularTime} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingPanel";
import {Button, Modal} from "antd";
import {RemoveModalButtonsContainer} from "@/styles/folders/Popup";
import React from "react";
import {Span} from "next/dist/server/lib/trace/tracer";

export const QuestionnaireDataPopup = ({ setActiveQuestionnairePopup
       , QuestionnaireList ,
       RegoionsData ,
      setActivePricePopup ,
       ActiveQuestionnairePopup }) => {
    return <>
        <Modal mask={true}
               preserve={false}
               destroyOnClose={true}
               onCancel={() => setActiveQuestionnairePopup(false)}
               modalRender={(ReactNode) => <div style={{ direction : 'ltr' }}>{ReactNode}</div>}
               centered={true}
               closeIcon={true}
               title={<></>}
               maskClosable={true}
               footer={<></>}
               open={ActiveQuestionnairePopup}>
            <PopupContainer style={{ height : 'auto' }}>
                <PopupHeader style={{ boxShadow : ''}}>
                    <div style={{ cursor : 'pointer' }} onClick={() => setActiveQuestionnairePopup(null)}>
                        <Icon style={{ width : 12 , height : 12 }} name={'GrayClose'} />
                    </div>
                    <ChatHeaderTitle>
                        <p style={{ color : 'rgba(0, 0, 0, 0.45)' }}>
                            {QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).name}
                        </p>
                        <p className={'admin-name'} style={{ color : 'var(--primary-color)' , fontSize : 16 }}>
                            {QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).owner.first_name}
                        </p>
                    </ChatHeaderTitle>
                </PopupHeader>
                <ChatMessageContainer>
                    <PopupInfoContainer>
                        <PopupRowContainer>
                            <span>:منطقه و شهر</span>
                            <p>{QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).districts.map(item => item.name)}</p>
                        </PopupRowContainer>
                        <PopupRowContainer>
                            <span>:تاریخ ایجاد</span>
                            <p style={{ opacity : 0.5 }}>
                                { digitsEnToFa(convertDate(convertToRegularTime(QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).created_at),'jalali')) }
                            </p>
                        </PopupRowContainer>
                        <PopupRowContainer>
                            <span>تاریخ اجرا</span>
                            <p>هنوز اجرا نشده</p>
                        </PopupRowContainer>
                        <PopupRowContainer>
                            <span>:تاریخ دریافت پروژه توسط پرسش‌گر</span>
                            <p>{
                                QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).interviewers.length ? <p>1</p>
                                    : <p style={{ opacity : 0.5 }}>هنوز پرسش‌گری ندارد</p>
                                // interviewers
                            }</p>
                        </PopupRowContainer>
                        <PopupRowContainer>
                            <span>:تعداد پرسش‌گران</span>
                            <p style={{ display : 'flex' , flexDirection : 'row-reverse' , gap : 4 }}>

                                { digitsEnToFa(QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).interviewers.length) }
                                <Link href={'/admin-panel/users-list'}>لیست پرسش‌گران
                                    <Icon name={'ArrowLeftBlue'} />
                                </Link>
                            </p>
                        </PopupRowContainer>
                        <PopupRowContainer>
                            <span>:وضعیت</span>
                            <p>
                                {
                                    QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).approval_status === 'pending_level_admin'
                                    && <p>در انتظار تایید سطح توسط ادمین</p>
                                }
                                {
                                    QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).approval_status === 'rejected_admin'
                                    && <p>رد شده توسط ادمین</p>
                                }
                                {
                                    QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).approval_status === 'pending_level_admin'
                                    && <p>در انتظار تایید ادمین</p>
                                }
                                {
                                    QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).approval_status === 'approved_price_employer'
                                    && <p>در انتظار تایید قیمت توسط کارفرما</p>
                                }
                                {
                                    QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).approval_status === 'rejected_content_admin'
                                    && <p>محتوا رد شده توسط ادمین</p>
                                }
                                {
                                    QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).approval_status === 'pending_price_admin' &&
                                    <p>در انتظار تایید قیمت توسط ادمین</p>
                                }
                                {
                                    QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).approval_status === 'rejected_price_employer' &&
                                    <p>قیمت رد شده توسط کارفرما</p>
                                }
                                {/*// approved_price_employer*/}

                            </p>
                        </PopupRowContainer>
                        <PopupRowContainer>
                            <span>:وضعیت تعیین سطح</span>
                            <LevelInfoContainer>
                                <p style={{ color : '#52C41A' }}>{QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).is_leveled ?
                                    'تعیین سطح شده' : 'تعیین سطح نشده'}</p>
                                <p>{
                                    QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).difficulty ? <p style={{ opacity : 0.5 }}>
                                            {QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).difficulty === 0 && 'تعیین نشده'}
                                            {QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).difficulty === 1 && 'آسان'}
                                            {QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).difficulty === 2 && 'متوسط'}
                                            {QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).difficulty === 3 && 'سخت'}
                                        </p>
                                        : ''
                                }</p>
                                <Link href={`/admin/difficulty-assignment/${QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).uuid}`}>
                                    ویرایش
                                    <Icon name={'ArrowLeftBlue'} />
                                </Link>

                            </LevelInfoContainer>
                        </PopupRowContainer>
                        <PopupRowContainer>

                            <span>:وضعیت پروژه از سمت کارفرما</span>
                            <p>
                                {
                                    QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).is_active ? 'فعال' : 'غیر فعال'
                                }
                            </p>
                        </PopupRowContainer>
                        <PopupRowContainer>
                            <span>:بسته قیمت</span>
                            <LevelInfoContainer>
                                <p >{QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).price_pack.name}</p>
                                <p style={{ direction : 'rtl' }}>{
                                    QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).price_pack.price &&
                                    digitsEnToFa(QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).price_pack.price)

                                    // QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).difficulty : 'ans'
                                }
                                    <span style={{ opacity : 0.5 , marginRight : 5 }}>

                                       تومان
                                   </span>
                                </p>
                                {/*<Link href={'/'}>*/}
                                <span style={{ display : 'flex' , cursor : 'pointer' , gap : 10 , color : 'var(--primary-color)' , alignItems : 'center' }} onClick={() => {
                                    setActivePricePopup({ id : QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).id })
                                    setActiveQuestionnairePopup(null)
                                }}>
                                    <Icon name={'ArrowLeftBlue'} />
                                     ویرایش
                                </span>

                                {/*</Link>*/}

                            </LevelInfoContainer>
                        </PopupRowContainer>
                        <PopupRowContainer>
                            <span>:نتایج</span>
                            <LevelInfoContainer>
                                {/*<p>{*/}
                                {/*    digitsEnToFa(QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).questions.length)*/}
                                {/*}</p>*/}
                                <Link href={`/questioner/dashboard/${QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).uuid}/questioner-result/`}>
                                    مشاهده
                                    <Icon name={'ArrowLeftBlue'} />
                                </Link>
                            </LevelInfoContainer>
                        </PopupRowContainer>
                        <PopupRowContainer>
                            <span>:سوالات</span>
                            <LevelInfoContainer>
                                <p>{
                                    digitsEnToFa(QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).questions.length)
                                }</p>
                                <Link href={`/questionnaire/${QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).uuid}`}>
                                    ویرایش
                                    <Icon name={'ArrowLeftBlue'} />
                                </Link>
                            </LevelInfoContainer>
                        </PopupRowContainer>
                        {/*   price_pack */}
                    </PopupInfoContainer>
                </ChatMessageContainer>
            </PopupContainer>
        </Modal>

    </>
}