The application follows a step-by-step process for creating SEO-optimized blog posts:

## Keyword Research Stage (KeywordResearch.tsx)

- User enters a product category or topic
- The tool simulates researching keywords related to that topic
- Generates a list of keywords with:

- Search volume
- Keyword difficulty
- Cost per click (CPC)

- User can select up to 4 keywords
- Clicking "Continue" moves to the next stage

## Content Generation Stage (ContentGenerator.tsx)

- Uses the selected keywords to generate a blog post
- Automatically creates:

- A catchy, SEO-friendly title
- A 150-200 word blog post incorporating the selected keywords

- Provides an editing interface where users can:

- Modify the generated title
- Edit the generated content
- Preview the blog post

- Clicking "Continue to Export" moves to the final stage

## Export & Publish Stage (ContentExport.tsx)

- Provides multiple ways to view and export the blog post:

- Preview tab: Renders the blog post
- Markdown tab: Shows Markdown version with copy option
- HTML tab: Shows HTML version with copy option

- Offers publishing options for:

- WordPress
- Medium
- Hashnode

 - Additional features:

- Copy to clipboard
- Download as Markdown file
- Word count badge
- Option to create a new post