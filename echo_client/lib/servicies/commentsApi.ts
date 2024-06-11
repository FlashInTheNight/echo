import { api } from "./api";

export const commentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<Comment, { content: string, postId: string }>({
      query: (newComment) => ({
        url: "/comments/create",
        method: "POST",
        body: newComment,
      }),
    }),
    deleteComment: builder.mutation<void, { commentId: string }>({
      query: (commentId) => ({
        url: `/comments/delete`,
        method: "DELETE",
        body: commentId,
      }),
    }),
  }),
});

export const { useCreateCommentMutation, useDeleteCommentMutation } =
  commentsApi;

export const {
  endpoints: { createComment, deleteComment },
} = commentsApi;
