# ADR-003: Content Architecture

**Status**: Accepted
**Date**: 2025-12-10

## Context

We need to establish how educational content will be structured, managed, and organized within the Docusaurus framework to support textbook-like navigation, exercises, projects, and appendices.

## Decision

We will implement a content architecture based on:
- **Content Format**: Markdown/MDX files organized in structured directories
- **Content Types**: Distinct sections for chapters, exercises, projects, and appendices
- **Data Model**: Structured frontmatter for metadata and relationships
- **Navigation**: Hierarchical sidebar with course progression tracking

## Alternatives

- **Database-driven content**: More complex but allows dynamic content generation
- **Single-page application with routing**: More flexible but loses SEO benefits
- **Static HTML files**: Simpler but harder to maintain and update

## Consequences

**Positive:**
- Content remains in version control with full history
- Easy for educators to edit and update content
- SEO-friendly with proper URL structure
- Clear separation between content and presentation

**Negative:**
- Requires discipline in maintaining consistent content structure
- Potential performance issues with very large content files
- More complex navigation setup compared to simple websites

## References

- plan.md
- research.md
- data-model.md