import React, { useState } from 'react';
import { Bell, X, CheckCircle } from 'lucide-react';

export const NotificationPopover = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: 'Case 126 - Hip replacement surgery',
      message: 'คุณถูกมอบหมายงาน "Case 126 - Patient consultation"',
      doctor: 'Dr.วิชัย',
      hospital: 'รพ.รามา',
      time: '2 ชั่วโมงที่แล้ว',
      isRead: false
    },
    {
      id: 2,
      title: 'Case 125 - Knee surgery',
      message: 'มีการอัพเดทสถานะงาน "Manufacturing" เป็น "ผลิตสำเร็จ"',
      doctor: 'Dr.สมชาย',
      hospital: 'รพ.ศิริราช',
      time: '3 ชั่วโมงที่แล้ว',
      isRead: false
    },
    {
      id: 3,
      title: 'Case 124 - Dental implant',
      message: 'คุณได้รับการแจ้งเตือนการนัดหมาย "Patient follow-up"',
      doctor: 'Dr.มานี',
      hospital: 'รพ.จุฬา',
      time: '1 วันที่แล้ว',
      isRead: true
    }
  ];

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      >
        <Bell className="w-5 h-5 text-gray-400" />
        {/* Notification Badge */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
          2
        </span>
      </button>

      {/* Notification Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-sm font-semibold text-gray-900">การแจ้งเตือน</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                  notification.isRead ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {notification.isRead ? (
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      ในเคส {notification.title} - {notification.doctor} [{notification.hospital}]
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t px-4 py-3">
            <button className="text-sm text-teal-600 hover:text-teal-500 font-medium">
              ทำเครื่องหมายว่าอ่านแล้วทั้งหมด
            </button>
          </div>
        </div>
      )}
    </div>
  );
};