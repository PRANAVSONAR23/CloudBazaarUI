import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Header from "./components/custom/Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { getUser } from "./redux/api/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { UserReducerInitialState } from "./types/reducer-types";
const Loader = lazy(() => import("./components/custom/Loader"));
import ProtectedRoute from "./components/custom/ProtectedRoute";
import {AppSidebar} from "./components/custom/Sidebar";

const DashBoard = lazy(() => import("./pages/DashBoard"));
const Products = lazy(() => import("./pages/Products"));
const Costomer = lazy(() => import("./pages/Costomer"));

import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "./components/ui/toaster";
import SingleProduct from "./pages/SingleProduct";
const AddNewProduct = lazy(() => import("./pages/AddNewProduct"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const AllTransactionsPage = lazy(() => import("./pages/Transactions"));
const ManageTransaction = lazy(() => import("./pages/ManageTransaction"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const PieChartPage = lazy(() => import("./pages/PieChartPage"));
const LineChartPage = lazy(() => import("./pages/LineChartPage"));
const BarChartPage = lazy(() => import("./pages/BarChartPage"));

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
    <Loader className="h-screen w-screen" />
  ) : (
    <Router>
      <Toaster />
      <Header user={user} />
      <Suspense fallback={<Loader className="h-screen w-screen"/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route>
            <Route
              path="/login"
              element={
                <ProtectedRoute isAuthenticated={user ? false : true}>
                  <Login />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={user ? true : false}
              ></ProtectedRoute>
            }
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>

          
          //admin routes
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={!!user}
                isAdmin={user?.role === "admin" ? true : false}
                adminOnly={true}
              >
                <SidebarProvider>
                <div className="flex justify-between">
                  <AppSidebar />
                  
                  <Outlet />
                </div>
                </SidebarProvider>
              </ProtectedRoute>
              
            }
          >
            <Route path="/admin/dashboard" element={<DashBoard />} />
            <Route path="/admin/costomers" element={<Costomer />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/products/add-product" element={<AddNewProduct />} />
            <Route path="/admin/products/:id" element={<ProductDetails/>} />
            <Route path="/admin/transactions" element={<AllTransactionsPage/>} />
            <Route path="/admin/transactions/:id" element={<ManageTransaction/>} />
            <Route path="/admin/barchart" element={<BarChartPage />} />
            <Route path="/admin/pie" element={<PieChartPage />} />
            <Route path="/admin/line" element={<LineChartPage />} />

          </Route>

      <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
