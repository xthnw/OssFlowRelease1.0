import React from 'react';
import { LayoutGrid, List, Filter, User, Users, Settings } from 'lucide-react';

export const TopActions = ({ currentView, setCurrentView }) => {
    return (
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
    );
}