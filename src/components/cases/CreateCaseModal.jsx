import React, { useState } from 'react';
import { X, MenuIcon, ChevronDown, User, Calendar, Building2 } from 'lucide-react';
import { MOCK_DATA } from '../../data/mockData';

export const CreateCaseModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "",
        assignee: null,
        dueDate: "",
        caseCode: "",
        surgeon: null,
        hospital: null,
    });
    const [showDescription, setShowDescription] = useState(false);
    const [error, setError] = useState("");

    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [showAssigneePopup, setShowAssigneePopup] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showSurgeonsPopup, setShowSurgeonsPopup] = useState(false);
    const [showHospitalsPopup, setShowHospitalsPopup] = useState(false);

    const handleCreate = () => {
        if (!formData.title.trim()) {
            setError("Please enter a case name");
            return;
        }
        console.log("Creating case:", formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[450px]">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-medium">Create Case</h2>
                    <X
                        className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer"
                        onClick={onClose}
                    />
                </div>

                {/* Modal Content */}
                <div className="p-4 space-y-4">
                    {/* Project Selection */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MenuIcon className="w-4 h-4" />
                        <span>Medical Device</span>
                        <ChevronDown className="w-4 h-4" />
                    </div>
                    {/* Case Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Case Name"
                            className={`w-full p-2 border ${error ? "border-red-500" : "border-gray-200"
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            value={formData.title}
                            onChange={(e) => {
                                setFormData((prev) => ({ ...prev, title: e.target.value }));
                                if (error) setError("");
                            }}
                        />
                        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                    </div>

                    {/* Description */}
                    {/* {!showDescription ? (
            <button
              className="flex items-center space-x-2 text-sm text-gray-500text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setShowDescription(true)}
            >
              + Add Description
            </button>
          ) : (
            <textarea
              placeholder="Add description..."
              className="w-full p-2 border border-gray-200 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          )} */}

                    <button
                        className="flex items-center space-x-2 text-sm text-gray-500"
                        onClick={() => setShowDescription(!showDescription)}
                    >
                        <input
                            type="checkbox"
                            checked={showDescription}
                            onChange={(e) => setShowDescription(e.target.checked)} // เพิ่มบรรทัดนี้
                            className="rounded"
                        />
                        <span>Add description</span>
                    </button>

                    {showDescription && (
                        <textarea
                            placeholder="Add description..."
                            className="w-full p-2 border border-gray-200 rounded-md"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                        />
                    )}

                    {/* Case Code Block */}
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
                        <div className="text-sm font-medium w-24">Case Code</div>
                        <input
                            type="text"
                            placeholder="Enter case code"
                            className="flex-1 p-1 border rounded-md text-sm"
                            value={formData.caseCode}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, caseCode: e.target.value }))
                            }
                        />
                    </div>

                    {/* Action Buttons and Fields */}
                    <div className="space-y-2">
                        <div className="flex space-x-2">
                            {/* Status Button */}
                            <div className="relative">
                                <button
                                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-600 w-36"
                                    onClick={() => setShowStatusPopup(!showStatusPopup)}
                                >
                                    <div className="truncate">{formData.status || "TODO"}</div>
                                </button>

                                {showStatusPopup && (
                                    <div className="absolute mt-1 bg-white rounded-lg shadow-lg border border-gray-200 w-56 z-50">
                                        <div className="p-2">
                                            <input
                                                type="text"
                                                placeholder="Search Statuses..."
                                                className="w-full px-2 py-1.5 text-sm border rounded-md"
                                            />
                                        </div>
                                        <div className="py-1">
                                            {MOCK_DATA.statuses.map((status) => (
                                                <button
                                                    key={status}
                                                    className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                                    onClick={() => {
                                                        setFormData((prev) => ({ ...prev, status }));
                                                        setShowStatusPopup(false);
                                                    }}
                                                >
                                                    <div
                                                        className={`w-2 h-2 rounded-full ${status === formData.status
                                                            ? "bg-blue-400"
                                                            : "bg-gray-400"
                                                            }`}
                                                    />
                                                    <span>{status}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Assignee Button */}
                            <div className="relative">
                                <button
                                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-600 flex items-center space-x-2"
                                    onClick={() => setShowAssigneePopup(!showAssigneePopup)}
                                >
                                    <User className="w-4 h-4" />
                                    <span>{formData.assignee?.name || "Assignee"}</span>
                                </button>

                                {showAssigneePopup && (
                                    <div className="absolute mt-1 bg-white rounded-lg shadow-lg border border-gray-200 w-48 z-50">
                                        <div className="p-2">
                                            <input
                                                type="text"
                                                placeholder="Search People..."
                                                className="w-full px-2 py-1.5 text-sm border rounded-md"
                                            />
                                        </div>
                                        <div className="py-1">
                                            {MOCK_DATA.assignees.map((assignee) => (
                                                <button
                                                    key={assignee.id}
                                                    className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                                    onClick={() => {
                                                        setFormData((prev) => ({ ...prev, assignee }));
                                                        setShowAssigneePopup(false);
                                                    }}
                                                >
                                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                                        {assignee.name.charAt(0)}
                                                    </div>
                                                    <span>{assignee.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Due Date Button */}
                            <div className="relative">
                                <button
                                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-600 flex items-center space-x-2"
                                    onClick={() => setShowDatePicker(!showDatePicker)}
                                >
                                    <Calendar className="w-4 h-4" />
                                    <span>{formData.dueDate || "Due date"}</span>
                                </button>

                                {showDatePicker && (
                                    <div className="absolute mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50">
                                        <input
                                            type="date"
                                            className="p-1 border rounded-md text-sm"
                                            value={formData.dueDate}
                                            onChange={(e) => {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    dueDate: e.target.value,
                                                }));
                                                setShowDatePicker(false);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Second Row */}
                        <div className="flex space-x-2">
                            {/* Case Code */}
                            <input
                                type="text"
                                placeholder="Case Code"
                                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-600 w-32"
                                value={formData.caseCode}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, caseCode: e.target.value }))
                                }
                            />

                            {/* Surgeons Button */}
                            <div className="relative">
                                <button
                                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-600 flex items-center space-x-2"
                                    onClick={() => setShowSurgeonsPopup(!showSurgeonsPopup)}
                                >
                                    <User className="w-4 h-4" />
                                    <span>{formData.surgeon?.name || "Surgeons"}</span>
                                </button>

                                {showSurgeonsPopup && (
                                    <div className="absolute mt-1 bg-white rounded-lg shadow-lg border border-gray-200 w-48 z-50">
                                        <div className="p-2">
                                            <input
                                                type="text"
                                                placeholder="Search Surgeons..."
                                                className="w-full px-2 py-1.5 text-sm border rounded-md"
                                            />
                                        </div>
                                        <div className="py-1">
                                            {MOCK_DATA.surgeons.map((surgeon) => (
                                                <button
                                                    key={surgeon.id}
                                                    className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                                    onClick={() => {
                                                        setFormData((prev) => ({ ...prev, surgeon }));
                                                        setShowSurgeonsPopup(false);
                                                    }}
                                                >
                                                    <span>{surgeon.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Hospitals Button */}
                            <div className="relative">
                                <button
                                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-600 flex items-center space-x-2"
                                    onClick={() => setShowHospitalsPopup(!showHospitalsPopup)}
                                >
                                    <Building2 className="w-4 h-4" />
                                    <span>{formData.hospital?.name || "Hospitals"}</span>
                                </button>

                                {showHospitalsPopup && (
                                    <div className="absolute mt-1 bg-white rounded-lg shadow-lg border border-gray-200 w-48 z-50">
                                        <div className="p-2">
                                            <input
                                                type="text"
                                                placeholder="Search Hospitals..."
                                                className="w-full px-2 py-1.5 text-sm border rounded-md"
                                            />
                                        </div>
                                        <div className="py-1">
                                            {MOCK_DATA.hospitals.map((hospital) => (
                                                <button
                                                    key={hospital.id}
                                                    className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                                    onClick={() => {
                                                        setFormData((prev) => ({ ...prev, hospital }));
                                                        setShowHospitalsPopup(false);
                                                    }}
                                                >
                                                    <span>{hospital.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t">
                    <button
                        className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md"
                        onClick={handleCreate}
                    >
                        Create Case
                    </button>
                </div>
            </div>
        </div>
    );
};