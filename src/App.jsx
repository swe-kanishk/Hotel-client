// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Layout from './Layout';
import Home from './pages/Home';
import ListingDetailPage from './pages/ListingDetailPage';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/listings/:id" element={<Layout><ListingDetailPage /></Layout>} />
      </Routes>
    </UserProvider>
  );
}

export default App;