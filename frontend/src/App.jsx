import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/layouts/Header.jsx";
import Home from "./components/Home.jsx";
import Product from "./components/products/Product.jsx";
import Cart from "./components/cart/Cart.jsx";
import Checkout from "./components/checkout/Checkout.jsx";
import Register from './components/user/Register.jsx';
import Login from "./components/user/Login.jsx";
import Profile from "./components/user/Profile.jsx";
import PayWithStripe from "./components/checkout/PayWithStripe.jsx";
import Orders from './components/user/Orders.jsx'
import PageNotFound from './components/404/PageNotFround.jsx'

function App() {
  return (
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:slug" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/pay/order" element={<PayWithStripe />} />
              <Route path="/user/orders" element={<Orders />} />
              <Route path='*' element={<PageNotFound />} />



          </Routes>
      </BrowserRouter>
  )
}

export default App
