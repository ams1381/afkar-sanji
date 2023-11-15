import {Icon} from "@/styles/icons";
import {ChatHeaderContainer, ChatHeaderTitle} from "@/styles/common";

export const ChatHeader = ({
                               isActive,
                               setIsActive
                           }) => {
    return <ChatHeaderContainer>
        <div onClick={() => setIsActive(false)} style={{cursor: 'pointer'}}>
            <Icon name={'GrayClose'}/>
        </div>
        <ChatHeaderTitle>
            <p className={'project-name'}>داده‌های غذایی نامی‌نو</p>
            <p className={'admin-name'}>علی عباس آبادی</p>
        </ChatHeaderTitle>
    </ChatHeaderContainer>
}