"use client"

import { getImageUrl } from "@/_data"
import { fadeMoveUpAnimation, scaleUpAnimation } from "@/_styles/animation"
import { PollingCandidateType } from "@/_types/post/polling"
import classNames from "classNames"
import style from "./style.module.scss"
const cx = classNames.bind(style)

export default function SelectPart({
  selectedCandidate,
  onClickCandidate,
}: {
  selectedCandidate: PollingCandidateType | null
  onClickCandidate: (type: "submit" | "select", candidate?: PollingCandidateType) => void
}) {
  return (
    <>
      {selectedCandidate ? (
        <div key={selectedCandidate.listId} className={cx(style["select-part"])}>
          <div
            style={{
              background: getImageUrl({ url: selectedCandidate.imageSrc, isCenter: true }),
              ...scaleUpAnimation(250),
            }}
            className={cx(style["image"])}
          />
          <div className={cx(style["description"])}>
            <h2 style={fadeMoveUpAnimation(500, 100)}>{selectedCandidate.title}</h2>
            {selectedCandidate.description?.trim() && (
              <p style={fadeMoveUpAnimation(510, 150)}>{selectedCandidate.description}</p>
            )}
          </div>
          <div className={cx(style["btn"])}>
            <a onClick={() => onClickCandidate("submit")} style={fadeMoveUpAnimation(530, 210)}>
              <span>{selectedCandidate.title} 선택</span>
            </a>
          </div>
        </div>
      ) : (
        <div className={cx(style.unselected)}>
          <div>
            <span>후보를 선택해주세요</span>
          </div>
        </div>
      )}
    </>
  )
}
