import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/Loginpage"
import RegisterPage from "./pages/RegisterPage"
import ProtectedRoute from "./ProtectedRoute"
import ProfilePage from "./pages/ProfilePage"
import CarPage from "./pages/CarPage"
import OrdersPage from "./pages/OrdersPage"
import { AuthProvider } from "./context/AuthContext"
import { ProductProvider } from "./context/ProductContext"
import { CarProvider } from "./context/CarContext"
import { OrderProvider } from "./context/OrderContext"
import Navbar from "./components/Navbar"
import ProductPage from "./pages/ProductPage"
import OneOrderPage from "./pages/OneOrderPage"

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CarProvider>
          <OrderProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/product/:id" element={<ProductPage/>} />
                
                <Route element= {<ProtectedRoute />}> 
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/car" element={<CarPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/orders/:id" element={<OneOrderPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </OrderProvider>
        </CarProvider>
      </ProductProvider>
    </AuthProvider>
)}

export default App
