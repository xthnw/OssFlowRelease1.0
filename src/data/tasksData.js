export const TASKS_DATA = {
    "NEW COMING": [
        {
            id: "125",
            name: "Case 125 - Knee replacement surgery - Dr.สมชาย [รพ.จุฬา]",
            assignees: [
                { id: 1, avatar: "/avatar1.jpg", name: "Janwimon Kaewwilai" },
                { id: 3, avatar: "/avatar3.jpg", name: "Thitirat Pitijamroen" }
            ],
            dueDate: "Dec 25, 2024",
            comments: 1,
            taskCode: "125",
            surgeon: "นพ สมชาย",
            hospital: "โรงพยาบาลจุฬา",
            isCompleted: false,
            subtasks: [
                {
                    id: "8",
                    name: "Case 125 - Initial planning",
                    assignee: { id: 1, avatar: "/avatar1.jpg", name: "Janwimon Kaewwilai" },
                    isCompleted: true,
                    dueDate: "Nov 16, 2024",
                },
                {
                    id: "9",
                    name: "Case 125 - CT Scan review",
                    assignee: { id: 3, avatar: "/avatar3.jpg", name: "Thitirat Pitijamroen" },
                    isCompleted: false,
                    dueDate: "Nov 16, 2024",
                }
            ]
        },
        {
            id: "126",
            name: "Case 126 - Hip replacement surgery - Dr.วิชัย [รพ.รามา]",
            assignees: [{ id: 2, avatar: "/avatar2.jpg", name: "Thanyakan Satapornsiri" }],
            dueDate: "Dec 23, 2024",
            taskCode: "126",
            surgeon: "นพ วิชัย",
            hospital: "โรงพยาบาลรามา",
            isCompleted: true,
            subtasks: [
                {
                    id: "10",
                    name: "Case 126 - Patient consultation",
                    assignee: { id: 2, avatar: "/avatar2.jpg", name: "Thanyakan Satapornsiri" },
                    isCompleted: true,
                    dueDate: "Nov 16, 2024",
                }
            ]
        },
        {
            id: "127",
            name: "Case 127 - Spine surgery - Dr.ประวิทย์ [รพ.ศิริราช]",
            assignees: [
                { id: 4, avatar: "/avatar4.jpg", name: "Kanokjan Mahametee" },
                { id: 5, avatar: "/avatar5.jpg", name: "Preeyapat Chokchai" }
            ],
            dueDate: "Dec 25, 2024",
            comments: 2,
            taskCode: "127",
            surgeon: "นพ ประวิทย์",
            hospital: "โรงพยาบาลศิริราช",
            isCompleted: true,
            subtasks: [
                {
                    id: "11",
                    name: "Case 127 - MRI analysis",
                    assignee: { id: 4, avatar: "/avatar4.jpg", name: "Kanokjan Mahametee" },
                    isCompleted: true,
                    dueDate: "Nov 16, 2024",
                }
            ]
        },
        {
            id: "128",
            name: "Case 128 - Shoulder reconstruction - Dr.สมศักดิ์ [รพ.รามา]",
            assignees: [{ id: 6, avatar: "/avatar6.jpg", name: "Preeyapat Chokchai" }],
            dueDate: "Dec 17, 2024",
            taskCode: "128",
            surgeon: "นพ สมศักดิ์",
            hospital: "โรงพยาบาลรามา",
            isCompleted: true,
            subtasks: [
                {
                    id: "12",
                    name: "Case 128 - Pre-op planning",
                    assignee: { id: 6, avatar: "/avatar6.jpg", name: "Preeyapat Chokchai" },
                    isCompleted: true,
                }
            ]
        }
    ],
    "PLANNING AND DESIGN": [
        {
            id: "124",
            name: "Case 124 - Mandible reconstruction - Dr.นนท์ [รพ.ศิริราช]",
            assignees: [
                { id: 1, avatar: "/avatar1.jpg", name: "Janwimon Kaewwilai" },
                { id: 2, avatar: "/avatar2.jpg", name: "Thanyakan Satapornsiri" }
            ],
            dueDate: "Dec 16, 2024",
            comments: 2,
            taskCode: "124",
            surgeon: "นพ วิชิตชนม์",
            hospital: "โรงพยาบาลศิริราช",
            isCompleted: true,
            subtasks: [
                {
                    id: "1",
                    name: "Case 124 - Surgical planning review",
                    assignee: { id: 1, avatar: "/avatar1.jpg", name: "Janwimon Kaewwilai" },
                    isCompleted: true,
                },
                {
                    id: "2",
                    name: "Case 124 - Guide design",
                    assignee: { id: 2, avatar: "/avatar2.jpg", name: "Thanyakan Satapornsiri" },
                    isCompleted: true,
                    dueDate: "Nov 16, 2024",
                }
            ]
        },
        {
            id: "129",
            name: "Case 129 - Facial reconstruction - Dr.วิภา [รพ.จุฬา]",
            assignees: [
                { id: 3, avatar: "/avatar3.jpg", name: "Thitirat Pitijamroen" },
                { id: 4, avatar: "/avatar4.jpg", name: "Kanokjan Mahametee" }
            ],
            dueDate: "Dec 18, 2024",
            comments: 3,
            taskCode: "129",
            surgeon: "พญ วิภา",
            hospital: "โรงพยาบาลจุฬา",
            isCompleted: true,
            subtasks: [
                {
                    id: "13",
                    name: "Case 129 - 3D modeling",
                    assignee: { id: 3, avatar: "/avatar3.jpg", name: "Thitirat Pitijamroen" },
                    isCompleted: true,
                }
            ]
        },
        {
            id: "130",
            name: "Case 130 - Skull implant - Dr.พิชัย [รพ.รามา]",
            assignees: [{ id: 5, avatar: "/avatar5.jpg", name: "Preeyapat Chokchai" }],
            dueDate: "Dec 20, 2024",
            taskCode: "130",
            surgeon: "นพ พิชัย",
            hospital: "โรงพยาบาลรามา",
            isCompleted: true,
            subtasks: [
                {
                    id: "14",
                    name: "Case 130 - Design review",
                    assignee: { id: 5, avatar: "/avatar5.jpg", name: "Preeyapat Chokchai" },
                    isCompleted: true,
                }
            ]
        }
    ],
    "MANUFACTURING": [
        {
            id: "122",
            name: "Case 122 - Cranial implant - Dr.มานะ [รพ.จุฬา]",
            assignees: [
                { id: 5, avatar: "/avatar5.jpg", name: "Preeyapat Chokchai" },
                { id: 6, avatar: "/avatar6.jpg", name: "Preeyapat Chokchai" }
            ],
            dueDate: "Nov 25, 2024",
            taskCode: "122",
            surgeon: "นพ มานะ",
            hospital: "โรงพยาบาลจุฬา",
            isCompleted: true,
            subtasks: [
                {
                    id: "15",
                    name: "Case 122 - Production setup",
                    assignee: { id: 5, avatar: "/avatar5.jpg", name: "Preeyapat Chokchai" },
                    isCompleted: true,
                    tag: "manufacturing",
                }
            ]
        },
        {
            id: "131",
            name: "Case 131 - Dental bridge - Dr.สุชาติ [รพ.ศิริราช]",
            assignees: [{ id: 1, avatar: "/avatar1.jpg", name: "Janwimon Kaewwilai" }],
            dueDate: "Nov 18, 2024",
            comments: 1,
            taskCode: "131",
            surgeon: "นพ สุชาติ",
            hospital: "โรงพยาบาลศิริราช",
            isCompleted: true,
            subtasks: [
                {
                    id: "16",
                    name: "Case 131 - Manufacturing",
                    assignee: { id: 1, avatar: "/avatar1.jpg", name: "Janwimon Kaewwilai" },
                    isCompleted: true,
                    tag: "manufacturing",
                }
            ]
        },
        {
            id: "132",
            name: "Case 132 - Hip revision surgery - Dr.วินัย [รพ.รามา]",
            assignees: [
                { id: 2, avatar: "/avatar2.jpg", name: "Thanyakan Satapornsiri" },
                { id: 3, avatar: "/avatar3.jpg", name: "Thitirat Pitijamroen" }
            ],
            dueDate: "Nov 20, 2024",
            taskCode: "132",
            surgeon: "นพ วินัย",
            hospital: "โรงพยาบาลรามา",
            isCompleted: true,
            subtasks: [
                {
                    id: "17",
                    name: "Case 132 - Quality check",
                    assignee: { id: 2, avatar: "/avatar2.jpg", name: "Thanyakan Satapornsiri" },
                    isCompleted: true,
                }
            ]
        }
    ],
    "COMPLETED": [
        {
            id: "133",
            name: "Case 133 - Knee arthroscopy - Dr.ประเสริฐ [รพ.จุฬา]",
            assignees: [{ id: 4, avatar: "/avatar4.jpg", name: "Kanokjan Mahametee" }],
            dueDate: "Nov 1, 2024",
            completed: true,
            taskCode: "133",
            surgeon: "นพ ประเสริฐ",
            hospital: "โรงพยาบาลจุฬา",
            isCompleted: true,
            subtasks: [
                {
                    id: "18",
                    name: "Case 133 - Final report",
                    assignee: { id: 4, avatar: "/avatar4.jpg", name: "Kanokjan Mahametee" },
                    isCompleted: true,
                }
            ]
        },
        {
            id: "134",
            name: "Case 134 - Spinal fusion - Dr.สมหมาย [รพ.ศิริราช]",
            assignees: [
                { id: 5, avatar: "/avatar5.jpg", name: "Preeyapat Chokchai" },
                { id: 6, avatar: "/avatar6.jpg", name: "Wasapol Pichitcharoenwong" }
            ],
            dueDate: "Oct 25",
            completed: true,
            taskCode: "134",
            surgeon: "นพ สมหมาย",
            hospital: "โรงพยาบาลศิริราช",
            isCompleted: true,
            subtasks: [
                {
                    id: "19",
                    name: "Case 134 - Case closure",
                    assignee: { id: 5, avatar: "/avatar5.jpg", name: "Preeyapat Chokchai" },
                    isCompleted: true,
                }
            ]
        }
    ]
};