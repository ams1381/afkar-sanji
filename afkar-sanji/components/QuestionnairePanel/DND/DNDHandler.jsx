export const handleDragStart = (event) => {
    // Get the ID of the dragged question
    const questionId = event.active.id;
    console.log(questionId)
    // Find the index of the dragged question in the AllQuestion list
    // const questionIndex = AllQuestion.findIndex((item) => item.question.id.toString() === questionId);
    // // Create a copy of the AllQuestion list
    // const newAllQuestion = [...AllQuestion];
    // // Remove the dragged question from the list
    // newAllQuestion.splice(questionIndex, 1);
    // // Update the state to reflect the changed list
    // setAllQuestion(newAllQuestion);
  };
export const handleDragEnd = (event) => {
    // Get the ID of the dragged question
    const questionId = event.active.id;
    // Find the index where the question should be dropped
    const newIndex = event.over?.id;

    if (newIndex !== undefined) {
        console.log(newIndex)
      // Find the index of the dragged question in the AllQuestion list
    //   const questionIndex = AllQuestion.findIndex((item) => item.question.id.toString() === questionId);
    //   // Create a copy of the AllQuestion list
    //   const newAllQuestion = [...AllQuestion];
    //   // Splice the dragged question into the new position
    //   newAllQuestion.splice(newIndex, 0, AllQuestion[questionIndex]);
    //   // Update the state to reflect the changed list
    //   setAllQuestion(newAllQuestion);
    }
  };