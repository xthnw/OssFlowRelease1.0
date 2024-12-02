import React, { useState, useEffect, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { UserPlus, Check, GripVertical, ChevronRight } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const SortableTaskCard = ({
    task,
    index,
    editingCell,
    setEditingCell,
    handleCellEdit,
    handleDateUpdate,
    departmentReference,
    handleAssigneeUpdate,
    status
}) => {

    const [activeDepartment, setActiveDepartment] = useState(null);
    const dropdownRef = useRef(null);

    const handleClick = (e, field) => {
        e.stopPropagation();
        setEditingCell({ taskId: task.id, field });
    };

    // เพิ่ม event handlers สำหรับการกด Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && editingCell?.field === 'assignees') {
                setEditingCell(null);
                setActiveDepartment(null);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [editingCell]);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setEditingCell(null);
                setActiveDepartment(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const renderAssigneeCell = () => {
        const isEditing = editingCell?.taskId === task.id && editingCell?.field === 'assignees';

        if (isEditing) {
            return (
                <div className="relative" ref={dropdownRef}>
                    <div className="flex -space-x-1 cursor-pointer">
                        {(task.assignees || []).map((assignee) => (
                            <div
                                key={assignee.id}
                                className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600"
                            >
                                {assignee.name.charAt(0)}
                            </div>
                        ))}
                    </div>

                    <div className="absolute z-50 mt-1 bg-white rounded-md shadow-lg border flex">
                        {/* Department list */}
                        <div className="w-48 border-r">
                            {departmentReference.map((dept) => (
                                <div
                                    key={dept.id}
                                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${activeDepartment === dept.id ? 'bg-gray-100' : ''
                                        }`}
                                    onClick={() => setActiveDepartment(dept.id)}
                                >
                                    <span>{dept.name}</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                            ))}
                        </div>

                        {/* Members list */}
                        {activeDepartment && (
                            <div className="w-48 py-1">
                                {departmentReference
                                    .find(d => d.id === activeDepartment)
                                    ?.members.map((member) => {
                                        const isSelected = task.assignees?.some(a => a.id === member.id);
                                        return (
                                            <div
                                                key={member.id}
                                                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${isSelected ? 'bg-blue-50' : ''
                                                    }`}
                                                onClick={(e) => {
                                                    const newAssignees = isSelected
                                                        ? task.assignees.filter(a => a.id !== member.id)
                                                        : [...(task.assignees || []), member];
                                                    handleAssigneeUpdate(task.id, newAssignees, status);
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <span>{member.name}</span>
                                                {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div
                className="flex -space-x-1"
                onClick={(e) => {
                    e.stopPropagation();
                    setEditingCell({ taskId: task.id, field: 'assignees' });
                    setActiveDepartment(departmentReference[0].id);
                }}
            >
                {task.assignees?.length > 0 ? (
                    task.assignees.map((assignee) => (
                        <div
                            key={assignee.id}
                            className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600"
                        >
                            {assignee.name.charAt(0)}
                        </div>
                    ))
                ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600">
                        <UserPlus className="w-3.5 h-3.5" />
                    </div>
                )}
            </div>
        );
    };

    const renderDateCell = () => {
        const isEditing = editingCell?.taskId === task.id && editingCell?.field === 'dueDate';
        const date = task.dueDate ? new Date(task.dueDate) : null;

        if (isEditing) {
            return (
                <div onClick={e => e.stopPropagation()}>
                    <DatePicker
                        selected={date}
                        onChange={(selectedDate) => {
                            const adjustedDate = new Date(selectedDate);
                            adjustedDate.setHours(12);
                            handleDateUpdate(task.id, adjustedDate.toISOString().split('T')[0], status);
                            setEditingCell(null);
                        }}
                        dateFormat="yyyy-MM-dd"
                        className="w-32 px-1 py-0.5 text-xs border rounded"
                        autoFocus
                        onClickOutside={() => setEditingCell(null)}
                    />
                </div>
            );
        }

        return (
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    setEditingCell({ taskId: task.id, field: 'dueDate' });
                }}
                className="text-xs text-blue-600 cursor-pointer"
            >
                {date ? date.toLocaleDateString() : "-"}
            </span>
        );
    };

    const renderEditableCell = (field, content) => {
        const isEditing = editingCell?.taskId === task.id && editingCell?.field === field;

        if (isEditing) {
            return (
                <input
                    className="w-full px-1 py-0.5 text-xs border rounded focus:outline-none focus:ring-0 focus:border-gray-300 bg-white"
                    defaultValue={content}
                    autoFocus
                    onBlur={(e) => handleCellEdit(task.id, field, e.target.value, status)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleCellEdit(task.id, field, e.target.value, status);
                        } else if (e.key === 'Escape') {
                            setEditingCell(null);
                        }
                    }}
                    onClick={e => e.stopPropagation()}
                />
            );
        }

        return (
            <span
                onClick={(e) => handleClick(e, field)}
                className="block truncate cursor-text text-xs"
            >
                {content || '-'}
            </span>
        );
    };

    return (
        <Draggable
            draggableId={`task-${task.id}`}
            index={index}
            isDragDisabled={!!editingCell}
            type="BOARD_TASK"
        >
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm mb-2"
                >
                    <div className="p-3">
                        {/* Header with Task Code */}
                        <div className="mb-2 flex items-center space-x-2">
                            <div {...provided.dragHandleProps}>
                                <GripVertical className="w-4 h-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                            </div>
                            <div className="text-xs font-medium text-gray-900">
                                {renderEditableCell('taskCode', task.taskCode || '-')}
                            </div>
                        </div>

                        {/* Task Name */}
                        <div className="mb-3">
                            {renderEditableCell('name', task.name)}
                        </div>

                        {/* Assignees */}
                        <div className="mb-3">
                            {renderAssigneeCell()}
                        </div>

                        {/* Details Row */}
                        <div className="flex items-center justify-between text-xs">
                            {/* Due Date */}
                            <div className="text-blue-600">
                                {renderDateCell()}
                            </div>

                            {/* Hospital & Surgeon */}
                            <div className="flex flex-col items-end space-y-1">
                                <div className="text-gray-600">
                                    {renderEditableCell('hospital', task.hospital || '-')}
                                </div>
                                <div className="text-gray-600">
                                    {renderEditableCell('surgeon', task.surgeon || '-')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subtasks Counter */}
                    {task.subtasks?.length > 0 && (
                        <div className="border-t border-gray-100 px-3 py-2">
                            <div className="text-xs text-gray-500">
                                Subtasks: {task.subtasks.length}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
};