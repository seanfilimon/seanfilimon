import { ImageResponse } from "next/og";
import { source, blog, guides, articles, resources, events } from "@/lib/source";
import { siteName } from "@/lib/metadata";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;

  const allLoaders = [
    { loader: source, prefix: "docs" },
    { loader: blog, prefix: "blog" },
    { loader: guides, prefix: "guides" },
    { loader: articles, prefix: "articles" },
    { loader: resources, prefix: "resources" },
    { loader: events, prefix: "events" },
  ];

  const prefix = slug[0];
  const pageSlugs = slug.slice(1, -1);

  const match = allLoaders.find((l) => l.prefix === prefix);
  if (!match) {
    return new Response("Not found", { status: 404 });
  }

  const page = match.loader.getPage(pageSlugs);
  if (!page) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#a1a1aa",
            marginBottom: 16,
          }}
        >
          {siteName}
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: 900,
          }}
        >
          {page.data.title}
        </div>
        {page.data.description && (
          <div
            style={{
              fontSize: 24,
              color: "#a1a1aa",
              marginTop: 24,
              maxWidth: 800,
            }}
          >
            {page.data.description}
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  const allLoaders = [
    { loader: source, prefix: "docs" },
    { loader: blog, prefix: "blog" },
    { loader: guides, prefix: "guides" },
    { loader: articles, prefix: "articles" },
    { loader: resources, prefix: "resources" },
    { loader: events, prefix: "events" },
  ];

  return allLoaders.flatMap(({ loader, prefix }) =>
    loader.getPages().map((page) => ({
      slug: [prefix, ...page.slugs, "image.png"],
    })),
  );
}
