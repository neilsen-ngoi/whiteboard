// Api route to create board

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
];

//Create board
export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    // generate board props
    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imgageUrl: randomImage,
    });

    return board;
  },
});

//Delete board
export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
    // delete board from favorited table
    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", args.id)
      )
      .unique();

    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
    }

    await ctx.db.delete(args.id);
  },
});

//Rename/update board
export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const title = args.title.trim();

    if (!title) {
      throw new Error("Title is required");
    }

    if (title.length > 60) {
      throw new Error("Title cannot be longer that 60 characters");
    }
    // update title name in database
    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});

// add board to favorites
export const favorite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();

    if (existingFavorite) {
      throw new Error("Board already favorited");
    }
    // update the db with favorited board
    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});
// remove favorited board
export const unfavorite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    // fetch user
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
    // fetch current user board
    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }
    // fetch userId
    const userId = identity.subject;
    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();

    // check to see if board is "not" favorited
    if (!existingFavorite) {
      throw new Error("Favorited board not found");
    }
    // update the db with favorited board
    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});
// fetch board with Id
export const get = query({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const board = ctx.db.get(args.id);
    return board;
  },
});
