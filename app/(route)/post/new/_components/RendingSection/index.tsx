"use client"

import { getUser } from "@/_queries/user"

import { useNewPostStore } from "@/_store/newPost"
import { UserType } from "@/_types/user"
import { useQuery } from "@tanstack/react-query"

import NoThumbnail from "@/_components/Loading/NoThumbnail"
import { createNewPost, uploadImage } from "@/_queries/newPost"
import { useContestTypeStore } from "@/_store/newPost/contest"
import { usePollingStore } from "@/_store/newPost/polling"
import { PostOptionType, ThumbnailType } from "@/_types/post/post"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { useDropzone } from "react-dropzone"

import classNames from "classNames"
import style from "./style.module.scss"
const cx = classNames.bind(style)

const selectorTypes = [
  { type: "custom", children: <i className={cx("fa-solid", "fa-image")}></i>, label: "커스텀 썸네일" },
  {
    type: "layout",
    children: <i className={cx("fa-solid", "fa-film")}></i>,
    label: "콘텐츠 레이아웃",
  },
  { type: "none", children: <i className={cx("fa-solid", "fa-close")}></i>, label: "썸네일 없음" },
]

export default function RendingSection() {
  const { data: user } = useQuery<UserType>({
    queryKey: ["getUser", "edit"],
    queryFn: () => getUser(1),
    select: ({ userId, userName, userImage }) => ({ userId, userName, userImage }), // 여기서 data는 전체 데이터 객체입니다.
  })

  const router = useRouter()
  const { newPost, setNewPost, clearNewPost } = useNewPostStore()
  const { leftCandidate, rightCandidate, clearContestContent } = useContestTypeStore()
  const { newCandidates, clearPollingContent } = usePollingStore()

  const onChangeThumbnailStyle = (type: ThumbnailType) => {
    setNewPost({ type: "thumbnailType", payload: type })
  }
  const onClickOption = (option: PostOptionType) => {
    setNewPost({ type: "option", payload: option })
  }

  const create = async (type: "preview" | "posting") => {
    if (!newPost) {
      return alert("에러 발생")
    }
    const _post = { ...newPost }

    if (_post.title.trim().length < 3) return alert("타이틀은 공백을 제외하고 3글자 이상으로 작성해주세요!")
    if (!user) return alert("로그인이 필요해요")

    switch (newPost?.type) {
      case "polling":
        if (newCandidates.length < 2) return alert("후보는 적어도 2개 이상 필요해요")
        if (!newCandidates.every(({ title }) => !!title.trim())) return alert("타이틀이 없는 후보가 존재해요")
        _post.content = {
          ..._post.content.content,
          candidates: newCandidates.map((v) => ({ ...v, count: 0 })),
        }
      case "contest":
        if (!leftCandidate.imageSrc.trim()) return alert("왼쪽 후보의 이미지가 필요해요")
        if (!rightCandidate.imageSrc.trim()) return alert("오른쪽 후보의 이미지가 필요해요")
        if (!leftCandidate.title.trim()) return alert("왼쪽 후보의 타이틀을 입력해주세요")
        if (!rightCandidate.title.trim()) return alert("오른쪽 후보의 타이틀을 입력해주세요")
        _post.content = {
          left: {
            ...leftCandidate,
            count: 0,
          },
          right: {
            ...rightCandidate,
            count: 0,
          },
        }
    }

    if (type === "preview") {
      router.push("/post/preview")
    } else {
      await createNewPost(_post).then(() => {
        clearNewPost()
        clearContestContent()
        clearPollingContent()
        router.push(`/`)
      })
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach(async (file: any) => {
        const formData = new FormData()
        formData.append("image", file)

        const { msg, imageSrc } = await uploadImage(formData)
        if (msg === "ok") {
          setNewPost({ type: "thumbnail", payload: imageSrc })
          setNewPost({ type: "thumbnailType", payload: "custom" })
        }
      })
    },
    [setNewPost]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  })

  const thumbnailType = newPost?.info.thumbnailType
  const info = newPost?.info
  const layoutImages = useMemo(() => {
    switch (newPost?.type) {
      case "polling":
        return newCandidates
      case "contest":
        return [leftCandidate, rightCandidate]
      default:
        return []
    }
  }, [newPost?.type])

  return (
    user && (
      <div className={cx(style.rending)}>
        <section className={cx(style["rending-section"])}>
          <h1>썸네일 변경</h1>
          <div className={cx(style["thumbnail-edit"])}>
            {thumbnailType === "custom" && (
              <div
                style={{
                  background: `url('${newPost?.thumbnail}') center / cover`,
                }}
                className={cx(style.thumbnail, style.custom, { [style.active]: isDragActive })}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <i className={cx("fa-solid", "fa-plus", { [style.active]: isDragActive })} />
              </div>
            )}
            {thumbnailType === "layout" && (
              <div className={cx(style.thumbnail, style.layout)}>
                {layoutImages.slice(0, 5).map(({ listId, imageSrc }) => (
                  <div
                    key={`thumb_${listId}`}
                    style={{
                      backgroundImage: `url('${imageSrc}'), url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWDEOaqDXtUswwG_M29-z0hIYG-YQqUPBUidpFBHv6g60GgpYq2VQesjbpmVVu8kfd-pw&usqp=CAU')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ))}
              </div>
            )}
            {thumbnailType === "none" && <NoThumbnail type="post-card" />}
            <div className={cx(style["thumbnail-selector"])}>
              {selectorTypes.map(({ type, children, label }) => (
                <button
                  key={type}
                  onClick={() => onChangeThumbnailStyle(type as ThumbnailType)}
                  className={cx({ [style.active]: thumbnailType === type })}
                >
                  <div className={`preview`}>{children}</div>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
        <div className={cx(style.finish)}>
          <div className={cx(style.option, { [style.active]: newPost?.format === "secret" })}>
            <span>비공개 콘텐츠</span>
            <button onClick={() => onClickOption("isSecret")} className={cx(style.bar)}>
              <div className={cx(style.circle)}></div>
            </button>
          </div>
          <div className={cx(style.option, { [style.active]: info?.isNoComments })}>
            <span>댓글 비활성화</span>
            <button onClick={() => onClickOption("isNoComments")} className={cx(style.bar)}>
              <div className={cx(style.circle)}></div>
            </button>
          </div>
          <div className={cx(style["btn-wrapper"])}>
            <button onClick={() => create("preview")}>미리 플레이 해보기</button>
            <button onClick={() => create("posting")}>포스팅 하기</button>
          </div>
        </div>
      </div>
    )
  )
}
