import {configureStore} from '@reduxjs/toolkit'
import { userAPI } from './api/userAPI'
import { userReducer } from './reducer/userReducer'
import { productAPI } from './api/productAPI'
import { cartReducer } from './reducer/cartReducer'
import { orderApi } from './api/orderApi'

export const server=import.meta.env.VITE_SERVER

export const store=configureStore({
    reducer:{
        [userAPI.reducerPath]:userAPI.reducer,
        [productAPI.reducerPath]:productAPI.reducer,
        [userReducer.name]:userReducer.reducer,
        [cartReducer.name]:cartReducer.reducer,
        [orderApi.reducerPath]:orderApi.reducer
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(userAPI.middleware,productAPI.middleware,orderApi.middleware),
})  