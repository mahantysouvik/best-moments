import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CreateEvent from './pages/CreateEvent'
import EventView from './pages/EventView'
import UploadImages from './pages/UploadImages'
import ViewGallery from './pages/ViewGallery'
import EventDetails from './pages/EventDetails'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router basename="/best-moments">
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/event/:eventCode" element={<EventView />} />
            <Route path="/event/:eventCode/upload" element={<UploadImages />} />
            <Route path="/event/:eventCode/gallery" element={<ViewGallery />} />
            <Route path="/events" element={<EventDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App
