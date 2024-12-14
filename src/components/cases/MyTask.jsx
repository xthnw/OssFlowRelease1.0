import { Clock } from 'lucide-react';
import dayjs from 'dayjs';

export const MyTasks = ({ tasksData }) => {
    // แปลงข้อมูลจาก TASKS_DATA เป็นรูปแบบ To Do และ Done
    const processTasksData = () => {
        const myTasks = {
            'To Do': [],
            'Done': []
        };

        // รวบรวมทั้ง main tasks และ subtasks
        Object.values(tasksData).forEach(statusTasks => {
            statusTasks.forEach(task => {
                // จัดการ main tasks
                const mainTaskData = {
                    id: task.id,
                    title: task.name,
                    dueDate: task.dueDate,
                    isCompleted: task.isCompleted
                };

                if (mainTaskData.isCompleted) {
                    myTasks['Done'].push(mainTaskData);
                } else {
                    myTasks['To Do'].push(mainTaskData);
                }

                // จัดการ subtasks
                if (task.subtasks) {
                    task.subtasks.forEach(subtask => {
                        const subtaskData = {
                            id: subtask.id,
                            title: subtask.name,
                            dueDate: subtask.dueDate,
                            isCompleted: subtask.isCompleted
                        };

                        if (subtaskData.isCompleted) {
                            myTasks['Done'].push(subtaskData);
                        } else {
                            myTasks['To Do'].push(subtaskData);
                        }
                    });
                }
            });
        });

        return myTasks;
    };

    const myTasks = processTasksData();

    const getDateStyle = (dueDate) => {
        if (!dueDate) return 'text-gray-500';
        
        const daysRemaining = Math.floor(
            (new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );

        // if (daysRemaining < 0) return 'text-red-500';
        // if (daysRemaining <= 2) return 'text-red-500';
        // if (daysRemaining <= 5) return 'text-orange-500';
        return 'text-gray-500';
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">My Tasks</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {Object.entries(myTasks).map(([status, tasks]) => (
                    <div key={status} className="bg-gray-50 rounded-lg p-3">
                        <h3 className="text-sm font-medium mb-3">
                            {status} ({tasks.length})
                        </h3>
                        <div className="space-y-2 max-h-[400px] overflow-y-scroll scrollbar">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="bg-white p-3 rounded border shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-sm font-medium">{task.title}</span>
                                    </div>
                                    {task.dueDate && (
                                        <div className={`flex items-center text-xs ${getDateStyle(task.dueDate)}`}>
                                            <Clock className="w-3 h-3 mr-1" />
                                            {dayjs(task.dueDate).fromNow()}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};