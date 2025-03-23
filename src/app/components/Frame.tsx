import { ChangeEvent } from "react";
import { ScoreData, Frame as FrameType, Attempt } from "../types";

interface FrameProps {
  frameIdx: number;
  playerId: string;
  frame: FrameType;
  highlighted: boolean;
  onUpdateScore: (
    e: ChangeEvent<HTMLInputElement>,
    metaData: Omit<ScoreData, "score">
  ) => void;
}

const Frame: React.FC<FrameProps> = ({
  frameIdx,
  playerId,
  frame,
  highlighted,
  onUpdateScore,
}) => {
  return (
    <div
      className={`flex flex-col h-20 text-center border-r-1 ${
        highlighted && "bg-blue-100"
      } ${frameIdx === 0 && highlighted && "rounded-md"}`}
    >
      <div className="border-b-1">{frameIdx + 1}</div>
      <div className="flex">
        <input
          type="text"
          className="w-9 text-center"
          disabled={!highlighted}
          onChange={(e) =>
            onUpdateScore(e, {
              frameIdx,
              playerId: playerId,
              attempt: Attempt.FIRST_ATTEMPT,
            })
          }
          minLength={1}
          maxLength={1}
        />
        <input
          type="text"
          className="w-9 border-l-1 border-b-1 text-center"
          disabled={!highlighted || frame.firstAttempt === undefined}
          onChange={(e) =>
            onUpdateScore(e, {
              frameIdx,
              playerId: playerId,
              attempt: Attempt.SECOND_ATTEMPT,
            })
          }
          minLength={1}
          maxLength={1}
        />
        {frameIdx === 9 && (
          <input
            type="text"
            className="w-9 border-l-1 border-b-1 text-center"
            disabled={!frame.strike && !frame.spare}
            onChange={(e) =>
              onUpdateScore(e, {
                frameIdx,
                playerId: playerId,
                attempt: Attempt.THIRD_ATTEMPT,
              })
            }
            minLength={1}
            maxLength={1}
          />
        )}
      </div>
      <div>
        {frame.firstAttempt !== undefined &&
          frame.secondAttempt !== undefined &&
          frame.totalScore}
      </div>
    </div>
  );
};

export default Frame;
