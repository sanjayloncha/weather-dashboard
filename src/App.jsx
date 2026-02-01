
import './App.css'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from './pages/Dashboard'
import { CityDetail } from './pages/CityDetail'

export const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/city/:cityName" element={<CityDetail />} />
    </Routes>
  );
};

