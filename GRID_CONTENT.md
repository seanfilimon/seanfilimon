# Grid Content System Documentation

This document explains how the landing page grid content system works, including data structures, card components, filtering, pagination, and layout logic.

## Overview

The landing page displays content in a responsive grid with multiple card types, filtering, search, and pagination. The system is built with React, Framer Motion for animations, and Tailwind CSS for styling.

## Data Structures

### ContentItem Interface

```typescript
export interface ContentItem {
  url: string;
  type: string;
  data: {
    title: string;
    description?: string;
    date?: string;
    thumbnail?: string;
    icon?: string;
    tags?: string[];
    difficulty?: string;
    category?: string;
    location?: string;
    eventDate?: string;
    linkedResource?: ResourceInfo;
  };
}
```

**Fields:**
- `url`: The link to the content page (e.g., `/blog/my-post`)
- `type`: Content type - one of: `blog`, `guide`, `article`, `resource`, `event`
- `data.title`: Display title
- `data.description`: Short description (shown in cards)
- `data.date`: ISO date string (e.g., `2025-10-01`)
- `data.thumbnail`: Image URL for featured cards
- `data.icon`: Icon URL for resources
- `data.tags`: Array of tag strings
- `data.difficulty`: For guides (e.g., "Beginner", "Intermediate")
- `data.category`: For resources
- `data.location`: For events
- `data.eventDate`: For events
- `data.linkedResource`: Reference to a related resource

### ResourceInfo Interface

```typescript
export interface ResourceInfo {
  title: string;
  url: string;
  icon?: string;
}
```

Used to link content to external resources (e.g., a blog post linked to a Next.js resource).

### ProjectItem Interface

```typescript
export interface ProjectItem {
  url: string;
  name: string;
  role: string;
  status: string;
  tagline: string;
  logo?: string;
}
```

## Content Types and Icons

```typescript
const TYPE_LABELS: Record<string, string> = {
  blog: "Blog",
  guide: "Guide",
  article: "Article",
  resource: "Resource",
  event: "Event",
};
```

Each type has an associated icon from `react-icons/io5`:
- **blog**: `IoPencilOutline`
- **guide**: `IoBookOutline`
- **article**: `IoDocumentTextOutline`
- **resource**: `IoLinkOutline`
- **event**: `IoCalendarOutline`

## Card Components

### FeaturedCard

Larger card displayed as the first item when there are 4+ items. Shows thumbnail, full description (3 lines), and up to 3 tags.

**Styling:**
- Padding: `p-6`
- Title: `text-xl font-semibold`
- Description: `text-sm` with `line-clamp-3`
- Tags: Up to 3 shown
- Date format: "Month Day, Year" (e.g., "Oct 1, 2025")

**Features:**
- Thumbnail with hover scale effect
- Trending badge if posted within 14 days
- Meta badge (difficulty/category/location/eventDate)
- Linked resource display

### ContentCard

Standard card for grid layout. Smaller than featured card, shows up to 2 tags.

**Styling:**
- Padding: `p-6`
- Title: `text-base font-semibold`
- Description: `text-sm` with `line-clamp-2`
- Tags: Up to 2 shown
- Date format: "Month Day" (e.g., "Oct 1")

**Features:**
- Same metadata and trending badge as FeaturedCard
- Optimized for grid display

### ListCard

Horizontal card for list layout. Compact, single-line title.

**Styling:**
- Padding: `px-6 py-5`
- Title: `text-sm font-semibold`
- Tags: Up to 2 shown (hidden on mobile)
- Date format: "Month Day"

**Features:**
- Horizontal flex layout
- Type badge with fixed width
- Trending badge
- Linked resource display

## Grid Layout System

### Responsive Grid Classes

```typescript
function getGridClasses(itemCount: number): string {
  if (itemCount === 1) {
    return "grid grid-cols-1";
  }
  if (itemCount === 2) {
    return "grid grid-cols-1 sm:grid-cols-2";
  }
  return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
}
```

**Breakpoints:**
- Mobile: 1 column
- Tablet (sm): 2 columns
- Desktop (lg): 3 columns

**Gap:** `gap-px` (1px border between cards)

### Pagination

```typescript
const ITEMS_PER_PAGE = 18;
```

- 18 items per page
- Pagination controls at bottom
- Page state managed in component

## Filtering and Search

### Filter Types

```typescript
const TYPE_LABELS: Record<string, string> = {
  blog: "Blog",
  guide: "Guide",
  article: "Article",
  resource: "Resource",
  event: "Event",
};
```

### Search Logic

Search filters by:
1. Title (case-insensitive)
2. Description (case-insensitive)
3. Tags (case-insensitive)

### Sorting

Two sort options:
- **Date** (default): Newest first
- **A-Z**: Alphabetical by title

## Trending Badge

Items posted within 14 days show a trending badge:

```typescript
function isTrending(date?: string): boolean {
  if (!date) return false;
  const d = new Date(date);
  const now = new Date();
  const diffDays = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 14;
}
```

## Animations

### Motion Variants

```typescript
const blurIn = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
};

const blurScale = {
  hidden: { opacity: 0, filter: "blur(8px)", scale: 0.97 },
  visible: { opacity: 1, filter: "blur(0px)", scale: 1 },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.04 } },
};
```

