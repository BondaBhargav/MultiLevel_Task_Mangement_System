import React, { useState,useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    useAddtodoItemToBoardMutation,
    useGetproductsDataQuery,
    useLazyGetproductsDataQuery,
  } from "./Service/productApi";

  import { SiGoogletasks } from "react-icons/si";

const Sidebar = React.memo(() => {


      const {data } = useGetproductsDataQuery();
    
      const [addToBoardFn] = useAddtodoItemToBoardMutation();
      const [renderedTheBoard] = useLazyGetproductsDataQuery();
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
         
        }}


  const [inputValue, setInputvalue] = useState('');
  const memoizedAddTodoListToBoard = useMemo(() => addTodoListToBoard, [addTodoListToBoard]);
  return (
    <div className="d-flex flex-column col-3 col-lg-2  bg-dark  me-3 sidebar">
      <button
        type="button"
        className="btn boardbg eachboxxx"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <span className="m-2">+</span>ADD NEW
      </button>
      <ul>{data&&data.map(each=>(<li><Link className='d-flex justify-content-between btn btn-dark border flex-wrap w-75 m-2' to={`/todolist/${each.id}`}>{each.title.toUpperCase()} <SiGoogletasks/> </Link></li>))}</ul>
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
                onClick={() => {
                    memoizedAddTodoListToBoard(inputValue).then(setInputvalue(''))
                }}
              >
                Add Todo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Export the memoized version of the component
export default Sidebar;
