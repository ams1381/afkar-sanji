import {Button, Switch} from "antd";
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

export const Interviewers = ({ Questionnaire }) => {
    return <InterviewContainer>
        <InterviewInnerContainer>
                <InterviewerHeader>
                    <p style={{ fontSize : 18 }}>پرسش‌گران</p>
                </InterviewerHeader>
                <InterviewerBodyRow>
                    <p>قیمت تعیین شده برای هر پاسخ</p>
                    <InterViewAnswerPriceContainer>
                        <Button className={'confirm_button'}>
                            <p>تایید</p>
                            <Icon name={'Check'} />
                        </Button>
                        <Button className={'cancel_button'}>
                            <p>رد</p>
                            <Icon name={'Close'} />
                        </Button>
                        { Questionnaire.pay_per_answer && <p>{digitsEnToFa(Questionnaire.pay_per_answer)}</p>}
                    </InterViewAnswerPriceContainer>
                </InterviewerBodyRow>
                <InterviewerBodyRow>
                    <p>
                        تعداد مورد نیاز
                    </p>
                    <InterViewerNumber>
                        <p>322</p>
                        <Button>
                            <p>ویرایش</p>
                            <Icon name={'ArrowLeftBlue'} />
                        </Button>
                    </InterViewerNumber>
                </InterviewerBodyRow>
                <InterviewerBodyRow>
                    <p>وضعیت پرسشگری</p>
                    <InterViewerStatusContainer>
                        <p>برای جذب پرسش‌گر کیف پول خود را به مقدار لازم برای این پرسش‌نامه (۲،۰۰۰،۰۰۰) شارژ کنید</p>
                        <Button type={'primary'}>
                            شارژ کیف پول
                        </Button>
                    </InterViewerStatusContainer>
                </InterviewerBodyRow>
                <InterviewerBodyRow>
                    <p>فعال سازی برای پرسش‌گری</p>
                    <InterviewerActivator>
                        <p>بخش‌های «هدف گذاری» و «تعداد مورد نیاز» را کامل کنید</p>
                        <Switch />
                    </InterviewerActivator>
                </InterviewerBodyRow>
            </InterviewInnerContainer>
    </InterviewContainer>
}