import React, { useState, useRef } from "react";
import confetti from "canvas-confetti"; // Import confetti library
import "./Gifts.css"; // Import CSS

const GiftBox = ({ id, gift, onOpen, isOpened, boxRefs }) => {
  return (
    <div
      ref={boxRefs[id]} // Store ref for this box
      className={`gift-box ${isOpened ? "opened" : ""}`}
      onClick={() => onOpen(id)}
    >
      <img
        src={isOpened ? gift.unboxedImage : gift.boxedImage}
        alt="Gift Box"
        className="gift-image"
      />
      {isOpened && <p className="gift-content">{gift.content}</p>}
    </div>
  );
};

const GiftPage = () => {
  const [openedBoxes, setOpenedBoxes] = useState([false, false, false]);
  const boxRefs = [useRef(null), useRef(null), useRef(null)]; // Create refs for each box

  const gifts = [
    {
      boxedImage: "box.png",
      unboxedImage: "unboxed.png",
      content: "🍣 sakura dinner! (we knew this)",
    },
    {
        boxedImage: "box.png",
        unboxedImage: "unboxed.png",
      content: "🐐 essentials t-shirt!",
    },
    {
        boxedImage: "box.png",
        unboxedImage: "unboxed.png",
      content: "👖 new jeans (trust my vision)",
    },
  ];

  const handleOpen = (index) => {
    if (!openedBoxes[index]) {
      const box = boxRefs[index].current;
      if (box) {
        const rect = box.getBoundingClientRect();
        const x = (rect.left + rect.right) / 2 / window.innerWidth;
        const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

        // Trigger confetti at the gift box position
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x, y },
        });
      }

      setOpenedBoxes((prev) => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
    }
  };

  return (
    <div>

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
    <div className="gift-container">
      {gifts.map((gift, index) => (
        <GiftBox
          key={index}
          id={index}
          gift={gift}
          onOpen={handleOpen}
          isOpened={openedBoxes[index]}
          boxRefs={boxRefs}
        />
      ))}
    </div>
    </div>

  );
};

export default GiftPage;
