import {Checkbox} from "antd";
import {OptionalItemContainer} from "@/styles/questionnairePanel/QuestionComponent";
import {DegreeItemsContainer} from "@/styles/Result/AddResult";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {NumberSelect} from "@/utilities/AnswerStore";

export const DegreeRangeSubComponent = ({ QuestionData , answerSet}) => {
    const [ SelectedItem , SetSelectedItem ] = useState(null);
    const dispatcher = useDispatch();

    useEffect(() => {
        if (answerSet && answerSet.answers?.length)
            SetSelectedItem(answerSet.answers.find(item => item.question == QuestionData.id).answer[QuestionData.question_type] - 1);
    })
    return <DegreeItemsContainer>
        {
            Array.from({ length : QuestionData.max }).map((_,index) =>
                <OptionalItemContainer onClick={() => {
                    SetSelectedItem(index)
                    dispatcher(NumberSelect({
                        QuestionID : QuestionData.id ,
                        NumberValue : QuestionData.min == 0 ? index : index + 1 ,
                        NumberName : QuestionData.question_type
                    }))
                }
                }
                    style={{ fontWeight : 700 , color : 'black' , gap : '8px'}}>
                <p>{digitsEnToFa( QuestionData.min == 0 ? index : index + 1)}</p>
                <Checkbox checked={index == SelectedItem} />
            </OptionalItemContainer>)
        }
    </DegreeItemsContainer>
}