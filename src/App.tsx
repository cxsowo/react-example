import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" lazy={() => import('pages/About')} />
    </Routes>
  );
}

export default React.memo(App);
