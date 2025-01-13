import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/app/sanity/client";
import Image from "next/image";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import Link from "next/link";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Metadata } from "next";

// Define your Sanity queries and fetch logic
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
const RECOMMENDED_POSTS_QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc){
  title,
  slug,
  publishedAt,
  image,
  body
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams; // Await `params` before destructuring
  const post = await client.fetch<SanityDocument>(POST_QUERY, { slug });

  const description = post.body && Array.isArray(post.body)
    ? `${post.body[0].children[0]?.text?.slice(0, 150)}...`
    : "Explore our latest blog post on surgical instruments.";

  return {
    title: post.title,
    description,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams; // Await `params` before destructuring

  const post = await client.fetch<SanityDocument>(POST_QUERY, { slug });
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  const allPosts = await client.fetch<SanityDocument[]>(RECOMMENDED_POSTS_QUERY, {}, options);
  const otherPosts = shuffleArray(allPosts.filter((p) => p.slug.current !== slug)).slice(0, 4);

  return (
    <LayoutWrapper className="min-h-screen py-[3rem]">
      <Link href="/blog" className="hover:underline hover:text-teal-600">
        ← Back to posts
      </Link>
      <main className="min-h-screen max-w-3xl flex mx-auto flex-col gap-4">
        {postImageUrl && (
          <Image
            src={postImageUrl}
            alt={post.title}
            className="aspect-video rounded-xl mx-auto block"
            width="550"
            height="310"
          />
        )}
        <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
        <div className="prose">
          <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
          {Array.isArray(post.body) && (
            <PortableText
              value={post.body}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="mb-4 whitespace-pre-wrap text-justify">{children}</p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold mb-4">{children}</h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="italic pl-4 border-l-4 border-gray-300 mb-4 text-justify">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  link: ({ value, children }) => (
                    <a
                      href={value.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 underline"
                    >
                      {children}
                    </a>
                  ),
                },
              }}
            />
          )}
        </div>
      </main>

      {/* Recommended Blog Posts Section */}
      <section className="mt-12 object-center">
        <h2 className="text-3xl font-semibold mb-6">Recommended Blog Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {otherPosts.map((otherPost) => (
            <div
              key={otherPost.slug.current}
              className="overflow-hidden transition-transform hover:scale-105 rounded-lg shadow-lg bg-white"
            >
              <Link href={`/blog/${otherPost.slug.current}`}>
                <div className="block relative overflow-hidden rounded-t-lg">
                  <Image
                    src={urlFor(otherPost.image)?.width(400).height(250).url() ?? "/placeholder-image.jpg"}
                    alt={otherPost.title}
                    className="w-full h-56 rounded-lg object-contain "
                    width={400}
                    height={250}
                  />
                </div>
              </Link>
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(otherPost.publishedAt).toLocaleDateString()}
                </p>
                <Link href={`/blog/${otherPost.slug.current}`}>
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-teal-600 mb-2">
                    {otherPost.title}
                  </h3>
                </Link>
                <div className="text-gray-600 text-sm line-clamp-3 text-justify">
                  {Array.isArray(otherPost.body) && <PortableText value={otherPost.body} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </LayoutWrapper>
  );
}
