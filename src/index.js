import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./components/Store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MyBoard } from "./components/MyBoard";
import { MyTodoListBoard } from "./components/MyTodoListBoard";
import { TodoItem } from "./components/TodoItem";
import { PraticeComponent } from "./components/PraticeComponent";
import Login from "./components/login";
import Signup from "./components/signIn";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MyBoard />,
        children: [
          { path: "/", element: <MyTodoListBoard /> },

          {
            path: "todolist/:id",
            element: <TodoItem />,
          },
          {
            path:"pratice",
            element:<PraticeComponent/>
          }
        ],
      },
    ],
  },
  {
    path:'/login',
    element:<Login/>
    
  },
   {
    path:'/signup',
    element:<Signup/>
    
  }
]);

root.render(
  <Provider store={store}>
     <ToastContainer/>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
