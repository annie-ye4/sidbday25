import React from "react";
import "./nightsky.scss";

const Stars = () => {
  return (
    <div className="stars">
      {Array.from({ length: 300 }).map((_, i) => {
        const randomSize = Math.random() * 3 + 1; // Between 1px and 4px
        const randomSpeed = Math.random() * 8 + 3; // 3s - 11s duration (varied speeds)
        const randomDelay = Math.random() * 5; // 0s - 5s delay
        const randomTop = Math.random() * 100; // Random Y position
        const randomLeft = Math.random() * 120 - 20; // -20vw to 100vw (some start off-screen)

        return (
          <div
            key={i}
            className="star"
            style={{
              top: `${randomTop}vh`,
              left: `${randomLeft}vw`,
              width: `${randomSize}px`,
              height: `${randomSize}px`,
              animationDuration: `${randomSpeed}s`,
              animationDelay: `${randomDelay}s`,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default Stars;
