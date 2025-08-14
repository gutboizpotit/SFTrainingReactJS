import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../api/JobAPI";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const handleStorage = () =>
      setTheme(localStorage.getItem("theme") || "light");
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      const result = await loginApi(formData);
      if (result.success) {
        login({
          username: formData.username,
          role: result.role,
          token: result.token,
        });
        toast.success("Login successful!");
        navigate("/");
      } else {
        setErrors({
          username: " ",
          password: "Invalid username or password.",
        });
        toast.error("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex h-screen transition-colors duration-300 ${
      theme === "dark" ? "bg-gray-900" : "bg-gray-100"
    }`}>
      <div className={`m-auto w-full max-w-md rounded-2xl shadow-lg p-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}>
        <h2 className={`text-2xl font-bold mb-6 text-center transition-colors duration-300 ${
          theme === "dark" ? "text-gray-100" : "text-gray-800"
        }`}>
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className={`block font-medium mb-1 transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors duration-300 ${
                errors.username ? "border-red-500" : 
                theme === "dark" ? "border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-400"
              }`}
              disabled={loading}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className={`block font-medium mb-1 transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors duration-300 ${
                errors.password ? "border-red-500" : 
                theme === "dark" ? "border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-400"
              }`}
              disabled={loading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-lg font-semibold transition-colors duration-300"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className={`text-center text-sm mt-4 transition-colors duration-300 ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}>
          Don’t have an account?{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
