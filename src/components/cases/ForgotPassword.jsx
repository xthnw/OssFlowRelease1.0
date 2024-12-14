import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Validation
    const validateEmail = (email) => {
        if (!email) return 'Email is required';
        if (!email.endsWith('@osseolab.com')) {
            return 'Please enter a valid company email';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateEmail(email);
        
        if (error) {
            alert(error);
            return;
        }

        setIsSubmitting(true);
        
        try {
            // TODO: Implement actual password reset logic
            alert('If this email exists in our system, you will receive a password reset link shortly.');
            navigate('/login');
        } catch (error) {
            alert('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-teal-800">
            {/* Logo container */}
            <div className="mb-8">
                <img
                    src="OSSFLOW_LOGO_URL_HERE"
                    alt="OssFlow Logo"
                    className="h-12"
                />
            </div>

            <div className="w-full max-w-md">
                <div className="bg-white shadow-lg rounded-3xl px-8 py-6 space-y-6 relative">
                    {/* Back button */}
                    <button
                        onClick={() => navigate('/login')}
                        className="absolute left-6 top-6 text-gray-600 hover:text-gray-800"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </button>

                    {/* Lock Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                            <svg 
                                className="w-8 h-8 text-gray-800" 
                                viewBox="0 0 24 24" 
                                fill="currentColor"
                            >
                                <path d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4z"/>
                            </svg>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">Forget Password</h2>
                        <p className="text-gray-600">Enter your registered email address to reset your password</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Processing...' : 'Next'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};