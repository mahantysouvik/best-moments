import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'

// Pages
import Home from './pages/Home'
import CreateEvent from './pages/CreateEvent'
import EventDetails from './pages/EventDetails'
import EventView from './pages/EventView'
import UploadImages from './pages/UploadImages'
import ViewGallery from './pages/ViewGallery'
import NotFound from './pages/NotFound'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/event/:eventCode" element={<EventView />} />
          <Route path="/event/:eventCode/upload" element={<UploadImages />} />
          <Route path="/event/:eventCode/gallery" element={<ViewGallery />} />
          <Route path="/my-events" element={<EventDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
