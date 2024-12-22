import React from "react";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import {
  useDelteTodoOnBoardMutation,
  useLazyGetproductsDataQuery,
} from "./Service/productApi";

export const TodoBoardListItem = ({ todoitem }) => {
  const [deleteTodoItemFromBoardFn] = useDelteTodoOnBoardMutation();
  const [renderTheComponent] = useLazyGetproductsDataQuery();

  const deletetodoItem = async (id) => {
    console.log(id);
    await deleteTodoItemFromBoardFn(id);

    renderTheComponent();
  };
  return (
    <div className="eachboard eachboxxx m-1 border rounded">
      <div
        className="card m-2 rounded todooardListItem "
        style={{ width: "18rem", height: "15em" }}
      >
        <div className="card-body bg-dark text-white">
          <div className="d-flex justify-content-between align-items-center">
            <IoMdAddCircle
              onClick={() => {
                prompt("hello");
              }}
            />
            <h5 className="card-title">{todoitem.title.toUpperCase()}</h5>
            <AiFillDelete onClick={() => deletetodoItem(todoitem.id)} />
          </div>
          <hr className="bordered" />
          <div style={{ overflow: "hidden", height: "6em" }}>
            {todoitem.todos.map((i) => (
              <p key={i.id} className="card-text">
                {i.task}
              </p>
            ))}
          </div>
          <div className="d-flex justify-content-between">
            <Link to={`todolist/${todoitem.id}`} className="btn btn-dark border">
              Go to this
            </Link>
            <h2>Total {todoitem.todos.length}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
