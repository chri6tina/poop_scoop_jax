#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate a new cache-busting version
const version = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);

console.log(`🔄 Updating cache version to: ${version}`);

// Files to update with cache-busting
const filesToUpdate = [
  'index.html',
  'litter-box-cleaning-jacksonville.html',
  'litter-robot-cleaning-service.html',
  'pricing.html',
  'locations.html'
];

// Update each file
filesToUpdate.forEach(filename => {
  const filePath = path.join(__dirname, filename);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update CSS version
    content = content.replace(
      /href="styles\.css\?v=\d+"/g,
      `href="styles.css?v=${version}"`
    );
    
    // Update JS version
    content = content.replace(
      /src="script\.js\?v=\d+"/g,
      `src="script.js?v=${version}"`
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${filename}`);
  } else {
    console.log(`⚠️  File not found: ${filename}`);
  }
});

console.log(`\n🎉 Cache version updated to: ${version}`);
console.log('💡 Remember to commit and deploy your changes!');
