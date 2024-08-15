import React from 'react';
import './App.css';
import HomeContainer from './Pages/Home/HomeContainer';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";



function App() {
  return (
    <div>
      <Router>

        <Routes>
          <Route path="/login" element={
            <Login/>
          }/>

          <Route path="/sign-up" element={
            <SignUp/>
          }/>

          <Route path="/" element={
            <HomeContainer/>
          }/>

          <Route path="*" element={
            <Navigate to="/" replace/>
          }/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
