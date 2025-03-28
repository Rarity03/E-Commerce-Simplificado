import PropTypes from 'prop-types';
import { format } from "date-fns"

export default function OrderCard ({ order }){
    return(
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4 ">
            <div className='p-4 border-b border-gray-300'>
                <p className="text-lg font-bold">Order ID: {order._id}</p>
                <p>Shipping Address: {order.addressShipping}</p>
                <p>Order Date: {format(new Date(order.date), "dd/MM/yyyy HH:mm")}</p>
            </div>
            <div className='p-4'>
                <div className="flex flex-col gap-2">
                    {
                    order.products.map((product) => (
                        <div key={product.productId._id} className="flex flex-col md:flex-row justify-between items-center w-full border-b py-2">
                            <div className="w-full md:w-1/4 max-h-64">.
                                <img src={product.productId.image} alt={product.productId.name} className="w-full h-full object-cover" />
                            </div>
                            <p className="w-full md:w-1/2 m-1 truncate text-center md:text-left">{product.productId.name}</p>
                            <p className="w-full md:w-1/4 m-1 text-center">{product.amount}</p>
                            <p className="w-full md:w-1/4 m-1 sm:text-center md:text-right font-bold">${product.price}</p>
                        </div>
                    ))  
                    }
                </div>
            </div>
            <div className='p-4 border-t border-gray-300 flex justify-between items-center'>
                <p className="text-lg font-bold">Total: ${order.total}</p>
                <p className={`text-lg font-bold ${order.state === 'completed' ? 'text-green-500' : order.state === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                  {order.state}
                </p>
            </div>
        </div>
    )
}

OrderCard.propTypes = {
    order: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        addressShipping: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(PropTypes.shape({
            productId: PropTypes.shape({
                _id: PropTypes.string.isRequired,
                image: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            }).isRequired,
            amount: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
        })).isRequired,
        total: PropTypes.number.isRequired,
        state: PropTypes.string.isRequired,
    }).isRequired,
};