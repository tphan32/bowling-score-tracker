export interface Player {
  id: string;
  name?: string;
  frames: Frame[];
}

export enum Attempt {
  FIRST_ATTEMPT = "firstAttempt",
  SECOND_ATTEMPT = "secondAttempt",
  THIRD_ATTEMPT = "thirdAttempt",
}

export interface Frame {
  id: string | number;
  firstAttempt?: number;
  secondAttempt?: number;
  thirdAttempt?: number;
  spare: boolean;
  strike: boolean;
  totalScore: number;
}

export interface ScoreData {
  score: string;
  playerId: Player["id"];
  frameIdx: number;
  attempt: Attempt;
}
