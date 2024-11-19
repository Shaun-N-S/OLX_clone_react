// src/Components/Signup/Signup.jsx
import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore();

    try {
      // Create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with username
      await updateProfile(user, { displayName: username });
      console.log("Profile updated successfully");
      console.log({
        id: user.uid,
        username: username,
        phone: phone,
        email: email,
      })
      // Add user data to Firestore
      await addDoc(collection(db, 'users'), {
        id: user.uid,
        username: username,
        phone: phone,
        email: email,
      });

      // Redirect to login page
      navigate("/login");

    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  return (
    <div className="signupParentDiv">
      <div className="logoContainer">
        <img src={Logo} alt="OLX Logo" width="200" height="200" />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          name="name"
          required
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          required
        />
        <br />
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          id="phone"
          name="phone"
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          required
        />
        <button type="submit">Signup</button>
      </form>
      <a href="/login">Already have an account? Login</a>
    </div>
  );
}
