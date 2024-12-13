import React from 'react';
import { Users } from 'lucide-react';

export const AssignmentWorkloadBar = ({ tasksData }) => {
    // Process data to count assignments per person
    const getAssignmentCounts = () => {
        const assignmentCounts = {};

        // Count main task assignments
        Object.values(tasksData).forEach(taskList => {
            taskList.forEach(task => {
                task.assignees.forEach(assignee => {
                    if (!assignmentCounts[assignee.name]) {
                        assignmentCounts[assignee.name] = {
                            name: assignee.name,
                            mainTasks: 0,
                            subtasks: 0,
                            total: 0
                        };
                    }
                    assignmentCounts[assignee.name].mainTasks += 1;
                    assignmentCounts[assignee.name].total += 1;
                });

                // Count subtask assignments
                task.subtasks.forEach(subtask => {
                    const assigneeName = subtask.assignee.name;
                    if (!assignmentCounts[assigneeName]) {
                        assignmentCounts[assigneeName] = {
                            name: assigneeName,
                            mainTasks: 0,
                            subtasks: 0,
                            total: 0
                        };
                    }
                    assignmentCounts[assigneeName].subtasks += 1;
                    assignmentCounts[assigneeName].total += 1;
                });
            });
        });

        return Object.values(assignmentCounts).sort((a, b) => b.total - a.total);
    };

    const data = getAssignmentCounts();
    const maxTotal = Math.max(...data.map(item => item.total));

    return (
        <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-2 mb-4">
                <Users size={20} className="text-blue-500" />
                <h2 className="text-lg font-medium">Assignment Workload</h2>
            </div>

            <div className="h-[400px] overflow-y-scroll scrollbar pr-2 space-y-4">
                {data.map((item) => (
                    <div key={item.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>{item.name}</span>
                            <span className="text-gray-500">{item.total} tasks</span>
                        </div>
                        <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full flex">
                                <div
                                    className="bg-blue-600 h-full"
                                    style={{ width: `${(item.mainTasks / maxTotal) * 100}%` }}
                                />
                                <div
                                    className="bg-blue-300 h-full"
                                    style={{ width: `${(item.subtasks / maxTotal) * 100}%` }}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 text-xs text-gray-500">
                            <span>Main Tasks: {item.mainTasks}</span>
                            <span>Subtasks: {item.subtasks}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded"></div>
                    <span>Main Tasks</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-300 rounded"></div>
                    <span>Subtasks</span>
                </div>
            </div>
        </div>
    );
};