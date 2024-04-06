import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Footer } from './pages/layout';
import { Home } from './pages/home';
import { Products } from './pages/products';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Route

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/Products" element={<Products />} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
