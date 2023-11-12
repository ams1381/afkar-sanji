import {ChatPrompt} from "@/components/Questioner/ChatModal/ChatPrompt";
import {ChatHeader} from "@/components/Questioner/ChatModal/ChatHeader";
import {ChatContainer, ChatMask, ChatMessageContainer} from "@/styles/common";
import {SentMessage} from "@/components/Questioner/ChatModal/SentMessage";

export const ChatModal = () => {
    return <ChatMask>
        <ChatContainer>
            <ChatHeader />
            <ChatMessageContainer>
                <div>
                    <SentMessage />
                </div>
            </ChatMessageContainer>
            <ChatPrompt/>
        </ChatContainer>
    </ChatMask>
}