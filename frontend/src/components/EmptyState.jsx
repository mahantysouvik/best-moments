import { motion } from 'framer-motion'

const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-4"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="inline-block"
      >
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-full mb-6">
          {Icon && <Icon className="w-16 h-16 text-purple-600 mx-auto" />}
        </div>
      </motion.div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  )
}

export default EmptyState
