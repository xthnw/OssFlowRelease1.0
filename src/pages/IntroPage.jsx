import React from 'react';
import { useNavigate } from 'react-router-dom';

export const IntroPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-teal-800 px-4">
            {/* Logo */}
            <div className="mb-16">
                <img
                    src="https://res.cloudinary.com/djgpgveds/image/upload/v1734159284/od2cqi3hxadxyzes9kgt.png"
                    alt="OssFlow Logo"
                    className="h-24 md:h-32"
                />
            </div>

            {/* Welcome Text */}
            <div className="text-center space-y-4 mb-16">
                <h1 className="text-2xl md:text-3xl font-medium text-white">
                    Welcome to osseolabs' workflow management platform.
                </h1>
                <p className="text-xl md:text-2xl text-white">
                    Start managing your processes here!
                </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                    onClick={() => navigate('/register')}
                    className="w-full sm:w-1/2 py-3 px-6 bg-teal-900 hover:bg-teal-950 text-white rounded-lg text-lg font-medium transition-colors"
                >
                    Sign Up
                </button>
                <button
                    onClick={() => navigate('/login')}
                    className="w-full sm:w-1/2 py-3 px-6 bg-teal-900 hover:bg-teal-950 text-white rounded-lg text-lg font-medium transition-colors"
                >
                    Log In
                </button>
            </div>
        </div>
    );
};