import './style/index.scss'

// export * from './components/alert'
// export * from './components/menu'
// export * from './components/tabs'
// export * from './components/button'
// export * from './components/input'
// export * from './components/select'
// export * from './components/upload'
// export * from './components/modal'
// export { default as Form } from './components/form'

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

// axios.defaults.headers['x-icode'] = '23C110887E0A0149'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
