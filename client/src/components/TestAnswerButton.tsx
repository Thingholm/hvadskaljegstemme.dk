import { Minus, ThumbsDown, ThumbsUp } from "lucide-react";
import type { Vote } from "../lib/types/vote";

type VoteWithoutSkip = Exclude<Vote, "skip">;

const voteTranslations: Record<VoteWithoutSkip, string> = {
    for: "For",
    against: "Imod",
    neither: "Hverken eller",
}

const voteIcons: Record<VoteWithoutSkip, React.ReactNode> = {
    for: <ThumbsUp className="text-green-600"/>,
    against: <ThumbsDown className="text-red-600"/>,
    neither: <Minus className="text-gray-600"/>,
}

const voteStyles: Record<VoteWithoutSkip, string> = {
    for: "bg-green-100 border-green-500 text-green-700",
    against: "bg-red-100 border-red-500 text-red-700",
    neither: "bg-gray-100 border-gray-400 text-gray-700",
}

export default function TestAnswerButton({
    answer,
    onClick,
    isAnswered = false,
}: Readonly<{
    answer: VoteWithoutSkip;
    onClick: () => void;
    isAnswered?: boolean;
}>) {
    return (
        <div className="relative">
            <button
                onClick={onClick}
                className={`${voteStyles[answer]} ${isAnswered ? "border-3 pb-5" : ""} w-full px-4 py-6 rounded-xl font-semibold flex items-center gap-4 md:gap-2 border hover:brightness-[0.98] hover:cursor-pointer active:scale-[0.99] md:active:scale-[0.97] duration-100 md:flex-col md:w-40 lg:w-50 lg:py-8 select-none`}
            >
                {voteIcons[answer]}
                {voteTranslations[answer]}
                {isAnswered &&<span className="md:hidden absolute text-sm opacity-500 right-4 font-normal">Dit svar</span>}
            </button>
            {isAnswered && <span className="absolute w-full text-center text-sm text-gray-500 mt-2 hidden md:block">Dit svar</span>}
        </div>
    )
}