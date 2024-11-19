// App.js
import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import { AuthContext } from './store/authContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Post from './store/postContext'

const App = () => {
  const { setUser } = useContext(AuthContext); 

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); 
  }, []); 


  return (
    <div>
      <Post>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />

        </Routes>
      </Router>
      </Post>
    </div>
  );
};

export default App;
