import React from 'react';
import './travels.css'; // Import your CSS file
import { Routes, Route, Link, useLocation} from 'react-router-dom';
import LocationGallery from '../../components/Gallery/gallery';
import belgiumIcon from '../../icons/belgium.png';
import norwayIcon from '../../icons/norway.png';
import franceIcon from '../../icons/france.png';
import spainIcon from '../../icons/spain.png';
import HamburgerIcon from '../../components/HamburgerIcon';

const Travels = () => {
  const locations = ['Belgium','Norway', 'France','Spain']
  const location = useLocation();

  const getComponent = (index) => {
    switch (index) {
      case 0:
        return <LocationGallery locationName={locations[0]} />
      case 1:
        return <LocationGallery locationName={locations[1]} />
      case 2:
        return <LocationGallery locationName={locations[2]} />
      case 3:
        return <LocationGallery locationName={locations[3]} />
      default:
        return <div> Have not gone there yet</div>
    }
  }



  return (
    <div>
      <Routes>
        {/*<Route path="/" element={<TravelHome/>} />*/}
        {locations.map((location, index) => (
          <Route key={index} path={location.toLowerCase()} element={getComponent(index)} />
        ))}
      </Routes>
      {/*{location.pathname === '/travels' && locations.map((location, index) => (
        <div key={index} className="location-item">
          <Link to={location.toLowerCase()}>{location}</Link>
        </div>
      ))}*/}
      {location.pathname === '/travels' && <TravelHome/>}
      <HamburgerIcon/>
    </div>
  );
};


const TravelHome = () => {
  const locationsData = [
    { path: 'belgium', img: belgiumIcon, title: 'Belgium' },
    { path: 'norway', img: norwayIcon, title: 'Norway' },
    { path: 'france', img: franceIcon, title: 'France' },
    { path: 'spain', img: spainIcon, title: 'Spain' },
  ];

  return (
    <div className="travel-home">
      {locationsData.map((location, index) => (
        <div key={index} className="location-item">
          <Link to={location.path}><img src={location.img} alt={location.title}/></Link>
          <Link className="wrap" to={location.path}><span>{location.title}</span></Link>
        </div>
      ))}
    </div>
  );
};

export default Travels;
