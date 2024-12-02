import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { CreateCaseModal } from '../cases/CreateCaseModal';
import { useState } from 'react';

export const MainLayout = ({ children }) => {
    const [showCreateCase, setShowCreateCase] = useState(false);
    
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar setShowCreateCase={setShowCreateCase} />
            <div className="flex-1 pr-2 py-2 mt-8 relative">
                <div className="bg-white rounded-lg shadow border-gray-200 flex flex-col h-full overflow-hidden">
                    <TopBar />
                    {children}
                </div>
                <CreateCaseModal isOpen={showCreateCase} onClose={() => setShowCreateCase(false)} />
            </div>
        </div>
    );
}