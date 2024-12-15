import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ChevronRight, ChevronDown, Plus, UserPlus, Check, GripVertical, Briefcase, Users } from 'lucide-react';
import { TASKS_DATA } from '../../data/tasksData';

// แยก SortableTaskRow เป็น component แยก
import { SortableTaskRow } from './SortableTaskRow';
import { MagicLinkDialog } from './MagicLink';
import { SlideComment } from './SlideComment';
import { AddTaskModal } from './AddTaskModal';
import { AddSubTaskModal } from './AddSubTaskModal';

export const ListView = () => {
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
    const [showDatePicker, setShowDatePicker] = useState({});
    const [hoveredProject, setHoveredProject] = useState(null);
    const [hoveredMember, setHoveredMember] = useState(null);  // เพิ่มบรรทัดนี้

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [isMagicLinkOpen, setIsMagicLinkOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const [isAddSubtaskModalOpen, setIsAddSubtaskModalOpen] = useState(false);

    const [templates, setTemplates] = useState([
        {
            id: 1,
            name: "Set 1",
            subtasks: [
                "Surgical Planning confirmation",
                "Surgical guide design",
                "Reconstruction plate design",
                "Mock up model fabrication",
                "Mandible cutting guide fabrication"
            ]
        }
    ]);


    const [commentsOpen, setCommentsOpen] = useState(false);
    const handleShare = (taskId) => {
        setSelectedTaskId(taskId);
        setIsMagicLinkOpen(true);
    };

    const handleDelete = (taskId) => {
        if (window.confirm('Are you sure?')) {
            alert(`Delete task ${taskId}`);
        }
    };

    const [assigneeReference, setAssigneeReference] = useState([
        { id: 1, name: 'Karintip Siriwongsakulchai' },
        { id: 2, name: 'Pacharawat Santisuk' },
        { id: 3, name: 'Janwimon Kaewwilai' },
        // Add more reference data as needed
    ]);

    const [departmentReference] = useState([
        {
            id: 1,
            name: 'Design',
            members: [
                {
                    id: 1,
                    name: 'Janwimon Kaewwilai',
                    projects: [
                        {
                            id: 1,
                            name: 'Case 124 - Mandible reconstruction with fibula flap Dr. แน็ก',
                            progress: 75,
                            tasks: [
                                { id: 1, name: 'Surgical Planning Confirmation' },
                                { id: 2, name: 'Design Review Meeting' }
                            ]
                        },
                        {
                            id: 2,
                            name: 'Case 125 - Knee replacement surgery - Dr.สมชาย [รพ.จุฬา]',
                            progress: 30,
                            tasks: [
                                { id: 3, name: 'Initial Design' },
                                { id: 4, name: 'CT Scan Analysis' }
                            ]
                        },
                        {
                            id: 13,
                            name: 'Case 149 - Knee replacement surgery - Dr.สมชาย [รพ.จุฬา]',
                            progress: 30,
                            tasks: [
                                { id: 26, name: 'ออกแบบหน้าตา' },
                                { id: 27, name: 'ทำวิจัยเกี่ยวกับอุปกรณ์ใหม่' }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Thanyakan Satapornsiri',
                    projects: [
                        {
                            id: 3,
                            name: 'Case 138 - Wrist Fracture Dr.โบ๊ท [รพ.บางพลี]',
                            progress: 60,
                            tasks: [
                                { id: 5, name: 'Reconstruction Design' },
                                { id: 6, name: 'Implant Planning' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: 'Polymer Production',
            members: [
                {
                    id: 3,
                    name: 'Thitirat Pitijamroen',
                    projects: [
                        {
                            id: 4,
                            name: 'Case 132 - Femur cage - หมอวิช [คณะแพทย์ มอ.]',
                            progress: 45,
                            tasks: [
                                { id: 7, name: 'Material Preparation' },
                                { id: 8, name: 'Production Setup' },
                                { id: 9, name: 'Quality Check' }
                            ]
                        }
                    ]
                },
                {
                    id: 4,
                    name: 'Kanokjan Mahametee',
                    projects: [
                        {
                            id: 5,
                            name: 'Case 140 - Malunion bone - หมอชิตวีร์',
                            progress: 80,
                            tasks: [
                                { id: 10, name: 'Production Process' },
                                { id: 11, name: 'Surface Treatment' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: 'Metal Production',
            members: [
                {
                    id: 5,
                    name: 'Wanaporn Patanakosol',
                    projects: []
                },
                {
                    id: 6,
                    name: 'Preeyapat Chokchai',
                    projects: [
                        {
                            id: 6,
                            name: 'Case 126 - Hip replacement - Dr.วิชัย [รพ.รามา]',
                            progress: 65,
                            tasks: [
                                { id: 12, name: 'Metal Component Production' },
                                { id: 13, name: 'Surface Finishing' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 4,
            name: 'QA/QC',
            members: [
                {
                    id: 7,
                    name: 'Niramat Kaewwilai',
                    projects: [
                        {
                            id: 7,
                            name: 'Case 124 - Mandible reconstruction with fibula flap Dr. แน็ก',
                            progress: 85,
                            tasks: [
                                { id: 14, name: 'Final Inspection' },
                                { id: 15, name: 'Documentation Review' }
                            ]
                        }
                    ]
                },
                {
                    id: 8,
                    name: 'Kerikwan Somboonprawat',
                    projects: [
                        {
                            id: 8,
                            name: 'Case 132 - Femur cage - หมอวิช [คณะแพทย์ มอ.]',
                            progress: 40,
                            tasks: [
                                { id: 16, name: 'Quality Testing' },
                                { id: 17, name: 'Measurement Verification' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 5,
            name: 'Packaging',
            members: [
                {
                    id: 9,
                    name: 'Pattamon Kittipattra',
                    projects: [
                        {
                            id: 9,
                            name: 'Case 138 - Wrist Fracture Dr.โบ๊ท [รพ.บางพลี]',
                            progress: 30,
                            tasks: [
                                { id: 18, name: 'Sterilization Preparation' },
                                { id: 19, name: 'Package Sealing' }
                            ]
                        }
                    ]
                },
                {
                    id: 10,
                    name: 'Kanokkorn Kittisompong',
                    projects: [
                        {
                            id: 10,
                            name: 'Case 140 - Malunion bone - หมอชิตวีร์',
                            progress: 20,
                            tasks: [
                                { id: 20, name: 'Documentation Preparation' },
                                { id: 21, name: 'Label Verification' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 6,
            name: 'Delivery',
            members: [
                {
                    id: 11,
                    name: 'Nittha Patanapreecha',
                    projects: [
                        {
                            id: 11,
                            name: 'Case 126 - Hip replacement - Dr.วิชัย [รพ.รามา]',
                            progress: 25,
                            tasks: [
                                { id: 22, name: 'Route Planning' },
                                { id: 23, name: 'Delivery Schedule Confirmation' }
                            ]
                        }
                    ]
                },
                {
                    id: 12,
                    name: 'Peerada Jaraswong',
                    projects: [
                        {
                            id: 12,
                            name: 'Case 132 - Femur cage - หมอวิช [คณะแพทย์ มอ.]',
                            progress: 15,
                            tasks: [
                                { id: 24, name: 'Transport Arrangement' },
                                { id: 25, name: 'Delivery Documentation' }
                            ]
                        }
                    ]
                }
            ]
        }
    ]);

    useEffect(() => {
        // Force re-render once after mount to properly register drag-drop areas
        setKey(prev => prev + 1);
    }, []);

    // เพิ่ม useEffect เพื่อตั้งค่าเริ่มต้นของ completedTasks
    useEffect(() => {
        // สร้าง object ใหม่สำหรับเก็บสถานะ completion
        const initialCompletedTasks = {};

        // วนลูปผ่านทุก status category
        Object.values(TASKS_DATA).forEach(categoryTasks => {
            categoryTasks.forEach(task => {
                // เช็ค task หลัก
                initialCompletedTasks[task.id] = task.isCompleted || false;

                // เช็ค subtasks
                if (task.subtasks) {
                    task.subtasks.forEach(subtask => {
                        initialCompletedTasks[subtask.id] = subtask.isCompleted || false;
                    });
                }
            });
        });

        // อัพเดท state
        setCompletedTasks(initialCompletedTasks);
    }, []); // run เฉพาะตอน mount


    // เพิ่มฟังก์ชันคำนวณ Progress
    const calculateProgress = (task) => {
        if (!task.subtasks || task.subtasks.length === 0) {
            return completedTasks[task.id] ? 100 : 0;
        }

        const completedSubtasks = task.subtasks.filter(
            subtask => completedTasks[subtask.id]
        ).length;
        return Math.round((completedSubtasks / task.subtasks.length) * 100);
    };

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

            // แปลง newDate ให้อยู่ในรูปแบบที่มีปีด้วย
            const formattedDate = new Date(newDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            if (taskIndex !== -1) {
                taskList[taskIndex].dueDate = formattedDate;
            } else {
                // Check in subtasks
                for (const task of taskList) {
                    const subtaskIndex = task.subtasks?.findIndex(st => st.id === taskId);
                    if (subtaskIndex !== -1) {
                        task.subtasks[subtaskIndex].dueDate = formattedDate;
                        break;
                    }
                }
            }

            return newData;
        });
        setEditingCell(null);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div key={key} className="flex-1 p-6 bg-white overflow-y-scroll scrollbar">
                <div className="space-y-4">
                    {Object.entries(tasksData).map(([status, tasks]) => (
                        <div
                            key={status}
                            className="bg-white rounded-lg py-2 border border-gray-200 overflow-visible"
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
                                        <div className="w-5 h-5 rounded-full flex items-center justify-center">
                                            {status === "NEW COMING" && "🚧"}
                                            {status === "PLANNING AND DESIGN" && "📐"}
                                            {status === "IN PROGRESS" && "🚧"}
                                            {status === "COMPLETED" && "✅"}
                                            {status === "MANUFACTURING" && "🏭"}
                                        </div>
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
                                        <div className="col-span-1">Assignee</div>
                                        <div className="col-span-1">Progress</div>
                                        <div className="col-span-1">Due date</div>
                                        <div className="col-span-1">Comments</div>
                                        <div className="col-span-1">Case Code</div>
                                        <div className="col-span-1">Surgeons</div>
                                        <div className="col-span-1">Hospitals</div>
                                        <div className="col-span-1">Actions</div>
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
                                                            editingCell={editingCell}           // เพิ่มบรรทัดนี้
                                                            setEditingCell={setEditingCell}     // เพิ่มบรรทัดนี้
                                                            handleCellEdit={handleCellEdit}
                                                            handleDateUpdate={handleDateUpdate}
                                                            departmentReference={departmentReference}
                                                            handleAssigneeUpdate={handleAssigneeUpdate}
                                                            showDatePicker={showDatePicker}
                                                            setShowDatePicker={setShowDatePicker}
                                                            hoveredProject={hoveredProject}
                                                            setHoveredProject={setHoveredProject}
                                                            hoveredMember={hoveredMember}
                                                            setHoveredMember={setHoveredMember}
                                                            onShare={handleShare}
                                                            onDelete={handleDelete}
                                                            calculateProgress={calculateProgress}
                                                            commentsOpen={commentsOpen}
                                                            setCommentsOpen={setCommentsOpen}
                                                            selectedTaskId={selectedTaskId}
                                                            setSelectedTaskId={setSelectedTaskId}
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
                                                                                editingCell={editingCell}           // เพิ่มบรรทัดนี้
                                                                                setEditingCell={setEditingCell}     // เพิ่มบรรทัดนี้
                                                                                handleCellEdit={handleCellEdit}
                                                                                handleDateUpdate={handleDateUpdate}
                                                                                departmentReference={departmentReference}
                                                                                handleAssigneeUpdate={handleAssigneeUpdate}
                                                                                showDatePicker={showDatePicker}
                                                                                setShowDatePicker={setShowDatePicker}
                                                                                hoveredProject={hoveredProject}
                                                                                setHoveredProject={setHoveredProject}
                                                                                hoveredMember={hoveredMember}
                                                                                setHoveredMember={setHoveredMember}
                                                                                onDelete={handleDelete}
                                                                                calculateProgress={calculateProgress}

                                                                                commentsOpen={commentsOpen}
                                                                                setCommentsOpen={setCommentsOpen}
                                                                                selectedTaskId={selectedTaskId}
                                                                                setSelectedTaskId={setSelectedTaskId}
                                                                            />
                                                                        ))}
                                                                        {providedSubtask.placeholder}
                                                                        <button
                                                                            onClick={() => {
                                                                                setSelectedTaskId(task.id);  // เก็บ ID ของ task หลัก
                                                                                setIsAddSubtaskModalOpen(true);
                                                                            }}
                                                                            className="flex items-center space-x-1 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-md w-full"
                                                                        >
                                                                            <Plus className="w-4 h-4" />
                                                                            <span>Add Task</span>
                                                                        </button>
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
                                        <button
                                            onClick={() => setIsAddModalOpen(true)}
                                            className="flex items-center space-x-1 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-md w-full">
                                            <Plus className="w-4 h-4" />
                                            <span>Add Case</span>
                                        </button>
                                    </div>
                                    <MagicLinkDialog
                                        isOpen={isMagicLinkOpen}
                                        onClose={() => {
                                            setIsMagicLinkOpen(false);
                                            setSelectedTaskId(null);
                                        }}
                                        taskId={selectedTaskId}
                                    />
                                    <AddTaskModal
                                        isOpen={isAddModalOpen}
                                        onClose={() => setIsAddModalOpen(false)}
                                        templates={templates}
                                        setTemplates={setTemplates}
                                    />
                                    <AddSubTaskModal
                                        isOpen={isAddSubtaskModalOpen}
                                        onClose={() => setIsAddSubtaskModalOpen(false)}
                                        templates={templates}  // templates state จาก AddTaskModal
                                        selectedTaskId={selectedTaskId}
                                    />
                                    <SlideComment
                                        taskId={selectedTaskId}
                                        isOpen={commentsOpen}
                                        onClose={() => setCommentsOpen(false)}
                                    />
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </DragDropContext>

    );
};