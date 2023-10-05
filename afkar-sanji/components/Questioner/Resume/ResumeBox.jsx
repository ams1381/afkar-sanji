import {ResumeBox} from "@/styles/questioner/resume/resume";

export default function ({children,scale,padding}){
    return (
        <ResumeBox padding={padding} scale={scale}>
            {children}
        </ResumeBox>
    )
}