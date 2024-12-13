import React from 'react';
import { PieChart } from 'lucide-react';

// Component แสดงสถานะ subtasks ในรูปแบบ Pie Chart
export const PieChartSubtask = ({ tasksData }) => {
    // นับจำนวน subtasks ตามสถานะ
    const getSubtaskStats = () => {
        let completed = 0;
        let pending = 0;

        Object.values(tasksData).forEach(taskList => {
            taskList.forEach(task => {
                task.subtasks.forEach(subtask => {
                    if (subtask.isCompleted) {
                        completed++;
                    } else {
                        pending++;
                    }
                });
            });
        });

        return { completed, pending };
    };

    const stats = getSubtaskStats();
    const total = stats.completed + stats.pending;
    const completedDegrees = (stats.completed / total) * 360;

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
                <PieChart size={20} className="text-gray-500" />
                <h2 className="text-lg font-medium">Subtask Status</h2>
            </div>

            <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                        {/* Background circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="20"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="20"
                            strokeDasharray={`${(completedDegrees / 360) * 251.2} 251.2`}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-semibold">
                            {Math.round((stats.completed / total) * 100)}%
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex justify-around text-sm">
                <div className="text-center">
                    <div className="font-medium text-blue-500">{stats.completed}</div>
                    <div className="text-gray-500">Completed</div>
                </div>
                <div className="text-center">
                    <div className="font-medium text-gray-500">{stats.pending}</div>
                    <div className="text-gray-500">Pending</div>
                </div>
            </div>
        </div>
    );
};
