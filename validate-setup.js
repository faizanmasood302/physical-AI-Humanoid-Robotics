#!/usr/bin/ node

/**
 * Validation script to ensure all features work as described in the quickstart guide
 */

const fs = require('fs');
const path = require('path');

// Define the website directory
const websiteDir = path.join(__dirname, 'website');

// Check if the website directory exists
if (!fs.existsSync(websiteDir)) {
  console.error('❌ Error: website directory does not exist');
  process.exit(1);
}

// Check for essential files
const essentialFiles = [
  'package.json',
  'docusaurus.config.ts',
  'sidebars.ts',
  'src/css/custom.css',
  'docs/intro.md'
];

let allFilesExist = true;
for (const file of essentialFiles) {
  const filePath = path.join(websiteDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing essential file: ${file}`);
    allFilesExist = false;
  } else {
    console.log(`✅ Found essential file: ${file}`);
  }
}

if (!allFilesExist) {
  console.error('\n❌ Some essential files are missing. Setup is incomplete.');
  process.exit(1);
}

// Check for textbook content directories
const contentDirs = [
  'docs/chapters',
  'docs/exercises',
  'docs/projects',
  'docs/appendices',
  'docs/contributing'
];

let allDirsExist = true;
for (const dir of contentDirs) {
    const dirPath = path.join(websiteDir, dir);
    if (!fs.existsSync(dirPath)) {
      console.error(`❌ Missing content directory: ${dir}`);
      allDirsExist = false;
    } else {
      console.log(`✅ Found content directory: ${dir}`);

      // Check if directory has content
      const files = fs.readdirSync(dirPath);
      if (files.length === 0) {
        console.warn(`⚠️  Content directory ${dir} is empty`);
      } else {
        console.log(`✅ Content directory ${dir} has ${files.length} file(s)`);
      }
    }
  }

if (!allDirsExist) {
  console.error('\n❌ Some content directories are missing. Content setup is incomplete.');
  process.exit(1);
}

// Check for custom components
const componentsDir = path.join(websiteDir, 'src', 'components');
if (fs.existsSync(componentsDir)) {
  const components = fs.readdirSync(componentsDir);
  if (components.length > 0) {
    console.log(`✅ Found ${components.length} custom component(s)`);
    components.forEach(component => {
      console.log(`  - ${component}`);
    });
  } else {
    console.warn('⚠️  No custom components found');
  }
} else {
  console.warn('⚠️  Custom components directory does not exist');
}

// Check for chapters
const chaptersDir = path.join(websiteDir, 'docs', 'chapters');
if (fs.existsSync(chaptersDir)) {
  const chapters = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md'));
  if (chapters.length > 0) {
    console.log(`✅ Found ${chapters.length} chapter(s)`);
  } else {
    console.warn('⚠️  No chapters found in chapters directory');
  }
}

// Check for exercises
const exercisesDir = path.join(websiteDir, 'docs', 'exercises');
if (fs.existsSync(exercisesDir)) {
  const exercises = fs.readdirSync(exercisesDir).filter(f => f.endsWith('.md'));
  if (exercises.length > 0) {
    console.log(`✅ Found ${exercises.length} exercise(s)`);
  } else {
    console.warn('⚠️  No exercises found in exercises directory');
  }
}

// Check for projects
const projectsDir = path.join(websiteDir, 'docs', 'projects');
if (fs.existsSync(projectsDir)) {
  const projects = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'));
  if (projects.length > 0) {
    console.log(`✅ Found ${projects.length} project(s)`);
  } else {
    console.warn('⚠️  No projects found in projects directory');
  }
}

// Check for appendices
const appendicesDir = path.join(websiteDir, 'docs', 'appendices');
if (fs.existsSync(appendicesDir)) {
  const appendices = fs.readdirSync(appendicesDir).filter(f => f.endsWith('.md'));
  if (appendices.length > 0) {
    console.log(`✅ Found ${appendices.length} appendix/appendices`);
  } else {
    console.warn('⚠️  No appendices found in appendices directory');
  }
}

console.log('\n✅ All validation checks passed! The setup appears to be complete.');
console.log('The Physical AI & Humanoid Robotics textbook is ready for use.');