import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const QuestionDraggable = ({ question, children }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: question.id.toString(),
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        opacity: isDragging ? 0.6 : 1,
        cursor: 'grab', // Add a grabbing cursor for better UI feedback
        /* Add other styling for the draggable item */
      }}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export default QuestionDraggable;