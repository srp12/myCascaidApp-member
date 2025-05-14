// Simple script to update all CSS files to use dark-theme instead of dark-mode
const fs = require('fs');
const path = require('path');

// Array of CSS files to update
const cssFiles = [
  'css/style.css',
  'css/tweet-cards.css',
  'css/floating-post.css',
  'css/login.style.css'
];

// Function to update a file
function updateFile(filePath) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`File does not exist: ${filePath}`);
      return;
    }
    
    // Read file content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all occurrences of body.dark-mode with body.dark-theme
    const replacedContent = content.replace(/body\.dark-mode/g, 'body.dark-theme');
    
    // Replace .dark-mode with .dark-theme in case it's used without body prefix
    const finalContent = replacedContent.replace(/\.dark-mode/g, '.dark-theme');
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, finalContent, 'utf8');
    
    // Log success
    console.log(`Updated ${filePath}`);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
  }
}

// Process each file
cssFiles.forEach(file => {
  updateFile(file);
});

console.log('Theme class update complete!'); 