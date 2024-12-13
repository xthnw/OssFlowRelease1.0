import React from 'react';
import { PieChart, AlertTriangle } from 'lucide-react';

// Component แสดงจำนวน Upcoming Due Dates
export const UpcomingDueDateBox = ({ tasksData }) => {
    const getTasksByDaysRemaining = () => {
        const taskCounts = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
            0: 0
        };

        const now = new Date();

        Object.values(tasksData).forEach(taskList => {
            taskList.forEach(task => {
                const dueDate = new Date(task.dueDate);
                const daysRemaining = Math.floor(
                    (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
                );

                if (daysRemaining >= 0 && daysRemaining <= 5) {
                    taskCounts[daysRemaining]++;
                }
            });
        });

        return taskCounts;
    };

    const taskCounts = getTasksByDaysRemaining();
    const totalCount = Object.values(taskCounts).reduce((a, b) => a + b, 0);

    const getDayLabel = (days) => {
        if (days === 0) return 'Today';
        if (days === 1) return 'Tomorrow';
        return `in ${days} days`;
    };

    const getColorClass = (days) => {
        switch (days) {
            case 0:
                return 'bg-red-50 border-red-200 text-red-700';
            case 1:
                return 'bg-orange-50 border-orange-200 text-orange-700';
            case 2:
                return 'bg-yellow-50 border-yellow-200 text-yellow-700';
            case 3:
                return 'bg-blue-50 border-blue-200 text-blue-700';
            default:
                return 'bg-gray-50 border-gray-200 text-gray-700';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={20} className="text-orange-500" />
                <h2 className="text-lg font-medium">Upcoming Due Dates</h2>
                <span className="ml-auto text-sm text-gray-500">Total: {totalCount}</span>
            </div>

            <div className="flex justify-between gap-3 mt-4">
                {Object.entries(taskCounts)
                    .sort(([a], [b]) => parseInt(a) - parseInt(b)) // เรียงจากวันน้อยไปมาก
                    .map(([days, count]) => (
                        <div
                            key={days}
                            className={`flex-1 border rounded-md p-3 ${getColorClass(parseInt(days))}`}
                        >
                            <div className="text-2xl font-bold">{count}</div>
                            <div className="text-sm capitalize">{getDayLabel(parseInt(days))}</div>
                        </div>
                    ))}
            </div>
        </div>
    );
};