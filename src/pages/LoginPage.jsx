import React, { useState, useEffect } from 'react';
import { UserPlus, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_USERS = [
  {
    email: 'test@osseolabs.com',
    password: 'Test@123',
  },
  {
    email: 'admin@osseolabs.com',
    password: 'Admin@123',
  }
];

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidUser = MOCK_USERS.some(
      user => user.email === email && user.password === password
    );

    if (isValidUser) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      navigate('/home');
    } else {
      alert('Invalid email or password');
    }

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-teal-800">
      {/* Logo container */}
      <div className="mb-4">
        <img
          src="https://res.cloudinary.com/djgpgveds/image/upload/v1734159284/od2cqi3hxadxyzes9kgt.png"
          alt="OssFlow Logo"
          className="h-24"
        />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-3xl px-8 py-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Login here</h2>
            <p className="text-gray-600">Welcome back you've been missed!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username/Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <UserPlus className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Remember Me
                </label>
              </div>
              <a href="/forgot" className="text-sm text-teal-700 hover:text-teal-600 font-medium">
                Forgot your password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Log in
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center">
            <span className="text-sm text-gray-600">No account? </span>
            <a href="register" className="text-sm text-teal-700 hover:text-teal-600 font-medium">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};