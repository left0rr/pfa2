import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const initialState = {
    cartItems: [],
    validCoupon: {
        name: '',
        discount: 0,
    }
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            let productItem = state.cartItems.find(product => product.product_id === item.product_id
                && product.color === item.color
                && product.size === item.size
            )
            if(productItem) {
                toast.info('Product already added to cart')
            }else {
                state.cartItems.push(item)
                toast.success('Product added to cart')
            }

        },

        incrementQty: (state, action) => {
            const item = action.payload;
            let productItem = state.cartItems.find(product => product.product_id === item.product_id
                && product.color === item.color
                && product.size === item.size
            )
            if(productItem.qty === productItem.maxQty) {
                toast.info(`Only ${productItem.qty} available`)
            }else {
                productItem.qty +=1

            }

        },

        decrementQty: (state, action) => {
            const item = action.payload;
            let productItem = state.cartItems.find(product => product.product_id === item.product_id
                && product.color === item.color
                && product.size === item.size
            )
            productItem.qty -=1
            if(productItem.qty === 0) {
                state.cartItems = state.cartItems.filter(product => product.ref !== item.ref)

            }

        },
        removeFromCart(state, action){
            const item = action.payload;
            state.cartItems = state.cartItems.filter(product => product.ref !== item.ref)
            toast.warning('Product removed from your cart')

        },
        setValidCoupon: (state, action) => {
            state.validCoupon = action.payload;
        },
        addCouponToCart: (state, action) => {
            const coupon_id=action.payload;
            state.cartItems = state.cartItems.map(item =>{
                return {...item,coupon_id}
            })
        },
        clearCartItems(state, action){
          state.cartItems = []
        }

    }
})
const cartReducer = cartSlice.reducer;

export const {addToCart,
    incrementQty ,
    decrementQty,
    removeFromCart,
    clearCartItems,
    addCouponToCart,
    setValidCoupon} =
    cartSlice.actions;

export default cartReducer
