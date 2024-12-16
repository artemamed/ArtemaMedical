import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api/",
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API,
  },
});

// Fetch categories
export const getCategories = async () => {
  try {
    const response = await api.get("categories/mine");
    if (response.data.success) {
      return response.data.data.map((item: { category: string }) => item.category);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
    } else {
      console.error("Error fetching categories:", error);
    }
    throw error;
  }
};

// Fetch subcategories by category slug
export const getSubCategoriesByCategorySlug = async (
  categorySlug: string,
  page: number = 1,
  limit: number = 8
) => {
  if (!categorySlug) {
    throw new Error("Category slug is required to fetch subcategories.");
  }

  try {
    const response = await api.get(`categories/subCategories/${categorySlug}`, {
      params: { page, limit },
    });
    console.log("API Response for Subcategories:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.status, error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

// Fetch all products by subcategory slug
export const getProductsBySubCategorySlug = async (
  subCategorySlug: string,
  page: number = 1,
  limit: number = 8
) => {
  if (!subCategorySlug) throw new Error("SubCategory slug is required.");

  try {
    const response = await api.get(`sub-categories/metadata-products/${subCategorySlug}`, {
      params: { page, limit },
    });
    console.log("API Response:", response.data);
    return response.data; // Ensure the response structure matches your API's design
  } catch (error) {
    console.error("Error fetching products:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch products.");
    } else {
      throw new Error("Unexpected error occurred.");
    }
  }
};

