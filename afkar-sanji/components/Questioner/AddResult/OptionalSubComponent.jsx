import {QuestionOptionsContainer} from "@/styles/Result/AddResult";
import {OptionalItemContainer} from "@/styles/questionnairePanel/QuestionComponent";
import {Checkbox} from "antd";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {shuffleArray} from "@/components/Questions/Optional";

export const OptionalSubComponent = ({ QuestionData , answerSet }) => {
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
        if(answerSet && answerSet?.answers?.length)
        {

            let selected_options_array = answerSet?.answers.find(item => item.question === QuestionData.id).answer?.selected_options;
            setSelectedValues(QuestionData.options.filter(OptionItem => selected_options_array?.includes(OptionItem.id)));
            if(answerSet.answers.find(item => item.question === QuestionData.id).answer?.other_text)
            {

                setShowInput(true);
                setOtherInputValue(answerSet.find(item => item.question == QuestionInfo.id).answer?.other_text)
            }
        }
    },[])
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

    };
    return <QuestionOptionsContainer>
        {
            QuestionData.options.map((item) => <OptionalItemContainer style={{ fontWeight : 700 , color : 'black' }}>
                <Checkbox
                    value={item.text}
                    onChange={() => handleCheckboxChange(item)}
                    key={item.id}
                    checked={selectedValues.some(val => val.id === item.id)}  />
                <p>{item.text != 'null' ? item.text?.replace(regex,'') : ''}</p>
            </OptionalItemContainer>)
        }
    </QuestionOptionsContainer>
}