import { AlertTriangle } from 'lucide-react';
import dayjs from 'dayjs';

export const UpcomingDueDates = ({ tasksData }) => {
    const getAllTasks = () => {
        const allTasks = [];
        Object.values(tasksData).forEach(statusTasks => {
            statusTasks.forEach(task => {
                if (task.dueDate) {
                    allTasks.push({
                        id: task.id,
                        title: task.name,
                        dueDate: new Date(task.dueDate),
                        project: `${task.taskCode} - ${task.surgeon} [${task.hospital}]`
                    });
                }
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
        return allTasks.sort((a, b) => a.dueDate - b.dueDate);
    };

    const getDateStyle = (daysRemaining) => {
        if (daysRemaining < 0) return 'text-red-600 font-medium';
        if (daysRemaining === 0) return 'text-red-500 font-medium';
        if (daysRemaining === 1) return 'text-red-400 font-medium';
        if (daysRemaining === 2) return 'text-orange-500 font-medium';
        if (daysRemaining === 3) return 'text-orange-400 font-medium';
        if (daysRemaining === 4) return 'text-yellow-500 font-medium';
        return 'text-yellow-400 font-medium';
    };

    const tasks = getAllTasks();

    const getTasksByGroup = (days) => {
        return tasks.filter(task => {
            const daysRemaining = Math.floor(
                (task.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );
            return daysRemaining === days;
        });
    };

    const getOverdueTasks = () => {
        return tasks.filter(task => {
            const daysRemaining = Math.floor(
                (task.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );
            return daysRemaining < 0;
        });
    };

    const TaskContainer = ({ title, tasks, bgColor }) => (
        <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="text-lg font-medium mb-3">{title}</h3>
            <div className="space-y-2 h-[400px] overflow-y-scroll scrollbar">
                {tasks.map((task) => (
                    <div key={task.id} className="group relative">
                        <div className={`bg-white rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer border-1 ${bgColor.replace('bg-', 'border-')}`}>
                            <div className="flex items-center gap-2">
                                <AlertTriangle size={16} className={getDateStyle(Math.floor(
                                    (task.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                                ))} />
                                <div className="flex-1">
                                    <div className="text-sm font-medium">{task.title}</div>
                                    <div className="text-xs text-gray-500">{task.project}</div>
                                    <div className="text-xs mt-1">{dayjs(task.dueDate).fromNow()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="md:col-span-2 lg:col-span-3">
                {getOverdueTasks().length > 0 && (
                    <TaskContainer
                        title="Overdue Tasks"
                        tasks={getOverdueTasks()}
                        bgColor="bg-red-700"
                    />
                )}
            </div>
            <TaskContainer
                title="Today"
                tasks={getTasksByGroup(0)}
                bgColor="bg-red-600"
            />
            <TaskContainer
                title="Tomorrow"
                tasks={getTasksByGroup(1)}
                bgColor="bg-red-500"
            />
            <TaskContainer
                title="In 2 Days"
                tasks={getTasksByGroup(2)}
                bgColor="bg-orange-500"
            />
            <TaskContainer
                title="In 3 Days"
                tasks={getTasksByGroup(3)}
                bgColor="bg-orange-400"
            />
            <TaskContainer
                title="In 4 Days"
                tasks={getTasksByGroup(4)}
                bgColor="bg-yellow-500"
            />
            <TaskContainer
                title="In 5 Days"
                tasks={getTasksByGroup(5)}
                bgColor="bg-yellow-400"
            />
        </div>
    );
};