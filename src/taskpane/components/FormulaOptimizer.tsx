import React, { useState, useEffect } from 'react';
import { Button, Textarea } from '@fluentui/react-components';
import { ArrowSyncRegular, CheckmarkRegular, DismissRegular, CopyRegular, TextAlignJustifyRegular } from '@fluentui/react-icons';
import { OptimizationResult } from './App';
import { beautifyFormula } from '../../utils/formulaBeautifier';

/* global Excel */

interface Props {
  settings: any;
}

const FormulaOptimizer: React.FC<Props> = ({ settings }) => {
  const [originalFormula, setOriginalFormula] = useState<string>('');
  const [optimizedFormula, setOptimizedFormula] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [hasResult, setHasResult] = useState<boolean>(false);

  useEffect(() => {
    // Register hotkey handler
    const handleKeyPress = async (event: KeyboardEvent) => {
      // Default: Ctrl+Shift+O
      if (event.ctrlKey && event.shiftKey && event.key === 'O') {
        event.preventDefault();
        await handleOptimize();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [settings]);

  const getActiveFormula = async (): Promise<string> => {
    return Excel.run(async (context) => {
      const range = context.workbook.getSelectedRange();
      range.load('formulas');
      await context.sync();

      const formula = range.formulas[0][0];
      if (typeof formula === 'string' && formula.startsWith('=')) {
        return formula;
      }
      throw new Error('Selected cell does not contain a formula');
    });
  };

  const handleOptimize = async () => {
    try {
      setLoading(true);
      setError('');
      setHasResult(false);

      console.log('=== Starting optimization ===');
      console.log('Settings:', settings);

      // Get formula from active cell
      const formula = await getActiveFormula();
      console.log('Formula extracted:', formula);
      setOriginalFormula(formula);

      // Build API URL
      const apiUrl = `${settings.apiEndpoint}/api/optimize`;
      console.log('API URL:', apiUrl);
      console.log('Provider:', settings.provider);
      console.log('API Key exists:', !!settings.apiKey);

      // Send to backend for optimization
      console.log('Sending request...');

      let response;
      try {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${settings.apiKey}`
          },
          body: JSON.stringify({
            formula,
            provider: settings.provider,
            apiKey: settings.apiKey
          })
        });
      } catch (fetchError: any) {
        console.error('Fetch error:', fetchError);
        throw new Error(`Network error: ${fetchError.message}. This may be due to CORS, HTTPS requirements, or network restrictions. Try using HTTPS backend or check if backend is running.`);
      }

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Result received:', result);

      setOptimizedFormula(result.optimized);
      setExplanation(result.explanation);
      setHasResult(true);

      // Save to history
      const historyItem: OptimizationResult = {
        original: formula,
        optimized: result.optimized,
        explanation: result.explanation,
        improvementPercentage: result.improvementPercentage,
        timestamp: new Date()
      };

      const history = JSON.parse(localStorage.getItem('optimizationHistory') || '[]');
      history.unshift(historyItem);
      if (history.length > 50) history.pop();
      localStorage.setItem('optimizationHistory', JSON.stringify(history));

      // Auto-replace if enabled
      if (settings.autoReplace) {
        await handleApply();
      }
    } catch (err: any) {
      console.error('Optimization error:', err);
      console.error('Error stack:', err.stack);
      const errorDetails = `${err.message}\n\nAPI: ${settings.apiEndpoint}/api/optimize\nProvider: ${settings.provider}\nHas API Key: ${!!settings.apiKey}`;
      setError(errorDetails);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange();
        range.formulas = [[optimizedFormula]];
        await context.sync();
      });
      setHasResult(false);
      setOriginalFormula('');
      setOptimizedFormula('');
      setExplanation('');
    } catch (err: any) {
      setError(err.message || 'Failed to apply formula');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedFormula);
  };

  const handleCancel = () => {
    setHasResult(false);
    setOriginalFormula('');
    setOptimizedFormula('');
    setExplanation('');
    setError('');
  };

  const handleBeautify = async () => {
    try {
      setLoading(true);
      setError('');
      setHasResult(false);

      console.log('=== Starting beautification ===');

      // Get formula from active cell
      const formula = await getActiveFormula();
      console.log('Formula extracted:', formula);
      setOriginalFormula(formula);

      // Beautify the formula locally (no API call needed)
      const beautified = beautifyFormula(formula);
      console.log('Formula beautified:', beautified);

      setOptimizedFormula(beautified);
      setExplanation('Formula has been formatted with proper indentation and line breaks for better readability.');
      setHasResult(true);
    } catch (err: any) {
      console.error('Beautification error:', err);
      setError(err.message || 'Failed to beautify formula');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner" />
        <p>Processing formula...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="error">{error}</div>
        <Button onClick={handleOptimize} style={{ marginTop: '16px' }}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!hasResult) {
    return (
      <div>
        <p style={{ marginBottom: '16px', color: '#605e5c' }}>
          Select a cell with a formula and click a button, or use the hotkey{' '}
          <strong>{settings.hotkey}</strong> for optimization
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button
            appearance="primary"
            icon={<ArrowSyncRegular />}
            onClick={handleOptimize}
          >
            Optimize with AI
          </Button>
          <Button
            appearance="secondary"
            icon={<TextAlignJustifyRegular />}
            onClick={handleBeautify}
          >
            Make Readable (No AI)
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="formula-section">
        <label className="formula-label">Original Formula</label>
        <div className="formula-box">{originalFormula}</div>
      </div>

      <div className="formula-section">
        <label className="formula-label">Result</label>
        <Textarea
          value={optimizedFormula}
          onChange={(_, data) => setOptimizedFormula(data.value)}
          className="formula-box editable"
          resize="vertical"
          rows={3}
        />
      </div>

      {explanation && (
        <div className="formula-section">
          <label className="formula-label">Explanation</label>
          <div className="explanation">{explanation}</div>
        </div>
      )}

      <div className="actions">
        <Button
          appearance="primary"
          icon={<CheckmarkRegular />}
          onClick={handleApply}
        >
          Apply
        </Button>
        <Button icon={<CopyRegular />} onClick={handleCopy}>
          Copy
        </Button>
        <Button icon={<DismissRegular />} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default FormulaOptimizer;
