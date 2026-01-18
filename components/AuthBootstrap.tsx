"use client";

import { useAuthStore } from "@/stores/auth";
import { useEffect } from "react";

const AuthBootstrap = () => {
  const fetchCurrentUser = useAuthStore((s) => s.fetchCurrentUser);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);
  return null;
};

export default AuthBootstrap;
