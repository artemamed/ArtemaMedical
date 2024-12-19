// import { useState } from "react";
// import { registerUser, loginUser } from "@/services/authService";
// import { RegisterPayload, LoginPayload } from "@/types/auth";

// export const useAuth = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const register = async (data: RegisterPayload & { phone: string }) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await registerUser(data);
//       return response;
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (data: LoginPayload) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await loginUser(data);
//       return response;
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { register, login, loading, error };
// };
