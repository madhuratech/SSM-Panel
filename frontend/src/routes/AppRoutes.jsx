import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const Home = lazy(() => import('../pages/Home'))
const TikTok = lazy(() => import('../pages/TikTok'))
const Instagram = lazy(() => import('../pages/Instagram'))
const Facebook = lazy(() => import('../pages/Facebook'))
const YouTube = lazy(() => import('../pages/YouTube'))
const SearchAccount = lazy(() => import('../pages/SearchAccount'))
const ServiceSelection = lazy(() => import('../pages/ServiceSelection'))
const PackageSelection = lazy(() => import('../pages/PackageSelection'))
const OrderPayment = lazy(() => import('../pages/OrderPayment'))
const PaymentProcessing = lazy(() => import('../pages/PaymentProcessing'))
const OrderComplete = lazy(() => import('../pages/OrderComplete'))
const TrackOrder = lazy(() => import('../pages/TrackOrder'))
const FreeTrialPage = lazy(() => import('../pages/FreeTrialPage'))
const FreeTrialService = lazy(() => import('../pages/FreeTrialService'))
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const Profile = lazy(() => import('../pages/Profile'))
const MyOrders = lazy(() => import('../pages/MyOrders'))
const ChangePassword = lazy(() => import('../pages/ChangePassword'))
const AccountProfile = lazy(() => import('../pages/AccountProfile'))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
)

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/account-profile" element={<AccountProfile />} />
        <Route path="/search" element={<SearchAccount />} />
        <Route path="/service-selection" element={<ServiceSelection />} />
        <Route path="/package-selection" element={<PackageSelection />} />
        <Route path="/order-summary" element={<OrderPayment />} />
        <Route path="/payment-processing" element={<PaymentProcessing />} />
        <Route path="/order-complete" element={<OrderComplete />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/free-trial" element={<FreeTrialPage />} />
        <Route path="/free-trial-service" element={<FreeTrialService />} />
        <Route path="/tiktok" element={<TikTok />} />
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/facebook" element={<Facebook />} />
        <Route path="/youtube" element={<YouTube />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
