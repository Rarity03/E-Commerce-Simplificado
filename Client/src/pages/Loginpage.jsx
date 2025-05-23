import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export default function LoginPage() {
  const { register, handleSubmit, formState:{ errors } } = useForm();
  const { singin, isAuthenticated, errors: loginErrors } = useAuth();
  const navigation = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigation('/')
  },[isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    singin(values)
  })

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 min-w-[600px] overflow-x-auto mt-20">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          
          <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
          <form onSubmit={onSubmit}>
            <div>
              <label className="block text-gray-700 mt-2 ">Email</label>
              <input
                type="email"
                placeholder="Email"
                {...register('email', { required: true })}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 mt-1">Email is required</p>}
              {loginErrors && loginErrors.map((error, index) => (
                error.includes('Email') && <p className="text-red-500 mt-1" key={index}>{error}</p>
              ))}
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
              {loginErrors && loginErrors.map((error, index) => (
                error.includes('Password') && <p className="text-red-500 mt-1" key={index}>{error}</p>
              ))}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-600">
            Dont have an account? <Link to='/register' className='text-blue-500 hover:underline'>Sign up</Link>
          </p>
          <p className="text-center text-gray-600">
            Return <Link to='/' className='text-blue-500 hover:underline'>Home</Link>
          </p>
        </div>
      </div>
    )
}