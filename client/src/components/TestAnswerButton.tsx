import { Minus, ThumbsDown, ThumbsUp } from "lucide-react";
import type { Vote } from "../lib/types/vote";

const voteTranslations: Record<Vote, string> = {
    for: "For",
    against: "Imod",
    neither: "Hverken eller",
}

const voteIcons: Record<Vote, React.ReactNode> = {
    for: <ThumbsUp className="text-green-600"/>,
    against: <ThumbsDown className="text-red-600"/>,
    neither: <Minus className="text-gray-600"/>,
}

const voteStyles: Record<Vote, string> = {
    for: "bg-green-100 border-green-500 text-green-700",
    against: "bg-red-100 border-red-500 text-red-700",
    neither: "bg-gray-100 border-gray-400 text-gray-700",
}

export default function TestAnswerButton({
    answer,
    onClick,

}: Readonly<{
    answer: Vote;
    onClick: () => void;
}>) {
    return (
        <button
            onClick={onClick}
            className={`w-full px-4 py-6 rounded-xl font-semibold flex items-center gap-4 md:gap-2 border hover:brightness-[0.98] hover:cursor-pointer active:scale-[0.99] md:active:scale-[0.97] duration-100 md:flex-col md:w-40 lg:w-50 lg:py-8 select-none ${voteStyles[answer]}`}
        >
            {voteIcons[answer]}
            {voteTranslations[answer]}
        </button>
    )
}