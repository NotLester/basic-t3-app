"use client";
import { useRouter } from "next/navigation";

import { api } from "@/trpc/react";

export function useRefreshPosts() {
  const utils = api.useUtils();
  const router = useRouter();

  const refreshPosts = async () => {
    await utils.post.getAllPosts.invalidate();
    await utils.post.getLatest.invalidate();
    router.refresh();
  };

  return refreshPosts;
}
