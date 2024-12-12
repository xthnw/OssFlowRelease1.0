import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

export const DashboardPage = () => {
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

    const myTasks = {
        'To Do': [
            { id: 1, title: 'Initial Design', priority: 'high', dueDate: 'Today' },
            { id: 2, title: 'Client Meeting', priority: 'medium', dueDate: 'Tomorrow' }
        ],
        'In Progress': [
            { id: 3, title: '3D Modeling', priority: 'medium', dueDate: 'Oct 20' }
        ],
        'Done': [
            { id: 4, title: 'Requirements Review', priority: 'low', dueDate: 'Oct 15' }
        ]
    };

    const recentProjects = [
        { id: 1, name: 'Dental Case A', status: 'Manufacturing', progress: 75 },
        { id: 2, name: 'Ortho Case B', status: 'Planning', progress: 30 },
        { id: 3, name: 'Implant Case C', status: 'Design', progress: 45 }
    ];

    const upcomingDueDates = [
        {
            date: 'Today', events: [
                { title: 'Final Delivery', project: 'Project C' },
            ]
        },
        {
            date: 'Tomorrow', events: [
                { title: 'Surgical Planning confirmation', project: 'Case 124 - Mandible reconstruction with fibula flap - Dr.แน็ก [รพ.พัทลุง]' },
                { title: 'Surgical guide design', project: 'Case 122 - Femur cage - หมอวิช [คณะแพทย์ฯ มอ.]' },
            ]
        },
        {
            date: 'Oct 20', events: [
                { title: 'Reconstruction plate design', project: 'Case 127 - Mandible reconstruction with fibula flap - Dr.แน็ก [รพ.พัทระยอง]' },
                { title: 'Mock up model fabrication (SLA)', project: 'Case 122 - Femur cage - หมอวิช [คณะแพทย์ฯ มอ.]' },
                { title: 'Mandible cutting guide fabrication (SLA)', project: 'Case 122 - Femur cage - หมอวิช [คณะแพทย์ฯ มอ.]' },
                { title: 'Titanium plate reconstruction fabriaction', project: 'Case 122 - Femur cage - หมอวิช [คณะแพทย์ฯ มอ.]' },
                { title: 'Final Delivery', project: 'Case 122 - Femur cage - หมอวิช [คณะแพทย์ฯ มอ.]' },
            ]
        },
    ];

    return (
        <div className="p-6 overflow-y-scroll scrollbar">
            <div className="space-y-6">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Right Column - Calendar and Quick Access */}
                    <div className="space-y-6">
                        {/* Calendar View */}
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h2 className="text-lg font-medium mb-4">Upcoming Due Dates</h2>
                            <div className="space-y-4">
                                {upcomingDueDates.map((day, index) => (
                                    <div key={index}>
                                        <h3 className="text-sm font-medium text-gray-500 mb-2 text-red-400">{day.date}</h3>
                                        <div className="space-y-2">
                                            {day.events.map((event, eventIndex) => (
                                                <div key={eventIndex} className="bg-gray-50 p-3 rounded">
                                                    <div className="text-sm font-medium">{event.title}</div>
                                                    <div className="text-xs text-gray-500">{event.project}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};