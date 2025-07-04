# UK Funeral Home Website Template

A complete, professional website template for UK funeral homes with integrated content management system.

## Features

### Design Features
- **Respectful, professional design** with appropriate color scheme
- **Mobile-responsive** layout that works on all devices
- **Accessibility-focused** with proper ARIA labels and focus states
- **Fast loading** with optimized images and clean code
- **SEO-optimized** structure with proper meta tags

### Content Management
- **Easy-to-use admin interface** at `/admin`
- **WordPress-like editing experience** for non-technical users
- **Image upload and management** with drag-and-drop interface
- **Editorial workflow** for content review before publishing
- **SEO fields** for search engine optimization

### Sections Included
1. **Hero Section** - Compassionate main message with call-to-action
2. **Services Grid** - 6 key services with icons
3. **About Section** - Company story and values
4. **Testimonials** - Client feedback (respectfully presented)
5. **Contact Form** - Professional contact with emergency number
6. **Footer** - Complete business information

## Quick Start

### 1. File Structure
```
funeral-home-template/
├── index.html                 # Main website file
├── admin/
│   ├── index.html            # CMS admin interface
│   └── config.yml            # CMS configuration
├── content/
│   └── homepage.md           # Editable content
└── images/                   # Upload folder for media
```

### 2. Customization Process

#### For Each New Client:
1. **Copy template folder** and rename for client
2. **Update content in `content/homepage.md`** with client details
3. **Replace placeholder images** in `/images` folder
4. **Test the site** locally or on staging
5. **Set up hosting** and deploy

#### Content Fields Available:
- **Business Information**: Company name, phone, address, hours
- **Hero Section**: Main title, description, background image
- **Services**: 6 customizable service descriptions
- **About Section**: 3 paragraphs + team photo
- **Testimonials**: Client feedback (handled sensitively)
- **SEO**: Title, meta description, social media images

### 3. Deployment Options

#### Option A: Netlify (Recommended)
1. Push template to GitHub repository
2. Connect Netlify to GitHub
3. Enable Git Gateway for CMS authentication
4. Configure custom domain

#### Option B: Traditional Hosting
1. Upload files via FTP
2. Set up OAuth for CMS authentication
3. Configure forms processing

## Content Management Guide

### Accessing the CMS
- Visit `yoursite.com/admin` to access the content editor
- Login with GitHub/GitLab credentials
- All changes are automatically saved and versioned

### Editing Content
- **Homepage**: Edit all main content through simple form fields
- **Images**: Drag and drop to upload, automatic optimization
- **SEO**: Built-in fields for title, description, and social sharing
- **Editorial Workflow**: Review changes before publishing

### Content Best Practices
- **Tone**: Compassionate, respectful, professional
- **Images**: High-quality, appropriate for the industry
- **Text Length**: Keep descriptions concise but informative
- **SEO**: Include location and services in descriptions

## Technical Features

### Performance
- **Lighthouse Score**: 95+ performance rating
- **Mobile-First**: Responsive design for all devices
- **Fast Loading**: Optimized CSS and JavaScript
- **Image Optimization**: Automatic resizing and compression

### Accessibility
- **WCAG 2.1 AA Compliant**: Meets accessibility standards
- **Screen Reader Friendly**: Proper ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: Appropriate contrast ratios

### SEO Features
- **Schema Markup**: Structured data for search engines
- **Meta Tags**: Complete Open Graph and Twitter Cards
- **Sitemap**: Automatic generation
- **Local SEO**: Location-based optimization

## Blog Integration (WordPress)

### Setting Up WordPress Blog
1. **Install WordPress** on subdomain (e.g., blog.clientsite.com)
2. **Configure REST API** for headless integration
3. **Add blog link** to navigation menu
4. **Style blog** to match main site design

### Blog Content Suggestions
- Grief support articles
- Funeral planning guides
- Memorial service ideas
- Local community events
- Seasonal remembrance content

## Client Training

### 30-Minute Training Session Outline
1. **Accessing the CMS** (5 minutes)
   - How to login
   - Overview of interface
   
2. **Editing Content** (15 minutes)
   - Updating text and images
   - Using the rich text editor
   - Managing testimonials
   
3. **Publishing Changes** (5 minutes)
   - Editorial workflow
   - Preview before publishing
   
4. **Best Practices** (5 minutes)
   - Content guidelines
   - Image requirements
   - When to call for help

### Training Materials Included
- Video walkthrough (to be created)
- Written guide with screenshots
- Quick reference card
- Emergency contact information

## Maintenance

### Regular Updates
- **Content**: Client manages through CMS
- **Security**: Automatic updates through hosting
- **Backups**: Automatic Git versioning
- **Performance**: Monitor through hosting dashboard

### Monthly Check-ins
- Review content for accuracy
- Update seasonal information
- Check contact details
- Monitor performance metrics

## Cost Breakdown

### Setup (One-Time)
- Template customization: 2-4 hours
- Content input: 1-2 hours
- Testing and deployment: 1 hour
- Client training: 0.5 hours

### Ongoing (Monthly)
- Hosting: £0-5 (Netlify free tier)
- Domain: £10-15/year
- Maintenance: Minimal (automatic)

## Support

### What's Included
- Initial setup and customization
- Content management training
- 30 days of email support
- Basic maintenance guide

### Additional Services Available
- Custom design modifications
- Advanced functionality
- WordPress blog setup
- SEO optimization consulting

## Checklist for New Client Sites

### Pre-Launch
- [ ] Copy template to new folder
- [ ] Update all business information
- [ ] Replace placeholder images
- [ ] Test contact form
- [ ] Check mobile responsiveness
- [ ] Verify all links work
- [ ] Test CMS functionality
- [ ] Set up hosting
- [ ] Configure domain
- [ ] Test live site

### Post-Launch
- [ ] Train client on CMS
- [ ] Provide login credentials
- [ ] Send training materials
- [ ] Set up monitoring
- [ ] Schedule follow-up call

## Advanced Customizations

### Color Scheme Modifications
The template uses CSS custom properties for easy color changes:
```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #34495e;
  --accent-color: #e74c3c;
  --text-color: #333;
  --background-color: #fafafa;
}
```

### Adding New Sections
1. Add HTML structure to `index.html`
2. Add corresponding fields to `admin/config.yml`
3. Update content file with new variables
4. Test functionality

### WordPress Integration
For clients needing advanced blog features:
1. Set up WordPress on subdomain
2. Configure REST API endpoints
3. Add JavaScript to fetch blog posts
4. Style blog content to match site

## Troubleshooting

### Common Issues
- **CMS not loading**: Check Git Gateway configuration
- **Images not uploading**: Verify media folder permissions
- **Form not working**: Check form action URL
- **Mobile display issues**: Test on multiple devices

### Getting Help
- Check documentation first
- Review error messages carefully
- Contact support with specific details
- Include screenshots when reporting issues

---

**Template Version**: 1.0
**Last Updated**: January 2025
**Compatible With**: Modern browsers, mobile devices
**Support**: Email support included for 30 days