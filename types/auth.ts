export interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
  }
  
  export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: {
      id: string;
      email: string;
    };
  }
  