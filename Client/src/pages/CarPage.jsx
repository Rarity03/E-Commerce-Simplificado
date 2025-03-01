import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCar } from "../context/CarContext";
import CarCard from "../components/CarCard";
import { useNavigate } from "react-router-dom";

export default function CarPage() {
  const { user } = useAuth();
  const { car, getCar, addCar, removeCar, decreaseCar } = useCar();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate()

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      await getCar();
      setLoading(false);
    };
    fetchCar();
  }, [user]);

  const handleIncrease = async (productId) => {
    await addCar(productId, 1);
  };

  const handleDecrease = async (productId) => {
    await decreaseCar(productId);
  };

  const handleRemove = async (productId) => {
    await removeCar(productId);
  };

  const handleOrder = async () => {
    navigation('/orders')
  }

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        car && car.length > 0 ? (
          <>
            {
              car.map((product) => (
                <CarCard
                  key={product.productId._id}
                  product={product.productId}
                  amount={product.amount}
                  onIncrease={() => handleIncrease(product.productId._id)}
                  onDecrease={() => handleDecrease(product.productId._id)}
                  onRemove={() => handleRemove(product.productId._id)}
                />
              ))
            }
            <div className="justify-center item-center flex flex-col">
                <hr className="my-4" />
                <p className="text-2xl font-bold">Total: ${car.reduce((acc, item) => acc + item.productId.price * item.amount, 0)}</p>
                <button onClick={handleOrder} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Comprar</button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-2xl font-bold">The cart is empty.</p>
          </div>
        )
      )}
    </div>
  );
}