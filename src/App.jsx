import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  const location = useLocation();
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  const initialRoute = accessToken ? (
    <Route exact path="/" element={<Overview />} />
  ) : (
    <Route exact path="/" element={<Login />} />
  );

  return (
    <>
      <Routes>
        {initialRoute}
        <Route exact path="/log-in" element={<Login />} />
        <Route exact path="/sign-up" element={<Signup />} />
        <Route exact path="/ecommerce/:category" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
