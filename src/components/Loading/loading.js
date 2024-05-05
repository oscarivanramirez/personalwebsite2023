import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './loading.css';

const Ball = () => {
  const ballRef = useRef();

  useEffect(() => {
    gsap.to(ballRef.current, {
      y: "90vh", // The vertical distance the ball will fall
      opacity: 1,
      duration: 2,
      ease: "bounce.out" // This easing gives the effect of a bounce
    });
  }, []);

  return <div ref={ballRef} className="ball"></div>;
};

export default Ball;
