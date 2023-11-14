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

export const QuestionnaireDataPopup = ({ setActiveQuestionnairePopup , QuestionnaireList , RegoionsData , ActiveQuestionnairePopup }) => {

    console.log(ActiveQuestionnairePopup,QuestionnaireList)

    return <>
        <ChatMask onClick={() => setActiveQuestionnairePopup(null)} />
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
                            <Link href={'/'}>لیست پرسش‌گران
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
                                && <p>در انتظار تایید قیمت توسط ادمین</p>
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
                                QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).difficulty ?
                                        QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).difficulty : 'ans'
                            }</p>
                            <Link href={'/'}>
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
                        <span>:بسته سوالات</span>
                        <LevelInfoContainer>
                            <p >{QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).price_pack.name}</p>
                            <p>{
                                QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).price_pack.prise &&
                                    digitsEnToFa(QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).price_pack.prise)

                                    // QuestionnaireList.find(item => item.id === ActiveQuestionnairePopup.id).difficulty : 'ans'
                            }
                                   <span style={{ opacity : 0.5 }}>ریال</span>
                            </p>
                            <Link href={'/'}>
                                ویرایش
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
                            <Link href={'/'}>
                                ویرایش
                                <Icon name={'ArrowLeftBlue'} />
                            </Link>
                        </LevelInfoContainer>
                    </PopupRowContainer>
                {/*   price_pack */}
                </PopupInfoContainer>
            </ChatMessageContainer>
        </PopupContainer>
    </>
}