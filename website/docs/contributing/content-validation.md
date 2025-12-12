---
title: Content Validation
sidebar_position: 3
description: Guidelines for configuring and implementing content validation rules for Markdown files
---

# Content Validation

## Overview

This document provides guidelines for content validation in the Physical AI & Humanoid Robotics textbook. Content validation ensures quality, consistency, and technical accuracy across all educational materials.

## Validation Levels

### 1. Syntax Validation

#### Markdown Syntax
- Proper heading hierarchy (h1, h2, h3, etc.)
- Correct list formatting (ordered and unordered)
- Valid link and image syntax
- Proper code block formatting

#### Mathematical Syntax
- Valid LaTeX/KaTeX expressions
- Properly formatted inline and display math
- Correct use of mathematical symbols
- Valid equation numbering and referencing

#### Code Syntax
- Proper language specification in code blocks
- Valid syntax for specified programming languages
- Correct indentation and formatting
- Valid file inclusion references

### 2. Structural Validation

#### Document Structure
- Required frontmatter fields present
- Proper document organization
- Correct use of sections and subsections
- Valid cross-references and navigation

#### Content Organization
- Appropriate learning objectives
- Proper exercise/project structure
- Valid difficulty and duration indicators
- Correct metadata fields

### 3. Content Validation

#### Technical Accuracy
- Mathematical formulas verification
- Code example functionality
- Scientific concept validity
- Reference accuracy

#### Educational Quality
- Learning objective alignment
- Content completeness
- Appropriate difficulty level
- Effective examples and exercises

## Validation Tools

### Automated Validation

#### Markdown Linters
- Check for consistent formatting
- Verify proper syntax
- Identify potential issues
- Ensure style guide compliance

#### Link Checkers
- Validate internal links
- Check external reference validity
- Identify broken cross-references
- Verify navigation integrity

#### Math Validators
- Verify LaTeX/KaTeX syntax
- Check equation formatting
- Validate mathematical expressions
- Ensure proper rendering

### Manual Validation

#### Technical Review
- Expert verification of technical content
- Mathematical formula validation
- Code example testing
- Scientific concept review

#### Educational Review
- Learning objective assessment
- Content effectiveness evaluation
- Exercise/project quality check
- Pedagogical approach validation

## Validation Configuration

### Docusaurus Configuration

```javascript
// In docusaurus.config.js
module.exports = {
  // ... other configuration
  markdown: {
    mermaid: true,
    mdx1Compat: {
      comments: false,
      admonitions: false,
      headingIds: false,
    },
  },
  // Validation-related plugins
  plugins: [
    // Add validation plugins as needed
    [
      '@docusaurus/plugin-content-docs',
      {
        path: 'docs',
        editUrl: 'https://github.com/your-organization/docusaurus-textbook/edit/main/website/',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        // Validation settings
        admonitions: {
          tag: ':::',
          keywords: ['note', 'tip', 'info', 'caution', 'danger'],
        },
      },
    ],
  ],
};
```

### ESLint Configuration for Markdown

```json
{
  "extends": [
    "@docusaurus"
  ],
  "plugins": [
    "markdown"
  ],
  "rules": {
    "no-console": "error",
    "spaced-comment": "error",
    "no-var": "error",
    "prefer-const": "error",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
}
```

### MarkdownLint Configuration

```yaml
# markdownlint.yaml
default: true
MD003: false  # Heading style
MD010: false  # Hard tabs
MD013: false  # Line length
MD024: false  # Multiple headings with the same content
MD029: false  # Ordered list item prefix
MD033: false  # Inline HTML
MD036: false  # Emphasis used instead of a heading
MD041: false  # First line in file should be a top level heading
MD046: false  # Code block style
MD049: false  # Emphasis style
MD050: false  # Strong style

# Custom validation rules
MD047: true   # File should end with a single newline
MD051: true   # Link and image reference definitions should be valid
```

## Validation Scripts

### Pre-commit Hooks

Create a `.husky/pre-commit` file for automatic validation:

