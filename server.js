import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static('.'));

// Handle clean URLs - redirect /page to /page.html
const cleanUrls = [
  'pricing', 'locations', 'arlington', 'bartram-park', 'baymeadows',
  'custom-area-request', 'deerwood', 'downtown-jacksonville',
  'jacksonville-beach', 'julington-creek', 'mandarin', 'northside',
  'orange-park', 'ortega', 'ponte-vedra', 'riverside-avondale',
  'san-marco', 'southside', 'springfield', 'st-johns-county', 'westside'
];

cleanUrls.forEach(url => {
  app.get(`/${url}`, (req, res) => {
    res.sendFile(path.join(__dirname, `${url}.html`));
  });
});

// Handle root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Development server running at http://localhost:${PORT}`);
  console.log(`📱 Clean URLs working: http://localhost:${PORT}/pricing`);
  console.log(`🏠 Home page: http://localhost:${PORT}/`);
});
