# Website Image Asset Master List

This document outlines all the necessary image assets for the Arkspire Global / Digital Nexus website. The recommended dimensions are optimized for high quality on large screens while being mindful of file size for fast loading times.

---

### **Global/Shared Assets**

These images are used across multiple pages of the site.

| Image Description      | File Path                          | Recommended Dimensions (W x H) | Format | Notes / Purpose                                                                          |
| :--------------------- | :--------------------------------- | :----------------------------- | :----- | :--------------------------------------------------------------------------------------- |
| Favicon                | `assets/images/favicon.ico`        | 32 x 32 px                     | ICO    | The small icon that appears in the browser tab.                                          |
| Main Logo (Light BG)   | `assets/images/logo/logo.svg`      | Scalable (e.g., 200 x 40 px)   | SVG    | The primary logo for the header on light backgrounds. SVG is best for scalability.       |
| Main Logo (Dark BG)    | `assets/images/logo/logo-white.svg`| Scalable (e.g., 200 x 40 px)   | SVG    | The white version of the logo for the footer and other dark backgrounds.                 |
| CTA Illustration       | `assets/images/cta-illustration.svg` | Scalable (e.g., 500 x 450 px)  | SVG    | The vector illustration used in the "Call to Action" sections.                           |
| Client Logos (Ticker)  | `assets/images/clients/`           | ~200 x 80 px (variable)        | SVG/PNG| Logos of trusted clients for the homepage ticker. Use 6 images (e.g., `google.svg`).     |

---

### **Homepage Assets (`index.html`)**

These images are specific to the main landing page.

| Image Description      | File Path                                  | Recommended Dimensions (W x H) | Format | Notes / Purpose                                                                    |
| :--------------------- | :----------------------------------------- | :----------------------------- | :----- | :--------------------------------------------------------------------------------- |
| Hero Dashboard Mockup  | `assets/images/hero/dashboard-mockup.png`  | 1200 x 800 px                  | PNG    | The main visual in the hero section. PNG keeps UI text sharp.                      |
| Team Member 1          | `assets/images/team/team-1.jpg`            | 500 x 500 px                   | JPG    | Profile picture for Alexander Wright. Square ratio is versatile for the card design. |
| Team Member 2          | `assets/images/team/team-2.jpg`            | 500 x 500 px                   | JPG    | Profile picture for Sophia Chen.                                                   |
| Team Member 3          | `assets/images/team/team-3.jpg`            | 500 x 500 px                   | JPG    | Profile picture for Marcus Johnson / Ravindhar V.                                  |
| Team Member 4          | `assets/images/team/team-4.jpg`            | 500 x 500 px                   | JPG    | Profile picture for Olivia Garcia.                                                 |
| Portfolio Project 1    | `assets/images/portfolio/project-1.jpg`    | 800 x 600 px (4:3 Ratio)       | JPG    | Thumbnail for the "TechStore Revolution" case study.                               |
| Portfolio Project 2    | `assets/images/portfolio/project-2.jpg`    | 800 x 600 px (4:3 Ratio)       | JPG    | Thumbnail for the "Fashion Forward Campaign" case study.                           |
| Portfolio Project 3    | `assets/images/portfolio/project-3.jpg`    | 800 x 600 px (4:3 Ratio)       | JPG    | Thumbnail for the "Foodie Paradise Growth" case study.                             |
| Portfolio Project 4    | `assets/images/portfolio/project-4.jpg`    | 800 x 600 px (4:3 Ratio)       | JPG    | Thumbnail for the "SaaS Platform Transformation" case study.                       |
| Portfolio Project 5    | `assets/images/portfolio/project-5.jpg`    | 800 x 600 px (4:3 Ratio)       | JPG    | Thumbnail for the "B2B Lead Machine" case study.                                   |
| Portfolio Project 6    | `assets/images/portfolio/project-6.jpg`    | 800 x 600 px (4:3 Ratio)       | JPG    | Thumbnail for the "HealthCare Plus Portal" case study.                             |
| Testimonial Client 1   | `assets/images/testimonials/client-1.jpg`  | 150 x 150 px                   | JPG    | Small profile picture for the first testimonial author.                            |
| Testimonial Client 2   | `assets/images/testimonials/client-2.jpg`  | 150 x 150 px                   | JPG    | Small profile picture for the second testimonial author.                           |
| Testimonial Client 3   | `assets/images/testimonials/client-3.jpg`  | 150 x 150 px                   | JPG    | Small profile picture for the third testimonial author.                            |

---

### **About Page Assets (`About/index.html`)**

| Image Description      | File Path                          | Recommended Dimensions (W x H) | Format | Notes / Purpose                                         |
| :--------------------- | :--------------------------------- | :----------------------------- | :----- | :------------------------------------------------------ |
| Our Story Image        | `assets/images/about/our-story.jpg`| 1000 x 750 px (4:3 Ratio)      | JPG    | A team collaboration photo for the "Our Story" section. |

---

### **Suggested Images for Other Pages**

These images are not explicitly required by the code but would significantly improve the visual design of their respective pages. The layouts are already built to accommodate them.

| Image Description      | File Path                               | Recommended Dimensions (W x H) | Format | Notes / Purpose                                                               |
| :--------------------- | :-------------------------------------- | :----------------------------- | :----- | :---------------------------------------------------------------------------- |
| Web Development Visual | `assets/images/services/web-dev.jpg`    | 800 x 800 px                   | JPG    | A visual for the Web Development service detail section to make it more engaging. |
| Cyber Security Visual  | `assets/images/services/cyber-security.jpg` | 800 x 800 px                   | JPG    | A visual for the Cyber Security service detail section.                       |
| SEO Visual             | `assets/images/services/seo.jpg`        | 800 x 800 px                   | JPG    | A visual for the SEO service detail section.                                  |
| PPC Visual             | `assets/images/services/ppc.jpg`        | 800 x 800 px                   | JPG    | A visual for the PPC service detail section.                                  |
| Careers Hero BG        | `assets/images/careers/team-culture.jpg`| 1920 x 1080 px                 | JPG    | Engaging background for the Careers page header showing a positive work environment. |

---

### Important Considerations

*   **Image Optimization**: Before uploading, all images (especially JPGs and PNGs) should be compressed to reduce file size without significant loss of quality. Tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/) are excellent for this.
*   **File Naming**: Use descriptive, kebab-case file names (e.g., `team-alexander-wright.jpg` instead of `team-1.jpg`). This is better for SEO and file management.
*   **Alt Text**: Remember to use descriptive `alt` text for all `<img>` tags. This is crucial for accessibility (screen readers) and SEO. Your current code already does this well!
*   **Directory Structure**: Ensure your images are placed in the correct directories as specified in the `File Path` column (e.g., `assets/images/logo/`, `assets/images/team/`, etc.).