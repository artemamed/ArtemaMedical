export type UserData = {
    name: string;
    email: string;
    password: string;
    phone: number;
  };
  
  const mockDatabase: UserData = {
    name: "Ubaid Ullah",
    email: "ubaid@gmail.com",
    password: "123456",
    phone: 1234567890,
  };
  
  export const mockRegister = (user: UserData): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (user.email === mockDatabase.email) {
        reject("User already exists.");
      } else {
        resolve("User registered successfully.");
      }
    });
  };
  
  