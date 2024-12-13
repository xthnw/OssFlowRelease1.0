import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Phone, BriefcaseIcon, Upload } from 'lucide-react';

export const RegisterPage = () => {
    // Form states
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phone: '',
        departments: [],
        jobDescriptions: [],
        profileImage: null
    });

    // Validation states
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    // Sample data
    const departmentOptions = [
        'Design', 'Polymer Production', 'Metal', 'Production', 'QA/QC', 'Packaging', 'Delivery'
    ];

    const jobDescriptionOptions = [
        'Project Manager', 'System Analyst', 'Software Engineer', 'UX/UI Designer',
        'Quality Engineer', 'Production Engineer', 'Logistics Coordinator'
    ];

    // Validation rules
    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'email':
                if (!value) {
                    error = 'Please enter an email';
                } else if (!value.endsWith('@osslabs.com')) {
                    error = 'Email must end with @osslabs.com';
                }
                break;
            case 'password':
                if (!value) {
                    error = 'Please enter a password';
                } else if (value.length < 8 || value.length > 100) {
                    error = 'Password must be 8-100 characters long';
                } else if (!/[A-Z]/.test(value)) {
                    error = 'Must contain at least 1 uppercase letter';
                } else if (!/[0-9]/.test(value)) {
                    error = 'Must contain at least 1 number';
                } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
                    error = 'Must contain at least 1 special character';
                } else if (/[ <>\"\'\/]/.test(value)) {
                    error = 'Cannot contain spaces or special characters < > " \' /';
                }
                break;
            case 'fullName':
                if (!value) error = 'Please enter your full name';
                break;
            case 'phone':
                if (!value) {
                    error = 'Please enter a phone number';
                } else if (!/^\d{10}$/.test(value)) {
                    error = 'Please enter a valid phone number';
                }
                break;
            case 'departments':
                if (!value.length) error = 'Please select a department';
                break;
            default:
                break;
        }
        return error;
    };

    // Handle file upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
                setErrors(prev => ({
                    ...prev,
                    profileImage: 'Please upload only .png, .jpg, or .jpeg files'
                }));
                return;
            }
            setFormData(prev => ({ ...prev, profileImage: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setErrors(prev => ({ ...prev, profileImage: '' }));
        }
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        // Here you would typically send the data to your API
        // For demo, we'll just show a success message
        alert('Please check your email to verify your registration');
        // Redirect to email verification page
        // window.location.href = '/verify-email';
    };

    // Real-time validation
    useEffect(() => {
        const newErrors = {};
        Object.keys(touched).forEach(field => {
            const value = formData[field];
            const error = validateField(field, value);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0 &&
            Object.keys(touched).length === Object.keys(formData).length - 1); // Excluding profileImage
    }, [formData, touched]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign Up
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:ring-teal-500 focus:border-teal-500`}
                                placeholder="example@osslabs.com"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, email: e.target.value }));
                                    setTouched(prev => ({ ...prev, email: true }));
                                }}
                            />
                        </div>
                        {errors.email && touched.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:ring-teal-500 focus:border-teal-500`}
                                value={formData.password}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, password: e.target.value }));
                                    setTouched(prev => ({ ...prev, password: true }));
                                }}
                            />
                        </div>
                        {errors.password && touched.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:ring-teal-500 focus:border-teal-500`}
                                value={formData.fullName}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, fullName: e.target.value }));
                                    setTouched(prev => ({ ...prev, fullName: true }));
                                }}
                            />
                        </div>
                        {errors.fullName && touched.fullName && (
                            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:ring-teal-500 focus:border-teal-500`}
                                value={formData.phone}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, phone: e.target.value }));
                                    setTouched(prev => ({ ...prev, phone: true }));
                                }}
                            />
                        </div>
                        {errors.phone && touched.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                        )}
                    </div>

                    {/* Departments Multi-select */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select
                            multiple
                            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${errors.departments ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:ring-teal-500 focus:border-teal-500`}
                            value={formData.departments}
                            onChange={(e) => {
                                const values = Array.from(e.target.selectedOptions, option => option.value);
                                setFormData(prev => ({ ...prev, departments: values }));
                                setTouched(prev => ({ ...prev, departments: true }));
                            }}
                        >
                            {departmentOptions.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                        <p className="mt-1 text-xs text-gray-500">Press Ctrl (Windows) or Command (Mac) to select multiple departments</p>
                        {errors.departments && touched.departments && (
                            <p className="mt-1 text-sm text-red-600">{errors.departments}</p>
                        )}
                    </div>

                    {/* Job Descriptions Multi-select */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Job Description</label>
                        <select
                            multiple
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                            value={formData.jobDescriptions}
                            onChange={(e) => {
                                const values = Array.from(e.target.selectedOptions, option => option.value);
                                setFormData(prev => ({ ...prev, jobDescriptions: values }));
                            }}
                        >
                            {jobDescriptionOptions.map(job => (
                                <option key={job} value={job}>{job}</option>
                            ))}
                        </select>
                        <p className="mt-1 text-xs text-gray-500">Press Ctrl (Windows) or Command (Mac) to select multiple positions</p>
                    </div>

                    {/* Profile Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                        <div className="mt-1 flex items-center space-x-4">
                            <div className="flex-shrink-0 h-16 w-16 relative">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Profile preview"
                                        className="h-16 w-16 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                                        <User className="h-8 w-8 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                <span>Upload image</span>
                                <input
                                    type="file"
                                    className="sr-only"
                                    accept=".png,.jpg,.jpeg"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        </div>
                        {errors.profileImage && (
                            <p className="mt-1 text-sm text-red-600">{errors.profileImage}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">Supported formats: .PNG, .JPG, and .JPEG</p>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                ${isFormValid
                                    ? 'bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
                                    : 'bg-gray-300 cursor-not-allowed'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="text-center">
                        <span className="text-sm text-gray-600">Already have an account? </span>
                        <a href="/login" className="text-sm text-teal-600 hover:text-teal-500 font-medium">
                            Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};
