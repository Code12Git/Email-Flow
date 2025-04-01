import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { publicRequest } from "../helpers/axios";
import userSchema from "../validation/userValidation";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; username: string; email: string; password: string }>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (data: { name: string; username: string; email: string; password: string }) => {
    setIsLoading(true);
    try {
       await publicRequest.post("/user/register", data);
      toast.success("Registration successful");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      toast.error( err?.response?.data?.code?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-white drop-shadow-lg">Register</h2>

        <form onSubmit={handleSubmit(submitHandler)} className="mt-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-white">Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-white">Username</label>
            <input
              type="text"
              {...register("username")}
              placeholder="root24"
              className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.username && <p className="text-red-400 text-sm">{errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-white">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-white">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
            className="w-full px-4 py-2 cursor-pointer font-bold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Register"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Register;