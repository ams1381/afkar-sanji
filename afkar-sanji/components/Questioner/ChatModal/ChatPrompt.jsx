import {Button, Input} from "antd";
import {Icon} from "@/styles/icons";
import {ChatPromptContainer} from "@/styles/common";

export const ChatPrompt = () => {
    return <ChatPromptContainer>
        <Button type={'primary'}>
            <Icon name={'SendMessage'} />
        </Button>
        <Input placeholder={'چیزی بنویسید'} />
    </ChatPromptContainer>
}