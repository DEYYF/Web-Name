import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './UserComponents/LoginForm';
import { ItemGrid } from './ItemsComponents/ItemGrid';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/items" element={<ItemGrid />} />
      </Routes>
    </Router>
)
    



