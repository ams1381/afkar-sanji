export const QuestionnaireReducerFunction = (State,ACTION) => {
    switch(ACTION.ACTION)
    {
        case 'Date Cleared' :
            return {
                ...State,
                pub_date : null,
                end_date : null
            }
        case 'Data Replacement' :
            return ACTION.newData;
        case 'Timer Cleared' :
            return {
                ...State,
                timer : null
            }
        case 'Pub date set':
            return {
                ...State,
                pub_date : ACTION.NewDate,

            }
        case 'End date set':
            return {
                ...State,
                end_date : ACTION.NewDate,
            }
        case 'Timer Change':
            return {
                ...State,
                timer : ACTION.NewTimer
            }
        case 'show_question_in_pages':
            return {
                ...State,
                show_question_in_pages : ACTION.NewToggleValue,
                previous_button : ACTION.NewToggleValue,
            }
        case 'progress_bar':
            return {
                ...State,
                progress_bar : !ACTION.NewToggleValue
            }
        case 'previous_button':
            return {
                ...State,
                previous_button : !ACTION.NewToggleValue
            }
        case 'is_active':
            return {
                ...State ,
                is_active : ACTION.NewToggleValue
            }
        case 'reset_questionnaire':
            return ACTION.Resetvalue
        case 'show_number':
            return {
                ...State,
                show_number : ACTION.NewToggleValue
            }
        case 'refresh_data' :
            return {
                ...State ,
                ...ACTION.refreshData
            }
        case 'change_district' :
            return  {
                ...State ,
                'districts' : ACTION.preferred_districts
            }
    }
}