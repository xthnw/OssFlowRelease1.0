import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ChevronRight, Plus, GripVertical } from 'lucide-react';

import { SortableSurgeonRow } from './SortableSurgeonRow';

export const SurgeonList = ({ surgeonsData, setSurgeonsData }) => {

    const [expandedGroups, setExpandedGroups] = useState(true);
    const [expandedSurgeons, setExpandedSurgeons] = useState({});
    const [editingCell, setEditingCell] = useState(null);

    const [key, setKey] = useState(0);  // เพิ่มตรงนี้

    useEffect(() => {
        // Force re-render once after mount
        setKey(prev => prev + 1);
    }, []);  // เพิ่มตรงนี้

    const handleCellEdit = (surgeonId, field, value) => {
        setSurgeonsData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const surgeonIndex = newData.findIndex(s => s.id === surgeonId);
            if (surgeonIndex !== -1) {
                if (field === 'hospitals') {
                    newData[surgeonIndex][field] = value.split(',').map(h => h.trim());
                } else {
                    newData[surgeonIndex][field] = value;
                }
            }
            return newData;
        });
        setEditingCell(null);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedItems = Array.from(surgeonsData);
        const [removed] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removed);
        setSurgeonsData(reorderedItems);
    };
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div key={key} className="flex-1 p-6 bg-white overflow-y-scroll scrollbar">
                <div className="space-y-4">
                    <div className="bg-white rounded-lg py-2 border border-gray-200">
                        <div className="flex items-center justify-between px-4 py-2.5 border-b">
                            <div className="flex items-center space-x-3">
                                <ChevronRight
                                    className={`w-5 h-5 cursor-pointer transform ${expandedGroups ? "rotate-90" : ""
                                        }`}
                                    onClick={() => setExpandedGroups(!expandedGroups)}
                                />
                                <h2 className="font-semibold">Surgeons Directory</h2>
                            </div>
                            <span className="text-sm text-gray-500 font-medium">
                                {surgeonsData.length}
                            </span>
                        </div>

                        {expandedGroups && (
                            <>
                                <div className="grid grid-cols-12 gap-4 px-6 py-2 border-b text-xs text-gray-500">
                                    <div className="col-span-3">Name</div>
                                    <div className="col-span-3">Hospitals</div>
                                    <div className="col-span-2">Email</div>
                                    <div className="col-span-2">Tel</div>
                                    <div className="col-span-2">Notes</div>
                                </div>

                                <Droppable droppableId="surgeons-list" type="DEFAULT">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`divide-y divide-gray-200 ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
                                        >
                                            {surgeonsData.map((surgeon, index) => (
                                                <SortableSurgeonRow
                                                    key={surgeon.id}
                                                    index={index}
                                                    surgeon={{ ...surgeon, index }}
                                                    isExpanded={expandedSurgeons[surgeon.id]}
                                                    setExpandedSurgeons={setExpandedSurgeons}
                                                    editingCell={editingCell}
                                                    setEditingCell={setEditingCell}
                                                    handleCellEdit={handleCellEdit}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                                <div className="p-2">
                                    <button
                                        className="flex items-center space-x-1 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-md w-full"
                                        onClick={() => {
                                            const newSurgeon = {
                                                id: Date.now().toString(),
                                                name: 'New Surgeon',
                                                hospitals: [],
                                                email: '',
                                                tel: '',
                                                notes: '',
                                                subtasks: []
                                            };
                                            setSurgeonsData(prev => [...prev, newSurgeon]);
                                        }}
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Add Surgeon</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
};