**Stagger delay:** 40ms between each card

### Transitions

- **Spring:** `{ type: "spring", stiffness: 300, damping: 30 }`
- **Smooth:** `{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }`

## Layout Modes

### Grid Mode (Default)

- Responsive grid layout
- Featured card for first item (if 4+ items)
- Standard cards for rest
- Pagination controls

### List Mode

- Horizontal list layout
- All items use ListCard component
- Compact, scannable format
- Better for mobile

## Data Flow

### 1. Data Collection (app/(home)/page.tsx)

```typescript
const blogItems = serialize(blog.getPages(), "blog", resourceMap);
const guideItems = serialize(guides.getPages(), "guide", resourceMap);
const articleItems = serialize(articles.getPages(), "article");
const resourceItems = serialize(resources.getPages(), "resource");
const eventItems = serialize(events.getPages(), "event");

const allContent = [
  ...blogItems,
  ...guideItems,
  ...articleItems,
  ...resourceItems,
  ...eventItems,
].sort((a, b) => new Date(b.data.date ?? 0).getTime() - new Date(a.data.date ?? 0).getTime());
```

### 2. Serialization

The `serialize` function transforms raw page data into `ContentItem` format:
- Maps page metadata to ContentItem structure
- Resolves linked resources
- Sorts by date (newest first)

### 3. Component Props

```typescript
<LandingPage 
  allContent={allContent} 
  projects={projectItems} 
  references={referenceItems} 
/>
```

### 4. Filtering and Pagination

Inside `LandingPage`:
- Filter by type (all, blog, guide, article, resource, event)
- Search by title/description/tags
- Sort by date or title
- Paginate with 18 items per page

### 5. Rendering

- Determine layout (grid or list)
- Select card component (Featured, Content, or List)
- Apply animations
- Render with Framer Motion

## Creating New Content

### 1. Create MDX File

Create a file in the appropriate content directory:
- Blog: `content/blog/my-post.mdx`
- Guide: `content/guides/my-guide.mdx`
- Article: `content/articles/my-article.mdx`
- Resource: `content/resources/my-resource.mdx`
- Event: `content/events/my-event.mdx`

### 2. Add Frontmatter

```yaml
---
title: "My Post Title"
description: "Short description for cards"
date: 2025-10-01
author: "Sean Filimon"
tags:
  - tag1
  - tag2
thumbnail: "/path/to/image.jpg"
difficulty: "Beginner"  # For guides
category: "Category"    # For resources
location: "City, State" # For events
eventDate: "2025-10-15" # For events
---
```

### 3. Add Content

Write your content in MDX format below the frontmatter.

### 4. Link Resources (Optional)

In the frontmatter, add a `resource` field to link to a resource:

```yaml
resource: "nextjs-resources"
```

This will display a linked resource badge on the card.

## Styling Reference

### Card Padding
- Featured/Content: `p-6`
- List: `px-6 py-5`

### Typography
- Featured title: `text-xl font-semibold`
- Content title: `text-base font-semibold`
- List title: `text-sm font-semibold`
- Description: `text-sm`
- Type label: `text-xs font-semibold uppercase`
- Tags: `text-xs`
- Date: `text-xs`

### Colors
- Background: `bg-fd-card`
- Hover: `hover:bg-fd-accent/30`
- Text: `text-fd-foreground`
- Muted: `text-fd-muted-foreground`
- Border: `border-fd-border`

### Gaps and Spacing
- Card gap: `gap-3` (Content) or `gap-4` (Featured)
- Grid gap: `gap-px` (1px)
- Tag gap: `gap-2`
- Padding top (auto-spacing): `pt-2`

## Performance Considerations

1. **Pagination:** Only 18 items rendered per page
2. **Stagger animations:** 40ms delay prevents layout thrashing
3. **Image optimization:** Use Next.js Image component with proper sizing
4. **Lazy loading:** Cards animate in on scroll with `useInView`
5. **Memoization:** Use `useMemo` for filtered/sorted content

## Extending the System

### Adding a New Content Type

1. Add type to `TYPE_LABELS`
2. Add icon to `FilterIcon` function
3. Create content collection in `lib/source.ts`
4. Serialize and add to `allContent` in `app/(home)/page.tsx`
5. Create MDX files in appropriate directory

### Customizing Card Appearance

Edit the card component functions:
- `FeaturedCard` (lines 155-207)
- `ContentCard` (lines 209-256)
- `ListCard` (lines 901-938)

### Changing Grid Columns

Modify `getGridClasses` function (lines 379-387):

```typescript
function getGridClasses(itemCount: number): string {
  // Adjust breakpoints and column counts here
  return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"; // 4 columns on desktop
}
```

### Adjusting Items Per Page

Change `ITEMS_PER_PAGE` constant (line 377):

```typescript
const ITEMS_PER_PAGE = 24; // Show 24 items per page
```

## File Locations

- **Main component:** `components/landing.tsx`
- **Page component:** `app/(home)/page.tsx`
- **Content directories:**
  - Blog: `content/blog/`
  - Guides: `content/guides/`
  - Articles: `content/articles/`
  - Resources: `content/resources/`
  - Events: `content/events/`
- **Source configuration:** `lib/source.ts`
