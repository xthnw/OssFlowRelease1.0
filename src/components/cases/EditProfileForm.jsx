import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

export const EditProfileForm = ({ user, onSave }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user.name,
        phone: user.phone,
        profile: user.profile
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Edit personal information</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Image */}
                <div className="flex items-center gap-4">
                    {formData.profile ? (
                        <img
                            src={formData.profile}
                            alt={formData.name}
                            className="w-20 h-20 rounded-full border-2 border-gray-200"
                        />
                    ) : (
                        <UserCircle className="w-20 h-20 text-gray-400" />
                    )}
                    <div>
                        <input
                            type="file"
                            id="profile"
                            name="profile"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                // Handle file upload logic here
                            }}
                        />
                        <label
                            htmlFor="profile"
                            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200"
                        >
                            Change profile picture
                        </label>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email - Read only */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-500"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Department - Read only */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                        </label>
                        <input
                            type="text"
                            value={user.department}
                            readOnly
                            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-500"
                        />
                    </div>

                    {/* Job Description - Read only */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Description
                        </label>
                        <input
                            type="text"
                            value={user.jobDescription}
                            readOnly
                            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-500"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                    {/* Logout Button */}
                    <button
                        type="button"
                        onClick={() => {
                            localStorage.removeItem('isAuthenticated');
                            localStorage.removeItem('userEmail');
                            navigate('/login');
                        }}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-red-600 text-sm font-medium"
                    >
                        Logout
                    </button>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 text-sm font-medium"
                    >
                        Save changes
                    </button>
                </div>
            </form>
        </div>
    );
};