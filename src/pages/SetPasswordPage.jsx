import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SetPasswordPage = () => {

    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-teal-800">
            {/* Logo container */}
            <div className="mb-8">
                <img
                    src="https://res.cloudinary.com/djgpgveds/image/upload/v1734159284/od2cqi3hxadxyzes9kgt.png"
                    alt="OssFlow Logo"
                    className="h-24"
                />
            </div>

            <div className="w-full max-w-md">
                <div className="bg-white shadow-lg rounded-3xl px-8 py-6 space-y-6">
                    {/* Key Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                            <svg
                                className="w-8 h-8 text-gray-800"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M7 3a5 5 0 0 0-5 5c0 2.76 2.24 5 5 5 1.71 0 3.22-.85 4.13-2.15L19 18.73V21h3v-3h-3l-2-2v-2.27l-7.87-7.88C9.22 4.85 8.21 4 7 4m0 2a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3z" />
                            </svg>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">Set New Password</h2>
                        <p className="text-gray-600">Your identity has been verified! Please set your new password</p>
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate('/login');
                    }}
                        className="space-y-6">
                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    className="block w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center"
                                >
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    className="block w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center"
                                >
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Update Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};