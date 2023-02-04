import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const domNode = document.getElementById('root') as Element;
const root = ReactDOM.createRoot(domNode);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
