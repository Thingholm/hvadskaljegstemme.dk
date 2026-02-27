import { useQuery } from "@tanstack/react-query";
import Section from "../layout/Section";
import { fetchBills } from "../../lib/api/bills";
import { fetchParties } from "../../lib/api/parties";

function KeyNumberBlock({
    label,
    value,
    isLoading = false,
    fallbackValue,
}: Readonly<{
    label: string;
    value?: number | string;
    isLoading?: boolean;
    fallbackValue?: string;
}>) {
    return (
        <div className="flex flex-col items-center gap-1">
            {isLoading 
                ? <div className="block h-9 w-10 bg-gray-300 animate-pulse rounded"></div>
                : <p className="font-bold text-3xl text-blue-600">{value ?? fallbackValue}</p>
            }
            <p className="uppercase text-gray-500 text-sm font-semibold">{label}</p>
        </div>
    )
}

export default function KeyNumbersSection() {
    const { data: bills, isLoading: isLoadingBills } = useQuery({
        queryKey: ["bills"],
        queryFn: fetchBills
    });

    const { data: parties, isLoading: isLoadingParties } = useQuery({
        queryKey: ["parties"],
        queryFn: fetchParties
    });
    
    return (
        <Section className="bg-gray-100 py-6 md:py-8">
            <div className="grid grid-cols-3 gap-y-8 md:grid-cols-3 xl:max-w-5xl xl:mx-auto">
                {/* <KeyNumberBlock label="Har taget testen" value={##}/> */}
                <KeyNumberBlock label="Forslag" value={bills?.length} isLoading={isLoadingBills} fallbackValue="27"/>
                <KeyNumberBlock label="Partier" value={parties?.length} isLoading={isLoadingParties} fallbackValue="11"/>
                <KeyNumberBlock label="Gennemsigtigt" value={"100%"}/>
            </div>
        </Section>
    )
}   