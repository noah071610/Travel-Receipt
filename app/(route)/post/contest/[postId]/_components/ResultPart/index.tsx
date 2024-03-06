import { getImageUrl } from "@/_data"
import { ContestCandidateType } from "@/_types/post/contest"
import { calculateVoteRatio } from "@/_utils/math"
import classNames from "classNames"
import CountUp from "react-countup"

export default function ResultPart({
  candidates,
  direction,
  selected,
}: {
  candidates: ContestCandidateType[]
  direction: "left" | "right"
  selected: string | null
}) {
  const candidate = candidates[direction === "left" ? 0 : 1]
  const ratio = calculateVoteRatio(candidates[0].pick, candidates[1].pick)[direction]

  return (
    <div
      className={classNames("global-select", "result", {
        selected: selected === candidate.listId,
        unselected: selected !== candidate.listId,
      })}
    >
      <div className={classNames("border")}></div>

      {selected === candidate.listId && (
        <div className={classNames("global-select-background", direction)}>
          <span>LIKE!</span>
        </div>
      )}

      <div className={classNames("global-select-inner")}>
        <div
          style={{
            backgroundImage: getImageUrl({ url: candidate.imageSrc }),
          }}
          className={classNames("thumbnail")}
        ></div>
        <div
          className={classNames("thumbnail-overlay")}
          style={{
            backgroundImage: getImageUrl({ url: candidate.imageSrc }),
          }}
        ></div>
        <div className={classNames("description")}>
          <div className={classNames("title-wrapper")}>
            <div style={{ width: `calc(${ratio}%)` }} className={classNames("graph", `graph-${direction}`)}>
              <div className={classNames("gauge")}></div>
            </div>
            <h1 className={classNames("title")}>{candidate?.title}</h1>
            <p className={classNames("count")}>
              <span>
                <CountUp prefix="(" suffix="표)" duration={4} end={candidate.pick} />
              </span>
              {" / "}
              <span>
                <CountUp prefix="(" suffix="%)" separator=" " decimals={2} decimal="," end={parseFloat(ratio)} />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
