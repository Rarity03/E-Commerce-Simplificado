import { useEffect} from "react"
import { useOrder } from "../context/OrderContext"
import { useAuth } from "../context/AuthContext"
import OrderCard from "../components/OrderCard";

export default function OrderPage(){
    const { user } = useAuth();
    const { orders, getOrders } = useOrder()
    useEffect(() => {
        getOrders()
    }, [user])

    return (
      <div className="p-4">
        {
          orders && orders.length > 0 ? (
            <>
              {
                orders.map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))}
            </>
          ) : (
            <div className="flex justify-center items-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-2xl font-bold">No pending orders.</p>
            </div>
          )
        }
      </div>
    )
}