import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
    title: "Hvad skal jeg stemme?",
    description:
        "Find ud af hvilket parti du er mest enig med baseret på faktiske afstemninger i Folketinget - ikke valgløfter.",
    openGraph: {
        siteName: "Hvad skal jeg stemme? - Folketingsvalg 2026",
        type: "website",
        locale: "da_DK",
        description:
            "Tag partitesten, baseret på hvordan partierne faktisk har stemt i Folketinget frem for valgløfter i en almindelig kandidattest, og find ud af hvilket parti du er mest enig med.",
        url: "https://hvadskaljegstemme.dk/",
        images: [
            {
                url: "https://hvadskaljegstemme.dk/og-image.png",
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: ["https://hvadskaljegstemme.dk/og-image.png"],
    },
    robots: "index, follow",
    icons: {
        icon: "/logo.svg?v2",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="da">
            <body>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1 pt-12 bg-white md:bg-gray-100">
                        {children}
                    </main>
                    <Footer />
                </div>
                <Script
                    defer
                    src="https://cloud.umami.is/script.js"
                    data-website-id="80ad6aa6-71d6-4f2d-be06-8ea3bdce2f00"
                />
            </body>
        </html>
    );
}
