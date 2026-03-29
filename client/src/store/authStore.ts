import { create } from "zustand";
import axios from "axios";

const baseUrl: string = import.meta.env.VITE_API_URL;

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  register: async (name, email, password) => {
    try {
      set({ loading: true, error: null });

      await axios.post(`${baseUrl}/user/signup`, {
        name,
        email,
        password,
      });

      set({
        loading: false,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Registration failed";
      set({
        error: message,
        loading: false,
      });
      throw new Error(message);
    }
  },
  login: async (email, password) => {
    try {
      set({ loading: true, error: null });

      const response = await axios.post(`${baseUrl}/user/login`, {
        email,
        password,
      });

      const { user, token } = response.data;
      localStorage.setItem("token", token);

      set({
        user,
        token,
        isAuthenticated: true,
        loading: false,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Login failed";
      set({
        error: message,
        loading: false,
      });
      throw new Error(message);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));
