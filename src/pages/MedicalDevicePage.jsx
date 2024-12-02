import { useState } from 'react';
import { ListView } from '../components/cases/ListView';
import { BoardView } from '../components/cases/BoardView';
import { TopActions } from '..//components/layout/TopActions';
import { TASKS_DATA } from '../data/tasksData';

export const MedicalDevicePage = () => {
    const [currentView, setCurrentView] = useState('list');
    const [tasksData, setTasksData] = useState(TASKS_DATA);

    return (
        <>
            <TopActions currentView={currentView} setCurrentView={setCurrentView} />
            {currentView === 'list' ? (
                <ListView tasksData={tasksData} setTasksData={setTasksData} />
            ) : (
                <BoardView tasksData={tasksData} setTasksData={setTasksData} />
            )}
        </>
    );
};