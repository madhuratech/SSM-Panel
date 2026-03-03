import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import TikTok from '../pages/TikTok'
import Instagram from '../pages/Instagram'
import Facebook from '../pages/Facebook'
import YouTube from '../pages/YouTube'
import Checkout from '../pages/Checkout'
import Search from '../pages/Search'
import PackagesPage from '../pages/PackagesPage'
import Dashboard from '../pages/Dashboard'



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tiktok" element={<TikTok />} />
      <Route path="/instagram" element={<Instagram />} />
      <Route path="/facebook" element={<Facebook />} />
      <Route path="/youtube" element={<YouTube />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/search" element={<Search/>} />
      <Route path="/packagespage" element={<PackagesPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    
    </Routes>
  )
}

export default AppRoutes
