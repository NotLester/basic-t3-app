import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { posts } from "@/server/db/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => ({
      greeting: `Hello ${input.text}`,
    })),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
        await ctx.db
            .insert(posts)
            .values({ name: input.name });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
      return ctx.db
          .select()
          .from(posts)
          .orderBy(desc(posts.createdAt))
          .limit(1);
  }),

  getAllPosts: publicProcedure.query(({ ctx }) => {
      return ctx.db
          .select()
          .from(posts);
  }),

  deletePost: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
        await ctx.db
            .delete(posts)
            .where(eq(posts.id, input.id));
    }),

  updatePost: publicProcedure
    .input(z.object({ id: z.number(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(posts)
        .set({ name: input.name })
        .where(eq(posts.id, input.id));
    }),
});
