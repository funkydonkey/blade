import React, { useState, useEffect } from 'react';
import {
  Button,
  Textarea,
  Spinner,
  Tab,
  TabList
} from '@fluentui/react-components';
import { ArrowSyncRegular, CopyRegular, SettingsRegular } from '@fluentui/react-icons';
import FormulaOptimizer from './FormulaOptimizer';
import Settings from './Settings';
import History from './History';

export interface OptimizationResult {
  original: string;
  optimized: string;
  explanation: string;
  improvementPercentage?: number;
  timestamp: Date;
}

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('optimizer');
  const [settings, setSettings] = useState({
    apiKey: '',
    provider: 'openai',
    autoReplace: false,
    hotkey: 'Ctrl+Shift+O',
    apiEndpoint: 'http://localhost:5000'
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('aiFormulaOptimizerSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingsChange = (newSettings: any) => {
    setSettings(newSettings);
    localStorage.setItem('aiFormulaOptimizerSettings', JSON.stringify(newSettings));
  };

  return (
    <div className="app">
      <div className="header">
        <h1>AI Formula Optimizer</h1>
        <p>Optimize Excel formulas using AI</p>
      </div>

      <TabList
        selectedValue={selectedTab}
        onTabSelect={(_, data) => setSelectedTab(data.value as string)}
      >
        <Tab value="optimizer" icon={<ArrowSyncRegular />}>
          Optimizer
        </Tab>
        <Tab value="history" icon={<CopyRegular />}>
          History
        </Tab>
        <Tab value="settings" icon={<SettingsRegular />}>
          Settings
        </Tab>
      </TabList>

      <div className="content">
        {selectedTab === 'optimizer' && <FormulaOptimizer settings={settings} />}
        {selectedTab === 'history' && <History />}
        {selectedTab === 'settings' && (
          <Settings settings={settings} onSettingsChange={handleSettingsChange} />
        )}
      </div>
    </div>
  );
};

export default App;
