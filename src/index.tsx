/* eslint-disable no-prototype-builtins */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from 'app/app';
import 'react-calendar/dist/Calendar.css';
import './index.css';
import { ThemeStoreProvider } from 'app/shared/utils';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <ThemeStoreProvider>
    <App />
  </ThemeStoreProvider>,
);
