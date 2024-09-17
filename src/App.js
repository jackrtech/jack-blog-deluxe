import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SinglePost from './pages/SinglePost';
import About from './pages/About';
import Header from './components/Header';


export default function MyApp() {
  return (
    <div>
      <Router>
      <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/:id" element={<SinglePost />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  )
}
