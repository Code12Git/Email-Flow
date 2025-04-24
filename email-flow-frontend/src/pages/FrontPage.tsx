import React from 'react'
import { motion } from 'framer-motion'
import { MailCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const FrontPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl text-center space-y-6"
      >
        <div className="flex justify-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-blue-100 text-blue-600 p-4 rounded-full shadow-lg"
          >
            <MailCheck size={40} />
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center gap-2">
          <Sparkles className="text-yellow-500" />
          Email Flow Setup in Progress
        </h1>
        <p className="text-gray-600 text-lg">
          We’re building something awesome for your email experience.
        </p>
        <p className="text-gray-500">
          Sign in to get started or create an account to explore.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
            >
              Login
            </motion.button>
          </Link>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full bg-gray-200 text-gray-800 font-medium shadow hover:bg-gray-300 transition"
            >
              Register
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default FrontPage
