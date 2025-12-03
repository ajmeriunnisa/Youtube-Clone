import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // State for input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for validation errors
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // If errors exist → stop submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors
    setErrors({});

    // ---- MULTI-USER SUPPORT ----
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(u => u.email === email && u.password === password);

    if (!matchedUser) {
      alert("Invalid email or password");
      return;
    }

    // Login success
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(matchedUser));
    window.dispatchEvent(new Event("login"));
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Card container */}
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
