export const COMMENTS_DATA = {
    "125": [
        {
            id: "c1",
            taskId: "125",
            userId: "u1",
            userName: "Janwimon Kaewwilai",
            userAvatar: "/avatars/avatar1.jpg",
            content: "ได้รับ CT Scan มาแล้ว รอทีม review",
            timestamp: "2024-12-13T08:30:00Z",
            mentions: [],
            reactions: [
                {
                    type: "thumbsUp",
                    label: "เห็นด้วย",
                    users: [{ id: "u2", name: "John Smith" }]
                }
            ]
        },
        {
            id: "c2",
            taskId: "125",
            userId: "u3",
            userName: "Mary Johnson",
            userAvatar: "/avatars/avatar2.jpg",
            content: "@Janwimon Kaewwilai เดี๋ยวช่วย review ให้บ่ายนี้นะ",
            timestamp: "2024-12-13T09:15:00Z",
            mentions: ["u1"],
            parentId: "c1",
            reactions: [
                {
                    type: "checkCircle",
                    label: "การเสร็จสิ้น",
                    users: [{ id: "u1", name: "Janwimon Kaewwilai" }]
                }
            ]
        },
        {
            id: "c3",
            taskId: "125",
            userId: "u3",
            userName: "Mary Johnson",
            userAvatar: "/avatars/avatar3.jpg",
            content: "@Janwimon Kaewwilai เดี๋ยวช่วย review ให้บ่ายนี้นะ",
            timestamp: "2024-12-13T09:15:00Z",
            mentions: ["u1"],
            reactions: [
                {
                    type: "checkCircle",
                    label: "การเสร็จสิ้น",
                    users: [{ id: "u1", name: "Janwimon Kaewwilai" }]
                }
            ]
        },
        {
            id: "c4",
            taskId: "125",
            userId: "u3",
            userName: "Mary Johnson",
            userAvatar: "/avatars/avatar3.jpg",
            content: "@Janwimon Kaewwilai เดี๋ยวช่วย review ให้บ่ายนี้นะ",
            timestamp: "2024-12-13T09:15:00Z",
            mentions: ["u1"],
            reactions: [
                {
                    type: "checkCircle",
                    label: "การเสร็จสิ้น",
                    users: [{ id: "u1", name: "Janwimon Kaewwilai" }]
                }
            ]
        },
        {
            id: "c5",
            taskId: "125",
            userId: "u4",
            userName: "OssFlow System",
            userAvatar: "/avatars/avatar1.jpg",
            content: "Case Status Changed from \n@Manufacturing to Delivery",
            timestamp: "2024-12-13T08:30:00Z",
            mentions: [],
            reactions: [
                {
                    type: "thumbsUp",
                    label: "เห็นด้วย",
                    users: [{ id: "u2", name: "John Smith" }]
                }
            ]
        },
    ]
};