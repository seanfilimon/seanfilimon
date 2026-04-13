import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { projects, blog, articles, guides } from "@/lib/source";
import { siteUrl } from "@/lib/metadata";
import { TOCProvider, TOCScrollArea } from "fumadocs-ui/components/toc";
import { ContentTOC } from "@/components/content-toc";
import { ProjectBanner } from "@/components/project-banner";

export function generateStaticParams() {
  return projects.getPages().map((p) => ({ slug: p.slugs[0] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = projects.getPage([slug]);
  if (!page) return {};
  
  const tags = (page.data.tags as string[]) || [];
  const keywords = ["Sean Filimon", "Sean F", page.data.title, ...tags, "project", "developer tools"].join(", ");
  
  return {
    title: page.data.title,
    description: page.data.tagline,
    keywords,
    openGraph: {
      title: page.data.title,
      description: page.data.tagline,
      type: "website",
      url: `${siteUrl}/projects/${slug}`,
      images: page.data.logo ? [{ url: page.data.logo, width: 200, height: 200 }] : [],
    },
    alternates: {
      canonical: `${siteUrl}/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = projects.getPage([slug]);
  if (!page) notFound();

  const Mdx = page.data.body;
  const hasImages = page.data.banner || (page.data.images && page.data.images.length > 0);

  const linkedBlogs = ((page.data.blogs as string[]) || [])
    .map((blogSlug: string) => {
      const post = blog.getPage([blogSlug]);
      if (!post) return null;
      return {
        url: post.url,
        title: post.data.title,
        description: post.data.description,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const linkedArticles = ((page.data.articles as string[]) || [])
    .map((articleSlug: string) => {
      const article = articles.getPage([articleSlug]);
      if (!article) return null;
      return {
        url: article.url,
        title: article.data.title,
        description: article.data.description,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const linkedGuides = ((page.data.guides as string[]) || [])
    .map((guideSlug: string) => {
      const guide = guides.getPage([guideSlug]);
      if (!guide) return null;
      return {
        url: guide.url,
        title: guide.data.title,
        description: guide.data.description,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <TOCProvider toc={page.data.toc}>
      <main className="flex flex-1 flex-col">
        {hasImages && (
          <ProjectBanner
            banner={page.data.banner}
            images={page.data.images}
            title={page.data.title}
          />
        )}
        <div className="mx-auto w-full max-w-[90rem] px-6 py-16">
          <div className="flex gap-12">
            <div className="min-w-0 flex-1">
              <Link
                href="/projects"
                className="text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
              >
                &larr; All projects
              </Link>

              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight">{page.data.title}</h1>
                  <span className="border border-fd-border px-2 py-0.5 text-[11px] font-medium uppercase tracking-widest text-fd-muted-foreground">
                    {page.data.status}
                  </span>
                </div>
                <p className="mt-1 text-fd-muted-foreground">{page.data.role}</p>
              </div>

              <p className="mt-6 text-lg font-medium leading-snug tracking-tight">
                {page.data.tagline}
              </p>

              <article className="prose mt-4 min-w-0 text-[15px] leading-relaxed text-fd-muted-foreground">
                <Mdx components={defaultMdxComponents} />
              </article>

              {page.data.highlights.length > 0 && (
                <section className="mt-10">
                  <h2 className="text-lg font-semibold tracking-tight">Highlights</h2>
                  <div className="mt-4 space-y-px overflow-hidden border border-fd-border bg-fd-border">
                    {page.data.highlights.map((highlight: string) => (
                      <div key={highlight} className="bg-fd-card px-5 py-3.5">
                        <p className="text-sm">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {linkedBlogs.length > 0 && (
                <section className="mt-10">
                  <h2 className="text-lg font-semibold tracking-tight">Related Blog Posts</h2>
                  <div className="mt-4 space-y-px overflow-hidden border border-fd-border bg-fd-border">
                    {linkedBlogs.map((post: { url: string; title: string; description?: string }) => (
                      <Link
                        key={post.url}
                        href={post.url}
                        className="flex flex-col gap-1 bg-fd-card px-5 py-4 transition-colors hover:bg-fd-accent/30"
                      >
                        <span className="text-sm font-medium">{post.title}</span>
                        {post.description && (
                          <span className="text-[13px] text-fd-muted-foreground line-clamp-1">
                            {post.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {linkedArticles.length > 0 && (
                <section className="mt-10">
                  <h2 className="text-lg font-semibold tracking-tight">Related Articles</h2>
                  <div className="mt-4 space-y-px overflow-hidden border border-fd-border bg-fd-border">
                    {linkedArticles.map((article: { url: string; title: string; description?: string }) => (
                      <Link
                        key={article.url}
                        href={article.url}
                        className="flex flex-col gap-1 bg-fd-card px-5 py-4 transition-colors hover:bg-fd-accent/30"
                      >
                        <span className="text-sm font-medium">{article.title}</span>
                        {article.description && (
                          <span className="text-[13px] text-fd-muted-foreground line-clamp-1">
                            {article.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {linkedGuides.length > 0 && (
                <section className="mt-10">
                  <h2 className="text-lg font-semibold tracking-tight">Related Guides</h2>
                  <div className="mt-4 space-y-px overflow-hidden border border-fd-border bg-fd-border">
                    {linkedGuides.map((guide: { url: string; title: string; description?: string }) => (
                      <Link
                        key={guide.url}
                        href={guide.url}
                        className="flex flex-col gap-1 bg-fd-card px-5 py-4 transition-colors hover:bg-fd-accent/30"
                      >
                        <span className="text-sm font-medium">{guide.title}</span>
                        {guide.description && (
                          <span className="text-[13px] text-fd-muted-foreground line-clamp-1">
                            {guide.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {page.data.stack.length > 0 && (
                <section className="mt-10">
                  <h2 className="text-lg font-semibold tracking-tight">Stack</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {page.data.stack.map((tech: string) => (
                      <span
                        key={tech}
                        className="border border-fd-border px-3 py-1.5 text-sm text-fd-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {page.data.people.length > 0 && (
                <section className="mt-10">
                  <h2 className="text-lg font-semibold tracking-tight">People</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {page.data.people.map((person: string) => (
                      <span
                        key={person}
                        className="border border-fd-border px-3 py-1.5 text-sm text-fd-muted-foreground"
                      >
                        {person}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
            <aside className="sticky top-16 hidden h-fit w-56 shrink-0 lg:block">
              <h3 className="mb-3 text-sm font-medium text-fd-muted-foreground">
                On this page
              </h3>
              <TOCScrollArea className="flex max-h-[calc(100vh-8rem)] flex-col">
                <ContentTOC />
              </TOCScrollArea>
            </aside>
          </div>
        </div>
      </main>
    </TOCProvider>
  );
}
