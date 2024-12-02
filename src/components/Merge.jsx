import React, { useState, useEffect, useRef } from "react";
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
  GripVertical,
  UserPlus,
  List,
  LayoutGrid,
  Folder,
  Bell,
  Menu,
  MessageCircle,
  ListCollapse,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// เพิ่มไว้ต่อจาก MOCK_DATA
const TASKS_DATA = {
  "NEW COMING": [
    {
      id: "125",
      name: "Task 125 - Knee replacement surgery - Dr.สมชาย [รพ.จุฬา]",
      assignees: [
        { id: 1, avatar: "/avatar1.jpg", name: "John" },
        { id: 3, avatar: "/avatar3.jpg", name: "Mary" },
      ],
      dueDate: "Dec 1",
      comments: 1,
      taskCode: "125",
      surgeon: "นพ สมชาย",
      hospital: "โรงพยาบาลจุฬา",
      subtasks: [
        {
          id: "8",
          name: "Task 125 - Initial planning",
          assignee: { id: 1, avatar: "/avatar1.jpg", name: "John" },
        },
        {
          id: "9",
          name: "Task 125 - CT Scan review",
          assignee: { id: 3, avatar: "/avatar3.jpg", name: "Mary" },
        }
      ]
    },
    {
      id: "126",
      name: "Task 126 - Hip replacement surgery - Dr.วิชัย [รพ.รามา]",
      assignees: [{ id: 2, avatar: "/avatar2.jpg", name: "Jane" }],
      dueDate: "Dec 3",
      taskCode: "126",
      surgeon: "นพ วิชัย",
      hospital: "โรงพยาบาลรามา",
      subtasks: [
        {
          id: "10",
          name: "Task 126 - Patient consultation",
          assignee: { id: 2, avatar: "/avatar2.jpg", name: "Jane" },
        }
      ]
    }
  ],
  "PLANNING AND DESIGN": [
    {
      id: "124",
      name: "Task 124 - Mandible reconstruction - Dr.นนท์ [รพ.ศิริราช]",
      assignees: [
        { id: 1, avatar: "/avatar1.jpg", name: "John" },
        { id: 2, avatar: "/avatar2.jpg", name: "Jane" },
      ],
      dueDate: "Nov 6",
      comments: 2,
      taskCode: "124",
      surgeon: "นพ วิชิตชนม์",
      hospital: "โรงพยาบาลศิริราช",
      subtasks: [
        {
          id: "1",
          name: "Task 124 - Surgical planning review",
          assignee: { id: 1, avatar: "/avatar1.jpg", name: "John" },
          completed: true,
        },
        {
          id: "2",
          name: "Task 124 - Guide design",
          assignee: { id: 2, avatar: "/avatar2.jpg", name: "Jane" },
          dueDate: "Nov 6"
        },
        {
          id: "3",
          name: "Task 124 - 3D modeling",
          assignee: { id: 1, avatar: "/avatar1.jpg", name: "John" },
        },
        {
          id: "4",
          name: "Task 124 - Model fabrication",
          assignee: { id: 3, avatar: "/avatar3.jpg", name: "Mary" },
          tag: "manufacturing"
        }
      ]
    },
    {
      id: "123",
      name: "Task 123 - Dental implant - Dr.ประสิทธิ์ [รพ.ศิริราช]",
      assignees: [{ id: 4, avatar: "/avatar4.jpg", name: "Tom" }],
      dueDate: "Nov 10",
      comments: 3,
      taskCode: "123",
      surgeon: "นพ ประสิทธิ์",
      hospital: "โรงพยาบาลศิริราช",
      subtasks: [
        {
          id: "11",
          name: "Task 123 - Design review",
          assignee: { id: 4, avatar: "/avatar4.jpg", name: "Tom" }
        },
        {
          id: "12",
          name: "Task 123 - Final adjustments",
          assignee: { id: 4, avatar: "/avatar4.jpg", name: "Tom" },
          tag: "design"
        }
      ]
    }
  ],
  "IN PROGRESS": [
    {
      id: "122",
      name: "Task 122 - Cranial implant - Dr.มานะ [รพ.จุฬา]",
      assignees: [
        { id: 5, avatar: "/avatar5.jpg", name: "David" },
        { id: 6, avatar: "/avatar6.jpg", name: "Sarah" }
      ],
      dueDate: "Nov 15",
      taskCode: "122",
      surgeon: "นพ มานะ",
      hospital: "โรงพยาบาลจุฬา",
      subtasks: [
        {
          id: "13",
          name: "Task 122 - Production setup",
          assignee: { id: 5, avatar: "/avatar5.jpg", name: "David" },
          tag: "manufacturing"
        },
        {
          id: "14",
          name: "Task 122 - Quality inspection",
          assignee: { id: 6, avatar: "/avatar6.jpg", name: "Sarah" }
        }
      ]
    }
  ],
  "COMPLETED": []
};

