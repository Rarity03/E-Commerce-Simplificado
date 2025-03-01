import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/Loginpage"
import RegisterPage from "./pages/RegisterPage"
import ProtectedRoute from "./ProtectedRoute"
import ProfilePage from "./pages/ProfilePage"
import CarPage from "./pages/CarPage"
import OrderPage from "./pages/OrderPage"
import { AuthProvider } from "./context/AuthContext"
import { ProductProvider } from "./context/ProductContext"
import Navbar from "./components/Navbar"
import { CarProvider } from "./context/CarContext"
import ProductPage from "./pages/ProductPage"
import { OrderProvider } from "./context/OrderContext"

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
                    <Route path="/orders" element={<OrderPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </OrderProvider>
        </CarProvider>
      </ProductProvider>
    </AuthProvider>
)}

export default App
