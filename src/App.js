/*import React from 'react';
import './App.css';

const App = () => {
  const links = ['Link 1', 'Link 2', 'Link 3', 'Link 4'];

  const getRandomValue = (min, max) => Math.random() * (max - min) + min;
  const getRandomRotation = () => `rotate(${getRandomValue(-30, 30)}deg)`;
  const getRandomPosition = () => ({
    top: `${getRandomValue(10, 80)}vh`,
    left: `${getRandomValue(10, 80)}vw`,
  });

  return (
    <div className="App">
      <div className="word">WIP</div>
      {links.map((link, index) => (
        <a
          key={index}
          href="#"
          className="link"
          style={{ ...getRandomPosition(), transform: getRandomRotation() }}
        >
          {link}
        </a>
      ))}
    </div>
  );
};

export default App;
*/
import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const links = ['Link 1', 'Link 2', 'Link 3', 'Link 4'];
  const numLinks = links.length;

  const [positions, setPositions] = useState([]);

  const getRandomValue = (min, max) => Math.random() * (max - min) + min;
  const getRandomRotation = () => `rotate(${getRandomValue(-30, 30)}deg)`;
  const getRandomPosition = () => ({
    top: `${getRandomValue(10, 80)}vh`,
    left: `${getRandomValue(10, 80)}vw`,
  });

  const checkCollision = (newPosition) => {
    const threshold = 70; // Adjust this value as needed

    for (const existingPosition of positions) {
      const dx = existingPosition.left - newPosition.left;
      const dy = existingPosition.top - newPosition.top;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < threshold) {
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    const initialPositions = [];
    for (let i = 0; i < numLinks; i++) {
      let newPosition;
      let attempts = 0;
      do {
        newPosition = getRandomPosition();
        attempts++;

        if (attempts > 100) {
          // To prevent an infinite loop
          break;
        }
      } while (checkCollision(newPosition));

      initialPositions.push(newPosition);
    }

    setPositions(initialPositions);
  }, []);

  return (
    <div className="App">
      <div className="word">WIP</div>
      {links.map((link, index) => (
        <a
          key={index}
          href="#"
          className="link"
          style={{
            ...positions[index],
            transform: getRandomRotation(),
          }}
        >
          {link}
        </a>
      ))}
    </div>
  );
};

export default App;
