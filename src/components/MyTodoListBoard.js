import React, { useState } from "react";

import {
  useAddtodoItemToBoardMutation,
  useGetproductsDataQuery,
  useLazyGetproductsDataQuery,
} from "./Service/productApi";
import { TodoBoardListItem } from "./TodoBoardListItem";
import  Sidebar  from "./Sidebar";

export const MyTodoListBoard = () => {
  const { isLoading, data, status } = useGetproductsDataQuery();

  const [addToBoardFn] = useAddtodoItemToBoardMutation();
  const [renderedTheBoard] = useLazyGetproductsDataQuery();
  const [inputValue, setInputvalue] = useState("");

  const addTodoListToBoard = async (val) => {
    console.log(val)
    if (val !== "") {
      let newItem = {
        title: val,
        todos: [],
      };
    

      await addToBoardFn(newItem);
      setInputvalue("");
      renderedTheBoard();
     
    }
  };
  return (
    <div className="d-flex eachboard">
      <Sidebar/>
      <div> <center>
        <h1 className="text-align-center text-warning">MAIN BOARD</h1>
      </center>
      <center>
        <button
          type="button"
          className="btn btn-success border-primary m-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <span className="m-2">+</span>ADD NEW
        </button>
      </center>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                className="form-control"
                placeholder="Enter Todo Title Here"
                onChange={(e) => {
                  setInputvalue(e.target.value);
                }}
                value={inputValue}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => addTodoListToBoard(inputValue)}
              >
                Add Todo
              </button>
            </div>
          </div>
        </div>
      </div>

      <ul className="d-flex justify-content-evenly boardbg flex-wrap vh-100%">
        {isLoading && <h1>Loading......</h1>}
        {!isLoading &&
          status === "fulfilled" &&
          data.map((each) => (
            <TodoBoardListItem
              key={each.id}
              todoitem={each}
            ></TodoBoardListItem>
          ))}
      </ul>


      </div>
     
    </div>
  );
};
