// Run this script for each country folder
import fs from 'fs';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();


async function generateImageListJson(country) {
    const params = {
        Bucket: "oscarsboringwebsite",
        Prefix: `${country}/`  // Specify the country folder
    };

    try {
        const s3Response = await s3.listObjectsV2(params).promise();
        const imageList = s3Response.Contents.map(obj => `https://dj7ybtudi64ss.cloudfront.net/${obj.Key}`);

        // Create a JSON file named after the country (e.g., Belgium.json)
        fs.writeFileSync(`${country}.json`, JSON.stringify(imageList));
    } catch (err) {
        console.error('Error:', err);
    }
}

// Call the function for each country you have visited
generateImageListJson('Belgium');
generateImageListJson('Norway');
generateImageListJson('Spain');
generateImageListJson('France');
// ... and so on for other countries
