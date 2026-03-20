import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      console.log("Hello")
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-white/10 to-emerald-700 text-white flex-col justify-center items-center px-12">
        <div className="flex flex-col justify-center items-center space-y-6">
          <div className="flex justify-center max-h-96 max-w-96">
            <img src="building.png" alt="Building Image" />
          </div>

          <h1 className="text-6xl font-bold">Buy Any Property You Want</h1>

          <p className="flex text-center flex-wrap text-lg text-emerald-100 max-w-md">
            Login to you account to find beautifull builiding waiting for you.
          </p>
        </div>
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Sign in to your account
          </h2>

          <form className="space-y-6" onSubmit={handleOnSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="test@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-emerald-700 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-emerald-700 rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-emerald-500 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition duration-200"
            >
              {loading ? "Logging In...." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
