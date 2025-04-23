import { useEffect} from "react"
import { useOrder } from "../context/OrderContext"
import { useAuth } from "../context/AuthContext"
import OrderCard from "../components/OrderCard";
import { useNavigate, useParams } from "react-router-dom";

export default function OneOrderPage(){
    const { id } = useParams();
    const { user } = useAuth();
    const { order, getOrder, loading } = useOrder()
    const navigate = useNavigate()
    const handleNav = () => {
        navigate('/orders')
    }


    useEffect(() =>  {
        getOrder(id)
    }, [id,user])

    return (
        <div>
            {
                loading || !order ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader">Loading...</div>
                    </div>
                ) : (
                    <>
                        <div className="p-4 mt-20">
                        <div className="min-w-[680px] overflow-x-auto">
                            <OrderCard order={order} />
                        </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <button 
                            onClick={() => handleNav()} 
                            className="flex justify-center items-center mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                                    Back to Orders
                            </button>
                        </div>
                    </>
                )
            }
        </div>
      
    )
}