import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "@components/App/App";

const domNode = document.getElementById('root') as Element;
const root = ReactDOM.createRoot(domNode);

root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);