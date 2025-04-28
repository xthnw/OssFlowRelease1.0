import React, { useState } from 'react';
import { X, Plus, GripVertical, Trash2, Save } from 'lucide-react';

export const AddTaskModal = ({ isOpen, onClose, templates, setTemplates }) => {
    const [activeTab, setActiveTab] = useState('task');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-15 flex items-center justify-center z-50">

            <div className="bg-white rounded-lg w-full max-w-3xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-md font-semibold">Add New Case</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b">
                    <button
                        className={`px-4 py-2 ${activeTab === 'task' ? 'border-b-2 border-teal-500 text-teal-500' : 'text-gray-500'} text-sm`}
                        onClick={() => setActiveTab('task')}
                    >
                        Case
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'template' ? 'border-b-2 border-teal-500 text-teal-500' : 'text-gray-500'} text-sm`}
                        onClick={() => setActiveTab('template')}
                    >
                        Task Templates
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    {activeTab === 'task' ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-normal text-gray-700 mb-1 text-sm">
                                    Task Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    placeholder="Enter task name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-normal text-gray-700 mb-1 text-sm">
                                    Case ID
                                </label>
                                <input
                                    type="number"
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    placeholder="Enter case ID"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {templates.map((template, index) => (
                                <div key={template.id} className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <input
                                            type="text"
                                            value={template.name}
                                            className="font-normal border-none focus:ring-0 text-sm"
                                            onChange={(e) => {
                                                const newTemplates = [...templates];
                                                newTemplates[index].name = e.target.value;
                                                setTemplates(newTemplates);
                                            }}
                                        />
                                        <button className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {template.subtasks.map((subtask, subtaskIndex) => (
                                            <div key={subtaskIndex} className="flex items-center gap-2">
                                                <GripVertical className="text-gray-400" size={16} />
                                                <input
                                                    type="text"
                                                    value={subtask}
                                                    className="flex-1 border rounded px-2 py-1 text-sm"
                                                    onChange={(e) => {
                                                        const newTemplates = [...templates];
                                                        newTemplates[index].subtasks[subtaskIndex] = e.target.value;
                                                        setTemplates(newTemplates);
                                                    }}
                                                />
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => {
                                                        const newTemplates = [...templates];
                                                        newTemplates[index].subtasks.splice(subtaskIndex, 1);
                                                        setTemplates(newTemplates);
                                                    }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            className="flex items-center text-sm text-gray-500 hover:text-gray-700 mt-2"
                                            onClick={() => {
                                                const newTemplates = [...templates];
                                                newTemplates[index].subtasks.push("");
                                                setTemplates(newTemplates);
                                            }}
                                        >
                                            <Plus size={16} className="mr-1" />
                                            Add Task
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                                onClick={() => {
                                    setTemplates([
                                        ...templates,
                                        {
                                            id: templates.length + 1,
                                            name: `Set ${templates.length + 1}`,
                                            subtasks: []
                                        }
                                    ]);
                                }}
                            >
                                <Plus size={16} className="mr-1" />
                                Add Template Set
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 p-4 border-t">
                    <button
                        className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-teal-500 text-white text-sm rounded-md hover:bg-teal-600 flex items-center gap-2">
                        <Save size={16} />
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};