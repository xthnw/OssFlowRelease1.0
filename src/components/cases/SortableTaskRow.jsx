import React, { useState, useEffect, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { UserPlus, Check, GripVertical, ChevronRight, Plus, Briefcase, Users, Share2, Trash2 } from 'lucide-react';
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
    hoveredProject,
    setHoveredProject,
    hoveredMember,
    setHoveredMember,
    onShare,

}) => {
    const [activeDepartment, setActiveDepartment] = useState(null);
    const dropdownRef = useRef(null);

    const handleClick = (e, field) => {
        e.stopPropagation();
        setEditingCell({ taskId: task.id, field });
    };

    // เพิ่มฟังก์ชัน calculate workload percentage
    const calculateWorkloadPercentage = (member, deptRef) => {
        // นับจำนวนงานทั้งหมดในระบบ
        const totalTasks = deptRef.reduce((total, dept) => {
            return total + dept.members.reduce((memberTotal, m) => {
                return memberTotal + m.projects.reduce((projectTotal, p) => {
                    return projectTotal + p.tasks.length;
                }, 0);
            }, 0);
        }, 0);

        // นับจำนวนงานของ member
        const memberTasks = member.projects.reduce((total, project) => {
            return total + project.tasks.length;
        }, 0);

        // คำนวณเปอร์เซ็นต์
        return Math.round((memberTasks / totalTasks) * 100);
    };

    const renderAssigneeCell = () => {
        const isEditing = editingCell?.taskId === task.id && editingCell?.field === 'assignees';
        const [selectedMemberForDetails, setSelectedMemberForDetails] = useState(null);

        if (isEditing) {
            return (
                <div className="relative" ref={dropdownRef}>
                    <div className="flex -space-x-1">
                        {(task.assignees || []).map((assignee) => (
                            <div
                                key={assignee.id}
                                className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600"
                            >
                                {assignee.name.charAt(0)}
                            </div>
                        ))}
                    </div>

                    <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border flex">
                        {/* Department list */}
                        <div className="w-48 border-r">
                            {departmentReference.map((dept) => (
                                <div
                                    key={dept.id}
                                    className={`px-4 py-2.5 cursor-pointer flex items-center justify-between transition-colors ${activeDepartment === dept.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                                        }`}
                                    onClick={() => setActiveDepartment(dept.id)}
                                >
                                    <span className="text-xs text-gray-600">{dept.name}</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                            ))}
                        </div>

                        {/* Members list */}
                        {activeDepartment && (
                            <div className="w-48 border-r">
                                {departmentReference
                                    .find(d => d.id === activeDepartment)
                                    ?.members.map((member) => {
                                        const isSelected = task.assignees?.some(a => a.id === member.id);
                                        return (
                                            <div
                                                key={member.id}
                                                className={`px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors ${isSelected ? '' : ''
                                                    }`}
                                                onClick={() => setSelectedMemberForDetails(member)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-600">{member.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}

                        {selectedMemberForDetails && (
                            <div className="w-96 py-2 bg-white border-l">
                                <div className="px-4 pb-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="text-sm font-medium">{selectedMemberForDetails.name}</div>
                                        <div className="flex items-center gap-2">
                                            {/* เพิ่มปุ่ม assign */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const isSelected = task.assignees?.some(a => a.id === selectedMemberForDetails.id);
                                                    const newAssignees = isSelected
                                                        ? task.assignees.filter(a => a.id !== selectedMemberForDetails.id)
                                                        : [...(task.assignees || []), selectedMemberForDetails];
                                                    handleAssigneeUpdate(task.id, newAssignees, status);
                                                }}
                                                className={`px-3 py-1 rounded-md text-xs transition-colors ${task.assignees?.some(a => a.id === selectedMemberForDetails.id)
                                                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {task.assignees?.some(a => a.id === selectedMemberForDetails.id) ? 'Assigned ✓' : 'Assign'}
                                            </button>
                                            {/* Workload percentage */}
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500">
                                                    {calculateWorkloadPercentage(selectedMemberForDetails, departmentReference)}%
                                                </span>
                                                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-500"
                                                        style={{
                                                            width: `${calculateWorkloadPercentage(selectedMemberForDetails, departmentReference)}%`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Briefcase size={16} />
                                            <span>{selectedMemberForDetails.projects.reduce((total, proj) => total + proj.tasks.length, 0)} งาน</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users size={16} />
                                            <span>{selectedMemberForDetails.projects.length} โครงการ</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8 px-4">
                                    {selectedMemberForDetails.projects.map(project => (
                                        <div
                                            key={project.id}
                                            className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                                            onMouseEnter={() => setHoveredProject(project)}
                                            onMouseLeave={() => setHoveredProject(null)}
                                        >
                                            <div className="flex flex-col gap-2">
                                                <span className="font-medium text-xs">{project.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 flex-grow bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500 transition-all duration-300"
                                                            style={{ width: `${project.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-gray-500">{project.progress}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tasks list */}
                        {hoveredProject && (
                            <div className="w-72 py-2 bg-white border-l">
                                <div className="px-4 pb-2">
                                    <div className="text-md font-medium">งานที่รับผิดชอบ</div>
                                </div>
                                <div className="space-y-2 px-4">
                                    {hoveredProject.tasks.map(task => (
                                        <div
                                            key={task.id}
                                            className="p-3 bg-gray-50 rounded-lg text-xs cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                            {task.name}
                                        </div>
                                    ))}
                                </div>
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

                        <div className="col-span-2 flex items-center">
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
                        {/* เพิ่ม Actions column */}
                        <div className="col-span-1 flex items-center gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(task.id);
                                }}
                                className="p-1 hover:bg-gray-200 rounded"
                            >
                                <Trash2 size={14} className="text-gray-600 hover:text-red-500" />
                            </button>
                            {!isSubtask && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onShare(task.id);
                                    }}
                                    className="p-1 hover:bg-gray-200 rounded"
                                >
                                    <Share2 size={14} className="text-gray-600" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};