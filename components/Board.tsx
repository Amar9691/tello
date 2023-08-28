"use client";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { Client } from "appwrite";
import { useEffect } from "react";
import { useBoardStore } from "@/store/BoardStore";
import { number } from "prop-types";
import { start } from "repl";

export default function Board() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDB,
    ]
  );

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearragedColumns = new Map(entries);
      setBoardState({ ...board, columns: rearragedColumns });
    }

    const columns = Array.from(board.columns);
    const startColumnIndex = columns[Number(source.droppableId)];
    const stopColumnIndex = columns[Number(destination.droppableId)];
    const startCol: Column = {
      id: startColumnIndex[0],
      todos: startColumnIndex[1].todos,
    };

    const finshCol: Column = {
      id: stopColumnIndex[0],
      todos: stopColumnIndex[1].todos,
    };

    if (!startCol || !finshCol) return;

    if (source.index === destination.index && startCol === finshCol) return;

    const newTodos = startCol.todos;
    const [movedTodo] = newTodos.splice(source.index, 1);
    if (startCol.id == finshCol.id) {
      newTodos.splice(destination.index, 0, movedTodo);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColums = new Map(board.columns);
      newColums.set(startCol.id, newCol);
      setBoardState({ ...board, columns: newColums });
    } else {
      const finshTodos = Array.from(finshCol.todos);
      finshTodos.splice(destination.index, 0, movedTodo);
      const newColums = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      newColums.set(startCol.id, newCol);
      newColums.set(finshCol.id, {
        id: finshCol.id,
        todos: finshTodos,
      });
      updateTodoInDB(movedTodo, finshCol.id);
      setBoardState({ ...board, columns: newColums });
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-4  gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
