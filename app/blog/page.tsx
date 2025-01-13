import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../sanity/client";
import { PortableText, type SanityDocument } from "next-sanity";
import { CalendarDays } from "lucide-react";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";

// Query to get the most recent post
const MOST_RECENT_POST_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0]{_id, title, slug, publishedAt, image, body}`;

// Query to get the other posts (excluding the most recent)
const OTHER_POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && publishedAt != $mostRecentDate
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image, body}`;

const { projectId, dataset } = client.config();
const urlFor = (source: string | Record<string, unknown>) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  // Fetch the most recent post
  const mostRecentPost = await client.fetch<SanityDocument>(
    MOST_RECENT_POST_QUERY,
    {},
    options
  );

  // Fetch the other posts, excluding the most recent one
  const otherPosts = await client.fetch<SanityDocument[]>(
    OTHER_POSTS_QUERY,
    { mostRecentDate: mostRecentPost.publishedAt },
    options
  );

  return (
    <LayoutWrapper className="min-h-screen py-[3rem]">
      <h1 className="text-4xl sm:text-5xl font-semibold mb-12 text-center text-[#004040]">Medical Insights & Innovations</h1>

      {/* Most Recent Post Section */}
      <section className="w-full mb-12 mx-auto md:mx-0">
        {mostRecentPost && (
          <div className="flex flex-col sm:flex-row overflow-hidden transition-transform hover:scale-105 mb-8">
            <Link href={`/blog/${mostRecentPost.slug.current}`}>
              <div className="block relative overflow-hidden">
                <Image
                  src={urlFor(mostRecentPost.image)?.url() ?? "/placeholder-image.jpg"}
                  alt={mostRecentPost.title}
                  className="object-contain rounded-lg "
                  width={2000}
                  height={500}
                />
              </div>
            </Link>

            <div className="p-6 sm:p-8">
              <p className="text-sm sm:text-base text-[#666666] mb-4">
                <CalendarDays className="inline-block mr-1 w-5 h-5 -mt-1 " />
                {new Date(mostRecentPost.publishedAt).toLocaleDateString()}
              </p>
              <p className="text-sm sm:text-base text-gray-500 mb-4">
              </p>

              <Link href={`/blog/${mostRecentPost.slug.current}`}>
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600">
                  {mostRecentPost.title}
                </h2>
              </Link>

              <div className="text-[#6D6D6D] line-clamp-3 w-full sm:w-4/5">
                {Array.isArray(mostRecentPost.body) && (
                  <PortableText value={mostRecentPost.body} />
                )}
              </div>

              <Link
                href={`/blog/${mostRecentPost.slug.current}`}
                className="mt-4 inline-block text-[#008080] hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Other Posts Section */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {otherPosts.map((post) => {
            const postImageUrl = post.image
              ? urlFor(post.image)?.width(400).height(250).url() ?? "/placeholder-image.jpg"
              : "/placeholder-image.jpg"; // Fallback image

            return (
              <div
                key={post._id}
                className="overflow-hidden transition-transform hover:scale-105"
              >
                <Link href={`/blog/${post.slug.current}`}>
                  <div className="block relative overflow-hidden">
                    <Image
                      src={postImageUrl}
                      alt={post.title}
                      className="w-full h-auto object-contain rounded-lg"
                      width={400}
                      height={250}
                    />
                  </div>
                </Link>

                <div className="p-2 sm:p-4">
                  <p className="text-sm sm:text-base text-[#666666] mb-4">
                    <CalendarDays className="inline-block mr-1 w-5 h-5 -mt-1 " />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                  <Link href={`/blog/${post.slug.current}`}>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600">
                      {post.title}
                    </h2>
                  </Link>

                  <div className="text-[#6D6D6D] line-clamp-3">
                    {Array.isArray(post.body) && <PortableText value={post.body} />}
                  </div>

                  <Link
                    href={`/blog/${mostRecentPost.slug.current}`}
                    className="mt-4 inline-block text-[#008080] hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </LayoutWrapper>
  );
}