import React, { useState, useEffect, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GripVertical } from 'lucide-react';

export const SortablePeopleRow = ({
    team,
    index,
    editingCell,
    setEditingCell,
    handleCellEdit
}) => {
    const dropdownRef = useRef(null);

    const handleClick = (e, field) => {
        e.stopPropagation();
        setEditingCell({ teamId: team.id, field });
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && editingCell) {
                setEditingCell(null);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [editingCell]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setEditingCell(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const renderEditableCell = (field, content) => {
        const isEditing = editingCell?.teamId === team.id && editingCell?.field === field;

        if (field === 'profile') {
            return (
                <div className="flex items-center gap-2">
                    <img src={content} alt={team.name} className="w-6 h-6 rounded-full" />
                    {isEditing ? (
                        <input
                            className="w-full px-1 py-0.5 text-xs border rounded focus:outline-none focus:ring-0 focus:border-gray-300"
                            defaultValue={content}
                            autoFocus
                            onBlur={(e) => handleCellEdit(team.id, field, e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleCellEdit(team.id, field, e.target.value);
                                } else if (e.key === 'Escape') {
                                    setEditingCell(null);
                                }
                            }}
                            onClick={e => e.stopPropagation()}
                        />
                    ) : (
                        <span
                            onClick={() => setEditingCell({ teamId: team.id, field })}
                            className="block truncate cursor-text text-xs text-gray-700"
                        >
                            {content}
                        </span>
                    )}
                </div>
            );
        }

        if (isEditing) {
            return (
                <input
                    className="w-full px-1 py-0.5 text-xs border rounded focus:outline-none focus:ring-0 focus:border-gray-300"
                    defaultValue={content}
                    autoFocus
                    onBlur={(e) => handleCellEdit(team.id, field, e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleCellEdit(team.id, field, e.target.value);
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
                onClick={() => setEditingCell({ teamId: team.id, field })}
                className="block truncate cursor-text text-xs text-gray-700"
            >
                {content || '-'}
            </span>
        );
    };

    return (
        <Draggable draggableId={team.id} index={index} isDragDisabled={!!editingCell}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`grid grid-cols-12 gap-4 px-6 py-1.5 ${snapshot.isDragging ? 'bg-blue-50' : 'hover:bg-gray-50'} min-h-[36px]`}
                >
                    <div className="col-span-2 flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-grab hover:text-gray-600 active:cursor-grabbing" />
                        {renderEditableCell('name', team.name)}
                    </div>
                    <div className="col-span-2 flex items-center">
                        {renderEditableCell('email', team.email)}
                    </div>
                    <div className="col-span-2 flex items-center">
                        {renderEditableCell('phone', team.phone)}
                    </div>
                    <div className="col-span-2 flex items-center">
                        {renderEditableCell('department', team.department)}
                    </div>
                    <div className="col-span-2 flex items-center">
                        {renderEditableCell('jobDescription', team.jobDescription)}
                    </div>
                    <div className="col-span-2 flex items-center">
                        {renderEditableCell('profile', team.profile)}
                    </div>
                </div>
            )}
        </Draggable>
    );
};