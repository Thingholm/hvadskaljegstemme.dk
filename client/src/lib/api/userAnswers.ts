import type { UserAnswer } from "../types/user-answer";

const API_URL = import.meta.env.VITE_API_URL;

export function submitUserAnswers(userAnswers: UserAnswer[]): void {
    fetch(`${API_URL}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userAnswers)
    }).catch((error) => console.error("Failed to submit answers:", error));
}