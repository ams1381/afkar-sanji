export const AnswersArrayGenerator = (QuestionsList) => {
    let AnswersArray = [];
    QuestionsList?.forEach((QuestionItem) => {
        if(!QuestionItem || !QuestionItem.question)
            return
        if(QuestionItem.question && QuestionItem.question.child_questions)
        {
            QuestionItem.question.child_questions.forEach((item) => {
                AnswersArray.push({
                    question : item.question.id,
                    answer : {},
                    file : null
                })
            })
        }
        else
            AnswersArray.push({
                question : QuestionItem.question.id,
                answer : {},
                file : null
            })
    })
    return AnswersArray
}

export const AnswersValidator = (Question) => {
    // if(!Question || AnswersList.length || !Question.question?.is_required)
    //     return

    // if(!Question.question?.is_required)
    //     return
    // let AnswerToValidate = AnswersList.find(item => item.question === Question.question.id);
    //
    // if(!AnswerToValidate)
    //     return;
    //
    switch (Question.question.question_type)
    {
        case 'optional':
            let SelectedInputArray = document.querySelectorAll(`#question-${Question.question.id} input:checked`);
            if(!SelectedInputArray.length)
                return 'لطفا به سوال پاسخ دهید';
            break
            // ant-rate-star
        case 'integer_selective':
            let SelectedDegree =
                document.querySelectorAll(`#question-${Question.question.id} .ant-rate-star.ant-rate-star-full`);
            if(!SelectedDegree.length)
                return 'لطفا به سوال پاسخ دهید';
            break
        // case 'integer_range':
        //     if(!AnswerToValidate.answer.integer_range)
        //         return 'لطفا به سوال پاسخ دهید';
        //     break
        // case 'file':
        //     if(!AnswerToValidate.file)
        //         return 'لطفا به سوال پاسخ دهید';
        //     break
        // case 'number_answer':
        //     if(!AnswerToValidate.answer.number_answer)
        //         return 'لطفا به سوال پاسخ دهید';
        //     break
        // case 'link':
        //     if(!AnswerToValidate.answer.link)
        //         return 'لطفا به سوال پاسخ دهید';
        //     break
        // case 'email_field':
        //     if(!AnswerToValidate.answer.email_field)
        //         return 'لطفا به سوال پاسخ دهید';
        //     break
        // case 'drop_down':
        //     if((!AnswerToValidate.answer.selected_options || !AnswerToValidate.answer.selected_options?.length))
        //         return 'لطفا به سوال پاسخ دهید';
        //     break
        // case 'group':
        //       Question.question.child_questions.forEach(ChildQuestion => {
        //         return AnswersValidator(AnswersList , ChildQuestion)
        //     })
            break;
    }
    return 'pass';
}