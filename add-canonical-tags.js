import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://www.poopscoopjax.com';

// Get all HTML files
const htmlFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

console.log('🔍 Checking HTML files for missing canonical tags...\n');

let updatedCount = 0;
let skippedCount = 0;

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if canonical tag already exists
    if (content.includes('rel="canonical"')) {
        console.log(`✅ ${file} - Already has canonical tag`);
        skippedCount++;
        return;
    }
    
    // Determine the canonical URL
    let canonicalUrl;
    if (file === 'index.html') {
        canonicalUrl = `${baseUrl}/`;
    } else {
        const cleanUrl = file.replace('.html', '');
        canonicalUrl = `${baseUrl}/${cleanUrl}`;
    }
    
    // Find the title tag and add canonical after it
    const titleMatch = content.match(/<title>.*?<\/title>/);
    if (titleMatch) {
        const titleEnd = titleMatch.index + titleMatch[0].length;
        const beforeTitle = content.substring(0, titleEnd);
        const afterTitle = content.substring(titleEnd);
        
        // Find the next tag after title to insert canonical before it
        const nextTagMatch = afterTitle.match(/\s*<[^>]+>/);
        if (nextTagMatch) {
            const insertPoint = titleEnd + nextTagMatch.index;
            const canonicalTag = `\n    <link rel="canonical" href="${canonicalUrl}">`;
            
            content = content.substring(0, insertPoint) + canonicalTag + content.substring(insertPoint);
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ ${file} - Added canonical: ${canonicalUrl}`);
            updatedCount++;
        } else {
            console.log(`⚠️  ${file} - Could not find insertion point`);
        }
    } else {
        console.log(`⚠️  ${file} - No title tag found`);
    }
});

console.log(`\n🎉 Canonical tag update complete!`);
console.log(`✅ Updated: ${updatedCount} files`);
console.log(`⏭️  Skipped: ${skippedCount} files (already had canonical tags)`);
console.log(`📄 Total files processed: ${htmlFiles.length}`);
