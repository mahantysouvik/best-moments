import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, SearchX } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 text-center max-w-2xl space-y-6"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block"
        >
          <SearchX className="w-32 h-32 text-purple-600 mx-auto" />
        </motion.div>

        <h1 className="text-6xl font-bold gradient-text">404</h1>
        <h2 className="text-3xl font-bold text-gray-800">Page Not Found</h2>
        <p className="text-xl text-gray-600">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound
