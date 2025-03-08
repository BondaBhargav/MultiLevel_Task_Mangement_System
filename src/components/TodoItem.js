import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAddNewtodoItemToTodoMutation,
  useGetListItemDataQuery,
  useLazyGetListItemDataQuery,
} from "./Service/productApi";
import { FliterTodo } from "./FliterTodo";
import Sidebar from "./Sidebar";

export const TodoItem = () => {
  const { id } = useParams();

  const { isLoading, data } = useGetListItemDataQuery(id);


  const [inputval, setNewinputvalue] = useState("");
  const [todoStaus, setNewStatus] = useState("To Do");
  const [addTaskToThisTodoListFn] = useAddNewtodoItemToTodoMutation();
  const [renderAfterAddFn] = useLazyGetListItemDataQuery(id);
  const addtodo = async () => {
    if (inputval !== "" && todoStaus !== "") {
      const newtodo = {
          task: inputval,
          status: todoStaus,
          id: `${inputval.split(" ").join("")}${id}`,
        }
   
      await addTaskToThisTodoListFn( {newtodo,id} );
      renderAfterAddFn(id);
    }
    setNewinputvalue("");
  };

  return (
    <>
      {" "}
      <>
        <div className="d-flex ">
          <Sidebar />
          <div className="d-flex flex-column w-100 align-items-center boarditempage">
            <center>
              <h1>{data && data.data.title}</h1>
            </center>
            <div className="d-flex flex-column w-50 mb-3  ">

         
            <input
              type="text"
              placeholder="Add Action Here"
              className="form-control  m-1 border-primary "
              onChange={(e) => {
                setNewinputvalue(e.target.value);
              }}
              id="addtodoinput"
              value={inputval}
            />

            <select
              onChange={(e) => {
                setNewStatus(e.target.value);
              }}
              defaultValue
              className="form-control  m-1 border-primary"
            >
              <option value="To Do">To Do</option>
              <option value="Doing">Doing </option>
              <option value="Done">Done</option>
            </select>
            <button
              className="btn btn-primary"
              onClick={() => {
                addtodo()
              }}
            >
              Add
            </button>
            </div>
            <h1>Work Status</h1>
            <div className="container">
              {isLoading && <h1>Loading......</h1>}
              {!isLoading && data.data.todos && (
                <div className="d-flex flex-row justify-content-evenly row w-100 gap-1">
              
                  <FliterTodo tItem={data.data} type="To Do" />
                  <FliterTodo tItem={data.data} type="Doing" />
                  <FliterTodo tItem={data.data} type="Done" />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </>
  );
};
