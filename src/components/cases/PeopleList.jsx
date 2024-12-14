import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ChevronRight, Plus, GripVertical } from 'lucide-react';

import { SortablePeopleRow } from './SortablePeopleRow';

export const PeopleList = ({ teamsData, setTeamsData }) => {
    const [expandedGroups, setExpandedGroups] = useState(true);
    const [expandedTeams, setExpandedTeams] = useState({});
    const [editingCell, setEditingCell] = useState(null);
    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prev => prev + 1);
    }, []);

    const handleCellEdit = (teamId, field, value) => {
        setTeamsData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const teamIndex = newData.findIndex(s => s.id === teamId);
            if (teamIndex !== -1) {
                newData[teamIndex][field] = value;
            }
            return newData;
        });
        setEditingCell(null);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedItems = Array.from(teamsData);
        const [removed] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removed);
        setTeamsData(reorderedItems);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div key={key} className="flex-1 p-6 bg-white overflow-y-scroll scrollbar">
                <div className="space-y-4">
                    <div className="bg-white rounded-lg py-2 border border-gray-200">
                        <div className="flex items-center justify-between px-4 py-2.5 border-b">
                            <div className="flex items-center space-x-3">
                                <ChevronRight
                                    className={`w-5 h-5 cursor-pointer transform ${expandedGroups ? "rotate-90" : ""}`}
                                    onClick={() => setExpandedGroups(!expandedGroups)}
                                />
                                <h2 className="font-semibold">Team Directory</h2>
                            </div>
                            <span className="text-sm text-gray-500 font-medium">
                                {teamsData.length}
                            </span>
                        </div>

                        {expandedGroups && (
                            <>
                                <div className="grid grid-cols-12 gap-4 px-6 py-2 border-b text-xs text-gray-500">
                                    <div className="col-span-2">Name</div>
                                    <div className="col-span-2">Email</div>
                                    <div className="col-span-2">Phone</div>
                                    <div className="col-span-2">Department</div>
                                    <div className="col-span-2">Job Description</div>
                                    <div className="col-span-2">Profile</div>
                                </div>

                                <Droppable droppableId="teams-list" type="DEFAULT">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`divide-y divide-gray-200 ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
                                        >
                                            {teamsData.map((team, index) => (
                                                <SortablePeopleRow
                                                    key={team.id}
                                                    index={index}
                                                    team={{ ...team, index }}
                                                    isExpanded={expandedTeams[team.id]}
                                                    setExpandedTeams={setExpandedTeams}
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
                                            const newTeam = {
                                                id: Date.now().toString(),
                                                name: 'New Member',
                                                email: '',
                                                phone: '',
                                                department: '',
                                                jobDescription: '',
                                                profile: '',
                                            };
                                            setTeamsData(prev => [...prev, newTeam]);
                                        }}
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Add Member</span>
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