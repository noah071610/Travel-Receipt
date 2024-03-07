"use client"

import { _url, getShareUrl, kakaoShare } from "@/_data"
import { getThumbnail, shareProviders } from "@/_data/post"
import { toastSuccess } from "@/_data/toast"
import { copyTextToClipboard } from "@/_utils/copy"
import classNames from "classNames"
import Image from "next/image"
import Link from "next/link"
import style from "./style.module.scss"
const cx = classNames.bind(style)

type ShareProviderValue = "twitter" | "facebook" | "kakaoTalk" | "line" | "link"

export default function Share({ post }: { post: any }) {
  const onClickShare = async (v: ShareProviderValue) => {
    if (post) {
      const { postId, title, type, description, thumbnail: _thumbnail } = post
      const thumbnail = getThumbnail(_thumbnail)
      const url = `${_url.client}/post/${type}/${postId}`
      if (v === "link") {
        await copyTextToClipboard(url).then(() => {
          toastSuccess("copyLink")
        })
        return
      }
      if (v === "kakaoTalk") {
        return kakaoShare({
          title,
          description,
          imageUrl: thumbnail.length > 0 ? thumbnail[0] : "// todo: 기본 썸네일",
          link: url,
        })
      }

      window.open(getShareUrl[v]({ text: title, url }), "_blank")
    }
  }
  return (
    <section className={cx(style["cta-section"])}>
      <div className={cx(style["cta-wrapper"])}>
        <div className={cx(style["cta-main"])}>
          <ul>
            {shareProviders.map(({ value }, i) => (
              <li key={`share_${value}`}>
                <button onClick={() => onClickShare(value as ShareProviderValue)}>
                  <div className={cx(style.image)}>
                    <Image width={22} height={22} src={`/images/icon/${value}.png`} alt={value} />
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <div className={cx(style.cta)}>
            <Link href="/">
              <span>콘텐츠 둘러보기</span>
              <Image src="/images/emoji/dizzy.png" width={22} height={22} alt="icon-1" />
            </Link>
            <Link href="/post/new" target="_blank">
              <span>나도 만들기</span>
              <Image src="/images/emoji/rocket.png" width={22} height={22} alt="icon-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
