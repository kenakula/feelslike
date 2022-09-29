/* eslint-disable no-prototype-builtins */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from 'app/app';
import './index.css';

if (
  !new (class {
    x: any;
  })().hasOwnProperty('x')
)
  throw new Error('Transpiler is not configured correctly');

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(<App />);
