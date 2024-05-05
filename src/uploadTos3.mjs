// Import the necessary AWS SDK clients and commands
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import fs from 'fs';
import path from 'path';

// Set the AWS region and create an S3 client
const REGION = "us-east-1"; // e.g., 'us-west-2'
const s3Client = new S3Client({ region: REGION });

// The function to upload a file to S3
async function uploadFileToS3(bucketName, filePath, fileKey) {
  const fileStream = fs.createReadStream(filePath);

  try {
    const uploadParams = {
      Bucket: bucketName,
      Key: fileKey,
      Body: fileStream,
    };
    const upload = new Upload({
      client: s3Client,
      params: uploadParams,
    });

    await upload.done();
    console.log(`File uploaded successfully: ${fileKey}`);
  } catch (err) {
    console.error("Error uploading file:", err);
  }
}

// The function to recursively upload a directory
async function uploadDirectoryToS3(bucketName, dirPath, s3PathPrefix = '') {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const file of files) {
    const localFilePath = path.join(dirPath, file.name);
    const s3FileKey = path.join(s3PathPrefix, file.name);

    if (file.isDirectory()) {
      await uploadDirectoryToS3(bucketName, localFilePath, s3FileKey);
    } else {
      await uploadFileToS3(bucketName, localFilePath, s3FileKey);
    }
  }
}

// The function to initiate the upload process
async function main() {
  const BUCKET_NAME = 'oscarsboringwebsite'; // Replace with your bucket name
  const LOCAL_DIRECTORY_PATH = '/Users/oscarramirez/Desktop/updatedPersonalWebsite2023August/cool-website/src/pictures'; // Replace with your local directory path

  try {
    await uploadDirectoryToS3(BUCKET_NAME, LOCAL_DIRECTORY_PATH);
    console.log('All files have been uploaded successfully');
  } catch (error) {
    console.error("Error in uploading directory:", error);
  }
}

// Start the script
main();
