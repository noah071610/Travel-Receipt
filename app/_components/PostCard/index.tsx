"use client"

import { useProgressiveImage } from "@/_hooks/useProgressiveImage"
import { PostCardType } from "@/_types/post"
import Link from "next/link"
import LoadingBar from "../LoadingBar"
import Profile from "./Profile"
import "./style.scss"

const participateShowNumber = 8

export default function PostCard({ postCard }: { postCard: PostCardType }) {
  const {
    user,
    description,
    postId,
    thumbnail,
    title,
    info: { participateImages, like, shareCount, participateCount },
  } = postCard

  const loaded = useProgressiveImage(thumbnail)
  return (
    <article className="post-card">
      <Profile user={user} like={like} shareCount={shareCount} />
      <div className="post-card-main">
        <Link className="post-card-link" href={`/post/${postId}`}>
          <h1>{title}</h1>
          <h2>{description}</h2>
          <div className="thumbnail">
            {loaded ? (
              <div className="thumbnail-image">
                <div
                  style={{
                    background: `url('${thumbnail}') center / cover`,
                  }}
                />
              </div>
            ) : (
              <div className="loading">
                <LoadingBar />
              </div>
            )}
          </div>
        </Link>

        {participateImages.length > 0 && (
          <div className="participate">
            {participateImages.map((image, i) => (
              <img
                style={{ left: `${i * 13}px` }}
                className="participate-profile"
                key={`${postId}_participate_${i + 1}`}
                src={image}
                alt={`${postId}_participate_${i + 1}`}
              />
            ))}
            {/* memo: 기본패딩 + 프로필 하나 + 13픽셀 겹친 프로필 나머지 */}
            <span
              style={{
                paddingLeft: `${4 + 25 + (participateImages.length - 1) * 13}px`,
              }}
            >
              {participateImages.length > participateShowNumber
                ? `등 총 ${participateCount}명 참여`
                : `${participateCount}명 참여`}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
