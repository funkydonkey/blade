import React from 'react';
import {
  Input,
  Label,
  Dropdown,
  Option,
  Switch,
  Button
} from '@fluentui/react-components';
import { SaveRegular } from '@fluentui/react-icons';

interface Props {
  settings: any;
  onSettingsChange: (settings: any) => void;
}

const Settings: React.FC<Props> = ({ settings, onSettingsChange }) => {
  const handleChange = (field: string, value: any) => {
    onSettingsChange({
      ...settings,
      [field]: value
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <Label htmlFor="provider">AI Provider</Label>
        <Dropdown
          id="provider"
          value={settings.provider}
          onOptionSelect={(_, data) => handleChange('provider', data.optionValue)}
          style={{ width: '100%' }}
        >
          <Option value="openai">OpenAI (GPT-4)</Option>
          <Option value="anthropic">Anthropic (Claude)</Option>
          <Option value="google">Google (Gemini)</Option>
          <Option value="ollama">Ollama (Local)</Option>
        </Dropdown>
      </div>

      <div>
        <Label htmlFor="apiKey">API Key</Label>
        <Input
          id="apiKey"
          type="password"
          value={settings.apiKey}
          onChange={(_, data) => handleChange('apiKey', data.value)}
          style={{ width: '100%' }}
          placeholder="Enter your API key"
        />
      </div>

      <div>
        <Label htmlFor="apiEndpoint">Backend API Endpoint</Label>
        <Input
          id="apiEndpoint"
          type="text"
          value={settings.apiEndpoint}
          onChange={(_, data) => handleChange('apiEndpoint', data.value)}
          style={{ width: '100%' }}
          placeholder="http://localhost:5000"
        />
      </div>

      <div>
        <Label htmlFor="hotkey">Hotkey</Label>
        <Input
          id="hotkey"
          type="text"
          value={settings.hotkey}
          onChange={(_, data) => handleChange('hotkey', data.value)}
          style={{ width: '100%' }}
          placeholder="Ctrl+Shift+O"
          disabled
        />
        <p style={{ fontSize: '11px', color: '#605e5c', marginTop: '4px' }}>
          Custom hotkey configuration coming soon
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Switch
          checked={settings.autoReplace}
          onChange={(_, data) => handleChange('autoReplace', data.checked)}
        />
        <Label>Auto-replace formulas without confirmation</Label>
      </div>

      <div style={{ marginTop: '16px', padding: '12px', background: '#f3f2f1', borderRadius: '4px' }}>
        <p style={{ fontSize: '12px', marginBottom: '8px' }}>
          <strong>Privacy Notice:</strong>
        </p>
        <p style={{ fontSize: '11px', color: '#605e5c' }}>
          Formulas are sent to the selected AI provider for analysis.
          No formula data is stored on our servers. Please review your
          AI provider's privacy policy.
        </p>
      </div>
    </div>
  );
};

export default Settings;
