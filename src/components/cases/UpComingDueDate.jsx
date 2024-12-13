import { AlertTriangle } from 'lucide-react';
import dayjs from 'dayjs';

export const UpcomingDueDates = ({ tasksData }) => {
    // แปลงข้อมูลจาก TASKS_DATA ให้อยู่ในรูปแบบที่ต้องการ
    const getAllTasks = () => {
        const allTasks = [];
        Object.values(tasksData).forEach(statusTasks => {
            statusTasks.forEach(task => {
                // เพิ่ม main task
                if (task.dueDate) {
                    allTasks.push({
                        id: task.id,
                        title: task.name,
                        dueDate: new Date(task.dueDate),
                        project: `${task.taskCode} - ${task.surgeon} [${task.hospital}]`
                    });
                }
                // เพิ่ม subtasks
                if (task.subtasks) {
                    task.subtasks.forEach(subtask => {
                        if (subtask.dueDate) {
                            allTasks.push({
                                id: subtask.id,
                                title: subtask.name,
                                dueDate: new Date(subtask.dueDate),
                                project: `${task.taskCode} - ${task.surgeon} [${task.hospital}]`
                            });
                        }
                    });
                }
            });
        });

        // เรียงตามวันที่ใกล้สุด
        return allTasks.sort((a, b) => a.dueDate - b.dueDate);
    };

    const getDateStyle = (daysRemaining) => {
        if (daysRemaining < 0) return 'text-red-500 font-medium';
        if (daysRemaining <= 2) return 'text-red-500 font-medium';
        if (daysRemaining <= 5) return 'text-orange-500 font-medium';
        return 'text-gray-500';
    };

    const tasks = getAllTasks();

    return (
        <div className="bg-white rounded-lg shadow-sm border p-4">
            <h2 className="text-lg font-medium mb-4">Upcoming Due Dates</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-scroll scrollbar">
                {tasks.map((task) => {
                    const daysRemaining = Math.ceil(
                        (task.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                    );

                    // แสดงเฉพาะงานที่ยังไม่เลยกำหนดเกิน 5 วัน
                    if (daysRemaining > 5) return null;

                    return (
                        <div key={task.id} className="group relative">
                            <div className="bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="flex items-center gap-2">
                                    {daysRemaining <= 5 && (
                                        <AlertTriangle
                                            size={16}
                                            className={`${daysRemaining <= 2 ? 'text-red-500' : 'text-orange-500'} 
                                                      ${daysRemaining <= 2 ? 'animate-bounce' : ''}`}
                                        />
                                    )}
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">{task.title}</div>
                                        <div className="text-xs text-gray-500">{task.project}</div>
                                        <div className={`text-xs mt-1 ${getDateStyle(daysRemaining)}`}>
                                            {dayjs(task.dueDate).fromNow()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tooltip */}
                            {/* {daysRemaining <= 5 && (
                                <div className="absolute hidden group-hover:block z-10 -top-12 left-0 w-48 p-2 bg-white shadow-lg rounded-lg border text-xs">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle
                                            size={14}
                                            className={daysRemaining <= 2 ? 'text-red-500' : 'text-orange-500'}
                                        />
                                        <div className="flex flex-col">
                                            <span className={daysRemaining <= 2 ? 'text-red-500' : 'text-orange-500'}>
                                                {daysRemaining < 0
                                                    ? 'Due date has passed!'
                                                    : daysRemaining === 0
                                                        ? 'Due today!'
                                                        : daysRemaining === 1
                                                            ? 'Due tomorrow!'
                                                            : `Due in ${daysRemaining} days`}
                                            </span>
                                            <span className="text-gray-500">
                                                {task.dueDate.toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )} */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};