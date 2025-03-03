import React, { useEffect, useState } from 'react';
import './LightsaberCursor.css';

const LightsaberCursor = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);  // To store the rotation angle
    const [uncover, setUncover] = useState(false); // Toggle uncovering animation

    useEffect(() => {
        const moveLightsaber = (e) => {
            const { clientX, clientY } = e;
            setCursorPosition({ x: clientX, y: clientY });

            const screenWidth = window.innerWidth;
            const middle = screenWidth / 2;
            const offset = clientX - middle;

            const maxRotation = 20;
            const rotationValue = (offset / middle) * maxRotation;
            setRotation(rotationValue);
        };

        const handleClick = () => {
            setUncover((prevUncover) => !prevUncover); // Toggle uncover state
        };

        window.addEventListener('mousemove', moveLightsaber);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('mousemove', moveLightsaber);
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div
            id="lightsaber"
            className={uncover ? 'uncover' : ''}
            style={{
                left: `${cursorPosition.x - 25}px`,
                top: `${cursorPosition.y - 360}px`,
                transform: `rotate(${rotation}deg)`,
            }}
        ></div>
    );
};

export default LightsaberCursor;
