import React, { useState, useEffect } from 'react';
import { Button } from '@fluentui/react-components';
import { DeleteRegular, ArrowSyncRegular } from '@fluentui/react-icons';
import { OptimizationResult } from './App';

/* global Excel */

const History: React.FC = () => {
  const [history, setHistory] = useState<OptimizationResult[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const saved = localStorage.getItem('optimizationHistory');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert timestamp strings back to Date objects
      const withDates = parsed.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));
      setHistory(withDates);
    }
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      localStorage.removeItem('optimizationHistory');
      setHistory([]);
    }
  };

  const handleApplyHistoryItem = async (item: OptimizationResult) => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange();
        range.formulas = [[item.optimized]];
        await context.sync();
      });
    } catch (error: any) {
      alert(`Failed to apply formula: ${error.message}`);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (history.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: '#605e5c' }}>
        <p>No optimization history yet</p>
        <p style={{ fontSize: '12px', marginTop: '8px' }}>
          Optimized formulas will appear here
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '13px', color: '#605e5c' }}>
          {history.length} optimization{history.length !== 1 ? 's' : ''}
        </p>
        <Button
          size="small"
          icon={<DeleteRegular />}
          onClick={handleClearHistory}
        >
          Clear
        </Button>
      </div>

      {history.map((item, index) => (
        <div key={index} className="history-item">
          <div style={{ marginBottom: '8px' }}>
            <div className="history-formula" style={{ color: '#a4262c' }}>
              {item.original}
            </div>
            <div className="history-formula" style={{ color: '#107c10' }}>
              {item.optimized}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="history-date">{formatDate(item.timestamp)}</span>
            <Button
              size="small"
              appearance="subtle"
              icon={<ArrowSyncRegular />}
              onClick={() => handleApplyHistoryItem(item)}
            >
              Apply to selected
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
