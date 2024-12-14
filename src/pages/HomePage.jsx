import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TASKS_DATA } from '../data/tasksData';
import { useState } from 'react';
import dayjs from 'dayjs';
import { MyTasks } from '../components/cases/MyTask';
import {
    Clock,
    AlertCircle,
    Calendar,
    CheckCircle2,
    Activity,
    UserCircle,
    MessageSquare,
    Link,
    ChevronRight,
    Star
} from 'lucide-react';

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

    const [tasksData, setTasksData] = useState(TASKS_DATA);


    const stats = [
        { title: 'Total Cases', value: '128', trend: 12, description: 'vs last month', icon: () => '📁' },
        { title: 'Active Tasks', value: '64', trend: -5, description: 'vs last month', icon: () => '✓' },
        { title: 'Team Members', value: '24', trend: 8, description: 'vs last month', icon: () => '👥' },
        { title: 'Completion Rate', value: '94%', trend: 3, description: 'vs last month', icon: () => '📈' }
    ];


    // Mock data
    const quickStats = {
        todayTasks: 5,
        upcomingDeadlines: 3,
        completedToday: 8,
        activeProjects: 4
    };

    const recentActivities = [
        {
            type: 'comment',
            project: 'Case 124 - Mandible reconstruction with fibula flap - Dr.แน็ก [รพ.พัทลุง]',
            task: 'Design Review',
            user: 'Karintip Siriwongsakulchai',
            time: '2 hours ago'
        },
        {
            type: 'status',
            project: 'Case 122 - Femur cage - หมอวิช [คณะแพทย์ฯ มอ.]',
            task: '3D Modeling',
            user: 'Pacharawat Santisuk',
            time: '4 hours ago'
        }
    ];

    return (
        <div className="flex-1 p-6 overflow-y-scroll scrollbar">
            <div className="space-y-6">
                {/* Main Content Grid */}
                    {/* Left Column - Tasks and Activities */}
                    <div className="md:col-span-2 space-y-6">
                        {/* My Tasks */}
                        <MyTasks tasksData={tasksData} />

                        {/* Recent Activities */}
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h2 className="text-lg font-medium mb-4">Recent Activities</h2>
                            <div className="space-y-4">
                                {recentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        {activity.type === 'comment' ? (
                                            <MessageSquare className="w-8 h-8 p-1.5 bg-blue-100 text-blue-600 rounded-full" />
                                        ) : (
                                            <Activity className="w-8 h-8 p-1.5 bg-green-100 text-green-600 rounded-full" />
                                        )}
                                        <div>
                                            <p className="text-sm">
                                                <span className="font-medium">{activity.user}</span>
                                                {activity.type === 'comment' ? ' commented on ' : ' updated status of '}
                                                <span className="font-medium">{activity.task}</span>
                                                {' in '}
                                                <span className="text-blue-600">{activity.project}</span>
                                            </p>
                                            <span className="text-xs text-gray-500">{activity.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};