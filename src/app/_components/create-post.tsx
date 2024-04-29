"use client";

import React from "react";

import { useRefreshPosts } from "@/app/_hooks/useRefreshPosts";
import { api } from "@/trpc/react";

export function CreatePost() {
  const [name, setName] = React.useState("");
  const refreshPosts = useRefreshPosts();

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      setName("");
      await refreshPosts();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isPending}
      >
        {createPost.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
