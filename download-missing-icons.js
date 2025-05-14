// Script to download missing icons
const fs = require('fs');
const path = require('path');
const https = require('https');

// Icons to download - each entry is [filename, url]
const iconsToDownload = [
  // Action Icons
  ['icons8-heart-filled.svg', 'https://img.icons8.com/material-rounded/24/000000/like.svg'],
  ['icons8-checkmark-circle.svg', 'https://img.icons8.com/material-rounded/24/000000/checkmark--v1.svg'],
  
  // Post Creation Icons
  ['icons8-target-logo.svg', 'https://img.icons8.com/material-outlined/24/000000/target.svg'],
  ['icons8-question-cursor.svg', 'https://img.icons8.com/material-outlined/24/000000/question-mark.svg'],
  ['icons8-heart-health.svg', 'https://img.icons8.com/material-outlined/24/000000/heart-health.svg'],
  ['icons8-poll.svg', 'https://img.icons8.com/material-outlined/24/000000/poll-topic.svg'],
  ['icons8-user-tag.svg', 'https://img.icons8.com/material-outlined/24/000000/user-tag.svg'],
  ['icons8-location.svg', 'https://img.icons8.com/material-outlined/24/000000/marker.svg'],
  ['icons8-plus.svg', 'https://img.icons8.com/material-outlined/24/000000/plus-math.svg']
];

// Ensure directory exists
const iconsDir = path.join(__dirname, 'assets', 'icons');
if (!fs.existsSync(iconsDir)) {
  console.log(`Creating directory: ${iconsDir}`);
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Function to download a file
function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode} ${response.statusMessage}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${destination}`);
        resolve();
      });
      
      file.on('error', err => {
        fs.unlink(destination, () => {}); // Delete the file if there was an error
        reject(err);
      });
    }).on('error', err => {
      fs.unlink(destination, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
}

// Download all icons
async function downloadAllIcons() {
  console.log('Starting icon downloads...');
  
  for (const [filename, url] of iconsToDownload) {
    const filePath = path.join(iconsDir, filename);
    
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`${filename} already exists, skipping.`);
      continue;
    }
    
    try {
      await downloadFile(url, filePath);
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error.message);
    }
  }
  
  console.log('Icon download complete!');
}

// Run the download
downloadAllIcons().catch(error => {
  console.error('Download failed:', error);
}); 