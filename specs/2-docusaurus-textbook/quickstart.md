# Quickstart Guide: Docusaurus Textbook for Physical AI & Humanoid Robotics

**Feature**: Docusaurus Textbook for Physical AI & Humanoid Robotics
**Created**: 2025-12-10
**Status**: Completed

## Prerequisites

Before setting up the Docusaurus textbook site, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (usually comes with Node.js)
- **Git**: Version control system
- **Code Editor**: VS Code recommended with Docusaurus extensions

## Installation Steps

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run start
```
This will start the development server at `http://localhost:3000` with hot reloading.

### Step 4: Verify Installation
- Open your browser to `http://localhost:3000`
- Navigate through the existing textbook content
- Test search functionality
- Verify mathematical equations render correctly

## Project Structure

```
website/                    # Docusaurus project root
├── blog/                  # Blog posts (if any)
├── docs/                  # Textbook content
│   ├── chapters/          # Main textbook chapters
│   ├── exercises/         # Practical exercises
│   ├── projects/          # Larger projects
│   └── appendices/        # Reference materials
├── src/                   # Custom React components
│   ├── components/        # Reusable components
│   ├── pages/             # Custom pages
│   └── css/               # Custom styles
├── static/                # Static assets (images, files)
├── docusaurus.config.js   # Main Docusaurus configuration
├── package.json           # Project dependencies
└── sidebars.js            # Navigation structure
```

## Adding New Content

### Adding a New Chapter
1. Create a new Markdown file in `docs/chapters/`
2. Add frontmatter with required metadata:
```markdown
---
title: Chapter Title
sidebar_position: 1
description: Brief description of the chapter
---
```
3. Add your content in Markdown format
4. Update `sidebars.js` to include the new chapter in navigation

### Adding an Exercise
1. Create a new Markdown file in `docs/exercises/`
2. Include frontmatter:
```markdown
---
title: Exercise Title
sidebar_position: 1
description: Brief description of the exercise
difficulty: beginner
duration: 30
chapter: chapter-slug
---
```

### Adding Mathematical Content
Use KaTeX syntax for mathematical equations:
- Inline: `$x = y + z$`
- Block: `$$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$`

## Configuration

### Main Configuration (`docusaurus.config.js`)
- Site title and description
- Theme customization
- Search settings (Algolia or built-in)
- Social media links
- Favicon and logo settings

### Navigation Configuration (`sidebars.js`)
- Organize content hierarchy
- Set sidebar positions
- Group related content

## Building and Deployment

### Build for Production
```bash
npm run build
```
This creates a static site in the `build/` directory.

### Local Preview of Production Build
```bash
npm run serve
```
This serves the production build locally for testing.

### Deployment Options
The site can be deployed to:
- GitHub Pages (recommended)
- Vercel
- Netlify
- Any static hosting service

## Development Workflow

### Content Creation
1. Create new content in the appropriate directory
2. Use proper frontmatter for metadata
3. Follow the content structure guidelines
4. Test locally with `npm run start`
5. Commit and push changes

### Theme Customization
1. Modify CSS in `src/css/custom.css`
2. Create custom components in `src/components/`
3. Test changes in development mode
4. Verify responsive design on different screen sizes

### Testing
- Verify all links work correctly
- Check mathematical equation rendering
- Test responsive design on different devices
- Validate accessibility features
- Test search functionality

## Common Commands

```bash
npm start              # Start development server
npm run build          # Build for production
npm run serve          # Serve production build locally
npm run deploy         # Deploy to GitHub Pages (if configured)
npm run docusaurus     # Show all Docusaurus commands
```

## Troubleshooting

### Build Issues
- Clear cache: `npx docusaurus clear`
- Check dependency conflicts: `npm ls`
- Verify Node.js version compatibility

### Content Issues
- Check Markdown syntax
- Verify file paths in links and images
- Ensure proper frontmatter formatting

### Performance Issues
- Optimize images and assets
- Minimize heavy mathematical expressions on single pages
- Check for circular dependencies in navigation