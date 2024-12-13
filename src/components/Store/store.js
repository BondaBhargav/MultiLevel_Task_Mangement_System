
import { productsApi } from "../Service/productApi";






import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'

 const store = configureStore({
  reducer: {
  
    [productsApi.reducerPath]: productsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
})
export default store

setupListeners(store.dispatch)


