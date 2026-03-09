import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tag testen - Hvad skal jeg stemme?",
    description:
        "Svar på spørgsmål om rigtige lovforslag og beslutningsforslag og find ud af hvilke partier du er mest enig med i Folketinget til folketingsvalg 2026.",
    openGraph: {
        title: "Tag testen - Hvad skal jeg stemme?",
        description:
            "Svar på spørgsmål om rigtige lovforslag og beslutningsforslag og find ud af hvilke partier du er mest enig med i Folketinget til folketingsvalg 2026.",
        url: "https://hvadskaljegstemme.dk/tag-testen/",
    },
};

export default function TagTestenLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
