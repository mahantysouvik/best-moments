import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-2xl shadow-2xl"
      >
        <Camera className="w-12 h-12 text-white" />
      </motion.div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-lg font-semibold text-gray-600"
      >
        {message}
      </motion.p>
    </div>
  )
}

export default Loading
