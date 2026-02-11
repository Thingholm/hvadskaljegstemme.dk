import type { Party } from "../lib/types/party";

export default function PartyLetter({
    party,
    size = 8
}: Readonly<{
    party?: Party;
    size?: Number;
}>) {
    return (
        <div 
            className={`w-${size} h-${size} ${party ? "" : "text-xs"} aspect-square rounded-full flex justify-center items-center text-white`}
            style={{ backgroundColor: party?.color_hex ?? "#145DFB" }}
        >
            {party?.letter ?? "Dig"}
        </div>
    )
}