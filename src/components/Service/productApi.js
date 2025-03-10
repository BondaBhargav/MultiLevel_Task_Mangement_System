// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8085/api",


   }),
  endpoints: (builder) => ({
    getproductsData: builder.query({
      query: () => {
        
        return{
        method:"GET",
        url:`/userboards`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
      },
    }),
    getListItemData: builder.query({
      query: (id) => {

        return{
          method:"GET",
          url:`/gettodos/${id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          }

        }
      }
    }),

    delteTodoOnBoard: builder.mutation({
      query: (id) => {
        console.log("sucessfully Deleted from Board"); //it is for delete new board
        return {
          url: `/deletetask/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          }

        };
      },
    }),

    addNewtodoItemToTodo: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({newtodo,id}) => {
        console.log("add new board",newtodo); //add new todo to board
    
        return {
          url: `/taskadd/${id}`,
          method: "POST",
          body: newtodo,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          }



        };
      },
    }),
    removetodoItemFromTodo: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({taskid,id}) => {
     
        return {
          url: `/taskdelete/${id}/${taskid}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          }
        };
      },
    }),
    addtodoItemToBoard: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`  it is for add new board
      query: (todoObj) => {
      console.log(todoObj)
        return {
          url: `/addnewboard`,
          method: "POST",
          body: todoObj,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
    changeTodoStatusfromEachTodo: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: (data) => {
     console.log(data)
        return {
          url: `/statuschange/${data._id}`,
          method: "PATCH",
          body: data ,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          }
        };
      },
    }),
    signupApi: builder.mutation({
      query: (data) => {
        console.log("sucessfully Deleted from Board");
        return {
          url: `/register`,
          method: "POST",
          body: data,
        };
      },
    }),
    loginApi: builder.mutation({
      query: (data) => {
        return { url: "/login", method: "POST", body: data };
      },
    }),
  }),
});

export const {
  useGetproductsDataQuery,
  useGetListItemDataQuery,
  useLazyGetproductsDataQuery,
  useAddNewtodoItemToTodoMutation,
  useRemovetodoItemFromTodoMutation,
  useLazyGetListItemDataQuery,
  useDelteTodoOnBoardMutation,
  useAddtodoItemToBoardMutation,
  useChangeTodoStatusfromEachTodoMutation,
useLoginApiMutation,
  useSignupApiMutation,
} = productsApi;
