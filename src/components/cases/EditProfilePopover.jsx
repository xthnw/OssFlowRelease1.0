import React, { useState, useRef, useEffect } from 'react';
import { EditProfileForm } from './EditProfileForm';

export const EditProfilePopover = () => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef(null);

    // Mock user data
    const user = {
        name: "Janwimon Kaewwilai",
        email: "janwimonkaewwilai@osseolabs.com",
        phone: "081-234-5678",
        department: "Radiology",
        jobDescription: "Lead Radiologist",
        profile: "/avatars/avatar1.jpg"
    };

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={popoverRef}>
            <img
                src={user.profile}
                alt={user.name}
                className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500"
                onClick={() => setIsOpen(!isOpen)}
            />

            {isOpen && (
                <div className="absolute right-0 mt-2 w-[600px] bg-white rounded-lg shadow-lg border border-gray-200 transform transition-all -translate-x-[520px]">
                    <EditProfileForm
                        user={user}
                        onSave={(updatedData) => {
                            console.log('Updated data:', updatedData);
                            setIsOpen(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
};
