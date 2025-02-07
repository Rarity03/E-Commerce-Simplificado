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

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route element= {<ProtectedRoute />}> 
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/car" element={<CarPage />} />
              <Route path="/orders" element={<OrderPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
)}

export default App
