
const question_object_generator = (questionInfo,type) => {
    let specific_question_detail = {}
    let type_prefix;
    const question_common_properties = { 
        ...questionInfo
     }
     switch(type)
    {
        case 'optional':
            type_prefix = 'optional-questions';
            questionInfo.options ?
            question_common_properties.options = questionInfo.options : ''
            break;
        case 'drop_down':
            type_prefix = 'optional-questions';
            questionInfo.options ?
            question_common_properties.options = questionInfo.options : ''
            break;
        case 'integer_selective':
            type_prefix = 'integerselective-questions';
            break;
        case 'integer_range':
            type_prefix = 'integerrange-questions';
            break;
        case 'sort':
            type_prefix = 'sort-questions';
            questionInfo.options ?
            question_common_properties.options = questionInfo.options : ''
            break;
        case 'file':
            type_prefix = 'file-questions';
            break;
        case 'link':
            type_prefix = 'link-questions';
            break;
        case 'number_answer':
            type_prefix = 'numberanswer-questions';
            break;
        case 'text_answer':
            type_prefix = 'textanswer-questions';
            break;
        case 'welcome':
            type_prefix = 'question-groups'
            break;
        case 'thank':
            break;
    }
    question_common_properties.url_prefix = type_prefix;
     const question_common_toggles = {
        show_number : questionInfo.show_number,
        is_required : questionInfo.is_required
     }
}
