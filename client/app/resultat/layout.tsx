import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dit resultat - Hvad skal jeg stemme?",
    description:
        "Se dit personlige resultat og find ud af hvilke partier du er mest enig med baseret på dine svar til folketingsvalg 2026",
    openGraph: {
        title: "Mit resultat - Hvad skal jeg stemme?",
        description:
            "Find ud af hvilket parti du er mest enig til folketingsvalget 2026 med baseret på faktiske Folketingsafstemninger.",
        url: "https://hvadskaljegstemme.dk/resultat/",
    },
    robots: "noindex, nofollow",
};

export default function ResultatLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
