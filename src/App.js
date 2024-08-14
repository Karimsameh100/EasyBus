import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TripList } from './Pages/TripList';
import { CityDetailes } from './Pages/CityDetailes';

function App() {
  return (
    <BrowserRouter >
    <Routes>
      <Route path='/listtrips' element={<TripList />}  />
      <Route path='/City/:id' element={<CityDetailes />}  />


    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
