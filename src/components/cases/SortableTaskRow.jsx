import React, { useState, useEffect, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { UserPlus, Check, GripVertical, ChevronRight, Plus } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const SortableTaskRow = ({
    task,
    isSubtask = false,
    isCompleted,
    expandedTasks,
    setExpandedTasks,
    setCompletedTasks,
    parentId,
    status,
    editingCell,
    setEditingCell,
    handleCellEdit,
    handleDateUpdate,
    departmentReference,
    handleAssigneeUpdate,
    showDatePicker,
    setShowDatePicker,
}) => {
    const [activeDepartment, setActiveDepartment] = useState(null);
    const dropdownRef = useRef(null);

    const handleClick = (e, field) => {
        e.stopPropagation();
        setEditingCell({ taskId: task.id, field });
    };

    const renderAssigneeCell = () => {
        const isEditing = editingCell?.taskId === task.id && editingCell?.field === 'assignees';

        if (isEditing) {
            return (
                <div className="relative h-full" ref={dropdownRef}>
                    <div
                        className="flex -space-x-1 cursor-pointer"
                    >
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

                        {/* Members list - shows when department is selected */}
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
                                                    // ไม่ปิด dropdown หลังจากเลือก
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
                className="h-full flex items-center"
                onClick={(e) => {
                    e.stopPropagation();
                    setEditingCell({ taskId: task.id, field: 'assignees' });
                    setActiveDepartment(departmentReference[0].id);
                }}
            >
                {task.assignees?.length > 0 ? (
                    <div className="flex -space-x-1">
                        {task.assignees.map((assignee) => (
                            <div
                                key={assignee.id}
                                className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600"
                            >
                                {assignee.name.charAt(0)}
                            </div>
                        ))}
                    </div>
                ) : (
                    // แก้ตรงนี้ให้เหลือแค่ icon อย่างเดียว ไม่มีข้อความ
                    <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600">
                        <UserPlus className="w-3.5 h-3.5" />
                    </div>
                )}
            </div>
        );
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

    // แก้ไข click outside handler
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
                className="block truncate cursor-text text-xs text-teal-600"
            >
                {date ? date.toLocaleDateString() : "-"}
            </span>
        );
    };

    const renderEditableCell = (field, content, width = 'auto') => {
        const isEditing = editingCell?.taskId === task.id && editingCell?.field === field;

        if (isEditing) {
            return (
                <div className="flex-1 h-full">
                    <input
                        className="w-full px-1 py-0.5 text-xs border rounded focus:outline-none focus:ring-0 focus:border-gray-300 bg-white"
                        style={{
                            fontFamily: 'inherit',
                            lineHeight: 'inherit',
                            WebkitTapHighlightColor: 'transparent', // ลบ highlight สีฟ้า
                        }}
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
                </div>
            );
        }

        return (
            <span
                onClick={(e) => handleClick(e, field)}
                className="block truncate cursor-text text-xs text-gray-700"
                style={{ width }}
            >
                {content || '-'}
            </span>
        );
    };

    return (
        <Draggable draggableId={`${isSubtask ? 'subtask' : 'task'}-${task.id}`} index={task.index || 0} isDragDisabled={!!editingCell}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div
                        className={`grid grid-cols-12 gap-4 px-6 py-1.5 hover:bg-gray-50 min-h-[36px] ${isSubtask ? "bg-white" : ""
                            }`}
                    >
                        <div className="col-span-4 flex items-center min-w-0">
                            <div
                                className={`flex items-center space-x-3 ${isSubtask ? "pl-14" : ""} min-w-0 overflow-hidden relative w-full`}
                            >
                                <GripVertical className="flex-shrink-0 w-4 h-4 text-gray-400 cursor-grab hover:text-gray-600 active:cursor-grabbing" />
                                {!isSubtask && (
                                    <ChevronRight
                                        className={`flex-shrink-0 w-4 h-4 text-gray-400 cursor-pointer transform ${expandedTasks[task.id] ? "rotate-90" : ""
                                            }`}
                                        onClick={() =>
                                            setExpandedTasks((prev) => ({
                                                ...prev,
                                                [task.id]: !prev[task.id],
                                            }))
                                        }
                                    />
                                )}
                                <div
                                    className="flex-shrink-0 w-4 h-4 rounded-full border-2 cursor-pointer flex items-center justify-center"
                                    style={{
                                        backgroundColor: isCompleted ? "#0D9488" : "transparent",
                                        borderColor: isCompleted ? "#0D9488" : "#D1D5DB",
                                    }}
                                    onClick={() =>
                                        setCompletedTasks((prev) => ({
                                            ...prev,
                                            [task.id]: !prev[task.id],
                                        }))
                                    }
                                >
                                    {isCompleted && (
                                        <Check
                                            className="w-[10px] h-[10px] text-white"
                                            style={{
                                                strokeWidth: 3,
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0"> {/* Wrapper for name */}
                                    {renderEditableCell('name', task.name)}
                                </div>
                                {task.tag && (
                                    <span className="flex-shrink-0 px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded text-xs whitespace-nowrap">
                                        {task.tag}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="col-span-3 flex items-center">
                            {renderAssigneeCell()}
                        </div>
                        <div className="col-span-1 text-xs text-teal-600 flex items-center">
                            {renderDateCell()}
                        </div>
                        <div className="col-span-1 text-xs text-gray-500 flex items-center">
                            {renderEditableCell('comments', task.comments || '-')}
                        </div>
                        <div className="col-span-1 text-xs font-medium text-gray-900 flex items-center">
                            {renderEditableCell('taskCode', task.taskCode || '-')}
                        </div>
                        <div className="col-span-1 text-xs text-gray-600 truncate flex items-center">
                            {renderEditableCell('surgeon', task.surgeon || '-')}
                        </div>
                        <div className="col-span-1 text-xs text-gray-600 truncate flex items-center">
                            {renderEditableCell('hospital', task.hospital || '-')}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};