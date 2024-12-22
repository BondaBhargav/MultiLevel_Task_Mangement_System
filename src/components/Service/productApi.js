// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    getproductsData: builder.query({
      query: () => `/board`,
    }),
    getListItemData: builder.query({
      query: (id) => `/board/${id}`,
    }),

    delteTodoOnBoard: builder.mutation({
      query: (id) => {
        console.log("sucessfully Deleted from Board")
        return {
          url: `/board/${id}`,
          method: "DELETE",
         
        };
      },
    }),
    addNewtodoItemToTodo: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: (todoList) => {
        console.log("sucessfully added");
        return {
          url: `/board/${todoList.id}`,
          method: "PUT",
          body: todoList,
        };
      },
    }),
    removetodoItemFromTodo: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: (todoList) => {
        console.log(todoList.id, todoList.todos, "deleted from Board");
        return {
          url: `/board/${todoList.id}`,
          method: "PUT",
          body: todoList,
        };
      },
    }),
    addtodoItemToBoard: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: (todoObj) => {
        console.log(todoObj, "Added to board");
        return {
          url: "/board",
          method: "POST",
          body:todoObj,
        };
      },
    }),
    changeTodoStatusfromEachTodo: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: (todoList) => {
        console.log(todoList);
        return {
          url: `/board/${todoList.id}`,
          method: "PUT",
          body: todoList,
        };
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
} = productsApi;
