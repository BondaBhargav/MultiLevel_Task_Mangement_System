import React, { useState, useEffect } from "react";
import { RiDeleteBack2Line } from "react-icons/ri";
import { useLazyGetListItemDataQuery, useRemovetodoItemFromTodoMutation } from "./Service/productApi";
import { useParams } from "react-router-dom";
import { useChangeTodoStatusfromEachTodoMutation } from "./Service/productApi";

export const FliterTodo = ({ tItem, type }) => {
  const { id } = useParams();

  const [changeTaskToApi] = useChangeTodoStatusfromEachTodoMutation();
  const [reCallAfterRemoveFn] = useLazyGetListItemDataQuery();
  const [removeTheItem] = useRemovetodoItemFromTodoMutation();
  
  const [todos, setTodos] = useState(tItem.todos);

  // Update todos state when tItem.todos changes
  useEffect(() => {
    setTodos(tItem.todos);
  }, [tItem.todos]);

  const removetaskFromList = async (taskid) => {
    const newTodo = todos.filter((each) => each.id !== taskid);
    await removeTheItem({ ...tItem, todos: newTodo });
    reCallAfterRemoveFn(id);
    setTodos(newTodo); // Update state after removal
  };

  let bg = "bg-danger";
  const bgcolorforList = () => {
    if (type === "To Do") {
      bg = "bg-info";
    } else if (type === "Done") {
      bg = "bg-success";
    }
  };

  bgcolorforList();

  const handleOnDrag = (e, taskid, task) => {
    e.dataTransfer.setData("abc", JSON.stringify({ LIid: e.target.id, taskid, task }));
  };

  const handleDragEnd = async (e) => {
    let { LIid, taskid, task } = JSON.parse(e.dataTransfer.getData("abc"));

    // Handle the drag-and-drop operation by updating the state
    const updatedTodos = todos.filter((todo) => todo.id !== taskid);
    updatedTodos.push({ id: taskid, status: type, task });

    setTodos(updatedTodos); // Update state with the new order

    await changeTaskToApi({ ...tItem, todos: updatedTodos }); // Persist the changes

    reCallAfterRemoveFn(id); // Optionally re-fetch the data
  };

  return (
    <div className="col-md-8 col-lg-3 d-flex justify-content-center border">
      <div className="card m-3" style={{ width: "18rem" }}>
        <h1 className="bg-secondary">{type.toUpperCase()}</h1>
        <ul
          id="mainulel"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(e) => handleDragEnd(e)}
          className="list-group list-group-flush w-100 h-100"
        >
          {todos
            .filter((each) => each.status === type)
            .map((each, i) => (
              <li
                draggable="true"
                id={`${i}${each.id}`}
                onDragStart={(e) => handleOnDrag(e, each.id, each.task)}
                key={each.id}
                className={`list-group-item rounded m-1 ${bg}`}
              >
                <div className="d-flex justify-content-between">
                  <span>{each.task}</span>
                  <button
                    className="remove-btn"
                    onClick={() => removetaskFromList(each.id)}
                  >
                    <RiDeleteBack2Line />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
