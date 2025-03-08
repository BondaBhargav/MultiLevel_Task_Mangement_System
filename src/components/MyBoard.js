import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";

export const MyBoard = () => {

let token =window.localStorage.getItem("token")
if(!token){
return(<Navigate to="/login"/>)
}

  return (
    <>
<Header />
<div className="myboard">

<Outlet  />

</div>
    </>
  );
};
