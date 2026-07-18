"use client";

import { useEffect } from "react";
import { useContent } from "@/lib/useContent";

// Applies admin-editable design settings as CSS variables.
export default function ThemeStyle() {
  const { design } = useContent();

  useEffect(() => {
    const root = document.documentElement;
    if (design?.accentColor) root.style.setProperty("--accent", design.accentColor);
    if (design?.logoWidth) root.style.setProperty("--logo-max", `${design.logoWidth}px`);
  }, [design]);

  return null;
}
