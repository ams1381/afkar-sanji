import {Icon} from "@/styles/icons";
import {ChatHeaderContainer, ChatHeaderTitle} from "@/styles/common";

export const ChatHeader = ({
                               isActive,
                               isAdmin,
                               setIsActive
                           }) => {
    return <ChatHeaderContainer>
        <div onClick={() => setIsActive(false)} style={{cursor: 'pointer'}}>
            <Icon name={'GrayClose'} style={{ width : 12 , height : 12 }}/>
        </div>
        <ChatHeaderTitle>
            {/*<p className={'project-name'}>داده‌های غذایی نامی‌نو</p>*/}
            {/*<p className={'admin-name'}>علی عباس آبادی</p>*/}
            { isAdmin ? <p className={'admin-name'}></p> : <p className={'admin-name'}>ادمین</p> }
        </ChatHeaderTitle>
    </ChatHeaderContainer>


}