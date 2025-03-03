import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Intro from './Intro';
import Puzzle from './Puzzle';
import './App.css';
import Photos from './Photos';


function App() {
  return (
    <div className="app-container"> {/* ✅ Ensure everything is inside a wrapper */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Intro" element={<Intro />} />
        <Route path="/Puzzle" element={<Puzzle />} />
        <Route path="/Photos" element={<Photos />} />
      </Routes>
    </div>
  );
}


function Home() {
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [audio] = useState(new Audio('/lightsaber-sound.mp3'));
  const [buttonClickAudio] = useState(new Audio('/ignition-sound.mp3'));

  useEffect(() => {
    audio.volume = 0.5;

    const handleMouseMove = (e) => {
      if (!audioInitialized) return;

      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
      document.body.appendChild(trail);

      audio.currentTime = 0;
      audio.play().catch((err) => console.error('Error playing audio:', err));

      setTimeout(() => {
        trail.remove();
      }, 1000);
    };

    const handleClick = () => {
      if (!audioInitialized) {
        audio.play().then(() => {
          audio.pause();
          setAudioInitialized(true);
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [audioInitialized, audio]);

  const handleButtonClick = () => {
    buttonClickAudio.play().catch((err) => console.error('Error playing button click audio:', err));
  };

  return (
    <div className="home-container">
      <div className="image-container">
        <img
          className="audio-init-image"
          src="darth.png"
          alt="Cue Audio"
          onClick={() => setAudioInitialized(true)}
        />
        <div className="speech-bubble">
          <span className="speech-text">click anywhere on the screen :)</span>
        </div>
      </div>

      <div className="stars">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      <h1>choose your year</h1>

      <div className="button-container">
        <a className="custom-button" href="https://sidbday24.vercel.app" onClick={handleButtonClick}>
          2024
        </a>
        <Link className="custom-button" to="/Puzzle" onClick={handleButtonClick}>
          2025
        </Link>
      </div>
    </div>
  );
}

export default App;
