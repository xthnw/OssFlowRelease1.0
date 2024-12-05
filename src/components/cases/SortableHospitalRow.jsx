import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ChevronRight, Plus } from 'lucide-react';
import { GripVertical } from 'lucide-react';

export const SortableHospitalRow = ({
    hospital,
    index,
    editingCell,
    setEditingCell,
    handleCellEdit
}) => {

    const dropdownRef = useRef(null);

    const handleClick = (e, field) => {
        e.stopPropagation();
        setEditingCell({ hospitalId: hospital.id, field });
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


    const renderEditableCell = (field, content) => {
        const isEditing = editingCell?.hospitalId === hospital.id && editingCell?.field === field;

        if (isEditing) {
            return (
                <input
                    className="w-full px-1 py-0.5 text-xs border rounded focus:outline-none focus:ring-0 focus:border-gray-300"
                    defaultValue={content}
                    autoFocus
                    onBlur={(e) => handleCellEdit(hospital.id, field, e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleCellEdit(hospital.id, field, e.target.value);
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
                onClick={() => setEditingCell({ hospitalId: hospital.id, field })}
                className="block truncate cursor-text text-xs text-gray-700"
            >
                {content || '-'}
            </span>
        );
    };

    return (
        <Draggable draggableId={hospital.id} index={index} isDragDisabled={!!editingCell}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`grid grid-cols-12 gap-4 px-6 py-1.5 ${snapshot.isDragging ? 'bg-blue-50' : 'hover:bg-gray-50'} min-h-[36px]`}
                >
                    <div className="col-span-3 flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-grab hover:text-gray-600 active:cursor-grabbing" />
                        {renderEditableCell('name', hospital.name)}
                    </div>
                    <div className="col-span-3 flex items-center">
                        {renderEditableCell('address', hospital.address)}
                    </div>
                    <div className="col-span-2 flex items-center">
                        {renderEditableCell('email', hospital.email)}
                    </div>
                    <div className="col-span-2 flex items-center">
                        {renderEditableCell('tel', hospital.tel)}
                    </div>
                    <div className="col-span-2 flex items-center">
                        {renderEditableCell('notes', hospital.notes)}
                    </div>
                </div>
            )}
        </Draggable>
    );
};