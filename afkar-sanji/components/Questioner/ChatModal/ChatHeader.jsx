import {Icon} from "@/styles/icons";
import {ChatHeaderContainer, ChatHeaderTitle} from "@/styles/common";

export const ChatHeader = () => {
    return <ChatHeaderContainer>
        <div style={{ cursor : 'pointer' }}>
            <Icon name={'GrayClose'} />
        </div>
        <ChatHeaderTitle>
            <p className={'project-name'}>داده‌های غذایی نامی‌نو</p>
            <p className={'admin-name'}>علی عباس آبادی</p>
        </ChatHeaderTitle>
    </ChatHeaderContainer>
}