import { Link } from 'react-router-dom';
import React, {useEffect, useState} from "react";    
import './home.css'

const HomePage = () => {
    const [linkPositions, setLinkPositions] = useState([]);
    const words = ['Travels', 'Sewing | Pottery | Woodmaking', 'threejs creations', 'SubStack'];


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

    return (
      <div>
        <div className="wip">Work in Progess</div>
        {linkPositions.map((position, index) => (
          <Link key={index} to={`/${words[index].toLowerCase().replace(/\s/g, '-')}`} className="link" style={{ top: position.top, left: position.left }}>
            <span className="link-word">{words[index]}</span>
          </Link>
        ))}
      </div>
    );
  };

export default HomePage;