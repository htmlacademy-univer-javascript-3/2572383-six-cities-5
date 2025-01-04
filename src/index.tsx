import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {store} from './store';
import {Provider} from 'react-redux';
import {checkAuthAction} from './store/api-actions.ts';

await store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
