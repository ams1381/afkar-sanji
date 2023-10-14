import React, {lazy, Suspense, useEffect, useRef, useState} from 'react';
import Draggable from 'react-draggable';
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {UserAvatarLogout} from "@/styles/common";
import {ModalEditButton, ModalHeader , ModalBody , ModalFooter} from "@/styles/Result/QuestionerResult";
import {Icon} from "@/styles/icons";
import {Button, message} from "antd";
import {QuestionContainer} from "@/styles/Result/AddResult";
import {SubComponentGenerator} from "@/components/Questioner/AddResult/QuestionSubCompGenerator";
import {useDispatch, useSelector} from "react-redux";
import {setAnswerSetArray, setInitialAnswerSet} from "@/utilities/stores/AnswerStore";
import {ModalSubComponentGenerator} from "@/components/Questioner/Result/ModalSubComponentGenerator";
import {convertDate, convertToRegularTime} from "@/components/QuestionnairePanel/SettingPanel";
import axios from "axios";
import {AnswerSetFormDataConverter} from "@/utilities/FormData";
import {ModalSubQuestionGenerator} from "@/components/Questioner/Result/ModalSubQuestionGenerator";


export const MovableModal = ({ ModalAnswerSet , ResultQuery , setOpenResultModal , QuestionnaireUUID}) => {
    const [ ErrorQuestions , setErrorQuestions ] = useState([])
    const dispatcher = useDispatch();
    const [ SaveChangesLoading , setSaveChangesLoading ] = useState(false)
    const [ EditAnswerSetState , setEditAnswerSetState ] = useState(false);
    const [ messageApi , messageContext ] = message.useMessage();
    let AnswerSetsArray = useSelector(state => state.reducer.AnswerSet);
    // console.log(ModalAnswerSet.answerSet)
    useEffect(() => {
        if(!ModalAnswerSet.answerSet.answers.length)
            dispatcher(setInitialAnswerSet({
                Questions : ModalAnswerSet.questions
            }))
        else
            dispatcher(setAnswerSetArray({
                AnswerSetArray : ModalAnswerSet.answerSet.answers ,
                QuestionsArray : ModalAnswerSet.questions
            }))
    },[])
    const ConfirmAnswerHandler = async () => {
        let AnswerSet = AnswerSetsArray;

        let FileQuestionQuestions = AnswerSet.map(item => {
            if(item.file)
                return item
        })
        let CopiedQuestionAnswerSet = JSON.parse(JSON.stringify(AnswerSet));
        CopiedQuestionAnswerSet.forEach((item,index) => {
            if(item.answer && !Object.keys(item.answer)?.length)
                item.answer = null
        })

        FileQuestionQuestions = FileQuestionQuestions.filter(item => item != undefined);
        CopiedQuestionAnswerSet = CopiedQuestionAnswerSet.filter(item => item.file == null);

        try
        {
            setSaveChangesLoading(true)


            if(FileQuestionQuestions && FileQuestionQuestions.length)
                await axios.post(`/question-api/questionnaires/${QuestionnaireUUID}/answer-sets/${ModalAnswerSet.answerSet.id}/add-answer/`,
                    AnswerSetFormDataConverter(FileQuestionQuestions),{
                        'Content-Type' : 'multipart/form-data'
                    })
            await axios.post(`/question-api/questionnaires/${QuestionnaireUUID}/answer-sets/${ModalAnswerSet.answerSet.id}/add-answer/`,
                CopiedQuestionAnswerSet)

            ResultQuery.refetch()
        }
        catch(err)
        {
            setSaveChangesLoading(false)
            if(err.response?.data)
            {
                let ErrorsArray = err.response?.data.map(item => {
                    if(Object.keys(item).length)
                        return Object.keys(item)[0]
                })
                ErrorsArray.forEach(ErrorItem => {
                    if(ErrorItem) {
                        let QuestionElement = document.getElementById('question' + ErrorItem)
                        QuestionElement.scrollIntoView({behavior: 'smooth'});

                        setTimeout(() => {
                            const desiredOffset = window.innerHeight / 2 - QuestionElement.clientHeight / 2;
                            window.scrollTo({
                                top: QuestionElement.offsetTop - desiredOffset,
                                behavior: 'smooth'
                            });
                        }, 500);
                    }
                })
                setErrorQuestions(ErrorsArray)
                err.response.data?.forEach((item) => {
                    if(item && Object.values(item).length)
                        messageApi.error({
                            content : Object.values(item)[0],
                            style : {
                                fontFamily : 'IRANSans'
                            }
                        })
                })
            }

        }
        setSaveChangesLoading(false)
        // router.push(`../${questionnaire.uuid}/questioner-result`);
    }
    const handleDrag = (e, ui) => {
        // Get the current window dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculate the maximum allowed position
        const maxX = windowWidth - e.target.offsetWidth;
        const maxY = windowHeight - e.target.offsetHeight;

        // Adjust the position to stay within the viewport
        let x = ui.x;
        let y = ui.y;

        // Check if the dragged element is going out of the viewport horizontally
        if (ui.x < 0) {
            x = 0;
        } else if (ui.x > maxX) {
            x = maxX;
        }

        // Check if the dragged element is going out of the viewport vertically
        if (ui.y < 0) {
            y = 0;
        } else if (ui.y > maxY) {
            y = maxY;
        }

        // Set the new position
        ui.x = x;
        ui.y = y;
    };
    return (
        <Draggable handle=".handle" onDrag={handleDrag}>
            <div className="box">
                <ModalHeader>
                    {messageContext}
                    <div className={'modal_header_box'}>
                        <ModalEditButton onClick={() => setEditAnswerSetState(true)}>
                            <p>ویرایش</p>
                            <Icon name={'ProfilePen'} />
                        </ModalEditButton>
                        <div className="handle" style={{ cursor : 'grab' }}>
                            {digitsEnToFa(convertDate(convertToRegularTime(ModalAnswerSet.answerSet.answered_at).split(' ')[0],'jalali'))}
                        </div>
                    </div>
                    <Icon onClick={() => setOpenResultModal(false)}
                          className={'close_modal'}  name={'GrayClose'} />
                </ModalHeader>
                { AnswerSetsArray && AnswerSetsArray.length && <ModalBody>
                    {
                        ModalAnswerSet.questions.map((item,inedx) => item?.question && (item?.question.question_type != 'group' ?  ModalAnswerSet.
                            answerSet.answers.some(AnswerItem => AnswerItem.question_id == item?.question.id) : true) &&
                            <QuestionContainer error={ErrorQuestions.find(ErrorItem => ErrorItem == item.question.id) ? 'active' : null}
                                   key={item?.question.id} id={'question' + item.question.id}>
                                <div className='question_header'>
                                <span>
                                    {digitsEnToFa(inedx + 1) + '.'}
                                </span>
                                    <p className={'question_title'}>
                                        {item.question.title}
                                    </p>
                                    { item.question.is_required ? '*' : '' }
                                </div>
                                <p className={'question_description'}>
                                    {item.question.description}
                                </p>
                                {EditAnswerSetState ?
                                    ModalSubQuestionGenerator(item.question, setErrorQuestions, ErrorQuestions, AnswerSetsArray,true)
                                    :
                                    ModalSubComponentGenerator(item.question, ModalAnswerSet.answerSet.answers, EditAnswerSetState, setErrorQuestions, ErrorQuestions)
                                }
                            </QuestionContainer>)
                    }
                </ModalBody>}
                <ModalFooter className="handle">
                    <Button type={'primary'} onClick={ConfirmAnswerHandler}
                       loading={SaveChangesLoading}  disabled={!EditAnswerSetState}>
                        ذخیره
                    </Button>
                </ModalFooter>
            </div>
        </Draggable>
    );
};