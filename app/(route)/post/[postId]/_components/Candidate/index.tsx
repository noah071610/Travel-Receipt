"use client"

import { usePostStore } from "@/_store/post"
import { fadeMoveUpAnimation } from "@/_styles/animation"
import { CandidateType } from "@/_types/post"
import classNames from "classnames"
import React from "react"
import CountUp from "react-countup"
import "./style.scss"

function Candidate({
  isResultPage,
  votedListId,
  selectedCandidate,
  setSelectedCandidate,
  candidate,
  index,
}: {
  isResultPage: boolean
  selectedCandidate: CandidateType | null
  setSelectedCandidate: (state: CandidateType | null) => void
  votedListId?: string
  candidate: CandidateType
  index: number
}) {
  const { count, description, listId, title, imageSrc } = candidate
  const { setViewCandidateNum } = usePostStore()

  const onClickSelect = (candidate: CandidateType) => {
    !isResultPage && setSelectedCandidate(candidate)
  }
  const onMouseEnterCard = (candidate: CandidateType) => {
    setViewCandidateNum(candidate.number)
  }
  const onMouseLeaveCard = () => {
    setViewCandidateNum(0)
  }

  const isSelected = (selectedCandidate?.listId || votedListId) === listId

  return (
    <li
      onClick={() => onClickSelect(candidate)}
      onMouseEnter={() => onMouseEnterCard(candidate)}
      onMouseLeave={onMouseLeaveCard}
      style={fadeMoveUpAnimation(1100 + index * 20, index * 100)}
    >
      <div
        className={classNames("candidate-card-bg", {
          selected: isSelected,
        })}
      ></div>
      <div
        className={classNames("candidate-card", {
          selected: isSelected,
        })}
      >
        {/* memo: 결과 페이지만 적용 */}
        {isResultPage && (
          <>
            {index === 0 && (
              <img
                className="number-one"
                src={`/images/ranking/number_${index + 1}.png`}
                alt={`ranking_number_${index + 1}`}
              />
            )}
            <div className="number ranking">{index + 1}</div>
          </>
        )}

        <div className={classNames("candidate-card-inner", { isResultPage })}>
          <div className="candidate-image-wrapper">
            <div
              style={{
                backgroundImage: `url('${imageSrc}'), url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWDEOaqDXtUswwG_M29-z0hIYG-YQqUPBUidpFBHv6g60GgpYq2VQesjbpmVVu8kfd-pw&usqp=CAU')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="candidate-image"
            />
          </div>
          <div className="candidate-description">
            <h3>
              <span className="title">{title}</span>
              {isResultPage && (
                <span className="count">
                  <CountUp prefix="(" suffix="표)" duration={4} end={count} />
                </span>
              )}
            </h3>
            {description && <p>{description}</p>}
          </div>
        </div>
      </div>
    </li>
  )
}

export default React.memo(Candidate)
