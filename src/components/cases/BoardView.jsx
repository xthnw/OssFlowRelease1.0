import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Plus } from 'lucide-react';
import { SortableTaskCard } from './SortableTaskCard';

export const BoardView = ({ tasksData, setTasksData }) => {
    const [editingCell, setEditingCell] = useState(null);

    const [key, setKey] = useState(0);  // เพิ่มตรงนี้

    useEffect(() => {
        // Force re-render once after mount
        setKey(prev => prev + 1);
    }, []);  // เพิ่มตรงนี้

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

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;
        const sourceStatus = source.droppableId;
        const destStatus = destination.droppableId;

        // Create deep copy of data
        const newData = JSON.parse(JSON.stringify(tasksData));

        // Extract pure id from draggableId (remove 'task-' prefix)
        const taskId = draggableId.split('-')[1];
        const [movedTask] = newData[sourceStatus].splice(source.index, 1);

        if (sourceStatus === destStatus) {
            newData[destStatus].splice(destination.index, 0, movedTask);
        } else {
            movedTask.status = destStatus;
            newData[destStatus].splice(destination.index, 0, movedTask);
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
            <div key={key} className="flex-1 p-6 overflow-y-scroll scrollbar">
                <div className="flex space-x-4 min-w-fit pb-4">
                    {Object.entries(tasksData).map(([status, tasks]) => (
                        <div key={status} className="w-80 flex-shrink-0">
                            <div className="bg-white rounded-lg border border-gray-200">
                                {/* Column Header */}
                                <div className="px-3 py-2 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{
                                                    background:
                                                        status === "PLANNING AND DESIGN"
                                                            ? "#FFD700"
                                                            : "#E5E7EB",
                                                }}
                                            />
                                            <span className="font-medium text-sm text-gray-800">
                                                {status}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-500">{tasks.length}</span>
                                    </div>
                                </div>

                                {/* Tasks List */}
                                <Droppable droppableId={status} type="BOARD_TASK">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`p-2 min-h-[200px] ${snapshot.isDraggingOver ? 'bg-blue-50' : ''
                                                }`}
                                        >
                                            {tasks.map((task, index) => (
                                                <SortableTaskCard
                                                    key={task.id}
                                                    task={task}
                                                    index={index}
                                                    status={status}
                                                    editingCell={editingCell}
                                                    setEditingCell={setEditingCell}
                                                    handleCellEdit={handleCellEdit}
                                                    handleDateUpdate={handleDateUpdate}
                                                    departmentReference={departmentReference}
                                                    handleAssigneeUpdate={handleAssigneeUpdate}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                                {/* Add Task Button */}
                                <div className="p-2 border-t border-gray-200">
                                    <button className="flex items-center justify-center space-x-1 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50 rounded-md w-full">
                                        <Plus className="w-4 h-4" />
                                        <span>Add Task</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DragDropContext>
    );
};