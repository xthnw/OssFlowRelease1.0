import React, { useState } from 'react';
import { MessageCircle, X, AtSign, Users, RefreshCcw } from 'lucide-react';

export const ChatNotificationPopover = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Mock chat notifications data
  const notifications = [
    {
      id: 1,
      type: 'system-status',
      message: 'สถานะถูกเปลี่ยนจาก "Manufacturing" เป็น "ผลิตสำเร็จ"',
      mentionType: 'everyone',
      case: 'Case 126 - Hip replacement surgery',
      time: '30 นาทีที่แล้ว',
      author: 'System',
      isRead: false
    },
    {
      id: 2,
      type: 'user-mention',
      message: 'เคสนี้ผมจัดการให้แล้วนะ',
      mentionType: 'personal',
      case: 'Case 125 - Knee surgery',
      time: '2 ชั่วโมงที่แล้ว',
      author: 'Dr.สมชาย',
      isRead: false
    },
    {
      id: 3,
      type: 'system-mention',
      message: 'กรุณาตรวจสอบการอัพเดทแบบในเคสนี้',
      mentionType: 'everyone',
      case: 'Case 124 - Dental implant',
      time: '1 วันที่แล้ว',
      author: 'System',
      isRead: true
    }
  ];

  const getMentionIcon = (type) => {
    switch (type) {
      case 'everyone':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'personal':
        return <AtSign className="w-4 h-4 text-teal-500" />;
      default:
        return <MessageCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getMentionBadge = (type) => {
    switch (type) {
      case 'everyone':
        return (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            @everyone
          </span>
        );
      case 'personal':
        return (
          <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
            @mention
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Chat Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      >
        <MessageCircle className="w-5 h-5 text-gray-400" />
        {/* Notification Badge */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
          2
        </span>
      </button>

      {/* Chat Notification Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-sm font-semibold text-gray-900">การแจ้งเตือนการแชท</h3>
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
                    {getMentionIcon(notification.mentionType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {notification.author}
                      </span>
                      {getMentionBadge(notification.mentionType)}
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      ในเคส {notification.case}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{notification.time}</p>
                  </div>
                  {!notification.isRead && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t px-4 py-3 flex justify-between items-center">
            <button className="text-sm text-teal-600 hover:text-teal-500 font-medium flex items-center space-x-1">
              <span>ทำเครื่องหมายว่าอ่านแล้วทั้งหมด</span>
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-600 flex items-center space-x-1">
              <RefreshCcw className="w-4 h-4" />
              <span>รีเฟรช</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};