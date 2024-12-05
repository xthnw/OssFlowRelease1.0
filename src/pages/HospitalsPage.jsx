import { HospitalList } from '../components/cases/HospitalList';
import { HOSPITALS_DATA } from '../data/hospitalsData';
import { useState } from 'react';

export const HospitalsPage = () => {
    const [hospitalsData, setHospitalsData] = useState(HOSPITALS_DATA);
    return (
        <HospitalList hospitalsData={hospitalsData} setHospitalsData={setHospitalsData} />
    );
}