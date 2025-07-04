const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Function to parse the markdown file and extract frontmatter
function parseMarkdownFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    
    if (!frontmatterMatch) {
        throw new Error('No frontmatter found in content file');
    }
    
    const yamlContent = frontmatterMatch[1];
    return yaml.load(yamlContent);
}

// Function to flatten nested objects for template replacement
function flattenData(data, prefix = '') {
    let flattened = {};
    
    for (const key in data) {
        const value = data[key];
        const newKey = prefix ? `${prefix}_${key}` : key;
        
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(flattened, flattenData(value, newKey));
        } else {
            flattened[newKey] = value;
        }
    }
    
    return flattened;
}

// Main build function
function build() {
    console.log('Starting build process...');
    
    try {
        // Read the content file
        const contentPath = path.join(__dirname, 'content', 'homepage.md');
        const contentData = parseMarkdownFile(contentPath);
        console.log('Content loaded successfully');
        
        // Flatten the data for template replacement
        const templateData = flattenData(contentData);
        
        // Read the HTML template
        const templatePath = path.join(__dirname, 'index.template.html');
        const outputPath = path.join(__dirname, 'index.html');
        
        // Check if template exists, if not use index.html as template
        let html;
        if (fs.existsSync(templatePath)) {
            html = fs.readFileSync(templatePath, 'utf8');
            console.log('Using index.template.html as source');
        } else {
            html = fs.readFileSync(outputPath, 'utf8');
            console.log('Using index.html as source');
        }
        
        // Replace all template variables
        let replacementCount = 0;
        for (const [key, value] of Object.entries(templateData)) {
            const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
            const matches = html.match(regex);
            if (matches) {
                replacementCount += matches.length;
                html = html.replace(regex, value || '');
            }
        }
        
        console.log(`Replaced ${replacementCount} template variables`);
        
        // Write the processed HTML
        fs.writeFileSync(outputPath, html);
        console.log('Build completed successfully!');
        
    } catch (error) {
        console.error('Build failed:', error.message);
        process.exit(1);
    }
}

// Run the build
build();
