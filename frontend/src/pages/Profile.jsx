import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import { authAPI } from '../utils/auth'

const Profile = () => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  })
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAPI.getProfile()
        if (response.success) {
          setUserData(response.data)
          setFormData({
            name: response.data.name,
            email: response.data.email
          })
        }
      } catch (err) {
        setError('Failed to load profile')
        if (err.message.includes('token')) {
          navigate('/login')
        }
      }
    }

    fetchProfile()
  }, [navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await authAPI.updateProfile(formData)
      if (response.success) {
        setUserData(response.data)
        setSuccess('Profile updated successfully!')
        setIsEditing(false)
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      email: userData.email
    })
    setIsEditing(false)
    setError('')
    setSuccess('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Avatar Section */}
          <div className="flex items-center mb-8 pb-8 border-b border-gray-200">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-3xl font-bold">
              {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
              <p className="text-gray-600">{userData.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          {/* Profile Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-colors ${
                    isEditing
                      ? 'border-gray-300 focus:border-primary-600 focus:outline-none bg-white'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  }`}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-colors ${
                    isEditing
                      ? 'border-gray-300 focus:border-primary-600 focus:outline-none bg-white'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  }`}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                {!isEditing ? (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    variant="primary"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancel}
                      variant="outline"
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Orders</span>
                <span className="font-semibold text-primary-600">
                  {userData.orders ? userData.orders.length : 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/my-orders')}
                className="w-full text-left px-4 py-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
              >
                <span className="text-primary-700 font-medium">📦 View My Orders</span>
              </button>
              <button
                onClick={() => navigate('/change-password')}
                className="w-full text-left px-4 py-3 bg-accent-50 hover:bg-accent-100 rounded-lg transition-colors"
              >
                <span className="text-accent-700 font-medium">🔒 Change Password</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
