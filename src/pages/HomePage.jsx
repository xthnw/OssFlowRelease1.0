import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// สร้าง StatsCard component
const StatsCard = ({ title, value, icon: Icon, trend, description }) => (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-600">{title}</p>
                <h3 className="text-2xl font-semibold mt-1">{value}</h3>
                {trend && (
                    <div className="flex items-center mt-2 text-sm">
                        <span className={`mr-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                        </span>
                        <span className="text-gray-500">{description}</span>
                    </div>
                )}
            </div>
            {Icon && <Icon className="w-12 h-12 text-gray-400" />}
        </div>
    </div>
);

export const HomePage = () => {
    const stats = [
        { title: 'Total Cases', value: '128', trend: 12, description: 'vs last month', icon: () => '📁' },
        { title: 'Active Tasks', value: '64', trend: -5, description: 'vs last month', icon: () => '✓' },
        { title: 'Team Members', value: '24', trend: 8, description: 'vs last month', icon: () => '👥' },
        { title: 'Completion Rate', value: '94%', trend: 3, description: 'vs last month', icon: () => '📈' }
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>
        </div>

    );
};