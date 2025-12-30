import { motion } from 'framer-motion'

const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="inline-block bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-full mb-6"
      >
        <Icon className="w-16 h-16 text-purple-600" />
      </motion.div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">{description}</p>
      {action && <div>{action}</div>}
    </motion.div>
  )
}

export default EmptyState
