import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export default function RegisterPage() {
  const { register, handleSubmit, formState:{ errors } } = useForm();
  const { singup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigation = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigation('/')
  },[isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    singup(values)
  })

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          {
            registerErrors && registerErrors.map((error, index) => (
              <div className="bg-red-500 p-2 text-white mb-2" key={index}>{error}</div>
            ))
          }
          <h1 className="text-2xl font-bold text-center text-gray-800">Register</h1>
          <form onSubmit={onSubmit}>
            <div>
              <label className="block text-gray-700 mt-2 ">Name</label>
              <input
                type="text"
                placeholder="Name"
                {...register('name', { required: true })}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 mt-1">Name is required</p>}
            </div>
            <div>
              <label className="block text-gray-700 mt-2 ">Email</label>
              <input
                type="email"
                placeholder="Email"
                {...register('email', { required: true })}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 mt-1">Email is required</p>}
            </div>
            <div>
              <label className="block text-gray-700 mt-2 ">Password</label>
              <input
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 mt-1">Password is required</p>}
            </div>
            <div>
              <label className="block text-gray-700 mt-2 ">Address</label>
              <input
                type="text"
                placeholder="Address"
                {...register('direction', { required: true })}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.direction && <p className="text-red-500 mt-1">Address is required</p>}
            </div>
            <div>
              <label className="block text-gray-700 mt-2 ">Phone</label>
              <input
                type="text"
                placeholder="Phone"
                {...register('phone', { required: true })}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && <p className="text-red-500 mt-1">Phone is required</p>}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </form>
          <p className="text-center text-gray-600">
            Already have an account? <Link to='/login' className='text-blue-500 hover:underline'>Sign in</Link>
          </p>
          <p className="text-center text-gray-600">
            Return <Link to='/' className='text-blue-500 hover:underline'>Home</Link>
          </p>
        </div>
      </div>
    )
}