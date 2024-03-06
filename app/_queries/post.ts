import { API } from "@/_data"
import { PostFindQuery } from "@/_types/post/post"

export async function getPosts({ pageParam = 0, query }: { pageParam?: number; query: PostFindQuery }) {
  const response = await API.get(`/post/all?cursor=${pageParam}&query=${query}`)

  return response.data
}

export async function getPopularPosts() {
  const response = await API.get(`/post/popular`)

  return response.data
}

export async function getTemplatePosts() {
  const response = await API.get(`/post/template`)

  return response.data
}

export async function getPost(postId: string) {
  const response = await API.get(`/post?postId=${postId}`)

  return response.data
}

export async function getSearchPosts(searchQuery: string) {
  const response = await API.get(`/post/search?searchQuery=${searchQuery}`)

  return response.data
}

export async function commenting(data: { userId: number; postId: string; text: string }) {
  const response = await API.post(`/post/comment`, data)

  return response.data
}

export async function finishPlay(postId: string, finishedPost: any) {
  const response = await API.put(`/post/finish?postId=${postId}`, finishedPost)
  return response.data
}

export async function likePost(userId?: number, postId?: string) {
  const response = await API.patch(`/post/like?postId=${postId}&userId=${userId}`)

  return response.data
}
