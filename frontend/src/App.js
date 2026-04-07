import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './assets/styles/global';
import AppRoutes from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AppRoutes />
    </BrowserRouter>
  );
}
//cambios realizados
