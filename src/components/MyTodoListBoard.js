import React, { useState } from "react";
import {
  useAddtodoItemToBoardMutation,
  useGetproductsDataQuery,
  useLazyGetproductsDataQuery,
} from "./Service/productApi";
import { TodoBoardListItem } from "./TodoBoardListItem";
import Sidebar from "./Sidebar";
import PortalModal from "./PortalModal"; // Import PortalModal

export const MyTodoListBoard = () => {
  const { isLoading, data } = useGetproductsDataQuery();
  const [addToBoardFn] = useAddtodoItemToBoardMutation();
  const [renderedTheBoard] = useLazyGetproductsDataQuery();
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setModalOpen] = useState(false); // Manage modal state
  let noBoards=data?.data
  console.log(noBoards)

  const addTodoListToBoard = async (val) => {

    if (val !== "") {
      let boardId=data?.data[0]
      console.log(boardId)
      let newItem = {
        title: val,
        _id:boardId

        
    
      };
    
      

      await addToBoardFn(newItem);
      setInputValue("");
      renderedTheBoard();
     
    }
  };

  return (
    <div className="d-flex eachboard">
      <Sidebar />
      <div>
        <center>
          <h1 className="text-warning">MAIN BOARD</h1>
        </center>
        <center>
          <button
            type="button"
            className="btn btn-success border-primary m-2"
            onClick={() => setModalOpen(true)} // Open modal
          >
            <span className="m-2">+</span>ADD NEW
          </button>
        </center>

        {/* Portal Modal */}
        <PortalModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <input
            className="form-control"
            placeholder="Enter Todo Title Here"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={() => addTodoListToBoard(inputValue)}
          >
            Add Todo
          </button>
        </PortalModal>

        <ul className="d-flex justify-content-evenly boardbg flex-wrap" style={{ height: "100vh" }}>
          {isLoading ? (
            <h1>Loading......</h1>
          ) : (
            data?.data?.boards?.map((each) => (
              <TodoBoardListItem key={each._id} todoitem={each} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
