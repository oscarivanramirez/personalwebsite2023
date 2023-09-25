import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Travels from './pages/js/Travels/travels.js';
import './App.css';

const App = () => {
  const [linkPositions, setLinkPositions] = useState([]);
  const words = ['Travels', 'Work Stuff', 'Sewing !Creations', 'Need a Website?', 'Word5']; // Add more words as needed


  useEffect(() => {
    const calculateRandomPosition = () => {
      const wordWidth = 100; // Adjust as needed based on your word size
      const wordHeight = 30; // Adjust as needed based on your word size
      const fontSize = 16; // Adjust as needed based on your font size
  
      const maxTop = window.innerHeight - wordHeight - fontSize;
      const maxLeft = window.innerWidth - wordWidth - fontSize;
  
      const newPosition = {
        top: `${getRandomValue(0, maxTop)}px`,
        left: `${getRandomValue(0, maxLeft)}px`,
      };
  
      return newPosition;
    };
    const wipPosition = {
      top: 'calc(50% - 24px)', // Assuming you want to center it vertically
      left: 'calc(50% - 24px)', // Assuming you want to center it horizontally
    };
    const wipSize = '48px'; // Font size of the "WIP" element
    const numLinks = words.length;
    const newLinkPositions = [];

    const checkCollision = (newPosition, otherPositions, wipPosition, wipSize) => {
      const threshold = 100; // Adjust this value as needed

      for (const existingPosition of otherPositions) {
        const dx = existingPosition.left - newPosition.left;
        const dy = existingPosition.top - newPosition.top;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < threshold) {
          return true;
        }
      }

      // Check collision with "WIP" element
      const dxWIP = wipPosition.left - newPosition.left;
      const dyWIP = wipPosition.top - newPosition.top;
      const distanceWIP = Math.sqrt(dxWIP * dxWIP + dyWIP * dyWIP);

      if (distanceWIP < threshold + parseInt(wipSize)) {
        return true;
      }

      return false;
    };

    for (let i = 0; i < numLinks; i++) {
      let newPosition;
      let attempts = 0;

      do {
        newPosition = calculateRandomPosition();

        attempts++;

        if (attempts > 100) {
          // To prevent an infinite loop
          break;
        }
      } while (
        checkCollision(newPosition, newLinkPositions, wipPosition, parseInt(wipSize))
      );

      newLinkPositions.push(newPosition);
    }

    setLinkPositions(newLinkPositions);
  }, [words.length]);

  const getRandomValue = (min, max) => Math.random() * (max - min) + min;

  const getWordComponent = (index) => {
    switch (index) {
      case 0:
        return <Travels/>;
      case 1:
        return <div>This is Work stuff page</div>;
      case 2:
        return <div>This is Sewing page</div>;
      case 3:
        return <div>Need a website page</div>;
      // Add other cases for remaining words
      default:
        return <div>Still havent figured out this page </div>;
    }
  };


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage linkPositions={linkPositions} words={words} />} />
          
          {linkPositions.map((position, index) => (
            <Route key={index} path={`/${words[index].toLowerCase().replace(/\s/g, '-')}/*`} element={getWordComponent(index)} />
          ))}
          
        </Routes>
      </div>
    </Router>
  );
};

const HomePage = ({ linkPositions, words }) => {
  return (
    <div className="home-page">
      <div className="wip">WIP</div>
      {linkPositions.map((position, index) => (
        <Link key={index} to={`/${words[index].toLowerCase().replace(/\s/g, '-')}`} className="link" style={{ top: position.top, left: position.left }}>
          <span className="link-word">{words[index]}</span>
        </Link>
      ))}
    </div>
  );
};




export default App;