import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Intro.css';
import LightsaberCursor from './LightsaberCursor'; // Import the cursor component

const StarWarsIntro = () => {
    const [showLogo, setShowLogo] = useState(false);
    const [showScroll, setShowScroll] = useState(false);
    const [audioPlayed, setAudioPlayed] = useState(false); // State to track if background music has been played
    const [logoShown, setLogoShown] = useState(false); // State to track if the logo has been shown before
    const backgroundMusicRef = useRef(null); // Ref to track the background music instance
    const navigate = useNavigate(); // Get the navigate function

    const handleScreenClick = () => {
        const ignitionAudio = new Audio('/ignition-sound.mp3');
        ignitionAudio.play();
        // If the logo has already been shown, don't do anything
        if (logoShown) return;

        setLogoShown(true); // Mark that the logo has been shown
        setShowLogo(true);

        // Check if the background music has already been played
        if (!audioPlayed) {
            const backgroundMusic = new Audio('/theme-song.mp3');
            backgroundMusicRef.current = backgroundMusic; // Store the background music instance
            backgroundMusic.play();
            backgroundMusic.loop = false; // Make sure it doesn't loop
            setAudioPlayed(true); // Set flag to prevent it from playing again
        }

        setTimeout(() => {
            setShowLogo(false);
            setShowScroll(true);
        }, 7000); // Increased to 7 seconds for the logo animation to stay longer
    };

    useEffect(() => {
        if (showScroll) {
            const timer = setTimeout(() => {
                navigate('/puzzle'); // Redirect to another page
            }, 20000); // Adjust the time according to the length of your scrolling text

            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [showScroll, navigate]);

    return (
        <div className="star-wars-intro" onClick={handleScreenClick}>
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
            <LightsaberCursor /> {/* Add the lightsaber cursor */}

            {!showLogo && !showScroll && (
                <div className="blue-words">
                    <p>In a galaxy far, far away...</p>
                </div>
            )}

            {showLogo && (
                <div className="star-wars-logo">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
                        alt="Star Wars Logo"
                        className="logo"
                    />
                </div>
            )}

            {showScroll && (
                <div className="scrolling-text">
                    <div className="scrolling-content">
                        <p>Episode XXV</p>
                        <p className="title-text">Siddharth Singh's Birthday</p>
                        <p>It's my boyfriend's birthday! Here's</p>
                        <p>to an amazing 21st to my favorite boy.</p>
                        <p>I am so excited to share this new</p>
                        <p>chapter of life for you and since I</p>
                        <p>enjoyed watching Star Wars with you,</p>
                        <p>I wanted to make this Star Wars-themed :)</p>
                        <p>yippie</p>
                    </div>
                </div>
            )}

        </div>
    );
};

export default StarWarsIntro;