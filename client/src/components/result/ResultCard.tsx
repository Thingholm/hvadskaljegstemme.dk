import { ChevronDown } from "lucide-react";
import type { PartyMatch } from "../../utils/helpers/resultCalculation";

export default function ResultCard({
    userResult
}: Readonly<{
    userResult: PartyMatch
}>) {
    return (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-2">
            <div className="grid gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span 
                            className="w-8 h-8 rounded-full flex justify-center items-center text-white" 
                            style={{ backgroundColor: userResult.party.color_hex }}
                        >
                            {userResult.party.letter}
                        </span>
                        <h3 className="font-semibold">{userResult.party.name}</h3>
                    </div>
                    <h3
                        className="text-lg font-black"
                        style={{ color: userResult.party.color_hex }}
                    >
                        {userResult.percentage}%
                    </h3>
                </div>
                <div className="block relative h-2.5 w-full bg-gray-200 rounded-full">
                    <div 
                        className="absolute block h-2.5 rounded-full" 
                        style={{ backgroundColor: userResult.party.color_hex, width: `${userResult.percentage}%` }}
                    ></div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Klik for at sammenligne svar</p>
                    <ChevronDown size={20} className="text-gray-500"/>
                </div>
            </div>
        </div>
    )
}