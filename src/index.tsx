import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {mockOffers} from './mocks/offers.ts';
import {store} from './store';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={mockOffers}/>
    </Provider>
  </React.StrictMode>
);