```bash
#!/bin/sh
# Validate Markdown files before commit
npx markdownlint-cli "**/*.md" "**/*.mdx"
# Check for broken links
npx markdown-link-check "**/*.md" "**/*.mdx"
# Validate mathematical expressions
npm run validate-math
```

### Validation Commands

Add to `package.json`:

```json
{
  "scripts": {
    "validate": "npm run validate:markdown && npm run validate:links && npm run validate:math",
    "validate:markdown": "markdownlint \"**/*.md\" \"**/*.mdx\"",
    "validate:links": "markdown-link-check \"**/*.md\" \"**/*.mdx\"",
    "validate:math": "node scripts/validate-math.js",
    "validate:all": "npm run validate && npm run build"
  }
}
```

## Validation Rules

### Required Frontmatter Fields

All documents must include:

```yaml
---
title: Document Title
sidebar_position: [number]
description: Brief description
---
```

For exercises and projects, additionally require:

```yaml
---
difficulty: [beginner|intermediate|advanced|expert]
duration: [number]
chapter: [chapter-slug]
---
```

### Mathematical Expression Validation

#### Inline Math
- Must be enclosed in single dollar signs: `$x = y + z$`
- No empty math expressions
- Valid LaTeX syntax

#### Display Math
- Must be enclosed in double dollar signs: `$$x = y + z$$`
- Proper alignment for multi-line equations
- Valid LaTeX syntax

### Code Block Validation

#### Language Specification
- All code blocks must specify language
- Valid language identifiers
- Consistent formatting

#### Fenced Code Blocks
- Proper opening and closing
- No nested code blocks
- Valid syntax for specified language

## Validation Procedures

### Pre-submission Validation

Authors should run validation before submitting content:

```bash
# Run all validations
npm run validate

# Run specific validations
npm run validate:markdown
npm run validate:links
npm run validate:math
```

### Automated Validation

#### Continuous Integration
- Validation runs on all pull requests
- Build fails if validation errors exist
- Reports generated for review

#### Daily Validation
- Automated validation of entire site
- Reports sent to editorial team
- Issues tracked in project management system

### Manual Validation

#### Technical Review
- Expert review of technical content
- Mathematical formula verification
- Code example testing
- Scientific concept validation

#### Educational Review
- Learning objective alignment
- Content effectiveness assessment
- Exercise/project quality check
- Pedagogical approach evaluation

## Error Handling

### Validation Errors

#### Critical Errors
- Broken links
- Invalid mathematical expressions
- Missing required frontmatter
- Syntax errors that prevent rendering

#### Warning Issues
- Style guide violations
- Accessibility concerns
- Suggested improvements
- Potential content issues

### Resolution Process

1. **Error Identification**: Automated tools identify issues
2. **Error Reporting**: Issues reported with specific details
3. **Error Classification**: Issues classified by severity
4. **Resolution Assignment**: Tasks assigned for resolution
5. **Verification**: Resolved issues verified by tools

## Quality Metrics

### Validation Effectiveness
- Percentage of documents passing validation
- Types and frequency of validation errors
- Time to resolve validation issues
- Validation tool effectiveness

### Content Quality
- Number of technical errors caught
- Educational quality scores
- Accessibility compliance rates
- User satisfaction metrics

## Validation Reports

### Daily Reports
- Summary of validation results
- List of identified issues
- Trend analysis of error types
- Recommendations for process improvement

### Weekly Reports
- Detailed analysis of validation data
- Comparison with previous periods
- Highlighted critical issues
- Process improvement suggestions

### Monthly Reports
- Comprehensive validation analysis
- Quality trend analysis
- Tool effectiveness evaluation
- Process optimization recommendations

## Continuous Improvement

### Process Optimization
- Regular review of validation procedures
- Tool and technique updates
- Process efficiency improvements
- Quality standard enhancements

### Tool Updates
- Validation tool updates and improvements
- New validation techniques implementation
- Automation expansion
- Quality metric enhancements

---
**Previous**: [Content Review Process](./review-process.md)