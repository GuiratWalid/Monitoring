import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import VisitorComponent from './Pages/Visitor.js';
import ErrorComponent from './Pages/Error.js';
import AccountComponent from './Pages/Account.js';
import UseCaseComponent from './Pages/UseCase.js';
import Home from './Pages/Home.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './Components/NavBar.js';
import { modeContext } from './Context/ModeContext.js';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const value = { darkMode, setDarkMode };
  return (
    <modeContext.Provider value={value}>
      <div className={`App bg-${darkMode ? 'dark' : 'light'}`}>
        <BrowserRouter>
          <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="mainContent">
            <Route path="/" component={Home} />
            <Route path="/Visitor" component={VisitorComponent} />
            <Route path="/Error" component={ErrorComponent} />
            <Route path="/Account" component={AccountComponent} />
            <Route path="/UseCase" component={UseCaseComponent} />
          </div>
        </BrowserRouter>
      </div >
    </modeContext.Provider >
  );
}

export default App;
