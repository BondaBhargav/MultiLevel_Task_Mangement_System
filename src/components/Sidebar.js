import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  useAddtodoItemToBoardMutation,
  useGetproductsDataQuery,
  useLazyGetproductsDataQuery,
} from "./Service/productApi";

import { SiGoogletasks } from "react-icons/si";

const Sidebar = React.memo(() => {
  const { data,isLoading } = useGetproductsDataQuery();

  const [addToBoardFn] = useAddtodoItemToBoardMutation();
  const [renderedTheBoard] = useLazyGetproductsDataQuery();
  const addTodoListToBoard = async (val) => {
   
    let boardId=data
    console.log(boardId)
    if (val !== "") {
  
   
      let newItem = {
        title: val,
        

        
    
      };

      await addToBoardFn(newItem);
      setInputvalue("");
      renderedTheBoard();
    }
  };

  const [inputValue, setInputvalue] = useState("");
  const memoizedAddTodoListToBoard = useMemo(
    () => addTodoListToBoard,
    [addTodoListToBoard]
  );


  const bgcolorforList = (type) => {
    
    if (type === "To Do") {
      return"bg-info";
    } else if (type === "Done") {
      return"bg-success";
    }
    else{
       return"bg-danger";
    }
  };
  return (
    <div className="flex-column col-3 col-lg-2  bg-dark  me-3 sidebar d-none d-lg-flex position-sticky border bodered">
   
      <ul>
        {  data?.data?.boards &&
            data?.data?.boards.map((each) => (
            <li key={each._id} className="button-container">
              <Link
                className="d-flex justify-content-between btn btn-dark border flex-wrap w-75 m-2"
                to={`/todolist/${each._id}`}
            
              >
                {each.title.toUpperCase()} <SiGoogletasks />{" "}
              </Link>
              <ul className="hidden-content">
                {each.todos.length >= 1
                  ? each.todos.map((e) => (
                      <li key={e.id}>
                        {e.task}:
                        <span className={`${bgcolorforList(e.status)}`}>
                          {" "}
                          {e.status}
                        </span>{" "}
                      </li>
                    ))
                  : "none"}
              </ul>
            </li>
          ))}
      </ul>
    
    </div>
  );
});

// Export the memoized version of the component
export default Sidebar;
