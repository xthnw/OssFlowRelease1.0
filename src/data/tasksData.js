export const TASKS_DATA = {
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