import React from 'react';
import './App.css';
import HomeContainer from './Pages/Home/HomeContainer';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import { ThemeProvider } from '@emotion/react';
import themeList from './Theme/theme';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const  App = () => {
  return (
    <ThemeProvider theme={themeList[0]}>
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
    </ThemeProvider>
  );
}

export default App;