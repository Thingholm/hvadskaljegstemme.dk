import type { UserAnswer } from "../types/user-answer";

export function submitUserAnswers(userAnswers: UserAnswer[]): void {
    fetch(`http://localhost:8080/api/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userAnswers)
    }).catch((error) => console.error("Failed to submit answers:", error));
}