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
  created_at: string;
  updated_at: string;
  property: Property;
};

type PropertyState = {
  properties: Property[];
  favourites: Favourite[];
  loading: boolean;
  error: string | null;
  getAllProperties: () => Promise<void>;
  getFavouriteProperties: () => Promise<void>;
  addToFavourite: (propertyId: number) => Promise<void>;
};

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  favourites: [],
  loading: false,
  error: null,

  getAllProperties: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({ error: "You are not authorized yet. Login first" });
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
    const token = localStorage.getItem("token");
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
}));
