import {
  fetchCategoriesURLS,
  fetchSubCategoriesURLS,
  //   getProductsBySubCategorySlug,
} from "@/lib/api";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";

type ISitemap = {
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
};

const options = { next: { revalidate: 30 } };

// Query to fetch blogs slug
const BlogsQuery = `*[
    _type == "post"
    && defined(slug.current)
  ]|order(publishedAt desc){slug}`;

export default async function sitemap() {
  // Fetch the most recent post
  const blogs = await client.fetch<SanityDocument[]>(BlogsQuery, {}, options);
  // Function to process categories, subcategories, and products
  const generateCatalogSitemaps = async () => {
    const categoriesSlug = (await fetchCategoriesURLS()) as string[];
    const SubcategoriesSlug = (await fetchSubCategoriesURLS()) as string[];
    // const ProductsSlug = (await fetchProductsURLS()) as string[];
    // console.log(ProductsSlug);
    const categories: ISitemap[] = categoriesSlug.map((category) => {
      return {
        url: `https://artemamed.com/category/${category}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      };
    });
    const subCategories: ISitemap[] = SubcategoriesSlug.map((subCategory) => {
      return {
        url: `https://artemamed.com/sub-category/${subCategory}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      };
    });
    // const products: ISitemap[] = ProductsSlug.map((product) => {
    //   return {
    //     url: `https://artemamed.com/product/${product}`,
    //     lastModified: new Date(),
    //   };
    // });

    return {
      categories,
      subCategories,
      //   products,
    };
  };

  // Generate the sitemap arrays
  const { categories, subCategories } = await generateCatalogSitemaps();
  const blogsURls: ISitemap[] = blogs.map((blog) => ({
    url: `https://artemamed.com/blog/${blog.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));
  return [
    {
      url: "https://artemamed.com/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...blogsURls,
    ...categories,
    ...subCategories,
    // ...products,
  ];
}
