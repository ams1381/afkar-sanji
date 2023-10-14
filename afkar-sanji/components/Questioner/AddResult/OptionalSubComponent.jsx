import {QuestionOptionsContainer} from "@/styles/Result/AddResult";
import {OptionalItemContainer} from "@/styles/questionnairePanel/QuestionComponent";
import {Checkbox, Input} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {shuffleArray} from "@/components/Questions/Optional";
import {ChoseOption} from "@/utilities/stores/AnswerStore";

export const OptionalSubComponent = ({ QuestionData , answerSet , setErrorQuestions , ErrorQuestions , loadableAnswer }) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const dispatcher = useDispatch();
    const [showInput, setShowInput] = useState(false);
    const [otherInputValue, setOtherInputValue] = useState("");
    const [ QuestionOptions , setQuestionOptions ] = useState(QuestionData.options);
    const regex = /(<([^>]+)>)/gi;
    const cleanText = (text) => {
        return text?.replace(regex, '');
    };

    useEffect(() => {
        if(QuestionData.is_random_options)
        {
            // setIsRandom(true);
            setQuestionOptions(shuffleArray(QuestionData.options))
        }
        else
            setQuestionOptions((QuestionData.options))

    },[QuestionData])
    useEffect(() => {
            // console.log(answerSet?.find(item => item.question === QuestionData.id))

            if(answerSet.find(item => item.question === QuestionData.id) && loadableAnswer)
            {
                if(!answerSet?.find(item => item.question === QuestionData.id)?.answer?.selected_options)
                    return
                    let selected_options_array = answerSet?.find(item => item.question === QuestionData.id).answer.selected_options
                        .map(SelectedOption => ({
                            id : SelectedOption ,
                            text : QuestionData.options.find(item => item.id == SelectedOption).text
                        }));

                    setSelectedValues(selected_options_array);
                    if(answerSet.find(item => item.question === QuestionData.id).answer?.other_text)
                    {

                        setShowInput(true);
                        setOtherInputValue(answerSet.find(item => item.question == QuestionData.id).answer?.other_text)
                    }
            }
    },[QuestionData])

    useEffect(() => {

            dispatcher(ChoseOption({
                QuestionID : QuestionData.id ,
                ChoseOptionsArray : selectedValues ,
                other_text : otherInputValue
            }))

    },[selectedValues , otherInputValue])
    const handleCheckboxChange = (item) => {
        const max_selected_options = QuestionData.max_selected_options || 1;
        const cleanedValue = cleanText(item.text);

        if (
            item.text === '<span>همه گزینه ها</span>' ||
            item.text === '<span>هیچ کدام</span>' ||
            item.text === '<span>سایر</span>'
        ) {
            setSelectedValues([item]);

            if (item.text === '<span>سایر</span>') {
                setShowInput(true);
                setOtherInputValue("");
            } else {
                setShowInput(false);
            }
        } else {
            setSelectedValues(prevSelected => {
                let updatedSelected;

                if (max_selected_options === 1) {
                    updatedSelected = prevSelected[0]?.id === item.id ? [] : [item];
                } else {
                    updatedSelected = prevSelected.filter(val =>
                        cleanText(val.text) !== 'همه گزینه ها' &&
                        cleanText(val.text) !== 'هیچ کدام' &&
                        cleanText(val.text) !== 'سایر'
                    );

                    if (
                        updatedSelected.some(val => cleanText(val.text) === 'همه گزینه ها') ||
                        updatedSelected.some(val => cleanText(val.text) === 'هیچ کدام')
                    ) {
                        updatedSelected.length = 0;
                        setShowInput(false);
                    }

                    if (!updatedSelected.some(val => (cleanText(val.text) === cleanedValue && item.id === val.id))) {
                        if (!max_selected_options || updatedSelected.length < max_selected_options) {
                            updatedSelected.push(item);
                        }
                    } else {
                        updatedSelected = updatedSelected.filter(val => (val.id !== item.id));
                    }
                }

                return updatedSelected;
            });

            setShowInput(false);
            setOtherInputValue("");
        }
        let ErrorQuestionArray = [...ErrorQuestions]
        // console.log(selectedValues)
        // dispatcher(ChoseOption({
        //     QuestionID : QuestionData.id ,
        //     ChoseOptionsArray : selectedValues ,
        //     other_text : otherInputValue
        // }))
        setErrorQuestions(ErrorQuestionArray.filter(item => item != QuestionData.id))
    };
    return <QuestionOptionsContainer>
        {
            QuestionData.options.map((item) => <OptionalItemContainer key={item.id} id={item.id} style={{ fontWeight : 700 , color : 'black' }}>
                <Checkbox
                    value={item.text}
                    onChange={() => handleCheckboxChange(item)}
                    key={item.id}
                    checked={selectedValues.some(val => val.id ? val.id === item.id : val === item.id)}  />
                {item.text !== 'null' &&
                    <>{(item.text?.replace(regex,'') === 'سایر' && showInput) ? <Input onChange={(e) => setOtherInputValue(e.target.value)}
                                                                                       placeholder='چیزی بنویسید' value={otherInputValue} />
                        : <p>{cleanText(item.text)}</p>
                    }</>}

            </OptionalItemContainer>)
        }
    </QuestionOptionsContainer>
}