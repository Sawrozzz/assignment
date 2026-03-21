/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios from "axios";

const baseUrl: string = import.meta.env.VITE_API_URL;

export type Property = {
  id: number;
  title: string;
  price: number;
  location: string;
  created_at: string;
  updated_at: string;
};

export type Favourite = {
  id: number;
  user_id: number;
  property_id: number;
  is_liked: boolean;
  created_at: string;
  updated_at: string;
  property: Property;
};

type PropertyState = {
  properties: Property[];
  favourites: Favourite[];
  token: string | null;
  loading: boolean;
  error: string | null;
  getAllProperties: () => Promise<void>;
  getFavouriteProperties: () => Promise<void>;
  addToFavourite: (propertyId: number) => Promise<void>;
  removeFromFavourite: (favouriteId: number) => Promise<void>;
  toogleLike: (favouriteId: number) => Promise<void>;
};

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  favourites: [],
  loading: false,
  error: null,

  token: localStorage.getItem("token"),

  getAllProperties: async () => {
    const { token } = get();

    if (!token) {
      set({ error: "Unauthorized. Please login." });
      return;
    }
    try {
      set({ loading: true, error: null });

      const response = await axios.get(`${baseUrl}/properties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ properties: response.data, loading: false });
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to fetch properties";

      set({ error: message, loading: false });
    }
  },
  getFavouriteProperties: async () => {
    const { token } = get();
    if (!token) {
      set({ error: "No auth token found" });
      return;
    }

    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${baseUrl}/favourites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ favourites: response.data, loading: false });
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to fetch favourites";
      set({ error: message, loading: false });
    }
  },
  addToFavourite: async (propertyId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ error: "No auth token found" });
      return;
    }

    try {
      set({ loading: true, error: null });

      await axios.post(
        `${baseUrl}/favourites`,
        { property_id: propertyId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const response = await axios.get(`${baseUrl}/favourites`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ favourites: response.data, loading: false });
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to add favourite";
      set({ error: message, loading: false });
    }
  },
  removeFromFavourite: async (favouriteId: number) => {
    const { token, favourites } = get();
    if (!token) return;
    const updatedFavourites = favourites.filter(
      (fav) => fav.id !== favouriteId,
    );
    set({ favourites: updatedFavourites });
    const previousFavourites = [...favourites];

    try {
      await axios.delete(`${baseUrl}/favourites/${favouriteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to add favourite";
      set({ favourites: previousFavourites, error: message, loading: false });
    }
  },
  toogleLike: async (favouriteId: number) => {
    const { token, favourites } = get();

    if (!token) return;

    const prevFavourites = [...favourites];

    const updated = favourites.map((f) =>
      f.id === favouriteId ? { ...f, is_liked: !f.is_liked } : f,
    );
    set({ favourites: updated });

    try {
      await axios.patch(
        `${baseUrl}/favourites/${favouriteId}/toggle_like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to add favourite";
      set({ favourites: prevFavourites, error: message, loading: false });
    }
  },
}));
