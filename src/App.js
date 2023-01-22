import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useState } from 'react';
import { db } from './firebase';
import { UserContext } from './contexts/UserContext';

function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [povertyPoints, setPovertyPoints] = useState(0);
  const [premiumPoints, setPremiumPoints] = useState(0);
  const [dirt, setDirt] = useState(0);
  const [roster, setRoster] = useState(null);

  return (
    <UserContext.Provider value={{ 
      user, setUser, 
      name, setName,
      povertyPoints, setPovertyPoints, 
      premiumPoints, setPremiumPoints,
      dirt, setDirt,
      roster, setRoster
    }}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
