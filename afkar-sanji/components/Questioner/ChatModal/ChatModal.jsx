import {ChatPrompt} from "@/components/Questioner/ChatModal/ChatPrompt";
import {ChatHeader} from "@/components/Questioner/ChatModal/ChatHeader";
import {ChatContainer, ChatMask, ChatMessageContainer} from "@/styles/common";
import {SentMessage} from "@/components/Questioner/ChatModal/SentMessage";

export const ChatModal = ({
                              isActive,
                              setIsActive
                          }) => {
    return <>
        <ChatMask onClick={() => setIsActive(false)}></ChatMask>
        <ChatContainer>
            <ChatHeader isActive={isActive}
                        setIsActive={setIsActive}/>
            <ChatMessageContainer>
                <div>
                    <SentMessage/>
                </div>
            </ChatMessageContainer>
            <ChatPrompt/>
        </ChatContainer>
    </>
}