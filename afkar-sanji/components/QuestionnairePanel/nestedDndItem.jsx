import React from 'react'
import { QuestionItem } from './QuestionItem'
import { DragDropContext , Droppable , Draggable } from '@hello-pangea/dnd';
import { getListStyle } from './QuestionDesignPanel';


export const NestedDndItem = ({ ListToRender , Questionnaire , ActiveQuestionId , setActiveQuestionId , onDragEnd}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd} >
                  <Droppable droppableId='dropboard'>
                  {(provided, snapshot) => <div  
                  {...provided.droppableProps}
                    ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                    {ListToRender.map((item,index) => 
                    ( item.question)? 
                      <Draggable
                      key={item.question.id}
                      draggableId={item.question.id.toString()}
                      index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps}>
                          <QuestionItem
                            IsQuestion={true}
                            UUID={Questionnaire.uuid}
                            key={item.question.id}
                            question={item}
                            Questionnaire={Questionnaire}
                            provided={provided}
                            activeQuestionId={ActiveQuestionId}
                            setActiveQuestion={setActiveQuestionId}
                            dropboardprovide={provided}/>         
                        </div>
                      )}
                    </Draggable> : null)}
                  {provided.placeholder}
                  </div>  } 
                  </Droppable>
                </DragDropContext>
  )
}
