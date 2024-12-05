import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ChevronRight, Plus, GripVertical } from 'lucide-react';

import { SortableHospitalRow } from './SortableHospitalRow';

export const HospitalList = ({ hospitalsData, setHospitalsData }) => {

    const [expandedGroups, setExpandedGroups] = useState(true);
    const [expandedHospitals, setExpandedHospitals] = useState({});
    const [editingCell, setEditingCell] = useState(null);

    const [key, setKey] = useState(0);  // เพิ่มตรงนี้

    useEffect(() => {
        // Force re-render once after mount
        setKey(prev => prev + 1);
    }, []);  // เพิ่มตรงนี้

    const handleCellEdit = (hospitalId, field, value) => {
        setHospitalsData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const hospitalIndex = newData.findIndex(s => s.id === hospitalId);
            if (hospitalIndex !== -1) {
                if (field === 'hospitals') {
                    newData[hospitalIndex][field] = value.split(',').map(h => h.trim());
                } else {
                    newData[hospitalIndex][field] = value;
                }
            }
            return newData;
        });
        setEditingCell(null);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedItems = Array.from(hospitalsData);
        const [removed] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removed);
        setHospitalsData(reorderedItems);
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
                                <h2 className="font-semibold">Hospitals Directory</h2>
                            </div>
                            <span className="text-sm text-gray-500 font-medium">
                                {hospitalsData.length}
                            </span>
                        </div>

                        {expandedGroups && (
                            <>
                                <div className="grid grid-cols-12 gap-4 px-6 py-2 border-b text-xs text-gray-500">
                                    <div className="col-span-3">Name</div>
                                    <div className="col-span-3">Address</div>
                                    <div className="col-span-2">Email</div>
                                    <div className="col-span-2">Tel</div>
                                    <div className="col-span-2">Notes</div>
                                </div>

                                <Droppable droppableId="hospitals-list" type="DEFAULT">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`divide-y divide-gray-200 ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
                                        >
                                            {hospitalsData.map((hospital, index) => (
                                                <SortableHospitalRow
                                                    key={hospital.id}
                                                    index={index}
                                                    hospital={{ ...hospital, index }}
                                                    isExpanded={expandedHospitals[hospital.id]}
                                                    setExpandedHospitals={setExpandedHospitals}
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
                                            const newHospital = {
                                                id: Date.now().toString(),
                                                name: 'New Hospital',
                                                address: '',  // แก้จาก hospitals
                                                email: '',
                                                tel: '',
                                                notes: '',
                                            };
                                            setHospitalsData(prev => [...prev, newHospital]);
                                        }}
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Add Hospital</span>
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