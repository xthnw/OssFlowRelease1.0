import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const SearchableDropdown = ({ options, placeholder, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    // ก็อป code ทั้งหมดของ SearchableDropdown component มาวาง
    return (
        <div className="relative flex-1">
            <div
                className="w-full p-1 border rounded-md text-sm bg-white cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {value ? value.name : placeholder}
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    <div className="p-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full p-1 border rounded-md text-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <div className="max-h-48 overflow-auto">
                        {filteredOptions.map((option) => (
                            <div
                                key={option.id}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center space-x-2"
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                    setSearch("");
                                }}
                            >
                                <span>{option.name}</span>
                                {value?.id === option.id && (
                                    <Check className="w-4 h-4 text-green-500" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};