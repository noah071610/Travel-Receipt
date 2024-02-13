export type PostFindQuery = "all" | "popular" | "like" | "participate"

export type VoteIdType = {
  postId: string
  listId: string
}

export interface ListType {
  listId: string
  imageSrc?: string
  title: string
  description?: string
  count: number
  number: number
}

export interface UserType {
  userId: number
  userName: string
  userImage: string
  liked: string[]
}

export interface PostCardInfo {
  participateImages: string[]
  shareCount: number
  like: number
  participateCount: number
}

interface _PostCardType {
  postId: string
  type: string
  title: string
  description: string
  chartDescription: string
  thumbnail: string
  user: UserType
  createdAt: string
  updatedAt: string
}
export interface PostCardType extends _PostCardType {
  info: PostCardInfo
}
export interface PostType extends _PostCardType {
  content: ListType[]
  comments: CommentType[]
}

export interface CommentType {
  commentId: number
  user: UserType
  text: string
  like: number
}

export interface PostCardListType {
  pageParams: number[]
  pages: PostCardType[][]
}
