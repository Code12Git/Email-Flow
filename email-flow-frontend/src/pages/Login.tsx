/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { publicRequest } from "../helpers/axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../validation/userValidation";
import{ useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import { UserLogin } from "../types";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);

  const submitHandler = async (data:UserLogin) => {
    try {
      setLoading(true);
      const res = await publicRequest.post("/user/login", data);
      localStorage.setItem('user', JSON.stringify(res.data.data)); 
      localStorage.setItem('token', res.data.data.token)
      toast.success("Login successful!");
      navigate('/')
    } catch (err: any) {
      toast.error(
        err?.response?.data?.code?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-white/20 backdrop-blur-xl shadow-xl rounded-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-white drop-shadow-lg">
          Login
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="mt-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-2"
          >
            <label className="block text-white">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="space-y-2"
          >
            <label className="block text-white">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </motion.div>

          <motion.button
          
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full cursor-pointer px-4 py-2 font-bold text-white rounded-lg shadow-lg transition-all ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
