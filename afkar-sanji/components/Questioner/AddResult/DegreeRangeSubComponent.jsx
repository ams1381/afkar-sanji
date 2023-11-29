import {Checkbox} from "antd";
import {OptionalItemContainer} from "@/styles/questionnairePanel/QuestionComponent";
import {DegreeItemsContainer} from "@/styles/Result/AddResult";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {NumberSelect} from "@/utilities/stores/AnswerStore";

export const DegreeRangeSubComponent = ({ QuestionData , loadableAnswer , answerSet , ErrorQuestions , setErrorQuestions}) => {
    const [ SelectedItem , SetSelectedItem ] = useState(null);
    const dispatcher = useDispatch();

    // useEffect(() => {
    //         SetSelectedItem(answerSet?.answers?.find(item => item.question == QuestionData.id)?.answer[QuestionData.question_type] - 1);
    //
    // },[SelectedItem])
    useEffect(() => {
        // console.log(answerSet?.find(item => item.question === QuestionData.id))
        if(answerSet.find(item => item.question === QuestionData.id))
        {
            if(!answerSet.find(item => item.question === QuestionData.id).answer[QuestionData.question_type] && !loadableAnswer) {
                SetSelectedItem(null)
            }
            if(answerSet.find(item => item.question === QuestionData.id).answer[QuestionData.question_type] && loadableAnswer)
                SetSelectedItem(answerSet.find(item => item.question === QuestionData.id).answer[QuestionData.question_type] )
        }

    },[QuestionData.id , answerSet ])

    return <DegreeItemsContainer>
        {
            Array.from({ length : QuestionData.max }).map((_,index) =>
                <OptionalItemContainer key={index + 1} onClick={() => {
                    if(QuestionData.question_type == 'integer_selective' ||
                        (QuestionData.question_type == 'integer_range' && QuestionData.min !== 0))
                        SetSelectedItem(index + 1)
                    else
                        SetSelectedItem(index)
                    let ErrorQuestionArray = [...ErrorQuestions]
                    // console.log((QuestionData.min === 0))
                    setErrorQuestions(ErrorQuestionArray.filter(item => item != QuestionData.id))
                    dispatcher(NumberSelect({
                        QuestionID : QuestionData.id ,
                        NumberValue : QuestionData.min === 0 ? index : index + 1 ,
                        NumberName : QuestionData.question_type
                    }))
                    }
                }
                    style={{ fontWeight : 700 , color : 'black' , gap : '8px'}}>
                <p>{digitsEnToFa( QuestionData.min == 0 ? index : index + 1)}</p>
                    { QuestionData.question_type == "integer_selective" ?
                    <Checkbox checked={index + 1 === SelectedItem} /> :
                        <Checkbox checked={QuestionData.min == 0 ? index == SelectedItem : index + 1 == SelectedItem } />
                    }
            </OptionalItemContainer>)
        }
    </DegreeItemsContainer>
}