import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import Header from "./components/custom/Header";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));

const App = () => {
  return (
    <Router>
      <Header/>
     <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
     </Suspense>
    </Router>
  )
}

export default App
