import React from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import App from './components/App';
import './taskpane.css';

/* global document, Office */

const rootElement = document.getElementById('container');
const root = createRoot(rootElement!);

Office.onReady(() => {
  root.render(
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  );
});
