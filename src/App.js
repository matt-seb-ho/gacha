import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useState } from 'react';
import { db } from './firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  async function handleSignIn(email, password) {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCred.user);
  }
  return (
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
  );
}

export default App;
