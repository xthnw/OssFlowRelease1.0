import React from 'react';
import { LayoutList } from 'lucide-react';

export const TaskStatusBar = ({ tasksData }) => {
    // Process data to count tasks by status
    const getStatusCounts = () => {
        const statusCounts = {};
        let maxCount = 0;

        // Count tasks in each status
        Object.entries(tasksData).forEach(([status, tasks]) => {
            statusCounts[status] = {
                name: status,
                count: tasks.length,
                completedSubtasks: 0,
                totalSubtasks: 0
            };

            // Count subtasks
            tasks.forEach(task => {
                statusCounts[status].totalSubtasks += task.subtasks.length;
                statusCounts[status].completedSubtasks += task.subtasks.filter(
                    subtask => subtask.isCompleted
                ).length;
            });

            maxCount = Math.max(maxCount, tasks.length);
        });

        return {
            data: Object.values(statusCounts),
            maxCount
        };
    };

    const { data, maxCount } = getStatusCounts();

    // Function to format status name
    const formatStatusName = (status) => {
        return status.split('_').map(word =>
            word.charAt(0) + word.slice(1).toLowerCase()
        ).join(' ');
    };

    // Calculate percentage
    const calculatePercentage = (completed, total) => {
        return total === 0 ? 0 : Math.round((completed / total) * 100);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-2 mb-6">
                <LayoutList size={20} className="text-indigo-500" />
                <h2 className="text-lg font-medium">Task Status Distribution</h2>
            </div>

            <div className="h-[400px] overflow-y-scroll scrollbar pr-2 space-y-6">
                {data.map((status) => (
                    <div key={status.name} className="space-y-2">
                        <div className="flex justify-between items-end">
                            <span className="font-medium">{formatStatusName(status.name)}</span>
                            <span className="text-sm text-gray-500">
                                {status.count} tasks
                            </span>
                        </div>

                        {/* Main task bar */}
                        <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-500"
                                style={{ width: `${(status.count / maxCount) * 100}%` }}
                            />
                        </div>

                        {/* Subtasks progress */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-300"
                                    style={{
                                        width: `${calculatePercentage(status.completedSubtasks, status.totalSubtasks)}%`
                                    }}
                                />
                            </div>
                            <span className="text-xs whitespace-nowrap">
                                {status.completedSubtasks}/{status.totalSubtasks} subtasks
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded"></div>
                    <span>Main Tasks</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-300 rounded"></div>
                    <span>Completed Subtasks</span>
                </div>
            </div>
        </div>
    );
};