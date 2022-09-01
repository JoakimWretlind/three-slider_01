import React from 'react';
import ReactDOM from 'react-dom/client';
import { Curtains } from "react-curtains";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Curtains
      pixelRatio={Math.min(1.5, window.devicePixelRatio)}
      autoRender={false} // we'll use gsap ticker in App.js instead
    >
      <App />
    </Curtains>
  </React.StrictMode>
);
