#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) process.exit(0);
let html = fs.readFileSync(indexPath, 'utf8');

const cdnPrefix = 'https://cdn.jsdelivr.net/gh/rhenryw/lupine@main/assets/';

html = html.replace(/(<link[^>]+href=")([^"\>]+assets\/[^"]+)("[^>]*>)/g, (m, p1, p2, p3) => {
  const file = p2.split('assets/').pop();
  return `${p1}${cdnPrefix}${file}${p3}`;
});

html = html.replace(/(<script[^>]+src=")([^"\>]+assets\/[^"]+)("[^>]*><\/script>)/g, (m, p1, p2, p3) => {
  const file = p2.split('assets/').pop();
  return `${p1}${cdnPrefix}${file}${p3}`;
});

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Rewrote asset links in dist/index.html to CDN.');


