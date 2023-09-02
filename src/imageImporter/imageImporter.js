
const importImagesFromDirectory = (context, location) => {
  const imagePaths = context.keys();
  const images = imagePaths.map((item) => {
    console.log("curr items", item)
    console.log('Current context:', context);  // Add this line
    return {
      title: item.replace('./', ''),
      src: context(item),
    };
  });

  return images;
};

const contextBelgium = require.context('../pictures/Belgium', false, /\.(png|jpe?g|svg)$/);
const contextNorway = require.context('../pictures/Norway', false, /\.(png|jpe?g|svg)$/);
const contextSpain = require.context('../pictures/Spain', false, /\.(png|jpe?g|svg)$/);
const contextFrance = require.context('../pictures/France', false, /\.(png|jpe?g|svg)$/);

const imagesBelgium = importImagesFromDirectory(contextBelgium, "Belgium");
const imagesNorway = importImagesFromDirectory(contextNorway, "Norway");
const imagesSpain = importImagesFromDirectory(contextSpain, "Spain");
const imagesFrance = importImagesFromDirectory(contextFrance, "France");

export {
  imagesBelgium,
  imagesNorway,
  imagesSpain,
  imagesFrance,
};
