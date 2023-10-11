import React, {lazy, Suspense, useEffect, useRef, useState} from 'react';
import Draggable from 'react-draggable';
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {UserAvatarLogout} from "@/styles/common";
import {ModalEditButton, ModalHeader , ModalFooter} from "@/styles/Result/QuestionerResult";
import {Icon} from "@/styles/icons";
import {Button} from "antd";
import {QuestionContainer} from "@/styles/Result/AddResult";
import {SubComponentGenerator} from "@/components/Questioner/AddResult/QuestionSubCompGenerator";
import {useDispatch} from "react-redux";
import {setAnswerSetArray} from "@/utilities/stores/AnswerStore";


export const MovableModal = ({ ModalAnswerSet , setOpenResultModal , answerSetData }) => {
    const [ ErrorQuestions , setErrorQuestions ] = useState([])
    const dispatcher = useDispatch();

    useEffect(() => {
        dispatcher(setAnswerSetArray({ AnswerSetArray : ModalAnswerSet.answerSet.answers }))
    },[])

    const onStart = (e) => {
        e.stopPropagation(); // Stop propagation to prevent modal dragging
    };

    return (
        <Draggable handle=".handle">
            <div className="box">
                <ModalHeader>
                    <div className={'modal_header_box'}>
                        <ModalEditButton>
                            <p>ویرایش</p>
                            <Icon name={'ProfilePen'} />
                        </ModalEditButton>
                        <div className="handle">{digitsEnToFa('1402/2/6')}</div>
                    </div>
                    <Icon onClick={() => setOpenResultModal(false)}
                          className={'close_modal'}  name={'GrayClose'} />
                </ModalHeader>
                <div style={{ fontSize : 14 }}>
                    {
                        ModalAnswerSet.questions.map(item => item?.question &&
                            <QuestionContainer id={'question' + item.question.id}>
                                <div className='question_header'>
                                <span>
                                    { digitsEnToFa(item.question.placement) + '.' }
                                </span>
                                    <p>
                                        {item.question.title}
                                    </p>
                                </div>
                                <p>
                                    {item.question.description}
                                </p>
                                {SubComponentGenerator(item.question,null,setErrorQuestions,ErrorQuestions)}
                            </QuestionContainer>)
                    }
                </div>
                <ModalFooter>
                    <Button type={'primary'} disabled>
                        ذخیره
                    </Button>
                </ModalFooter>
            </div>
        </Draggable>
    );
};