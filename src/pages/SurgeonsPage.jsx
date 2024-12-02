import { SurgeonList } from '../components/cases/SurgeonList';
import { SURGEONS_DATA } from '../data/surgeonsData';
import { useState } from 'react';

export const SurgeonsPage = () => {
    const [surgeonsData, setSurgeonsData] = useState(SURGEONS_DATA);
    return (
        <SurgeonList surgeonsData={surgeonsData} setSurgeonsData={setSurgeonsData} />
    );
}