import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [
  { id: 1, title: "Learn React" },
  { id: 2, title: "Learn Firebase" },
  { id: 3, title: "Learn GraphQL" },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    //console.log(result);

    const startIndex = result.source.index;
    //console.log("Start index: ", startIndex);
    const endIndex = result.destination.index;
    //console.log("End index: ", endIndex);

    const copyArray = [...todos];
    const [reorderedItem] = copyArray.splice(startIndex, 1);

    copyArray.splice(endIndex, 0, reorderedItem);
    setTodos(copyArray);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1> Todo App </h1>
      <Droppable droppableId="todos">
        {(droppableProvider) => (
          <ul
            ref={droppableProvider.innerRef}
            {...droppableProvider.droppableProps}
          >
            {todos.map((todo, index) => (
              <Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
                {(draggableProvider) => (
                  <li
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.dragHandleProps}
                    {...draggableProvider.draggableProps}
                  >
                    {todo.title}
                  </li>
                )}
              </Draggable>
            ))}
            {droppableProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
