// src/App.js
// SpeechToText.js
import g from './assessts/gemini.jpg'
import './css/login.css'
import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
// const cors = require('cors');

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Assuming you have defined `username` and `password` somewhere in your code
      const response = await axios.post('/api/register', { username, password });
  
      console.log(response.data.message);
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };


  return (
    <div className='login'>
        <img className="gemini" src={g} alt='loading...' />

      <h1>ENTER DETAILS 🫡</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <Link to="/"><button onClick={handleRegister}>Register</button></Link>
    </div>
  );
}

export default App;
