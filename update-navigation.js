#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔄 Updating navigation across all HTML files...');

// Files to update (excluding already updated ones)
const filesToUpdate = [
  'custom-area-request.html',
  'arlington.html',
  'atlantic-beach.html',
  'bartram-park.html',
  'baymeadows.html',
  'deercreek-country-club.html',
  'deerwood.html',
  'downtown-jacksonville.html',
  'glen-kernan.html',
  'jacksonville-beach.html',
  'julington-creek.html',
  'mandarin.html',
  'neptune-beach.html',
  'nocatee.html',
  'northside.html',
  'orange-park.html',
  'ortega.html',
  'pablo-creek-reserve.html',
  'ponte-vedra.html',
  'queens-harbour.html',
  'riverside-avondale.html',
  'san-marco.html',
  'southside.html',
  'springfield.html',
  'st-johns-county.html',
  'westside.html',
  'atlantic-beach-country-club.html',
  'jacksonville-golf-country-club.html',
  'pablo-creek-reserve.html'
];

// Desktop navigation replacement
const desktopNavOld = `<li><a href="/#services">Services</a></li>`;
const desktopNavNew = `<li class="nav-dropdown">
                    <a href="/#services" class="dropdown-toggle">Services <span class="dropdown-arrow">▼</span></a>
                    <ul class="dropdown-menu">
                        <li><a href="/#services">🐕 Dog Scooping</a></li>
                        <li><a href="/litter-box-cleaning-jacksonville">🐱 Cat Scoop</a></li>
                        <li><a href="/litter-robot-cleaning-service">🤖 Litter Robot Cleaning</a></li>
                    </ul>
                </li>`;

// Mobile navigation replacement
const mobileNavOld = `<li><a href="/#services" onclick="closeMobileNav()">Services</a></li>`;
const mobileNavNew = `<li class="mobile-nav-dropdown">
                        <a href="/#services" class="mobile-dropdown-toggle" onclick="toggleMobileDropdown(event)">Services <span class="mobile-dropdown-arrow">▼</span></a>
                        <ul class="mobile-dropdown-menu">
                            <li><a href="/#services" onclick="closeMobileNav()">🐕 Dog Scooping</a></li>
                            <li><a href="/litter-box-cleaning-jacksonville" onclick="closeMobileNav()">🐱 Cat Scoop</a></li>
                            <li><a href="/litter-robot-cleaning-service" onclick="closeMobileNav()">🤖 Litter Robot Cleaning</a></li>
                        </ul>
                    </li>`;

let updatedCount = 0;

// Update each file
filesToUpdate.forEach(filename => {
  const filePath = path.join(__dirname, filename);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // Update desktop navigation
    if (content.includes(desktopNavOld)) {
      content = content.replace(desktopNavOld, desktopNavNew);
      hasChanges = true;
    }
    
    // Update mobile navigation
    if (content.includes(mobileNavOld)) {
      content = content.replace(mobileNavOld, mobileNavNew);
      hasChanges = true;
    }
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated ${filename}`);
      updatedCount++;
    } else {
      console.log(`⚠️  No changes needed for ${filename}`);
    }
  } else {
    console.log(`❌ File not found: ${filename}`);
  }
});

console.log(`\n🎉 Navigation update complete! Updated ${updatedCount} files.`);
console.log('💡 All HTML files now have the Services dropdown menu!');
