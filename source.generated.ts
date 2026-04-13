/// <reference types="vite/client" />
import { fromConfig } from 'fumadocs-mdx/runtime/vite';
import type * as Config from './source.config';

export const create = fromConfig<typeof Config>();

export const articlePosts = create.doc("articlePosts", "./content/articles", import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./content/articles",
  "query": {
    "collection": "articlePosts"
  }
}));

export const blogPosts = create.doc("blogPosts", "./content/blog", import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./content/blog",
  "query": {
    "collection": "blogPosts"
  }
}));

export const docs = {
  doc: create.doc("docs", "./content/docs", import.meta.glob(["./**/*.{mdx,md}"], {
    "base": "./content/docs",
    "query": {
      "collection": "docs"
    }
  })),
  meta: create.meta("docs", "./content/docs", import.meta.glob(["./**/*.{json,yaml}"], {
    "import": "default",
    "base": "./content/docs",
    "query": {
      "collection": "docs"
    }
  }))
};

export const eventPosts = create.doc("eventPosts", "./content/events", import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./content/events",
  "query": {
    "collection": "eventPosts"
  }
}));

export const guidePosts = create.doc("guidePosts", "./content/guides", import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./content/guides",
  "query": {
    "collection": "guidePosts"
  }
}));

export const resourcePosts = create.doc("resourcePosts", "./content/resources", import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./content/resources",
  "query": {
    "collection": "resourcePosts"
  }
}));