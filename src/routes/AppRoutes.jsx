import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import TikTok from '../pages/TikTok'
import Instagram from '../pages/Instagram'
import Facebook from '../pages/Facebook'
import YouTube from '../pages/YouTube'
import Checkout from '../pages/Checkout'
import Search from '../pages/search'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tiktok" element={<TikTok />} />
      <Route path="/instagram" element={<Instagram />} />
      <Route path="/facebook" element={<Facebook />} />
      <Route path="/youtube" element={<YouTube />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  )
}

export default AppRoutes
