const sharp = require('sharp');
const toIco = require('to-ico');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  const svgPath = path.join(__dirname, '../public/logo.svg');
  const icoPath = path.join(__dirname, '../public/favicon.ico');
  
  try {
    // Read the SVG
    const svgBuffer = fs.readFileSync(svgPath);
    
    // Generate PNG buffers for different ICO sizes
    // ICO files typically contain 16x16, 32x32, and 48x48
    const icoSizes = [16, 32, 48];
    const pngBuffers = [];
    
    console.log('Generating ICO file with multiple sizes...');
    
    for (const size of icoSizes) {
      const png = await sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer();
      
      pngBuffers.push(png);
      console.log(`  ✓ Generated ${size}x${size} PNG`);
    }
    
    // Create ICO file from PNG buffers
    const icoBuffer = await toIco(pngBuffers);
    fs.writeFileSync(icoPath, icoBuffer);
    
    console.log('✅ Favicon.ico generated successfully at:', icoPath);
    console.log(`   Contains ${icoSizes.length} sizes: ${icoSizes.map(s => `${s}x${s}`).join(', ')}`);
    
    // Also create PNG versions for different use cases (optional)
    const additionalSizes = [64, 128, 256];
    
    for (const size of additionalSizes) {
      const png = await sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer();
      
      const pngPath = path.join(__dirname, `../public/favicon-${size}x${size}.png`);
      fs.writeFileSync(pngPath, png);
      console.log(`✅ Generated favicon-${size}x${size}.png`);
    }
    
  } catch (error) {
    console.error('Error generating favicon:', error);
    process.exit(1);
  }
}

generateFavicon();

