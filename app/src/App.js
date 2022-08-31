import './App.css';
import Search from './Components/Search/Search';
import Home from './Pages/Home';
import Pets from './Pages/Pets';
import Profile from './Pages/Profile';
import Messages from './Messaging/Messages';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </div>
  );
}

export default App;
