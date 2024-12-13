import React from "react";
import { RiDeleteBack2Line } from "react-icons/ri";
import { useLazyGetListItemDataQuery, useRemovetodoItemFromTodoMutation } from "./Service/productApi";
import { useParams } from "react-router-dom";
import { useChangeTodoStatusfromEachTodoMutation } from "./Service/productApi";
export const FliterTodo = ({ tItem, type }) => {

const {id}=useParams()

const [changeTaskToApi] = useChangeTodoStatusfromEachTodoMutation()


  const [reCallAfterRemoveFn]=useLazyGetListItemDataQuery()
const [removeTheItem]=useRemovetodoItemFromTodoMutation()
const removetaskFromList= async(taskid)=>{
const newtodo=tItem.todos.filter(each=>each.id!=taskid)
await removeTheItem({...tItem,todos:newtodo})
  reCallAfterRemoveFn(id)
}

let bg="bg-success";
const bgcolorforList=()=>{
  if (type==="To Do"){
    bg="bg-info"
  }
  else if (type==="Done"){
    bg="bg-primary"
  }
}

bgcolorforList()



const handleOnDrag=(e,taskid,task)=>{
  e.dataTransfer.setData("abc",JSON.stringify({LIid:e.target.id,taskid,task}))

}

const handleDragEnd=async(e)=>{
let {LIid,taskid,task}=JSON.parse(e.dataTransfer.getData("abc"))

if (e.target.tagName==="LI"){
 
  e.target.parentElement.appendChild(document.getElementById(LIid))
  let newtodo=tItem.todos.filter(each=>each.id!==taskid)
  let uptodo=[...newtodo,{taskid,status:type,task}]
  console.log(uptodo,tItem.todos)

await changeTaskToApi({...tItem,todos:uptodo})
reCallAfterRemoveFn(id)
}
else if (e.target.tagName==="UL"){

  e.target.appendChild(document.getElementById(LIid))
  let newtodo=tItem.todos.filter(each=>each.id!==taskid)
  let uptodo=[...newtodo,{id:taskid,status:type,task}]
  console.log(uptodo,tItem.todos)
 await changeTaskToApi({...tItem,todos:uptodo})
 reCallAfterRemoveFn(id)
 
}

}


  return (
    <div className="col-md-8 col-lg-3 d-flex justify-content-center border">
      <div className="card m-3" style={{ width: "18rem" }}>
        <h1 className="bg-secondary">{type.toUpperCase()}</h1>
        <ul onDragOver={(event)=>event.preventDefault()} onDrop={(e)=>handleDragEnd(e)}  className="list-group list-group-flush w-100 h-100">
          {tItem.todos
            .filter((each) => each.status == type)
            .map((each,i) => (
              <li draggable="true" id={`${i}${each.id}`} onDragStart={(e)=>handleOnDrag(e,each.id,each.task)}  key={each.id} className={`list-group-item rounded m-1 ${bg}`}>
                {" "}
                <div className="d-flex justify-content-between">
                  <span>{each.task}</span>{" "}
                  <button className="remove-btn"
                    onClick={() => {
                      removetaskFromList(each.id)
                    }}
                  >
                    <RiDeleteBack2Line />{" "}
                  </button>{" "}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
