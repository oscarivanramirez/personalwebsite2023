import React, { useState } from 'react';
import '../../../css/Travels/Places/belgium.css'; // Import your CSS file
import BelgiumImg1 from '../../../../pictures/Belgium/belgium1.png'; // Import your image

const Belgium = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [
    { title: 'Belgium Atom.png', src: BelgiumImg1 }, // Use the imported image
    // Add more images
  ];

  const handleThumbnailClick = (index) => {
    setSelectedImage(images[index]);
  };

  const handlePrev = () => {
    const currentIndex = images.findIndex((image) => image === selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = images.findIndex((image) => image === selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const close = () => {
    setSelectedImage(null);
  };
  return (
    <div className="travels">
      {images.map((image, index) => (
        <div className="thumbnail" key={index} onDoubleClick={() => handleThumbnailClick(index)}>
          <img src={image.src} alt={image.title} />
          <div className="thumbnail-title">{image.title}</div>
        </div>
      ))}
      {console.log(selectedImage)}
      {selectedImage && (
        <div className="viewer">
          <div className="viewer-content">
            <img src={selectedImage.src} alt={selectedImage.title} />
            <div className="viewer-title">{selectedImage.title}</div>
          </div>
          <button className="prev-btn" onClick={() => handlePrev()}>Previous</button>
          <button className="next-btn" onClick={() => handleNext()}>Next</button>
          <button className='close-btn' onClick={() => close()}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Belgium;
