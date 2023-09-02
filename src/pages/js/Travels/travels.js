import React, { useState } from 'react';
import '../../css/Travels/travels.css'; // Import your CSS file
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import Belgium from './Places/belgium';
//import BelgiumImg1 from '../../../pictures/Belgium/belgium1.png'
import LocationGallery from './gallery';
import { imagesBelgium, imagesNorway, imagesFrance, imagesSpain } from '../../../imageImporter/imageImporter';
import folderImg from '../../../icons/folder.png'


const Travels = () => {
  const locations = ['Belgium','Norway', 'France','Spain']

  //const imagesBelgium = [
    //{ title: 'Belgium Atom.png', src: BelgiumImg1 }, // Use the imported image
    // Add more images
  //]


  const getComponent = (index) => {
    switch (index) {
      case 0:
        return <LocationGallery images={imagesBelgium} />
      case 1:
        return <LocationGallery images={imagesNorway} />
      case 2:
        return <LocationGallery images={imagesFrance} />
      case 3:
        return <LocationGallery images={imagesSpain} />
      default:
        return <div> Have not gone there yet</div>
    }
  }



  return (
    <div>
      <Routes>
        <Route path="/" element={<TravelHome locations={locations} />} />
        {locations.map((location, index) => (
          <Route key={index} path={`/${location}`} element={getComponent(index)} />
        ))}
      </Routes>
    </div>
  );
};

const TravelHome = ({ locations }) => {
  return (
    <div>
      {locations.map((location, index) => (
        <div key={index}>
          <Link  to={`/travels/${location}`}>
            <img src={folderImg}/>
          </Link>
          <span>{location}</span>
        </div>
      ))}
    </div>
  );
};
export default Travels;