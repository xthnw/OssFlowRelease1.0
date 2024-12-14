import React from 'react';
import DatePicker from "react-datepicker";
import { TASKS_DATA } from '../data/tasksData';
import { useState } from 'react';
import { UpcomingDueDates } from '../components/cases/UpComingDueDate';
import { UpcomingDueDateBox } from '../components/cases/UpComingDueDateBox';
import { PieChartSubtask } from '../components/cases/PieChartSubtask';
import { AssignmentWorkloadBar } from '../components/cases/AssignmentWorkloadBar';
import { TaskStatusBar } from '../components/cases/TaskStatusBar';
import { HospitalDistributionDonut } from '../components/cases/HospitalDistributionDonut';
import { TeamCollaborationNetwork } from '../components/cases/TeamCollaborationNetwork';
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
    const [tasksData, setTasksData] = useState(TASKS_DATA);
    const stats = [
        { title: 'Total Cases', value: '128', trend: 12, description: 'vs last month', icon: () => '📁' },
        { title: 'Active Tasks', value: '64', trend: -5, description: 'vs last month', icon: () => '✓' },
        { title: 'Team Members', value: '24', trend: 8, description: 'vs last month', icon: () => '👥' },
        { title: 'Completion Rate', value: '94%', trend: 3, description: 'vs last month', icon: () => '📈' }
    ];

    return (
        <div className="flex-1 p-6 overflow-y-scroll scrollbar">
            <div className="space-y-6">
                {/* Top row - Overview metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UpcomingDueDateBox tasksData={tasksData} />
                    <PieChartSubtask tasksData={tasksData} />
                </div>

                {/* Middle row - Task distribution and workload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TaskStatusBar tasksData={tasksData} />
                    <AssignmentWorkloadBar tasksData={tasksData} />
                </div>

                {/* Bottom row - Organization insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <HospitalDistributionDonut tasksData={tasksData} />
                    <TeamCollaborationNetwork tasksData={tasksData} />
                </div>

                {/* Additional content */}
                    <div className="space-y-6">
                        <UpcomingDueDates tasksData={tasksData} />
                    </div>
            </div>
        </div>
    );
};