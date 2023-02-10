import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

const domNode = document.getElementById('root') as Element;
const root = ReactDOM.createRoot(domNode);

const store = setupStore();

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
