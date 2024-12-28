import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Header from "./components/custom/Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { getUser } from "./redux/api/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { UserReducerInitialState } from "./types/reducer-types";
import Loader from "./components/custom/Loader";
import ProtectedRoute from "./components/custom/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const Login = lazy(() => import("./pages/Login"));

const App = () => {
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else {
        dispatch(userNotExist());
      }
    });
  }, []);

  return loading ? (
    <Loader/>
  ) : (
    <Router>
      <Header user={user} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          <Route>
            <Route path="/login" element={<ProtectedRoute isAuthenticated={user?false:true}><Login/></ProtectedRoute>} />
          </Route>

          <Route element={<ProtectedRoute isAuthenticated={user?true:false}></ProtectedRoute>}>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>


          //admin routes
          
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
