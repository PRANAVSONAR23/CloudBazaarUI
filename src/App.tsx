import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import Header from "./components/custom/Header";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Orders=lazy(()=>import("./pages/Orders"));
const OrderDetails=lazy(()=>import("./pages/OrderDetails"));
const Login = lazy(() => import("./pages/Login"));

const App = () => {
  return (
    <Router>
      <Header/>
     <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/cart" element={<Cart/>}/>

        <Route>
          <Route path="/login" element={<Login/>}/>
        </Route>

        <Route>
          <Route path="/shipping" element={<Shipping/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/order/:id" element={<OrderDetails/>} />
        </Route>
      </Routes>
     </Suspense>
    </Router>
  )
}

export default App
