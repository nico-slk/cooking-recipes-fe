/* eslint-disable @typescript-eslint/no-explicit-any */
const authUrl = "http://localhost:3000/api/auth";

export const AuthService = {
  login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<any> => {
    try {
      const fetchUser = await fetch(`${authUrl}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!fetchUser.ok) {
        const { message } = await fetchUser.json();
        throw new Error(`Error al iniciar sesión: ${message}`);
      }

      const response = await fetchUser.json();

      const { id, name, lastname, email: userEmail } = response.user;
      const { token } = response;

      const userData = { id, name, lastname, email: userEmail };
      sessionStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("token", JSON.stringify(token));
      const userResponse = {
        user: userData,
        token,
      };

      return userResponse;
    } catch (error: any) {
      console.error(
        "Error al iniciar sesión:",
        error.response?.data || error.message
      );
    }
  },

  register: async ({
    name,
    lastname,
    email,
    password,
    repassword,
  }: {
    name: string;
    lastname: string;
    email: string;
    password: string;
    repassword: string;
  }): Promise<any> => {
    console.log("Usuario registrado:", {
      name,
      lastname,
      email,
      password,
      repassword,
    });

    try {
      const fetchUser = await fetch(`${authUrl}/register`, {
        method: "POST",
        body: JSON.stringify({ name, lastname, email, password, repassword }),
        headers: { "Content-Type": "application/json" },
      });

      const response = await fetchUser.json();

      if (!fetchUser.ok) {
        throw new Error(`Error al crear el usuario: ${response.message}`);
      }

      return {
        created: true,
        message: "Usuario creado correctamente",
      };
    } catch (error: any) {
      console.error(
        "Error al crear el usuario:",
        error.response?.data || error.message
      );

      return {
        created: false,
        message: `Error al crear el usuario: ${
          error.response?.data || error.message
        }`,
      };
    }
  },

  logout: () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  },
};
