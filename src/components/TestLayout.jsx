import React, { useState } from 'react';
import { TASKS_DATA } from '../data/tasksData';
import { Sidebar } from './layout/Sidebar';
import { TopBar } from './layout/TopBar';
import { TopActions } from './layout/TopActions';
import { ListView } from './cases/ListView';
import { CreateCaseModal } from './cases/CreateCaseModal';

const TestLayout = () => {
  const [currentView, setCurrentView] = useState('list');
  const [showCreateCase, setShowCreateCase] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar setShowCreateCase={setShowCreateCase} />
      <div className="flex-1 pr-2 py-2 mt-8 relative">
        <div className="bg-white rounded-lg shadow border border-gray-200 flex flex-col h-full overflow-hidden">
          <TopBar />
          <TopActions currentView={currentView} setCurrentView={setCurrentView} />
          <ListView />
        </div>
        <CreateCaseModal
          isOpen={showCreateCase}
          onClose={() => setShowCreateCase(false)}
        />
      </div>
    </div>
  );
};

export default TestLayout;