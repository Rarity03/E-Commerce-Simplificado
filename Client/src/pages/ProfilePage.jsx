import { useAuth } from "../context/AuthContext"
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import ProfileImage from '../assets/Profile.jpg'
import ProfileHeader from '../assets/ProfileHeader.png'
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const { user, update } = useAuth()
  const [profileEdit, setProfileEdit] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    direction: user.direction,
    phone: user.phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSave = async () => {
    await update(formData)
    setProfileEdit(false)
  }
  
  useEffect(() => {
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      direction: user.direction,
      phone: user.phone,
    })
  }, [user])

    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 min-w-[600px] mt-20">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <div className="relative">
              <img
              src={ProfileHeader}
              alt="Profile Header"
              className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <img
                  src={ProfileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white"
                />
              </div>
            </div>
            <div className="pt-16">
              <h1 className="text-2xl font-bold text-center text-gray-800">Profile</h1>
              <div className="mt-4">
                <label className="block text-gray-700 mt-2 flex items-center">
                  <FaUser className="mr-2" /> Name
                </label>
                {profileEdit ? (
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 mt-2 border rounded-md"
                    value={formData.name}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="w-full px-4 py-2 mt-2 border rounded-md">{user.name}</p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 mt-2 flex items-center">
                  <FaEnvelope className="mr-2" /> Email
                </label>
                {profileEdit ? (
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 mt-2 border rounded-md"
                    value={formData.email}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="w-full px-4 py-2 mt-2 border rounded-md">{user.email}</p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 mt-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> Address
                </label>
                {profileEdit ? (
                  <input
                    type="text"
                    name="direction"
                    className="w-full px-4 py-2 mt-2 border rounded-md"
                    value={formData.direction}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="w-full px-4 py-2 mt-2 border rounded-md">{user.direction}</p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 mt-2 flex items-center">
                  <FaPhone className="mr-2" /> Phone
                </label>
                {profileEdit ? (
                  <input
                    type="text"
                    name="phone"
                    className="w-full px-4 py-2 mt-2 border rounded-md"
                    value={formData.phone}
                    onChange={handleChange}
                    />
                  ) : (
                    <p className="w-full px-4 py-2 mt-2 border rounded-md">{user.phone}</p>
                  )}
              </div>
              <div className="mt-6 text-center">
                {
                  profileEdit ? (
                    <button
                      className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      onClick={handleSave}
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      onClick={() => setProfileEdit(true)}
                    >
                      Editar
                    </button>
                  )
                }
              </div>  
            </div>
          </div>
        </div>
      </>
    )
}