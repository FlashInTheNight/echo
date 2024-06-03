import { Like } from "../types"
import { api } from "./api"

export const likesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<Like, { postId: string }>({
      query: (body) => ({
        url: "/likes/likePost",
        method: "POST",
        body,
      }),
    }),
    unlikePost: builder.mutation<void, { postId: string }>({
      query: (postId) => ({
        url: '/likes/unlikePost',
        method: "DELETE",
        body: postId,
      }),
    }),
  }),
})

export const { useLikePostMutation, useUnlikePostMutation } = likesApi

export const {
  endpoints: { likePost, unlikePost },
} = likesApi
