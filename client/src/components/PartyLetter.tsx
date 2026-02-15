import type { Party } from "../lib/types/party";

export default function PartyLetter({
    party,
    size = 8
}: Readonly<{
    party?: Party;
    size?: number;
}>) {
    return (
        <div 
            className={`${party ? (size < 7 ? "text-sm" : "") : "text-xs"} aspect-square rounded-full flex justify-center items-center text-white`}
            style={{ 
                backgroundColor: party?.colorHex ?? "#145DFB",
                height: `calc(var(--spacing) * ${size})`,
                width: `calc(var(--spacing) * ${size})`
            }}
        >
            {party?.letter ?? "Dig"}
        </div>
    )
}