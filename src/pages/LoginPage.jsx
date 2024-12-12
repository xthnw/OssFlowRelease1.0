import React, { useState, useEffect } from 'react';
import { UserPlus, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock user data
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

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check credentials against mock data
    const isValidUser = MOCK_USERS.some(
      user => user.email === email && user.password === password
    );

    if (isValidUser) {
      // You might want to set some authentication state here
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);

      // Navigate to medical page
      navigate('/medical');
    } else {
      alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }

    // Handle remember me
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg px-8 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-center space-x-3">
            <UserPlus className="w-8 h-8 text-teal-600" />
            <h2 className="text-2xl font-semibold text-gray-900">เข้าสู่ระบบ</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                อีเมล
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                รหัสผ่าน
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  จดจำฉัน
                </label>
              </div>
              <a href="#" className="text-sm text-teal-600 hover:text-teal-500">
                ลืมรหัสผ่าน?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              เข้าสู่ระบบ
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center">
            <span className="text-sm text-gray-600">ยังไม่มีบัญชี? </span>
            <a href="register" className="text-sm text-teal-600 hover:text-teal-500 font-medium">
              สมัครสมาชิก
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};