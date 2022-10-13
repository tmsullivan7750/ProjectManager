import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from "./Pages/Login"
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from './Pages/Dashboard';
import Tickets from './Pages/Tickets'
import Administration from './Pages/Administration'

function App() {
  return(
        <div>
          <BrowserRouter basename="/ProjectManager">
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/Tickets" element={<Tickets />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/Administration" element={<Administration />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </div>
  )
}

export default App;
