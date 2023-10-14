import {Checkbox} from "antd";
import {OptionalItemContainer} from "@/styles/questionnairePanel/QuestionComponent";
import {DegreeItemsContainer} from "@/styles/Result/AddResult";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {NumberSelect} from "@/utilities/stores/AnswerStore";

export const DegreeRangeSubComponent = ({ QuestionData , answerSet , ErrorQuestions , setErrorQuestions}) => {
    const [ SelectedItem , SetSelectedItem ] = useState(null);
    const dispatcher = useDispatch();

    // useEffect(() => {
    //         SetSelectedItem(answerSet?.answers?.find(item => item.question == QuestionData.id)?.answer[QuestionData.question_type] - 1);
    //
    // },[SelectedItem])
    useEffect(() => {
        // console.log(answerSet?.find(item => item.question === QuestionData.id))
        if(answerSet.find(item => item.question === QuestionData.id))
        {   console.log(answerSet?.find(item => item.question === QuestionData.id))
            SetSelectedItem(answerSet.find(item => item.question === QuestionData.id).answer[QuestionData.question_type] )
            // let selected_options_array = answerSet?.find(item => item.question === QuestionData.id)?.answer?.selected_options;
            // // console.log(selected_options_array)
            // setSelectedValues(selected_options_array);
            // if(answerSet.find(item => item.question === QuestionData.id).answer?.other_text)
            // {
            //
            //     setShowInput(true);
            //     setOtherInputValue(answerSet.find(item => item.question == QuestionInfo.id).answer?.other_text)
            // }
        }
    },[QuestionData.id ])
    return <DegreeItemsContainer>
        {
            Array.from({ length : QuestionData.max }).map((_,index) =>
                <OptionalItemContainer key={index + 1} onClick={() => {
                    SetSelectedItem(index)
                    let ErrorQuestionArray = [...ErrorQuestions]

                    setErrorQuestions(ErrorQuestionArray.filter(item => item != QuestionData.id))
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