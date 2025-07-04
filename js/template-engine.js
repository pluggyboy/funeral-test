// Template Engine for Decap CMS Integration
// This script handles replacing template variables with content from Decap CMS

class TemplateEngine {
    constructor() {
        this.contentData = null;
        this.init();
    }

    async init() {
        try {
            // Check if content has already been pre-rendered during build
            const hasTemplateVars = document.documentElement.innerHTML.includes('{{');
            
            if (hasTemplateVars) {
                // Only load and replace if we find template variables
                await this.loadContent();
                this.replaceVariables();
            }
            
            // Always initialize interactive features
            this.initializeFeatures();
        } catch (error) {
            console.error('Template engine initialization failed:', error);
        }
    }

    async loadContent() {
        const response = await fetch('/content/homepage.md');
        if (!response.ok) {
            throw new Error(`Failed to fetch content: ${response.statusText}`);
        }
        const markdown = await response.text();
        
        const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
        if (frontmatterMatch) {
            const yamlString = frontmatterMatch[1];
            const lines = yamlString.split('\n');
            const data = {};
            let currentSection = null;
            let currentSubSection = null;

            lines.forEach(line => {
                if (!line.trim() || line.trim().startsWith('#')) return;
                const indent = line.match(/^\s*/)[0].length;
                if (indent === 0) {
                    const [key, value] = line.split(/:(.*)/s);
                    currentSection = key.trim();
                    if (value && value.trim()) {
                        data[currentSection] = value.trim().replace(/"/g, '');
                    } else {
                        data[currentSection] = {};
                    }
                    currentSubSection = null;
                } else if (indent === 2 && data[currentSection]) {
                    const [key, value] = line.trim().split(/:(.*)/s);
                    currentSubSection = key.trim();
                    if (value && value.trim()) {
                        data[currentSection][currentSubSection] = value.trim().replace(/"/g, '');
                    } else {
                        data[currentSection][currentSubSection] = {};
                    }
                } else if (indent === 4 && data[currentSection] && data[currentSection][currentSubSection]) {
                    const [key, value] = line.trim().split(/:(.*)/s);
                    if (value) {
                        data[currentSection][currentSubSection][key.trim()] = value.trim().replace(/"/g, '');
                    }
                }
            });
            this.contentData = data;
        } else {
            throw new Error("No frontmatter found in content file.");
        }
    }

    createTemplateData(data) {
        const templateData = {};
        Object.keys(data).forEach(sectionKey => {
            const section = data[sectionKey];
            if (typeof section === 'object' && section !== null) {
                Object.keys(section).forEach(itemKey => {
                    const item = section[itemKey];
                    if (typeof item === 'object' && item !== null) {
                        Object.keys(item).forEach(propKey => {
                            templateData[`${itemKey}_${propKey}`] = item[propKey];
                        });
                    } else {
                        templateData[itemKey] = item;
                    }
                });
            } else {
                templateData[sectionKey] = section;
            }
        });
        return templateData;
    }

    replaceVariables() {
        const templateData = this.createTemplateData(this.contentData);
        let fullHTML = document.documentElement.innerHTML;

        Object.keys(templateData).forEach(key => {
            const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
            fullHTML = fullHTML.replace(placeholder, templateData[key] || '');
        });
        
        document.documentElement.innerHTML = fullHTML;
    }

    initializeFeatures() {
        this.initSmoothScrolling();
        this.initFormHandling();
        this.initAnimations();
    }

    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initFormHandling() {
        const form = document.querySelector('.contact-form form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your message. We will contact you soon to provide the support you need.');
                this.reset();
            });
        }
    }

    initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .testimonial').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TemplateEngine();
});
