import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Phone, BriefcaseIcon, Upload, Eye, EyeOff } from 'lucide-react';

export const RegisterPage = () => {
    // Form states
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        phone: '',
        position: '',
        skills: [],
        departments: [],
        profileImage: null
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // ต่อจากนี้คงการทำงานเดิมไว้
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [isSkillsOpen, setIsSkillsOpen] = useState(false);
    const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);

    // Sample data
    const skillOptions = [
        'Project Management', 'System Analysis', 'Software Development', 'UX/UI Design',
        'Quality Engineering', 'Production Engineering', 'Logistics Management'
    ];

    const departmentOptions = [
        'Design', 'Polymer Production', 'Metal', 'Production', 'QA/QC', 'Packaging', 'Delivery'
    ];

    // คงการทำงานของ validation และ handlers ต่างๆ ไว้เหมือนเดิม
    // แต่ปรับให้รองรับ fields ใหม่
    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'firstName':
            case 'lastName':
                if (!value) error = `Please enter your ${name === 'firstName' ? 'first' : 'last'} name`;
                break;
            case 'email':
                if (!value) {
                    error = 'Please enter an email';
                } else if (!value.endsWith('@osseolab.com')) {
                    error = 'Email must end with @osseolab.com';
                }
                break;
            case 'username':
                if (!value) error = 'Please enter a username';
                break;
            case 'password':
                if (!value) {
                    error = 'Please enter a password';
                } else if (value.length < 8) {
                    error = 'Password must be at least 8 characters';
                }
                break;
            case 'confirmPassword':
                if (!value) {
                    error = 'Please confirm your password';
                } else if (value !== formData.password) {
                    error = 'Passwords do not match';
                }
                break;
            case 'phone':
                if (!value) {
                    error = 'Please enter a phone number';
                } else if (!/^\d{10}$/.test(value)) {
                    error = 'Please enter a valid phone number';
                }
                break;
            case 'position':
                if (!value) error = 'Please enter your position';
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.relative')) {
                setIsSkillsOpen(false);
                setIsDepartmentsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);



    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-teal-800">
            {/* Logo container */}
            <div className="mb-8">
                <img
                    src="https://res.cloudinary.com/djgpgveds/image/upload/v1734159284/od2cqi3hxadxyzes9kgt.png"
                    alt="OssFlow Logo"
                    className="h-12"
                />
            </div>

            <div className="w-full max-w-3xl">
                <div className="bg-white shadow-lg rounded-3xl px-8 py-6 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                        <p className="text-gray-600">Create an account to get started!</p>
                    </div>

                    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                First Name (No Title) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Enter your first name"
                                value={formData.firstName}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, firstName: e.target.value }));
                                    setTouched(prev => ({ ...prev, firstName: true }));
                                }}
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, lastName: e.target.value }));
                                    setTouched(prev => ({ ...prev, lastName: true }));
                                }}
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="xx-xxxx-xxxx"
                                value={formData.phone}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, phone: e.target.value }));
                                    setTouched(prev => ({ ...prev, phone: true }));
                                }}
                            />
                        </div>

                        {/* Position */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Position <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Enter your position"
                                value={formData.position}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, position: e.target.value }));
                                    setTouched(prev => ({ ...prev, position: true }));
                                }}
                            />
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Skill(s) (Multiple Selections Allowed) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-1">
                                <button
                                    type="button"
                                    className="bg-gray-50 w-full px-3 py-2 text-left border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                                    onClick={() => setIsSkillsOpen(!isSkillsOpen)}
                                >
                                    {formData.skills.length ? `${formData.skills.length} selected` : 'Please select your skill'}
                                </button>
                                {isSkillsOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                        {skillOptions.map(skill => (
                                            <div
                                                key={skill}
                                                className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                                                onClick={() => {
                                                    const newSkills = formData.skills.includes(skill)
                                                        ? formData.skills.filter(s => s !== skill)
                                                        : [...formData.skills, skill];
                                                    setFormData(prev => ({ ...prev, skills: newSkills }));
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.skills.includes(skill)}
                                                    onChange={() => { }}
                                                    className="h-4 w-4 text-teal-600 rounded border-gray-300"
                                                />
                                                <span className="ml-2">{skill}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Departments Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Department(s) (Multiple Selections Allowed) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-1">
                                <button
                                    type="button"
                                    className="bg-gray-50 w-full px-3 py-2 text-left border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                                    onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
                                >
                                    {formData.departments.length ? `${formData.departments.length} selected` : 'Please select your department'}
                                </button>
                                {isDepartmentsOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                        {departmentOptions.map(dept => (
                                            <div
                                                key={dept}
                                                className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                                                onClick={() => {
                                                    const newDepts = formData.departments.includes(dept)
                                                        ? formData.departments.filter(d => d !== dept)
                                                        : [...formData.departments, dept];
                                                    setFormData(prev => ({ ...prev, departments: newDepts }));
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.departments.includes(dept)}
                                                    onChange={() => { }}
                                                    className="h-4 w-4 text-teal-600 rounded border-gray-300"
                                                />
                                                <span className="ml-2">{dept}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="xxxx@osseolab.com"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, email: e.target.value }));
                                    setTouched(prev => ({ ...prev, email: true }));
                                }}
                            />
                        </div>

                        {/* Username */}
                        <div className="col-span-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                Username <span className="text-red-500">*</span>
                                <div className="ml-1 group relative">
                                    <span className="cursor-help">?</span>
                                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2">
                                        Username will be used for login
                                    </div>
                                </div>
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, username: e.target.value }));
                                    setTouched(prev => ({ ...prev, username: true }));
                                }}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                Password <span className="text-red-500">*</span>
                                <div className="ml-1 group relative">
                                    <span className="cursor-help">?</span>
                                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48">
                                        Password must be at least 8 characters
                                    </div>
                                </div>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) => {
                                        setFormData(prev => ({ ...prev, password: e.target.value }));
                                        setTouched(prev => ({ ...prev, password: true }));
                                    }}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="Enter your password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => {
                                        setFormData(prev => ({ ...prev, confirmPassword: e.target.value }));
                                        setTouched(prev => ({ ...prev, confirmPassword: true }));
                                    }}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Register Button */}
                        <div className="col-span-2 mt-6">
                            <button
                                type="submit"
                                disabled={isFormValid}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Register
                            </button>
                        </div>

                        {/* Login Link */}
                        <div className="col-span-2 text-center">
                            <span className="text-sm text-gray-600">Already have an account? </span>
                            <a href="login" className="text-sm text-teal-700 hover:text-teal-600 font-medium">
                                Log in
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};