import {Button, message, Modal, Switch} from "antd";
import {InterviewInnerContainer
    , InterviewerHeader
    , InterViewAnswerPriceContainer
    , InterViewerNumber
    , InterviewerActivator
    , InterviewContainer
    , InterViewerStatusContainer
    , InterviewerBodyRow } from "@/styles/questionnairePanel/QuestionSetting";
import {Icon} from "@/styles/icons";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {useState} from "react";
import {
    AnswerCountPopup
} from "@/components/QuestionnairePanel/QuestionnaireSetting/InterviwerSettings/AnswerCountPopup";
import {axiosInstance} from "@/utilities/axios";
import {PricePopup} from "@/components/QuestionnairePanel/QuestionnaireSetting/InterviwerSettings/PricePopup";

export const Interviewers = ({ Questionnaire , refetch , ToggleCheckBoxHandler }) => {
    const [ countPopupOpen , setCountPopupOpen ] = useState(false)
    const [ editPrice , setEditPrice ] = useState(false);
    const [ rejectPopup , setRejectPopup ] = useState(false);
    const [ MessageApi , MessageContext ] = message.useMessage();
    const [ confirmPriceLoading ,setConfirmLoading ] = useState(false);
    const ConfirmPrice = async () => {
        setConfirmLoading(true)
        try {
            await axiosInstance.post(`/interview-api/interviews/${Questionnaire.uuid}/approve-price/`);
            setConfirmLoading(false);
            setTimeout(() => {
                setEditPrice(false)
            },200)
        }
        catch(err) {
            setConfirmLoading(false);
            MessageApi.error({
                content : Object.values(err.response?.data)[0]
            })
        }

    }

    return <InterviewContainer>
        {MessageContext}
        { rejectPopup && <PricePopup Questionnaire={Questionnaire} setRejectPopup={setRejectPopup} rejectPopup={rejectPopup} /> }
        <AnswerCountPopup refetch={refetch} Questionnaire={Questionnaire}
              setCountPopupOpen={setCountPopupOpen}
              countPopupOpen={countPopupOpen} />
        <InterviewInnerContainer>

                <InterviewerHeader>
                    <p style={{ fontSize : 18 }}>پرسش‌گران</p>
                </InterviewerHeader>
            {
                Questionnaire.price_pack ? <InterviewerBodyRow>
                    <p>قیمت تعیین شده برای هر پاسخ</p>
                    {
                        (Questionnaire.approval_status === 'pending_price_employer' || editPrice) ?
                    <InterViewAnswerPriceContainer>
                        <Button onClick={ConfirmPrice} loading={confirmPriceLoading} className={'confirm_button'}>
                            <p>تایید</p>
                            <Icon name={'Check'} />
                        </Button>
                        <Button className={'cancel_button'} onClick={() => setRejectPopup(true)}>
                            <p>رد</p>
                            <Icon name={'Close'} />
                        </Button>
                        { <p style={{ display : 'flex' , gap : 5 }}><span>تومان</span>{digitsEnToFa(Questionnaire.price_pack.price)}</p>}
                    </InterViewAnswerPriceContainer> : <InterViewAnswerPriceContainer>
                                <Button onClick={() => setEditPrice(true)}>
                                    <p style={{ color : 'var(--primary-color)' }}>درخواست ویرایش</p>
                                    <Icon name={'OutlinePen'} />
                                </Button>
                            </InterViewAnswerPriceContainer>
                    }
                </InterviewerBodyRow> : 'بسته قیمتی وجود ندارد'
            }
                <InterviewerBodyRow>
                    <p>
                        تعداد مورد نیاز
                    </p>
                    <InterViewerNumber>
                        <p>{Questionnaire.required_interviewer_count  && digitsEnToFa(Questionnaire.required_interviewer_count) }</p>
                            <Button onClick={() => setCountPopupOpen(!countPopupOpen)}>
                                <p>ویرایش</p>
                                <Icon name={'ArrowLeftBlue'} />
                            </Button>

                    </InterViewerNumber>
                </InterviewerBodyRow>
                <InterviewerBodyRow>
                    <p>وضعیت پرسشگری</p>
                    <InterViewerStatusContainer>
                        {Questionnaire.approval_status === 'pending_content_admin' &&  'در انتظار تایید محتوا توسط ادمین'}
                        {Questionnaire.approval_status === 'pending_level_admin' && 'در انتظار تعیین سطح توسط ادمین'}
                        {Questionnaire.approval_status === 'pending_price_admin' && 'در انتظار تایید قیمت توسط ادمین' }
                        {Questionnaire.approval_status === 'approved_price_employer' && 'قیمت تایید شده توسط کارفرما'}
                        {Questionnaire.approval_status === 'rejected_price_employer' && 'قیمت رد شده توسط کارفرما'}
                        <Button type={'primary'}>
                            شارژ کیف پول
                        </Button>
                    </InterViewerStatusContainer>
                </InterviewerBodyRow>
                <InterviewerBodyRow onClick={() => ToggleCheckBoxHandler(!Questionnaire.is_active,'is_active')}
                        style={{ cursor : 'pointer' }}
                        disabled={(!Questionnaire.required_interviewer_count || !Questionnaire.answer_count_goal)}>
                    <p>فعال سازی برای پرسش‌گری</p>
                    <InterviewerActivator>
                        { !Questionnaire.required_interviewer_count && <p>بخش‌های «هدف گذاری» و «تعداد مورد نیاز» را کامل کنید</p>}
                        <Switch checked={Questionnaire.is_active}
                                onChange={() => ToggleCheckBoxHandler(!Questionnaire.is_active,'is_active')}
                                disabled={(!Questionnaire.required_interviewer_count || !Questionnaire.answer_count_goal)} />
                    </InterviewerActivator>
                </InterviewerBodyRow>
            </InterviewInnerContainer>
    </InterviewContainer>
}