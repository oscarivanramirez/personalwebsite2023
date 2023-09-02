import React, { useState } from 'react';
import '../../css/Travels/gallery.css'; // Import your CSS file


const LocationGallery = ({ locationName, images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  console.log('selected image in gallery',selectedImage)
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
    <div className="location-gallery">
      {images.map((image, index) => (
        <div className="thumbnail" key={index} onDoubleClick={() => handleThumbnailClick(index)}>
          <img src={image.src} alt={image.title} />
          <div className="thumbnail-title">{image.title}</div>
        </div>
      ))}
      {selectedImage && (
        <div className="viewer">
          <div className="viewer-content">
            <button className="prev-btn" onClick={handlePrev}>&larr;</button>
            <div className="viewer-content-image">
                <img src={selectedImage.src} alt={selectedImage.title} />
                <div className="viewer-title">{selectedImage.title}</div>
            </div>
            <button className="next-btn" onClick={handleNext}>&rarr;</button>
          </div>
          <button className='close-btn' onClick={close}>&times;</button>
        </div>
      )}
    </div>
  );
};

export default LocationGallery;
