import React, { useState } from "react";
import {
  ChevronDown,
  Plus,
  Search,
  Settings,
  Filter,
  Home,
  LayoutDashboard,
  FolderTree,
  Users,
  X,
  User,
  Building2,
  Hash,
  MoreHorizontal,
  MenuIcon,
  Lock,
  FileText,
  Database,
  MonitorSmartphone,
  Calendar,
  ChevronRight,
  Check,
} from "lucide-react";
import ListView from "./ListView";

const MOCK_DATA = {
  assignees: [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mike Johnson" },
  ],
  surgeons: [
    { id: 1, name: "Dr. Smith" },
    { id: 2, name: "Dr. Johnson" },
    { id: 3, name: "Dr. Williams" },
  ],
  hospitals: [
    { id: 1, name: "City Hospital" },
    { id: 2, name: "Central Medical" },
    { id: 3, name: "St. Mary's" },
  ],
  statuses: ["NEW COMING", "PLANNING AND DESIGN", "MANUFACTURING"],
};

const SearchableDropdown = ({ options, placeholder, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative flex-1">
      <div
        className="w-full p-1 border rounded-md text-sm bg-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? value.name : placeholder}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-1 border rounded-md text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-48 overflow-auto">
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center space-x-2"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                  setSearch("");
                }}
              >
                <span>{option.name}</span>
                {value?.id === option.id && (
                  <Check className="w-4 h-4 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CreateCaseModal = ({ isOpen, onClose }) => {
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
                            setFormData(prev => ({ ...prev, status }));
                            setShowStatusPopup(false);
                          }}
                        >
                          <div className={`w-2 h-2 rounded-full ${status === formData.status ? 'bg-blue-400' : 'bg-gray-400'}`} />
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
                            setFormData(prev => ({ ...prev, assignee }));
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
                        setFormData(prev => ({ ...prev, dueDate: e.target.value }));
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
                onChange={(e) => setFormData(prev => ({ ...prev, caseCode: e.target.value }))}
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
                            setFormData(prev => ({ ...prev, surgeon }));
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
                            setFormData(prev => ({ ...prev, hospital }));
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
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
            onClick={handleCreate}
          >
            Create Case
          </button>
        </div>
      </div>
    </div>
  );
};

const TestLayout = () => {
  const [expandedProjects, setExpandedProjects] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showCreateCase, setShowCreateCase] = useState(false);
  const projects = [
    { id: "medical", name: "Medical Device", count: 10 },
    { id: "surgeons", name: "Surgeons", count: 30 },
    { id: "hospitals", name: "Hospitals", count: 22 },
  ];
  const [tasks] = useState([
    {
      id: 1,
      name: "Design new medical device prototype",
      status: "PLANNING AND DESIGN",
      dueDate: "2024-12-01",
      assignee: "John Doe",
      priority: "high",
    },
    {
      id: 2,
      name: "Prepare ISO documentation",
      status: "NEW COMING",
      dueDate: "2024-11-28",
      assignee: "Jane Smith",
      priority: "medium",
    },
    {
      id: 3,
      name: "Manufacturing process testing",
      status: "MANUFACTURING",
      dueDate: "2024-12-15",
      assignee: "Mike Johnson",
      priority: "high",
    },
  ]);

  const tabs = [
    { id: "case", name: "Case", icon: FileText },
    { id: "quotation", name: "Quotation", icon: FileText },
    { id: "delivery", name: "Delivery", icon: FileText },
    { id: "sla", name: "SLA", icon: FileText },
    { id: "metal", name: "Metal", icon: Database },
    { id: "board", name: "Board", icon: MonitorSmartphone },
    { id: "calendar", name: "Calendar", icon: Calendar },
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
  ];

  const statuses = {
    "NEW COMING": { color: "bg-gray-100" },
    "PLANNING AND DESIGN": { color: "bg-yellow-100" },
    MANUFACTURING: { color: "bg-blue-100" },
  };

  // Helper function to get status color
  const getStatusColor = (status) => {
    return statuses[status]?.color || "bg-gray-100";
  };

  // Helper function to get priority color
  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-50 text-red-700",
      medium: "bg-yellow-50 text-yellow-700",
      low: "bg-green-50 text-green-700",
    };
    return colors[priority] || "bg-gray-50 text-gray-700";
  };

  const handleAddClick = (projectId) => {
    if (projectId === "medical") {
      setShowCreateCase(true);
    }
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200">
          {/* Logo and Title */}
          <div className="h-14 px-4 border-b border-gray-200 flex items-center">
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn.discordapp.com/attachments/881006618911858728/1310597165076447282/Group_Logo.png?ex=6745cc39&is=67447ab9&hm=5db7a21d64219a63b53a283bbfb69ddba2ef8e546bfbebb130abdbe4314f217c&"
                alt="OssFlow Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="font-semibold text-lg">OssFlow</span>
            </div>
          </div>
          <div className="p-2">
            <div className="space-y-1">
              {/* Home */}
              <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                <Home className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Home</span>
              </div>
              {/* Dashboard */}
              <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                <LayoutDashboard className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Dashboard</span>
              </div>

              <div>
                <div
                  className="group flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  onClick={() => setExpandedProjects(!expandedProjects)}
                >
                  <div className="flex items-center space-x-2">
                    <FolderTree className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Projects</span>
                  </div>
                  {expandedProjects ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>

                {/* Projects List */}
                {expandedProjects && (
                  <div className="ml-4 space-y-1 mt-1">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        onMouseEnter={() => setHoveredItem(project.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <span className="text-sm truncate">{project.name}</span>
                        {hoveredItem === project.id && (
                          <Plus
                            className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddClick(project.id);
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* People */}
              <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm">People</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <div className="h-14 bg-white border-b border-gray-200 flex items-center px-4">
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <div
                    key={tab.id}
                    className="px-3 py-1 rounded-md hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{tab.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Toolbar */}
          <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Task</span>
              </button>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Settings className="w-4 h-4 text-gray-500" />
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm w-64"
                />
              </div>
            </div>
          </div>

          {/* List View */}
          <div className="flex-1 p-6 bg-gray-50 overflow-auto">
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
                <div className="col-span-4">Task Name</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Due Date</div>
                <div className="col-span-2">Assignee</div>
                <div className="col-span-2">Priority</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 items-center"
                  >
                    <div className="col-span-4 flex items-center space-x-2">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">{task.name}</span>
                    </div>
                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <div className="col-span-2 text-sm text-gray-500">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                    <div className="col-span-2 text-sm text-gray-500">
                      {task.assignee}
                    </div>
                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateCaseModal
        isOpen={showCreateCase}
        onClose={() => setShowCreateCase(false)}
      />
    </>
  );
};

export default TestLayout;
