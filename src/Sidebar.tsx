import './App.css';
import App from "./App";
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Loginar from './Loginar';
import Explorer from './explorer';
import Support from './Support';

function Sidebar() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/bundlr' element={<App/>} />
          <Route path='/arweave' element={<Loginar/>} />
          <Route path='/explorer' element={<Explorer/>}/>
          <Route path='/support' element={<Support/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default Sidebar;