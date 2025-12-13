# ADR-002: Deployment Strategy

**Status**: Accepted
**Date**: 2025-12-10

## Context

We need to determine how to deploy and host the Docusaurus-based textbook website in a way that is cost-effective, reliable, and provides good performance for users worldwide.

## Decision

We will use the following deployment strategy:
- **Hosting Platform**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Runtime**: Node.js 18+ for building
- **CDN**: GitHub's built-in CDN for global distribution

## Alternatives

- **Vercel**: More advanced features and performance but additional complexity and cost
- **Netlify**: Good alternative with form handling capabilities but less integration with GitHub workflow
- **Self-hosted**: Complete control but significant operational overhead

## Consequences

**Positive:**
- Cost-effective (free for public repositories)
- Seamless integration with GitHub workflow
- Good performance through GitHub's CDN
- Automatic deployment on content changes

**Negative:**
- Limited customization options compared to Vercel/Netlify
- Build time limitations on GitHub Pages
- Less advanced analytics and monitoring options

## References

- plan.md
- research.md