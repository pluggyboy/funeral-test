// Template Engine for Decap CMS Integration
// This script handles replacing template variables with content from Decap CMS

class TemplateEngine {
    constructor() {
        this.contentData = null;
        this.init();
    }

    async init() {
        try {
            // Load content from the markdown file
            await this.loadContent();
            // Replace all template variables
            this.replaceVariables();
            // Initialize interactive features
            this.initializeFeatures();
        } catch (error) {
            console.error('Template engine initialization failed:', error);
            // Fallback to placeholder content if loading fails
            this.showPlaceholderContent();
        }
    }

    async loadContent() {
        try {
            // In a real implementation, this would load from your CMS
            // For now, we'll use the sample data
            const response = await fetch('/content/homepage.md');
            const markdown = await response.text();
            
            // Parse frontmatter (YAML between --- markers)
            const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
            if (frontmatterMatch) {
                this.contentData = this.parseYAML(frontmatterMatch[1]);
            }
        } catch (error) {
            console.warn('Could not load content file, using sample data');
            this.contentData = this.getSampleData();
        }
    }

    parseYAML(yamlString) {
        // Simple YAML parser for our template needs
        // In production, you'd use a proper YAML library
        const lines = yamlString.split('\n');
        const data = {};
        let currentKey = '';
        let currentObject = null;
        
        lines.forEach(line => {
            line = line.trim();
            if (!line || line.startsWith('#')) return;
            
            if (line.includes(':') && !line.startsWith('  ')) {
                const [key, ...valueParts] = line.split(':');
                const value = valueParts.join(':').trim();
                
                if (value.startsWith('"') && value.endsWith('"')) {
                    data[key.trim()] = value.slice(1, -1);
                } else if (value) {
                    data[key.trim()] = value;
                } else {
                    currentKey = key.trim();
                    data[currentKey] = {};
                    currentObject = data[currentKey];
                }
            } else if (line.startsWith('  ') && currentObject) {
                const [key, ...valueParts] = line.replace('  ', '').split(':');
                const value = valueParts.join(':').trim();
                
                if (value.startsWith('"') && value.endsWith('"')) {
                    currentObject[key.trim()] = value.slice(1, -1);
                } else if (value) {
                    currentObject[key.trim()] = value;
                }
            }
        });
        
        return data;
    }

    getSampleData() {
        // Fallback sample data
        return {
            site_title: "Peaceful Rest Funeral Home",
            meta_description: "Compassionate funeral directors serving Manchester and surrounding areas. Available 24/7 for immediate assistance during your time of need.",
            location: "Manchester",
            company_name: "Peaceful Rest Funeral Home",
            phone_number: "0161 123 4567",
            emergency_phone: "0161 999 8888",
            email: "info@peacefulrest.co.uk",
            address: "123 Chapel Lane, Manchester, M1 2AB",
            opening_hours: "Monday-Friday 9am-5pm, Saturday 9am-1pm, Sunday by appointment",
            hero_section: {
                hero_background_image: "/images/peaceful-chapel.jpg",
                hero_title: "Compassionate Care When You Need It Most",
                hero_description: "Providing dignified funeral services with empathy and respect for over 25 years. We're here to guide you through this difficult time.",
                hero_cta_text: "Contact Us Today"
            },
            services_section: {
                services_title: "Our Services",
                service_1: {
                    title: "Funeral Planning",
                    description: "Complete funeral planning services tailored to your wishes and budget."
                },
                service_2: {
                    title: "Bereavement Support", 
                    description: "Ongoing support and guidance for families during their time of grief."
                },
                service_3: {
                    title: "Cremation Services",
                    description: "Dignified cremation services with flexible memorial options."
                },
                service_4: {
                    title: "Memorial Services",
                    description: "Personalised memorial services celebrating a life well lived."
                },
                service_5: {
                    title: "Transport Services",
                    description: "Professional transportation with dignity and care."
                },
                service_6: {
                    title: "Pre-Planning",
                    description: "Plan ahead to ease the burden on your loved ones."
                }
            },
            about_section: {
                about_title: "About Our Family Business",
                about_paragraph_1: "For over three generations, our family has been serving the local community during their most difficult times. We understand that losing a loved one is never easy, and we're here to provide the support and guidance you need.",
                about_paragraph_2: "Our approach is built on compassion, respect, and attention to detail. We believe every life deserves to be celebrated and remembered in a way that reflects their unique personality and the love they shared with family and friends.",
                about_paragraph_3: "We're available 24 hours a day, 7 days a week, because we know that grief doesn't follow business hours. Our experienced team will handle every detail with care, allowing you to focus on what matters most - remembering and honoring your loved one.",
                about_image: "/images/funeral-director-team.jpg",
                about_image_alt: "Our professional funeral director team"
            },
            testimonials_section: {
                testimonials_title: "Families We've Served",
                testimonial_1: {
                    text: "The team provided exceptional care and support during the most difficult time of our lives. Their attention to detail and genuine compassion made all the difference. We cannot thank them enough.",
                    author: "Sarah M., Local Family"
                }
            },
            contact_section: {
                contact_title: "We're Here to Help",
                contact_description: "Available 24/7 for immediate assistance. Please don't hesitate to reach out during this difficult time."
            },
            footer: {
                footer_description: "Serving families with dignity, respect, and compassion. Established 1975.",
                current_year: "2025"
            }
        };
    }

    replaceVariables() {
        const template = document.documentElement.outerHTML;
        const flattened = this.flattenObject(this.contentData);
        
        let processedTemplate = template;
        
        // Replace all {{variable}} placeholders
        Object.keys(flattened).forEach(key => {
            const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
            processedTemplate = processedTemplate.replace(placeholder, flattened[key] || '');
        });
        
        // Update the document
        document.documentElement.innerHTML = processedTemplate;
    }

    flattenObject(obj, prefix = '') {
        const flattened = {};
        
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            const newKey = prefix ? `${prefix}_${key}` : key;
            
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                Object.assign(flattened, this.flattenObject(value, newKey));
            } else {
                flattened[newKey] = value;
            }
        });
        
        return flattened;
    }

    showPlaceholderContent() {
        // If content loading fails, show placeholder text
        console.log('Showing placeholder content');
        document.querySelectorAll('[data-placeholder]').forEach(element => {
            element.textContent = element.dataset.placeholder;
        });
    }

    initializeFeatures() {
        // Re-initialize JavaScript features after content replacement
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

// Initialize template engine when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TemplateEngine();
});