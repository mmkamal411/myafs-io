import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import CreatePage from './pages/CreatePage';
import PlanPage from './pages/PlanPage';
import DesignPage from './pages/DesignPage';
import CodePage from './pages/CodePage';
import TestPage from './pages/TestPage';
import DeployPage from './pages/DeployPage';
import MonitorPage from './pages/MonitorPage';
import SettingsPage from './pages/SettingsPage';
import CatalogPage from './pages/CatalogPage';
import TemplatesPage from './pages/TemplatesPage';
import DocumentationPage from './pages/DocumentationPage';
import ExplorePage from './pages/ExplorePage';
import DatabasePage from './pages/DatabasePage';
import ApiGatewayPage from './pages/ApiGatewayPage';
import SecurityPage from './pages/SecurityPage';
import VersionControlPage from './pages/VersionControlPage';
import NotFoundPage from './pages/NotFoundPage';
import NotificationsPage from './pages/NotificationsPage';
import FinOpsPage from './pages/FinOpsPage';
import AvaChat from './components/AvaChat';
import CollaborateChat from './components/CollaborateChat';
import { SearchProvider } from './components/Search/SearchContext';

function App() {
  const [externalUrl, setExternalUrl] = useState<string | null>(null);

  return (
    <Router>
      <SearchProvider>
        <div className="min-h-screen bg-light-50">
          <Header onExternalNavigation={setExternalUrl} />
          <main className="pt-16">
            {externalUrl ? (
              <iframe
                src={externalUrl}
                className="w-full h-[calc(100vh-4rem)] border-none"
                title="External content"
              />
            ) : (
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/plan" element={<PlanPage />} />
                <Route path="/design" element={<DesignPage />} />
                <Route path="/code" element={<CodePage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/deploy" element={<DeployPage />} />
                <Route path="/monitor" element={<MonitorPage />} />
                <Route path="/finops" element={<FinOpsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route path="/documentation" element={<DocumentationPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/database" element={<DatabasePage />} />
                <Route path="/api-gateway" element={<ApiGatewayPage />} />
                <Route path="/security" element={<SecurityPage />} />
                <Route path="/version-control" element={<VersionControlPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            )}
          </main>
          <AvaChat />
          <CollaborateChat />
        </div>
      </SearchProvider>
    </Router>
  );
}

export default App;