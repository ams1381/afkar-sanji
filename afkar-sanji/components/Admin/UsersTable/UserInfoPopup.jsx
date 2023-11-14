import {
    ChatContainer,
    ChatHeaderContainer,
    ChatHeaderTitle,
    ChatMask,
    ChatMessageContainer,
    ChatPromptContainer
} from "@/styles/common";
import {Icon} from "@/styles/icons";
import {
    PopupContainer,
    PopupFooter,
    PopupFooterButton,
    PopupHeader,
    PopupInfoContainer,
    PopupRowContainer, PopupTopButtonsContainer
} from "@/styles/Admin/userInfoPopup";
import {Button, Input} from "antd";
import {SentMessage} from "@/components/Questioner/ChatModal/SentMessage";
import {useEffect, useState} from "react";
import {digitsEnToFa} from "@persian-tools/persian-tools";

export const UserInfoPopup = ({ usersLists , RegoionsData , ActivePopupUser , SetActivePopupUser }) => {
    const [ UserData , setUserData ] = useState(usersLists.find(item => item.id === ActivePopupUser.id));

    useEffect(() => {
        setUserData(usersLists.find(item => item.id === ActivePopupUser.id))
    }, [ActivePopupUser]);

    console.log(usersLists)
    return<>
    <ChatMask onClick={() => SetActivePopupUser(null)} />
        <PopupContainer style={{ height : 'auto' }}>
            <PopupHeader style={{ boxShadow : ''}}>
                <div style={{ cursor : 'pointer' }} onClick={() => SetActivePopupUser(null)}>
                    <Icon style={{ width : 12 , height : 12 }} name={'GrayClose'} />
                </div>
                <ChatHeaderTitle>
                    <p className={'admin-name'}>
                        {usersLists.find(item => item.id === ActivePopupUser.id).first_name}
                    </p>
                </ChatHeaderTitle>
            </PopupHeader>
            <ChatMessageContainer>
                <PopupTopButtonsContainer>
                    <Button type={'primary'}>
                        مشاهده رزومه
                    </Button>
                    { usersLists.find(item => item.id === ActivePopupUser.id).ask_for_interview_role && <Button>
                        تایید درخواست پرسش‌گری
                    </Button>}
                </PopupTopButtonsContainer>
                <PopupInfoContainer>
                    <PopupRowContainer>
                        <span>شماره تلفن</span>
                        <p>{digitsEnToFa(usersLists.find(item => item.id === ActivePopupUser.id).phone_number)}</p>
                    </PopupRowContainer>
                    <PopupRowContainer>
                        <span>ایمیل</span>
                        <p>{(usersLists.find(item => item.id === ActivePopupUser.id).email)}</p>
                    </PopupRowContainer>
                    <PopupRowContainer>
                        <span>جنسیت</span>
                        <p>
                            {
                                usersLists.find(item => item.id === ActivePopupUser.id).gender === 'm' ? 'مرد' :
                                    usersLists.find(item => item.id === ActivePopupUser.id).gender === 'f' ? 'زن' : 'دوجنسه'
                            }
                        </p>
                    </PopupRowContainer>
                    <PopupRowContainer>
                        <span>آدرس</span>
                        <p>{(usersLists.find(item => item.id === ActivePopupUser.id).address)}</p>
                    </PopupRowContainer>
                    <PopupRowContainer>
                        <span>تابعیت</span>
                        <p>{
                            (usersLists.find(item => item.id === ActivePopupUser.id).nationality &&
                                RegoionsData.find(Country => Country.id === usersLists.find(item => item.id === ActivePopupUser.id).nationality).name
                            )
                        }</p>
                    </PopupRowContainer>
                    <PopupRowContainer>
                        <span>استان محل سکونت</span>
                        <p>{
                            (usersLists.find(item => item.id === ActivePopupUser.id).province &&
                                RegoionsData[0].provinces.find(Country => Country.id === usersLists.find(item => item.id === ActivePopupUser.id).province).name
                            )
                        }</p>
                    </PopupRowContainer>
                    <PopupRowContainer>
                        <span>تعداد پرسش‌نامه‌ها</span>
                        <p>{
                            usersLists.find(item => item.id === ActivePopupUser.id).questionnaires_count ? digitsEnToFa(usersLists.find(item => item.id === ActivePopupUser.id).questionnaires_count)
                                : ''
                        }</p>
                    </PopupRowContainer>
                </PopupInfoContainer>

            </ChatMessageContainer>
            <PopupFooter>
                <PopupFooterButton
                    onClick={() => SetActivePopupUser({
                        id : usersLists[usersLists.findIndex(UserItem => UserItem.id === ActivePopupUser.id) + 1].id
                    })}
                    disabled={usersLists.findIndex(UserItem => UserItem.id === ActivePopupUser.id) === usersLists.length - 1}>
                    <Icon name={'ArrowDown'} />
                    <p>بعدی</p>
                </PopupFooterButton>
                <PopupFooterButton
                    onClick={() => SetActivePopupUser({
                        id : usersLists[usersLists.findIndex(UserItem => UserItem.id === ActivePopupUser.id) - 1].id
                    })}
                    disabled={usersLists.findIndex(UserItem => UserItem.id === ActivePopupUser.id) === 0}>
                    <Icon style={{ transform : 'rotate(180deg)' }} name={'ArrowDown'} />
                    <p>قبلی</p>
                </PopupFooterButton>
            </PopupFooter>
        </PopupContainer>
    </>


}