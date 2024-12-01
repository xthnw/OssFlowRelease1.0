import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ChevronRight, ChevronDown, Plus, UserPlus, Check, GripVertical } from 'lucide-react';
import { TASKS_DATA } from '../../data/tasksData';

// แยก SortableTaskRow เป็น component แยก
import { SortableTaskRow } from './SortableTaskRow';

export const ListView = () => {
    const [tasksData, setTasksData] = useState(TASKS_DATA);
    const [expandedTasks, setExpandedTasks] = useState({});
    const [expandedGroups, setExpandedGroups] = useState(() => {
        const initialExpanded = {};
        Object.keys(TASKS_DATA).forEach(status => {
            initialExpanded[status] = true;
        });
        return initialExpanded;
    });
    const [completedTasks, setCompletedTasks] = useState({});
    const [editingCell, setEditingCell] = useState(null);
    const [key, setKey] = useState(0);

    const [assigneeReference, setAssigneeReference] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Bob Johnson' },
        // Add more reference data as needed
    ]);

    const [departmentReference] = useState([
        {
            id: 1,
            name: 'Design',
            members: [
                { id: 1, name: 'John Design' },
                { id: 2, name: 'Jane Designer' },
            ]
        },
        {
            id: 2,
            name: 'Polymer Production',
            members: [
                { id: 3, name: 'Bob Polymer' },
                { id: 4, name: 'Alice Production' },
            ]
        },
        {
            id: 3,
            name: 'Metal Production',
            members: [
                { id: 5, name: 'Charlie Metal' },
                { id: 6, name: 'David Steel' },
            ]
        },
        {
            id: 4,
            name: 'QA/QC',
            members: [
                { id: 7, name: 'Eva Quality' },
                { id: 8, name: 'Frank Control' },
            ]
        },
        {
            id: 5,
            name: 'Packaging',
            members: [
                { id: 9, name: 'Grace Pack' },
                { id: 10, name: 'Henry Box' },
            ]
        },
        {
            id: 6,
            name: 'Delivery',
            members: [
                { id: 11, name: 'Ian Delivery' },
                { id: 12, name: 'Jack Transport' },
            ]
        }
    ]);

    useEffect(() => {
        // Force re-render once after mount to properly register drag-drop areas
        setKey(prev => prev + 1);
    }, []);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination, draggableId, type } = result;
        const sourceStatus = source.droppableId.split('::')[0];
        const destStatus = destination.droppableId.split('::')[0];

        // Create deep copy of data
        const newData = JSON.parse(JSON.stringify(tasksData));

        if (type === 'task') {
            // Extract pure id from draggableId (remove 'task-' prefix)
            const taskId = draggableId.split('-')[1];
            const [movedTask] = newData[sourceStatus].splice(source.index, 1);

            if (sourceStatus === destStatus) {
                newData[destStatus].splice(destination.index, 0, movedTask);
            } else {
                movedTask.status = destStatus;
                newData[destStatus].splice(destination.index, 0, movedTask);
            }
        } else {
            // Handle subtask dragging
            const sourceParentId = source.droppableId.split('::')[1];
            const destParentId = destination.droppableId.split('::')[1];
            const subtaskId = draggableId.split('-')[1]; // Extract pure id

            // Find source parent task and remove subtask
            // const sourceTask = newData[sourceStatus].find(t => t.id === sourceParentId);
            const sourceTask = newData[sourceStatus].find(t => t.id === sourceParentId.replace('task-', ''));
            const subtaskIndex = sourceTask.subtasks.findIndex(st => st.id === subtaskId);
            const [subtask] = sourceTask.subtasks.splice(subtaskIndex, 1);

            if (destParentId === 'root') {
                // Convert subtask to main task
                const newTask = {
                    ...subtask,
                    id: Date.now().toString(), // Use pure id
                    subtasks: []
                };
                newData[destStatus].splice(destination.index, 0, newTask);
            } else {
                // Move to another task as subtask
                const destTask = newData[destStatus].find(t => t.id === destParentId);
                destTask.subtasks.splice(destination.index, 0, subtask);
            }
        }

        setTasksData(newData);
    };

    const handleCellEdit = (taskId, field, value, status) => {
        setTasksData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const taskList = newData[status];
            const taskIndex = taskList.findIndex(t => t.id === taskId);

            if (taskIndex !== -1) {
                taskList[taskIndex][field] = value;
            } else {
                // Check in subtasks
                for (const task of taskList) {
                    const subtaskIndex = task.subtasks?.findIndex(st => st.id === taskId);
                    if (subtaskIndex !== -1) {
                        task.subtasks[subtaskIndex][field] = value;
                        break;
                    }
                }
            }

            return newData;
        });
        setEditingCell(null);
    };

    const handleAssigneeUpdate = (taskId, newAssignees, status) => {
        setTasksData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const taskList = newData[status];
            const taskIndex = taskList.findIndex(t => t.id === taskId);

            if (taskIndex !== -1) {
                taskList[taskIndex].assignees = newAssignees;
            } else {
                // Check in subtasks
                for (const task of taskList) {
                    const subtaskIndex = task.subtasks?.findIndex(st => st.id === taskId);
                    if (subtaskIndex !== -1) {
                        task.subtasks[subtaskIndex].assignees = newAssignees;
                        break;
                    }
                }
            }

            return newData;
        });
        setEditingCell(null);
    };

    const handleDateUpdate = (taskId, newDate, status) => {
        setTasksData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const taskList = newData[status];
            const taskIndex = taskList.findIndex(t => t.id === taskId);

            if (taskIndex !== -1) {
                taskList[taskIndex].dueDate = newDate;
            } else {
                // Check in subtasks
                for (const task of taskList) {
                    const subtaskIndex = task.subtasks?.findIndex(st => st.id === taskId);
                    if (subtaskIndex !== -1) {
                        task.subtasks[subtaskIndex].dueDate = newDate;
                        break;
                    }
                }
            }

            return newData;
        });
        setEditingCell(null);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div key={key} className="flex-1 p-6 bg-white overflow-y-scroll scrollbar">
                <div className="space-y-4">
                    {Object.entries(tasksData).map(([status, tasks]) => (
                        <div
                            key={status}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                        >
                            <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <ChevronRight
                                        className={`w-5 h-5 text-gray-500 cursor-pointer transform ${expandedGroups[status] ? "rotate-90" : ""
                                            }`}
                                        onClick={() =>
                                            setExpandedGroups((prev) => ({
                                                ...prev,
                                                [status]: !prev[status],
                                            }))
                                        }
                                    />
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className="w-5 h-5 rounded-full"
                                            style={{
                                                background:
                                                    status === "PLANNING AND DESIGN"
                                                        ? "#FFD700"
                                                        : "#E5E7EB",
                                                opacity: 0.7,
                                            }}
                                        />
                                        <span className="font-semibold text-gray-800">{status}</span>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500 font-medium">
                                    {tasks.length}
                                </span>
                            </div>

                            {expandedGroups[status] && (
                                <>
                                    <div className="grid grid-cols-12 gap-4 px-6 py-2 border-b text-xs text-gray-500">
                                        <div className="col-span-4">Name</div>
                                        <div className="col-span-3">Assignee</div>
                                        <div className="col-span-1">Due date</div>
                                        <div className="col-span-1">Comments</div>
                                        <div className="col-span-1">Task Code</div>
                                        <div className="col-span-1">Surgeons</div>
                                        <div className="col-span-1">Hospitals</div>
                                    </div>

                                    <Droppable droppableId={status} type="task">
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className={`divide-y divide-gray-200 ${snapshot.isDraggingOver ? 'bg-blue-50' : ''
                                                    }`}
                                            >
                                                {tasks.map((task, index) => (
                                                    <React.Fragment key={task.id}>
                                                        <SortableTaskRow
                                                            task={{ ...task, index }}
                                                            status={status}
                                                            isCompleted={completedTasks[task.id]}
                                                            expandedTasks={expandedTasks}
                                                            setExpandedTasks={setExpandedTasks}
                                                            setCompletedTasks={setCompletedTasks}
                                                            editingCell={editingCell}           // เพิ่มบรรทัดนี้
                                                            setEditingCell={setEditingCell}     // เพิ่มบรรทัดนี้
                                                            handleCellEdit={handleCellEdit}
                                                            handleDateUpdate={handleDateUpdate}
                                                            departmentReference={departmentReference}
                                                            handleAssigneeUpdate={handleAssigneeUpdate}
                                                        />
                                                        {expandedTasks[task.id] && task.subtasks?.length > 0 && (
                                                            <Droppable
                                                                droppableId={`${status}::${task.id}`}
                                                                type="subtask"
                                                            >
                                                                {(providedSubtask, snapshotSubtask) => (
                                                                    <div
                                                                        ref={providedSubtask.innerRef}
                                                                        {...providedSubtask.droppableProps}
                                                                        className={`bg-gray-50 ${snapshotSubtask.isDraggingOver ? 'bg-blue-50' : ''
                                                                            }`}
                                                                    >
                                                                        {task.subtasks?.map((subtask, subtaskIndex) => (
                                                                            <SortableTaskRow
                                                                                key={subtask.id}
                                                                                task={{ ...subtask, index: subtaskIndex }}
                                                                                status={status}
                                                                                isSubtask
                                                                                isCompleted={completedTasks[subtask.id]}
                                                                                expandedTasks={expandedTasks}
                                                                                setExpandedTasks={setExpandedTasks}
                                                                                setCompletedTasks={setCompletedTasks}
                                                                                parentId={task.id}
                                                                                editingCell={editingCell}           // เพิ่มบรรทัดนี้
                                                                                setEditingCell={setEditingCell}     // เพิ่มบรรทัดนี้
                                                                                handleCellEdit={handleCellEdit}
                                                                                handleDateUpdate={handleDateUpdate}
                                                                                departmentReference={departmentReference}
                                                                                handleAssigneeUpdate={handleAssigneeUpdate}
                                                                            />
                                                                        ))}
                                                                        {providedSubtask.placeholder}
                                                                    </div>
                                                                )}
                                                            </Droppable>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>

                                    <div className="p-2">
                                        <button className="flex items-center space-x-1 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-md w-full">
                                            <Plus className="w-4 h-4" />
                                            <span>Add Task</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </DragDropContext>
    );
};