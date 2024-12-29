import { CartReducerInitialState } from "@/types/reducer-types"
import { CartItem } from "@/types/types"
import {createSlice,PayloadAction} from "@reduxjs/toolkit"


const initialState:CartReducerInitialState={
   loading:false,
   cartItems:[],
   subTotal:0,
   tax:0,
   shippingCharges:0,
   discount:0,
   total:0,
   shippingInfo:{
    address:"",
    city:"",
    state:"",
    country:"",
    pinCode:""
   }    
}


export const cartReducer=createSlice({
    name:"cartReducer",
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<CartItem>)=>{
          state.loading=true;

         const index=state.cartItems.findIndex((i)=>i.productId===action.payload.productId)

         if(index!==-1){state.cartItems[index]=action.payload}
         else {state.cartItems.push(action.payload);}
        state.loading=false;
        },
        removeCartItem:(state,action:PayloadAction<string>)=>{
            state.loading=true;
            state.cartItems=state.cartItems.filter((item)=>item.productId!==action.payload)
            state.loading=false;
        },
        calculatePrice: (state) => {
            const subtotal = state.cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );
      
            state.subTotal = subtotal;
            state.shippingCharges = state.subTotal > 1000 ? 0 : 200;    
            state.tax = Math.round(state.subTotal * 0.18);
            state.total =
              state.subTotal + state.tax + state.shippingCharges - state.discount;
          },
    }
})

export const {addToCart,removeCartItem,calculatePrice}=cartReducer.actions