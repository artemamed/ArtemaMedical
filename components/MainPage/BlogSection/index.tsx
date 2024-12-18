import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/app/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { CircleArrowRight } from "lucide-react";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";

// Sanity configuration
const { projectId, dataset } = client.config();
const urlFor = (source: string | Record<string, unknown>) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// Define the BlogPost interface
interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

// Query to fetch the most recent posts (limit to 3)
const RECENT_BLOGS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...3]{_id, title, slug, publishedAt, image}`;

export default function BlogSection() {
  // State to hold the fetched blog posts
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Fetch blog posts from Sanity API
    const fetchBlogs = async () => {
      const blogs: BlogPost[] = await client.fetch(RECENT_BLOGS_QUERY);
      setRecentBlogs(blogs); // Set the state with the fetched blogs
    };

    fetchBlogs();
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <LayoutWrapper className="mb-10">
      <h2 className="text-2xl sm:text-3xl xl:text-5xl font-semibold  mb-8 text-[#004040]">
        Recent Blogs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {recentBlogs.map((blog: BlogPost) => (
          <div key={blog._id} className="group relative flex flex-col">
            <div className="relative aspect-[3/2] w-full">
              <Link href={`/blog/${blog.slug.current}`}>
                <Image
                  src={urlFor(blog.image)?.width(400).height(250).url() ?? "/placeholder-image.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl"
                />
              </Link>
            </div>

            <div className="pt-4 sm:pt-6">
              <div className="flex items-center justify-between gap-4">
                <Link href={`/blog/${blog.slug.current}`}>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex-1 hover:text-teal-600">
                    {blog.title}
                  </h3>
                </Link>
                <CircleArrowRight className="w-7 h-7 sm:w-9 sm:h-9 text-[#008080] flex-shrink-0" />
              </div>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                {new Date(blog.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/blog"
          className="text-teal-600 font-medium underline inline-block hover:text-teal-700 transition-colors"
        >
          View All Blogs &rarr;
        </Link>
      </div>
    </LayoutWrapper>
  );
}
