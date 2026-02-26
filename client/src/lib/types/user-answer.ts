import type { VoteWithSkip } from "./vote";

export type UserAnswer = {
    userId: string;
    billId: number;
    vote: VoteWithSkip;
}