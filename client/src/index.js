import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/App.js';

// This is how things are done after React 18:
const domNode = document.getElementById("root")

const root = createRoot(domNode);
root.render(<App />);

// Below is before React 18:
// ReactDOM.render(<App />, document.getElementById("root"));



