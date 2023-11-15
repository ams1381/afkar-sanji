import {QuestionnaireDatePickerContainer} from "@/styles/questionnairePanel/QuestionnaireSetting";
import {Button} from "antd";
import {
    AdminContactBody,
    AdminContactHeader,
    AdminContactStatusContainer,
    AminContactContainer
} from "@/styles/questionnairePanel/QuestionSetting";
import {Icon} from "@/styles/icons";

export const AdminContact = () => {
    return <AminContactContainer>
        <AdminContactHeader>
            <Button type={'primary'} >
                <p>صفحه پیام‌ها</p>
                <Icon name={'message'} />
            </Button>
            <p className={'admin-header-text'}>ارتباط با ادمین</p>
        </AdminContactHeader>
        {/*<AdminContactBody>*/}
        {/*    <p>*/}
        {/*        وضعیت پرسش‌نامه از سمت ادمین*/}
        {/*    </p>*/}
        {/*    <AdminContactStatusContainer>*/}
        {/*        <p>ایجاد تغییر نیاز به بررسی ادمین و تایید او دارد</p>*/}
        {/*        <p className={'status'}>غیر فعال</p>*/}
        {/*    </AdminContactStatusContainer>*/}
        {/*</AdminContactBody>*/}
    </AminContactContainer>
}