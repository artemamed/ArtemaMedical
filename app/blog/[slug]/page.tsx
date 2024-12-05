import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import { client } from "@/app/sanity/client";
import Image from "next/image";

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

export default async function PostPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const post = await client.fetch<SanityDocument>(POST_QUERY, params, options);
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  const allPosts = await client.fetch<SanityDocument[]>(RECOMMENDED_POSTS_QUERY, {}, options);
  const otherPosts = shuffleArray(allPosts.filter((p) => p.slug.current !== params.slug)).slice(0, 3);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/blog" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>

      {/* Recommended Blog Posts Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">Recommended Blog Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    className="object-cover w-full h-52 rounded-t-lg"
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
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-500 mb-2">
                    {otherPost.title}
                  </h3>
                </Link>
                <div className="text-gray-600 text-sm line-clamp-3">
                  {Array.isArray(otherPost.body) && <PortableText value={otherPost.body} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
