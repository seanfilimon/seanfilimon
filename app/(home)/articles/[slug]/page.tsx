import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { articles } from "@/lib/source";
import { siteUrl } from "@/lib/metadata";
import { TOCProvider, TOCScrollArea } from "fumadocs-ui/components/toc";
import { ContentTOC } from "@/components/content-toc";

export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = articles.getPage([params.slug]);
  if (!page) notFound();

  const Mdx = page.data.body;

  return (
    <TOCProvider toc={page.data.toc}>
      <main className="mx-auto w-full max-w-[90rem] px-6 py-12">
        <div className="flex gap-12">
          <div className="min-w-0 flex-1">
            <div className="mb-8">
              <Link
                href="/"
                className="text-sm text-fd-muted-foreground hover:text-fd-foreground"
              >
                &larr; Back
              </Link>
            </div>
            {page.data.thumbnail && (
              <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden">
                <Image
                  src={page.data.thumbnail}
                  alt={page.data.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>
            )}
            <header className="mb-8 border-b border-fd-border pb-8">
              <h1 className="text-3xl font-bold">{page.data.title}</h1>
              {page.data.description && (
                <p className="mt-2 text-lg text-fd-muted-foreground">
                  {page.data.description}
                </p>
              )}
              <div className="mt-4 flex gap-4 text-sm text-fd-muted-foreground">
                <span>{page.data.author}</span>
                <span>
                  {new Date(page.data.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </header>
            <article className="prose min-w-0">
              <Mdx components={defaultMdxComponents} />
            </article>
            <script
              type="application/ld+json"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Article",
                  headline: page.data.title,
                  description: page.data.description,
                  author: {
                    "@type": "Person",
                    name: page.data.author,
                    url: siteUrl,
                  },
                  datePublished: page.data.date,
                  url: `${siteUrl}${page.url}`,
                }),
              }}
            />
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
      </main>
    </TOCProvider>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return articles.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = articles.getPage([params.slug]);
  if (!page) notFound();

  const tags = (page.data.tags as string[]) || [];
  const keywords = [
    "Sean Filimon",
    "Sean F",
    page.data.title,
    ...tags,
    "article",
    "engineering",
  ].join(", ");

  return {
    title: page.data.title,
    description: page.data.description,
    keywords,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: "article",
      url: `${siteUrl}${page.url}`,
      images: page.data.thumbnail ?? `/og${page.url}/image.png`,
      publishedTime: String(page.data.date),
      authors: [page.data.author],
    },
    alternates: {
      canonical: `${siteUrl}${page.url}`,
    },
  };
}
