"use client"

import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd"

import { useNewPostStore } from "@/_store/newPost"
import { nanoid } from "nanoid"

import { useCallback } from "react"
import EditorCandidate from "../EditorCandidate"
import "./style.scss"

export default function CandidateList() {
  const { newCandidates, addCandidate, moveCandidates, currentPostingPage } = useNewPostStore()

  const createNewCandidate = useCallback(() => {
    addCandidate({
      listId: nanoid(10),
      title: "",
      count: 0,
      number: newCandidates.length + 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCandidates.length])

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination || typeof destination.index !== "number") return

    moveCandidates(draggableId, source.index, destination.index)
  }

  return (
    <>
      <div
        style={{ animation: newCandidates.length === 0 ? "none" : "no-candidate-disappear 150ms forwards" }}
        className="no-candidate"
      >
        <span>후보가 없어요</span>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div className="fields" {...provided.droppableProps} ref={provided.innerRef}>
              <ul className="candidate-list">
                {newCandidates.map((candidate, i) => (
                  <Draggable
                    isDragDisabled={currentPostingPage === "result"}
                    index={i}
                    key={candidate.listId}
                    draggableId={candidate.listId}
                  >
                    {(draggableProvided) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.dragHandleProps}
                        {...draggableProvided.draggableProps}
                      >
                        <EditorCandidate
                          candidate={candidate}
                          index={i}
                          isResultPage={currentPostingPage === "result"}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {currentPostingPage === "edit" && (
        <div className="add-candidate-btn">
          <button onClick={createNewCandidate}>
            <i className="fa-solid fa-plus" />
          </button>
        </div>
      )}
    </>
  )
}
