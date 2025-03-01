import { useEffect} from "react"
import { useOrder } from "../context/OrderContext"

export default function OrderPage(){
    const { orders, getOrders } = useOrder()
    useEffect(() => {
        getOrders()
    }, [])

    return (
      <div className="p-4">
        {
          orders && orders.length > 0 ? (
            <>
              {
                orders.map((order) => (
                  <div key={order._id} className="flex justify-between items-center border-b border-gray-300 py-4">
                    <div>
                      <p className="text-lg font-bold">{order._id}</p>
                      <p>{order.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">${order.total}</p>
                      <p>{order.status}</p>
                    </div>
                  </div>
                ))
              }
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