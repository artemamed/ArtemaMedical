import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api/",
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API,
  },
});

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

export const getSubCategoriesByCategorySlug = async (
  categorySlug: string,
  page: number = 1,
  limit: number = 8
) => {
  try {
    const response = await api.get(`categories/subCategories/${categorySlug}`, {
      params: { page, limit },
    });
    console.log("Full API Response for Subcategories:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};


