import { HashRouter, Routes, Route } from 'react-router-dom';
import { InvitationProvider } from './context/InvitationContext';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage/LandingPage';
import BuilderPage from './pages/BuilderPage/BuilderPage';
import PreviewPage from './pages/PreviewPage/PreviewPage';
import SharedInvitePage from './pages/SharedInvitePage/SharedInvitePage';
import AuthPage from './pages/AuthPage/AuthPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <InvitationProvider>
        <HashRouter>
          <div className="app-container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/preview" element={<PreviewPage />} />
              <Route path="/invite/:encodedData" element={<SharedInvitePage />} />
            </Routes>
          </div>
        </HashRouter>
      </InvitationProvider>
    </AuthProvider>
  );
}

export default App;