const ListView = () => {
  const [tasksData, setTasksData] = useState(TASKS_DATA);
  const [expandedTasks, setExpandedTasks] = useState({});
  const [expandedGroups, setExpandedGroups] = useState(() => {
    const initialExpanded = {};
    Object.keys(TASKS_DATA).forEach(status => {
      initialExpanded[status] = true;
    });
    return initialExpanded;
  });
  const [completedTasks, setCompletedTasks] = useState({});
  const [editingCell, setEditingCell] = useState(null);
  const [key, setKey] = useState(0);

  const [departmentReference] = useState([
    {
      id: 1,
      name: 'Design',
      members: [
        { id: 1, name: 'John Design' },
        { id: 2, name: 'Jane Designer' },
      ]
    },
    {
      id: 2,
      name: 'Polymer Production',
      members: [
        { id: 3, name: 'Bob Polymer' },
        { id: 4, name: 'Alice Production' },
      ]
    },
    {
      id: 3,
      name: 'Metal Production',
      members: [
        { id: 5, name: 'Charlie Metal' },
        { id: 6, name: 'David Steel' },
      ]
    },
    {
      id: 4,
      name: 'QA/QC',
      members: [
        { id: 7, name: 'Eva Quality' },
        { id: 8, name: 'Frank Control' },
      ]
    },
    {
      id: 5,
      name: 'Packaging',
      members: [
        { id: 9, name: 'Grace Pack' },
        { id: 10, name: 'Henry Box' },
      ]
    },
    {
      id: 6,
      name: 'Delivery',
      members: [
        { id: 11, name: 'Ian Delivery' },
        { id: 12, name: 'Jack Transport' },
      ]
    }
  ]);

  useEffect(() => {
    // Force re-render once after mount to properly register drag-drop areas
    setKey(prev => prev + 1);
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId, type } = result;
    const sourceStatus = source.droppableId.split('::')[0];
    const destStatus = destination.droppableId.split('::')[0];

    // Create deep copy of data
    const newData = JSON.parse(JSON.stringify(tasksData));

    if (type === 'task') {
      // Extract pure id from draggableId (remove 'task-' prefix)
      const taskId = draggableId.split('-')[1];
      const [movedTask] = newData[sourceStatus].splice(source.index, 1);

      if (sourceStatus === destStatus) {
        newData[destStatus].splice(destination.index, 0, movedTask);
      } else {
        movedTask.status = destStatus;
        newData[destStatus].splice(destination.index, 0, movedTask);
      }
    } else {
      // Handle subtask dragging
      const sourceParentId = source.droppableId.split('::')[1];
      const destParentId = destination.droppableId.split('::')[1];
      const subtaskId = draggableId.split('-')[1]; // Extract pure id

      // Find source parent task and remove subtask
      // const sourceTask = newData[sourceStatus].find(t => t.id === sourceParentId);
      const sourceTask = newData[sourceStatus].find(t => t.id === sourceParentId.replace('task-', ''));
      const subtaskIndex = sourceTask.subtasks.findIndex(st => st.id === subtaskId);
      const [subtask] = sourceTask.subtasks.splice(subtaskIndex, 1);

      if (destParentId === 'root') {
        // Convert subtask to main task
        const newTask = {
          ...subtask,
          id: Date.now().toString(), // Use pure id
          subtasks: []
        };
        newData[destStatus].splice(destination.index, 0, newTask);
      } else {
        // Move to another task as subtask
        const destTask = newData[destStatus].find(t => t.id === destParentId);
        destTask.subtasks.splice(destination.index, 0, subtask);
      }
    }

    setTasksData(newData);
  };

  const handleCellEdit = (taskId, field, value, status) => {
    setTasksData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const taskList = newData[status];
      const taskIndex = taskList.findIndex(t => t.id === taskId);

      if (taskIndex !== -1) {
        taskList[taskIndex][field] = value;
      } else {
        // Check in subtasks
        for (const task of taskList) {
          const subtaskIndex = task.subtasks?.findIndex(st => st.id === taskId);
          if (subtaskIndex !== -1) {
            task.subtasks[subtaskIndex][field] = value;
            break;
          }
        }
      }

      return newData;
    });
    setEditingCell(null);
  };

  const handleAssigneeUpdate = (taskId, newAssignees, status) => {
    setTasksData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const taskList = newData[status];
      const taskIndex = taskList.findIndex(t => t.id === taskId);

      if (taskIndex !== -1) {
        taskList[taskIndex].assignees = newAssignees;
      } else {
        // Check in subtasks
        for (const task of taskList) {
          const subtaskIndex = task.subtasks?.findIndex(st => st.id === taskId);
          if (subtaskIndex !== -1) {
            task.subtasks[subtaskIndex].assignees = newAssignees;
            break;
          }
        }
      }

      return newData;
    });
    setEditingCell(null);
  };

  const handleDateUpdate = (taskId, newDate, status) => {
    setTasksData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const taskList = newData[status];
      const taskIndex = taskList.findIndex(t => t.id === taskId);

      if (taskIndex !== -1) {
        taskList[taskIndex].dueDate = newDate;
      } else {
        // Check in subtasks
        for (const task of taskList) {
          const subtaskIndex = task.subtasks?.findIndex(st => st.id === taskId);
          if (subtaskIndex !== -1) {
            task.subtasks[subtaskIndex].dueDate = newDate;
            break;
          }
        }
      }

      return newData;
    });
    setEditingCell(null);
  };

  const SortableTaskRow = ({
    task,
    isSubtask = false,
    isCompleted,
    expandedTasks,
    setExpandedTasks,
    setCompletedTasks,
    parentId,
    status,
  }) => {
    const [activeDepartment, setActiveDepartment] = useState(null);
    const dropdownRef = useRef(null);

    const handleDoubleClick = (e, field) => {
      e.stopPropagation();
      setEditingCell({ taskId: task.id, field });
    };

    const renderAssigneeCell = () => {
      const isEditing = editingCell?.taskId === task.id && editingCell?.field === 'assignees';

      if (isEditing) {
        return (
          <div className="relative h-full" ref={dropdownRef}>
            <div
              className="flex -space-x-1 cursor-pointer"
            >
              {(task.assignees || []).map((assignee) => (
                <div
                  key={assignee.id}
                  className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600"
                >
                  {assignee.name.charAt(0)}
                </div>
              ))}
            </div>

            <div className="absolute z-50 mt-1 bg-white rounded-md shadow-lg border flex">
              {/* Department list */}
              <div className="w-48 border-r">
                {departmentReference.map((dept) => (
                  <div
                    key={dept.id}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${activeDepartment === dept.id ? 'bg-gray-100' : ''
                      }`}
                    onClick={() => setActiveDepartment(dept.id)}
                  >
                    <span>{dept.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>

              {/* Members list - shows when department is selected */}
              {activeDepartment && (
                <div className="w-48 py-1">
                  {departmentReference
                    .find(d => d.id === activeDepartment)
                    ?.members.map((member) => {
                      const isSelected = task.assignees?.some(a => a.id === member.id);
                      return (
                        <div
                          key={member.id}
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${isSelected ? 'bg-blue-50' : ''
                            }`}
                          onClick={(e) => {
                            const newAssignees = isSelected
                              ? task.assignees.filter(a => a.id !== member.id)
                              : [...(task.assignees || []), member];
                            handleAssigneeUpdate(task.id, newAssignees, status);
                            // ไม่ปิด dropdown หลังจากเลือก
                            e.stopPropagation();
                          }}
                        >
                          <span>{member.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        );
      }

      return (
        <div
          className="h-full flex items-center"
          onDoubleClick={(e) => {
            e.stopPropagation();
            setEditingCell({ taskId: task.id, field: 'assignees' });
            // เมื่อเริ่ม edit ให้ set department แรกเป็น active
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

      if (isEditing) {
        return (
          <input
            type="date"
            className="w-full px-1 py-0.5 text-xs border rounded focus:outline-none focus:ring-0 focus:border-gray-300"
            defaultValue={task.dueDate}
            autoFocus
            onBlur={(e) => handleDateUpdate(task.id, e.target.value, status)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleDateUpdate(task.id, e.target.value, status);
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
          onDoubleClick={(e) => {
            e.stopPropagation();
            setEditingCell({ taskId: task.id, field: 'dueDate' });
          }}
          className="block truncate cursor-text text-xs text-blue-600"
        >
          {task.dueDate || "-"}
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
          onDoubleClick={(e) => handleDoubleClick(e, field)}
          className="block truncate cursor-text text-xs text-gray-700"
          style={{ width }}
        >
          {content}
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
                      backgroundColor: isCompleted ? "#22C55E" : "transparent",
                      borderColor: isCompleted ? "#22C55E" : "#D1D5DB",
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

              <div className="col-span-3 flex items-center">
                {renderAssigneeCell()}
              </div>
              <div className="col-span-1 text-xs text-blue-600 flex items-center">
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
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div key={key} className="flex-1 p-6 bg-white overflow-auto">
        <div className="space-y-4">
          {Object.entries(tasksData).map(([status, tasks]) => (
            <div
              key={status}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <ChevronRight
                    className={`w-5 h-5 text-gray-500 cursor-pointer transform ${expandedGroups[status] ? "rotate-90" : ""
                      }`}
                    onClick={() =>
                      setExpandedGroups((prev) => ({
                        ...prev,
                        [status]: !prev[status],
                      }))
                    }
                  />
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{
                        background:
                          status === "PLANNING AND DESIGN"
                            ? "#FFD700"
                            : "#E5E7EB",
                        opacity: 0.7,
                      }}
                    />
                    <span className="font-semibold text-gray-800">{status}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  {tasks.length}
                </span>
              </div>

              {expandedGroups[status] && (
                <>
                  <div className="grid grid-cols-12 gap-4 px-6 py-2 border-b text-xs text-gray-500">
                    <div className="col-span-4">Name</div>
                    <div className="col-span-3">Assignee</div>
                    <div className="col-span-1">Due date</div>
                    <div className="col-span-1">Comments</div>
                    <div className="col-span-1">Task Code</div>
                    <div className="col-span-1">Surgeons</div>
                    <div className="col-span-1">Hospitals</div>
                  </div>

                  <Droppable droppableId={status} type="task">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`divide-y divide-gray-200 ${snapshot.isDraggingOver ? 'bg-blue-50' : ''
                          }`}
                      >
                        {tasks.map((task, index) => (
                          <React.Fragment key={task.id}>
                            <SortableTaskRow
                              task={{ ...task, index }}
                              status={status}
                              isCompleted={completedTasks[task.id]}
                              expandedTasks={expandedTasks}
                              setExpandedTasks={setExpandedTasks}
                              setCompletedTasks={setCompletedTasks}
                            />
                            {expandedTasks[task.id] && task.subtasks?.length > 0 && (
                              <Droppable
                                droppableId={`${status}::${task.id}`}
                                type="subtask"
                              >
                                {(providedSubtask, snapshotSubtask) => (
                                  <div
                                    ref={providedSubtask.innerRef}
                                    {...providedSubtask.droppableProps}
                                    className={`bg-gray-50 ${snapshotSubtask.isDraggingOver ? 'bg-blue-50' : ''
                                      }`}
                                  >
                                    {task.subtasks?.map((subtask, subtaskIndex) => (
                                      <SortableTaskRow
                                        key={subtask.id}
                                        task={{ ...subtask, index: subtaskIndex }}
                                        status={status}
                                        isSubtask
                                        isCompleted={completedTasks[subtask.id]}
                                        expandedTasks={expandedTasks}
                                        setExpandedTasks={setExpandedTasks}
                                        setCompletedTasks={setCompletedTasks}
                                        parentId={task.id}
                                      />
                                    ))}
                                    {providedSubtask.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            )}
                          </React.Fragment>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <div className="p-2">
                    <button className="flex items-center space-x-1 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-md w-full">
                      <Plus className="w-4 h-4" />
                      <span>Add Task</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export const Merge = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('list');
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

  const handleAddClick = (projectId) => {
    if (projectId === "medical") {
      setShowCreateCase(true);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50"> {/* เปลี่ยนสีพื้นหลังให้เข้ากับ card */}
      {/* Left Sidebar */}
      <div className={`${isCollapsed ? 'w-14' : 'w-64'} transition-all duration-300 bg-gray-50 flex flex-col relative`}>
        {/* Gradient overlay */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-teal-600/40 via-emerald-500/20 to-transparent -translate-y-1/2 -translate-x-1/4 blur-xl pointer-events-none" />
        {/* Logo section */}
        <div className="h-14 flex items-center justify-between px-4 relative">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <img
                src="https://res.cloudinary.com/djgpgveds/image/upload/v1733062717/jdzga0vkqkswho3wgsan.png"
                alt="OssFlow Logo"
                className="object-contain"
              />
              {/* <span className="font-medium">OssFlow</span> */}
            </div>
          )}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 hover:bg-gray-100 rounded">
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-2 space-y-1 mt-4 relative">
          <button className="w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2">
            <Home className="w-4 h-4" />
            {!isCollapsed && <span className="text-sm">Home</span>}
          </button>
          <button
            className="w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center justify-between"
            onClick={() => setExpandedProjects(!expandedProjects)}
          >
            <div className="flex items-center space-x-2">
              <Folder className="w-4 h-4" />
              {!isCollapsed && <span className="text-sm">Case</span>}
            </div>
            {!isCollapsed && (
              expandedProjects ?
                <ChevronDown className="w-4 h-4 text-gray-400" /> :
                <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {!isCollapsed && expandedProjects && (
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
          <button className="w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2">
            <Users className="w-4 h-4" />
            {!isCollapsed && <span className="text-sm">Team</span>}
          </button>
        </div>
      </div>

      {/* Main Content Wrapper with Padding */}
      <div className="flex-1 pr-2 py-2 mt-8 relative">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow border border-gray-200 flex flex-col h-full overflow-hidden">
          {/* Top Navigation */}
          <div className="h-14 border-b flex items-center justify-between px-4">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-600">
              <span>Team Space</span>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span>Projects</span>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="font-medium text-gray-900">Task 1</span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 text-gray-400" />
              <Bell className="w-5 h-5 text-gray-400" />
              <MessageCircle className="w-5 h-5 text-gray-400" />
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* View Toggle & Actions */}
          <div className="border-b flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="flex bg-gray-100 rounded-md p-1">
                <button
                  className={`p-1 rounded ${currentView === 'board' ? 'bg-white shadow-sm' : ''}`}
                  onClick={() => setCurrentView('board')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  className={`p-1 rounded ${currentView === 'list' ? 'bg-white shadow-sm' : ''}`}
                  onClick={() => setCurrentView('list')}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 text-sm">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 text-sm">
                <User className="w-4 h-4" />
                <span>Me mode</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 text-sm">
                <Users className="w-4 h-4" />
                <span>Assignee</span>
              </button>
              <button className="text-gray-500 text-sm">
                Closed
              </button>
              <Settings className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white overflow-y-scroll scrollbar">
            <ListView />
          </div>
        </div>
      </div>
    </div>
  );
};