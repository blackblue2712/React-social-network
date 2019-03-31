import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import MainRouter from './MainRouter';
// import Loading from './components/Loading';


const App = () => (
  <BrowserRouter>
    <MainRouter></MainRouter>
  </BrowserRouter>
)

export default App;
