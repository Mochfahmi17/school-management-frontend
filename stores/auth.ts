import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  fetchCurrentUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  fetchCurrentUser: async () => {
    set({ loading: true });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        set({ user: null });
        return;
      }

      set({ user: data.user });
    } catch (error) {
      console.log(error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
}));
