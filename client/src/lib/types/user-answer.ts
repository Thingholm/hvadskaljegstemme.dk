import type { Vote } from "./vote";

export type UserAnswer = {
    user_uuid: string;
    bill_id: number;
    vote: Vote;
    answered_at: string; // ISO date string
}