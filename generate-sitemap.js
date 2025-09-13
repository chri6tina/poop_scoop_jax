#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🗺️  Generating comprehensive sitemap...');

// Get all HTML files
const htmlFiles = fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.html'))
  .filter(file => !file.startsWith('navigation')) // Exclude navigation component
  .sort();

const baseUrl = 'https://www.poopscoopjax.com';
const currentDate = '2024-12-20';

// Define priority levels
const priorities = {
  'index.html': 1.0,
  'pricing.html': 0.9,
  'locations.html': 0.9,
  'litter-box-cleaning-jacksonville.html': 0.9,
  'litter-robot-cleaning-service.html': 0.8,
  'custom-area-request.html': 0.7,
  // Prestigious neighborhoods
  'queens-harbour.html': 0.9,
  'glen-kernan.html': 0.9,
  'pablo-creek-reserve.html': 0.9,
  'jacksonville-golf-country-club.html': 0.9,
  'deercreek-country-club.html': 0.9,
  'atlantic-beach-country-club.html': 0.9,
  // Cat litter cleaning pages
  'cat-litter-cleaning-': 0.8,
  // Regular location pages
  'default': 0.8
};

// Define change frequencies
const changeFreq = {
  'index.html': 'weekly',
  'pricing.html': 'monthly',
  'locations.html': 'monthly',
  'litter-box-cleaning-jacksonville.html': 'monthly',
  'litter-robot-cleaning-service.html': 'monthly',
  'custom-area-request.html': 'monthly',
  'default': 'monthly'
};

function getPriority(filename) {
  if (priorities[filename]) {
    return priorities[filename];
  }
  if (filename.includes('cat-litter-cleaning-')) {
    return 0.8;
  }
  return priorities.default;
}

function getChangeFreq(filename) {
  return changeFreq[filename] || changeFreq.default;
}

function getUrlPath(filename) {
  if (filename === 'index.html') {
    return '/';
  }
  return '/' + filename.replace('.html', '');
}

// Generate sitemap XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

// Add homepage first
sitemap += `
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;

// Add main service pages
const mainPages = [
  'pricing.html',
  'locations.html',
  'litter-box-cleaning-jacksonville.html',
  'litter-robot-cleaning-service.html',
  'custom-area-request.html'
];

sitemap += `
  
  <!-- Main Service Pages -->`;

mainPages.forEach(filename => {
  if (htmlFiles.includes(filename)) {
    const urlPath = getUrlPath(filename);
    const priority = getPriority(filename);
    const changefreq = getChangeFreq(filename);
    
    sitemap += `
  <url>
    <loc>${baseUrl}${urlPath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }
});

// Add prestigious neighborhood pages
const prestigiousPages = [
  'queens-harbour.html',
  'glen-kernan.html',
  'pablo-creek-reserve.html',
  'jacksonville-golf-country-club.html',
  'deercreek-country-club.html',
  'atlantic-beach-country-club.html'
];

sitemap += `
  
  <!-- Prestigious Neighborhood Pages (High Priority) -->`;

prestigiousPages.forEach(filename => {
  if (htmlFiles.includes(filename)) {
    const urlPath = getUrlPath(filename);
    sitemap += `
  <url>
    <loc>${baseUrl}${urlPath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }
});

// Add cat litter cleaning pages
const catLitterPages = htmlFiles.filter(file => file.startsWith('cat-litter-cleaning-'));

sitemap += `
  
  <!-- Cat Litter Cleaning Location Pages -->`;

catLitterPages.forEach(filename => {
  const urlPath = getUrlPath(filename);
  sitemap += `
  <url>
    <loc>${baseUrl}${urlPath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

// Add remaining location pages
const remainingPages = htmlFiles.filter(file => 
  !file.startsWith('cat-litter-cleaning-') && 
  !mainPages.includes(file) && 
  !prestigiousPages.includes(file) &&
  file !== 'index.html'
);

sitemap += `
  
  <!-- Jacksonville Area Service Pages -->`;

remainingPages.forEach(filename => {
  const urlPath = getUrlPath(filename);
  const priority = getPriority(filename);
  sitemap += `
  <url>
    <loc>${baseUrl}${urlPath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

sitemap += `
</urlset>`;

// Write sitemap to file
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);

console.log(`✅ Generated sitemap with ${htmlFiles.length} pages`);
console.log(`📄 Main pages: ${mainPages.length}`);
console.log(`🏆 Prestigious neighborhoods: ${prestigiousPages.length}`);
console.log(`🐱 Cat litter pages: ${catLitterPages.length}`);
console.log(`📍 Location pages: ${remainingPages.length}`);
console.log('🎉 Sitemap updated successfully!');
