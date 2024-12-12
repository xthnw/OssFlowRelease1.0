import React from 'react';
import { ChevronRight, Search, Bell, MessageCircle, User } from 'lucide-react';
import { NotificationPopover } from '../cases/NotificationPopover';
import { ChatNotificationPopover } from '../cases/ChatNotificationPopover';

export const TopBar = () => {
    return (
        <div className="h-14 border-b flex items-center justify-between px-4">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-600">
                <span>OssFlow Space</span>
                <ChevronRight className="w-4 h-4 mx-1" />
                <span>Cases</span>
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="font-medium text-gray-900">Medical Device</span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
                <Search className="w-5 h-5 text-gray-400" />
                {/* <Bell className="w-5 h-5 text-gray-400" /> */}
                <NotificationPopover />
                {/* <MessageCircle className="w-5 h-5 text-gray-400" /> */}
                <ChatNotificationPopover />
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
}