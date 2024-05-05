import React, { useState, useEffect } from 'react';
import './gallery.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LocationGallery = ({ locationName }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const bucketUrl = `https://oscarsboringwebsite.s3.amazonaws.com`;
      const response = await fetch(`${bucketUrl}?list-type=2&prefix=${locationName}/`);

      if (response.ok) {
        const text = await response.text();
        console.log("XML Response:", text);  // Check what the XML looks like
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        const imageUrls = Array.from(xmlDoc.getElementsByTagName("Key"))
          .map(el => ({
            src: `${bucketUrl}/${el.textContent}`,
            title: el.textContent.split('/').pop()  // Extract the filename as a title
          }))
          .filter(image => image.src.endsWith('.webp'));  // Filter to only include .webp images
        
        console.log('Image URLs:', imageUrls);  // Log the list of image URLs
        setImages(imageUrls);
      } else {
        console.error('Failed to fetch images:', response.status);
      }
    };

    fetchImages();
  }, [locationName]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'; 
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; 
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [selectedImage]);

  const handleThumbnailClick = (index) => {
    setSelectedImage(images[index]);
  };

  const handlePrev = () => {
    const currentIndex = images.findIndex(image => image === selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = images.findIndex(image => image === selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const close = () => {
    setSelectedImage(null);
  };

  return (
    <div className="location-gallery">
      {images.map((image, index) => (
        <div className="thumbnail" key={index} onClick={() => handleThumbnailClick(index)}>
          <LazyLoadImage src={image.src} alt={image.title} effect="blur" />
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
              <button className='close-btn' onClick={close}>&times;</button>
            </div>
            <button className="next-btn" onClick={handleNext}>&rarr;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationGallery;


/*
import React, { useState, useEffect } from 'react';
import './gallery.css'; // Import your CSS file
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LocationGallery = ({ locationName }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const cloudFrontUrl = `https://dj7ybtudi64ss.cloudfront.net`; // Your CloudFront base URL
      try {
        // Fetches the JSON file containing the list of image URLs
        const response = await fetch(`${cloudFrontUrl}/${locationName}.json`);

        if (response.ok) {
          const imageUrlList = await response.json(); // This should be an array of URLs
          const imageUrls = imageUrlList.map(url => ({
            src: url, // Directly use the URL from the JSON
            title: url.split('/').pop().split('.')[0] // Extract filename without extension for title
          }));

          // Filter out any non-image files, like .DS_Store
          const filteredImages = imageUrls.filter(image => !image.src.includes('.DS_Store'));

          setImages(filteredImages);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, [locationName]);

  // Handle modal-like behavior for viewing images
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'; 
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; 
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [selectedImage]);

  const handleThumbnailClick = (index) => {
    setSelectedImage(images[index]);
  };

  const handlePrev = () => {
    const currentIndex = images.findIndex(image => image === selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = images.findIndex(image => image === selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const close = () => {
    setSelectedImage(null);
  };

  return (
    <div className="location-gallery">
      {images.map((image, index) => (
        <div className="thumbnail" key={index} onClick={() => handleThumbnailClick(index)}>
          <LazyLoadImage src={image.src} alt={image.title} effect="blur" />
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
              <button className='close-btn' onClick={close}>&times;</button>
            </div>
            <button className="next-btn" onClick={handleNext}>&rarr;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationGallery;
*/
/*
import React, { useState, useEffect } from 'react';
import './gallery.css'; // Import your CSS file
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LocationGallery = ({ locationName, images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  //need to fix the scroll additional pixels when scroll is removed 400px width
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'; 
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; 
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
}, [selectedImage]);




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
        <div className="thumbnail" key={index} onClick={() => handleThumbnailClick(index)}>
          <LazyLoadImage src={image.src} alt={image.title} effect="blur" />
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
                <button className='close-btn' onClick={close}>&times;</button>
            </div>
            <button className="next-btn" onClick={handleNext}>&rarr;</button>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default LocationGallery;
*/