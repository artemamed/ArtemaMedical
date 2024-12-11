import apiClient from "@/lib/utils";

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await apiClient.post("/buyers/register", data);
  return response.data;
};

export const loginUser = async (data: LoginPayload) => {
  const response = await apiClient.post("/buyers/buyer-login", data);
  return response.data;
};
