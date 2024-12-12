import "./styles.css";
import "./index.css";
import "./datepicker.css";
import { MedicalDevicePage } from ".//pages/MedicalDevicePage";
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { HospitalsPage } from './pages/HospitalsPage';
import { SurgeonsPage } from './pages/SurgeonsPage';
import { TeamPage } from './pages/TeamPage';
import { MainLayout } from './/components/layout/MainLayout';
import { TeamLayout } from './/components/layout/TeamLayout';
import { Test } from './pages/Test';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Merge } from './/components/Merge';
import { MagicLinkPreview } from './pages/MagicLinkPreview';
import { DashboardPage } from './pages/DashboardPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
      <Route path="/medical" element={<MainLayout><MedicalDevicePage /></MainLayout>} />
      <Route path="/hospitals" element={<MainLayout><HospitalsPage /></MainLayout>} />
      <Route path="/surgeons" element={<MainLayout><SurgeonsPage /></MainLayout>} />
      <Route path="/team" element={<MainLayout><TeamPage /></MainLayout>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/test" element={<Test />} />
      <Route path="/mergeallfortest" element={<Merge />} />
      <Route path="/track/:taskId" element={<MagicLinkPreview />} />



      <Route path="/teammember_view" element={<TeamLayout><HomePage /></TeamLayout>} />
    </Routes>
  );
}
