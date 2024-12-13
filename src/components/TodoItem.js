import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAddNewtodoItemToTodoMutation,
  useGetListItemDataQuery,
  useLazyGetListItemDataQuery,
} from "./Service/productApi";
import { FliterTodo } from "./FliterTodo";

export const TodoItem = () => {
  const { id } = useParams();

  const { isLoading, data } = useGetListItemDataQuery(id);

  const [inputval, setNewinputvalue] = useState("");
  const [todoStaus, setNewStatus] = useState("To Do");
  const [addTaskToThisTodoListFn] = useAddNewtodoItemToTodoMutation();
  const [renderAfterAddFn] = useLazyGetListItemDataQuery(id);
  const addtodo = async () => {
    if (inputval !== "" && todoStaus !== "") {
      const newtodo = [
        ...data.todos,
        {
          task: inputval,
          status: todoStaus,
          id: `${inputval.split(" ").join("")}${id}`,
        },
      ];
      console.log({ ...data, todos: newtodo });
      await addTaskToThisTodoListFn({ ...data, todos: newtodo });
      renderAfterAddFn(id);
    }
    setNewinputvalue("");
  };

  return (
    <>
      {" "}
      <div className="d-flex justify-content-center ">
        <h1>hello</h1>
      </div>
      <div className="form-control d-flex w-50 gap-3">
        <div className="w-100">
          <input
            type="text"
            placeholder="Add Action Here"
            className="form-control w-70 m-1 "
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
            className="form-control w-70 m-1"
          >
            <option value="To Do">To Do</option>
            <option value="Doing">Doing </option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            addtodo();
          }}
        >
          Add
        </button>
      </div>
      <div className="container">
        {isLoading && <h1>Loading......</h1>}
        {!isLoading && data && (
          <div className="d-flex flex-row justify-content-evenly row w-100 gap-1">
            <FliterTodo tItem={data} type="To Do" />
            <FliterTodo tItem={data} type="Doing" />
            <FliterTodo tItem={data} type="Done" />
          </div>
        )}
      </div>
    </>
  );
};
