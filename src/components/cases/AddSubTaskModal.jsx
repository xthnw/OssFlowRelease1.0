import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export const AddSubTaskModal = ({ isOpen, onClose, templates, selectedTaskId }) => {
    const [activeTab, setActiveTab] = useState('template');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-15 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-md font-normal">Add Task</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex border-b">
                    <button
                        className={`px-4 py-2 ${activeTab === 'template' ? 'border-b-2 border-teal-500 text-teal-500' : 'text-gray-500'} text-sm`}
                        onClick={() => setActiveTab('template')}
                    >
                        Use Template
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'single' ? 'border-b-2 border-teal-500 text-teal-500' : 'text-gray-500'} text-sm`}
                        onClick={() => setActiveTab('single')}
                    >
                        Single Task
                    </button>
                </div>

                <div className="p-4">
                    {activeTab === 'template' ? (
                        <div className="space-y-4">
                            <select className="w-full border rounded-md px-3 py-2 text-sm">
                                <option value="">Select Template Set</option>
                                {templates.map(template => (
                                    <option key={template.id} value={template.id}>{template.name}</option>
                                ))}
                            </select>
                            
                            <div className="border rounded-lg p-4 mt-4">
                                <h3 className="font-medium mb-2 text-sm">Template Contents:</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {templates[0]?.subtasks.map((subtask, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-400" />
                                            {subtask}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Task Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    placeholder="Enter task name"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-2 p-4 border-t">
                    <button
                        className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 text-sm">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};