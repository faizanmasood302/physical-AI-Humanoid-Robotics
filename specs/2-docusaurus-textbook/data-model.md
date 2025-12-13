# Data Model: Docusaurus Textbook for Physical AI & Humanoid Robotics

**Feature**: Docusaurus Textbook for Physical AI & Humanoid Robotics
**Created**: 2025-12-10
**Status**: Completed

## Content Entities

### Chapter
Represents a major section of the textbook with organized content.

**Fields**:
- `id`: Unique identifier for the chapter
- `title`: Display title of the chapter
- `slug`: URL-friendly identifier
- `content`: Markdown/MDX content of the chapter
- `position`: Order in the textbook sequence
- `prerequisites`: List of required prior knowledge
- `learningObjectives`: List of objectives for the chapter
- `duration`: Estimated time to complete (minutes)
- `metadata`: Additional information (author, last updated, etc.)

**Validation Rules**:
- Title must be 3-100 characters
- Slug must be unique and URL-friendly
- Position must be a positive integer
- Content must be valid Markdown/MDX

### Exercise
Represents a practical exercise for students to apply concepts learned.

**Fields**:
- `id`: Unique identifier for the exercise
- `title`: Display title of the exercise
- `slug`: URL-friendly identifier
- `description`: Detailed description of the exercise
- `difficulty`: Level (beginner, intermediate, advanced)
- `duration`: Estimated time to complete (minutes)
- `requirements`: List of requirements or prerequisites
- `instructions`: Step-by-step instructions
- `expectedOutcome`: Description of expected results
- `chapterId`: Reference to parent chapter
- `attachments`: List of additional resources or files

**Validation Rules**:
- Title must be 3-100 characters
- Difficulty must be one of: beginner, intermediate, advanced
- Duration must be a positive integer
- ChapterId must reference an existing chapter

### Project
Represents a larger assignment that may span multiple chapters or concepts.

**Fields**:
- `id`: Unique identifier for the project
- `title`: Display title of the project
- `slug`: URL-friendly identifier
- `description`: Detailed description of the project
- `difficulty`: Level (beginner, intermediate, advanced, expert)
- `duration`: Estimated time to complete (hours)
- `requirements`: List of requirements or prerequisites
- `specifications`: Detailed project specifications
- `rubric`: Assessment criteria and point values
- `deliverables`: List of required deliverables
- `references`: List of related chapters or resources

**Validation Rules**:
- Title must be 3-100 characters
- Difficulty must be one of: beginner, intermediate, advanced, expert
- Duration must be a positive integer
- Rubric must include criteria and point values

### Appendix
Represents reference material with mathematical formulas and concepts.

**Fields**:
- `id`: Unique identifier for the appendix
- `title`: Display title of the appendix
- `slug`: URL-friendly identifier
- `content`: Markdown/MDX content with mathematical notation
- `category`: Type of reference (mathematical, technical, etc.)
- `relatedChapters`: List of chapters that reference this appendix
- `lastUpdated`: Timestamp of last update

**Validation Rules**:
- Title must be 3-100 characters
- Category must be one of: mathematical, technical, reference, glossary
- Content must support mathematical notation

### NavigationItem
Represents an item in the site navigation structure.

**Fields**:
- `id`: Unique identifier for the navigation item
- `title`: Display text for the navigation item
- `url`: Link to the target content
- `parentId`: Reference to parent navigation item (null for top level)
- `position`: Order in the navigation menu
- `type`: Type of content (chapter, exercise, project, appendix, external)
- `isVisible`: Whether the item is visible to users

**Validation Rules**:
- Title must be 1-50 characters
- URL must be valid
- Position must be a positive integer
- Type must be one of: chapter, exercise, project, appendix, external

## Relationships

### Chapter Relationships
- Chapter [1] → [0..n] Exercise (chapters can have multiple exercises)
- Chapter [1] → [0..n] Project (chapters can have multiple projects)

### Exercise Relationships
- Exercise [1] → [1] Chapter (each exercise belongs to one chapter)

### Project Relationships
- Project [0..n] → [0..n] Chapter (projects can span multiple chapters)

### Appendix Relationships
- Appendix [0..n] → [0..n] Chapter (appendices can be referenced by multiple chapters)
- Chapter [0..n] → [0..n] Appendix (chapters can reference multiple appendices)

## State Transitions

### Content Lifecycle
Content items follow this lifecycle:
1. **Draft**: Content is being created or revised
2. **Review**: Content is under review
3. **Published**: Content is live and visible to users
4. **Archived**: Content is no longer actively maintained

**Valid Transitions**:
- Draft → Review
- Review → Draft (if changes needed)
- Review → Published
- Published → Review (for updates)
- Published → Archived

## Content Validation Rules

### Markdown/MDX Validation
- All content must pass Docusaurus build process
- Mathematical notation must be properly formatted for KaTeX
- Links must be valid and point to existing content
- Images must exist and have appropriate alt text

### Accessibility Requirements
- All content must meet WCAG 2.1 AA standards
- Headings must follow proper hierarchy (h1, h2, h3, etc.)
- Images must include descriptive alt text
- Color contrast must meet accessibility standards