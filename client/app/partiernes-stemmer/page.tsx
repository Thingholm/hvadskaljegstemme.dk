import type { Metadata } from "next";
import PartiernesStemmerClient from "./client";
import { fetchBillsServer, fetchPartiesServer } from "@/lib/api/server";

export const metadata: Metadata = {
    title: "Partiernes stemmer - Hvad skal jeg stemme?",
    description:
        "Se alle lovforslag og beslutningsforslag i testen og hvordan hvert parti har stemt på dem i Folketinget.",
    openGraph: {
        title: "Partiernes stemmer i Folketinget - Hvad skal jeg stemme?",
        description:
            "Overblik over hvordan partierne har stemt i Folketinget på forslagene i testen.",
        url: "https://hvadskaljegstemme.dk/partiernes-stemmer/",
    },
};

export default async function PartiernesStemmerPage() {
    const [bills, parties] = await Promise.all([
        fetchBillsServer(),
        fetchPartiesServer(),
    ]);

    return <PartiernesStemmerClient bills={bills} parties={parties} />;
}
