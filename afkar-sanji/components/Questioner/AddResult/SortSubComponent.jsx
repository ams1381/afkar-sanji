import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
import {OptionalAnswerBlockContainer} from "@/styles/questionnairePanel/QuestionComponent";
import {Icon} from "@/styles/icons";
import React, {useEffect, useState} from "react";
import {SortOptions} from "@/utilities/stores/AnswerStore";
import {useDispatch, useSelector} from "react-redux";

export const SortSubComponent = ({ QuestionData , answerSet , ErrorQuestions , setErrorQuestions , loadableAnswer}) => {
    const dispatcher = useDispatch();
    const [sortedOptionArray, setSortedOptionArray] = useState(QuestionData.options);

    // const QuestionsAnswerSet = useSelector(state => state.reducer.AnswerSet);
    useEffect(() => {
        if(!answerSet.find(item => item.question == QuestionData.id)?.answer?.sorted_options && !loadableAnswer) {
            setSortedOptionArray(QuestionData.options)
            return;
        }
        if(answerSet.find(item => item.question == QuestionData.id) && loadableAnswer)
        {
            if(!(answerSet.find(item => item.question == QuestionData.id).answer.sorted_options))
                return
            setSortedOptionArray(answerSet.find(item => item.question == QuestionData.id).answer.sorted_options.map(item => ({
                id : QuestionData.options.find(OptionItem => OptionItem.id == item.id).id  ,
                text : QuestionData.options.find(OptionItem => OptionItem.id == item.id)?.text
            })))
        }
    },[QuestionData , answerSet])
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedItems = reorder(
            sortedOptionArray,
            result.source.index,
            result.destination.index
        );
        setSortedOptionArray(reorderedItems);

        // if(QuestionsAnswerSet && QuestionsAnswerSet.length)
        dispatcher(SortOptions({ QuestionID : QuestionData.id , NewOptionsArray : reorderedItems.map((item,index) => ({ id : item.id , placement : index + 1 })) }))
        let ErrorQuestionArray = [...ErrorQuestions]
        setErrorQuestions(ErrorQuestionArray.filter(item => item != QuestionData.id))
    };
    // console.log(sortedOptionArray)
    const getItemStyle = (isDragging, draggableStyle) => ({
        ...draggableStyle,
        userSelect: 'none',
        position: 'static',
    });
    return <DragDropContext onDragEnd={onDragEnd} >
        <Droppable droppableId='prioritize_droppable'>
            {(droppableProvided, droppableSnapshot) => (
                <OptionalAnswerBlockContainer
                    vertical='true'
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}>
                    {sortedOptionArray.map((item, index) => (
                        <Draggable
                            key={item.id}
                            style={getItemStyle(droppableSnapshot.isDraggingOver)}
                            draggableId={item.id.toString()}
                            index={index}
                        >
                            {(draggableProvided, draggableSnapshot) => (
                                <div
                                    ref={draggableProvided.innerRef}

                                    {...draggableProvided.draggableProps}
                                    {...draggableProvided.dragHandleProps}>
                                    <label
                                        className='OptionalAnswerItemContainer Prioritize'
                                        style={{ cursor: 'pointer' , color : 'black' , fontWeight : 700 }}>
                                        <Icon name='DND' style={{ display : 'none' }} />
                                        <p style={{ marginRight: 15 }}>{item.text && item.text != 'null' ? item.text : ''}</p>
                                    </label>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {droppableProvided.placeholder}
                </OptionalAnswerBlockContainer>
            )}
        </Droppable>
    </DragDropContext>
}