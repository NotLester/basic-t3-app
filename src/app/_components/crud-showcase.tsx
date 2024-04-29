"use client";

import { CreatePost } from "@/app/_components/create-post";
import { useRefreshPosts } from "@/app/_hooks/useRefreshPosts";
import { api } from "@/trpc/react";

export function CrudShowcase() {
  const refreshPosts = useRefreshPosts();

  const latestPostQuery = api.post.getLatest.useQuery();
  const allPostsQuery = api.post.getAllPosts.useQuery();

  const deletePostById = api.post.deletePost.useMutation({
    onSuccess: async () => {
      await refreshPosts();
    },
  });

  return (
    <div className="w-full max-w-xs">
      <h2 className="text-3xl font-bold">Posts</h2>
      <ul>
        {allPostsQuery.data?.map((post) => (
          <li key={post.id} className="flex flex-row gap-20 py-2">
            <p>{post.name}</p>
            <button
              className="rounded-md bg-red-500 p-2"
              onClick={() => deletePostById.mutate({ id: post.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {latestPostQuery.data ? (
        <p className="truncate">
          Your most recent post: {latestPostQuery.data[0]?.name}
        </p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <CreatePost />
    </div>
  );
}
