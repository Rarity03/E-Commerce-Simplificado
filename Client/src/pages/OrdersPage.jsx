import { useEffect} from "react"
import { useOrder } from "../context/OrderContext"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

export default function OrderPage(){
    const { user } = useAuth();
    const { orders, getOrders } = useOrder()
    const navigate = useNavigate()
    
    useEffect(() => {
      getOrders()
  }, [user])

    const handleNav = (orderId) => {
        navigate(`/orders/${orderId}`)
    }
    
    

    return (
      <div className="p-4 mt-20">
        {
          orders && orders.length > 0 ? (
            <div className="min-w-[680px] overflow-x-auto">
              {
                orders.map((order) => (
                  <div key={order._id} className="mb-4 flex justify-center items-center">
                      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md mb-2 w-full max-w-2xl">
                        <h2 className="text-xl font-bold">Order ID: {order._id}</h2>
                        <div>
                          <p className={`text-lg font-semibold ${
                            order.state === 'completed' ? 'text-green-500' :
                            order.state === 'pending' ? 'text-yellow-500' :
                            'text-red-500'
                          }`}>
                            {order.state}
                          </p>
                          <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <p className="text-lg font-semibold">Total: ${order.total}</p>
                        <button 
                        onClick={() => handleNav(order._id)}
                        className="bg-blue-500 text-white px-2 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                          View Details
                        </button>
                      </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <div className="flex justify-center items-center h-64 border-2 border-dashed border-gray-300 rounded-lg min-w-[600px] overflow-x-auto">
              <p className="text-2xl font-bold">No pending orders.</p>
            </div>
          )
        }
      </div>
    )
}