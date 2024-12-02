import "./styles.css";
import "./index.css";
import { MedicalDevicePage } from ".//pages/MedicalDevicePage";
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { HospitalsPage } from './pages/HospitalsPage';
import { SurgeonsPage } from './pages/SurgeonsPage';
import { TeamPage } from './pages/TeamPage';
import { MainLayout } from './/components/layout/MainLayout';
import { Test } from './pages/Test';
import { Merge } from './/components/Merge';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/medical" element={<MainLayout><MedicalDevicePage /></MainLayout>} />
      <Route path="/hospitals" element={<MainLayout><HospitalsPage /></MainLayout>} />
      <Route path="/surgeons" element={<MainLayout><SurgeonsPage /></MainLayout>} />
      <Route path="/team" element={<MainLayout><TeamPage /></MainLayout>} />
      <Route path="/test" element={<Test />} />
      <Route path="/mergeallfortest" element={<Merge />} />
    </Routes>
  );
}
