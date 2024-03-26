import React from 'react';
import ReactDOM from 'react-dom/client'
import { LoginForm } from './UserComponents/LoginForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ItemGrid } from './ItemsComponents/ItemGrid';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <LoginForm/>
      <Routes>
        <Route path='/item' element={<ItemGrid/>}/>
      </Routes>
    </Router>
  </React.StrictMode>,
)
