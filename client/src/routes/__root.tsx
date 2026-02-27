import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: 'UTF-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
            { title: "Hvad skal jeg stemme?" },
            { name: "description", content: "Find ud af hvilket parti du er mest enig med baseret på faktiske afstemninger i Folketinget - ikke valgløfter." },

            { property: "og:site_name", content: "Hvad skal jeg stemme? - Folketingsvalg 2026" },
            { property: "og:type", content: "website" },
            { property: "og:locale", content: "da_DK" },
            { property: "og:image", content: "https://hvadskaljegstemme.dk/og-image.png" },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },

            { property: "twitter:card", content: "summary_large_image" },
            { property: "twitter:image", content: "https://hvadskaljegstemme.dk/og-image.png" },

            { property: "robots", content: "index, follow" },

            { property: "content-language", content: "da" },
        ],
        links: [
            { rel: "canonical", href: "https://hvadskaljegstemme.dk"},
            { rel: "icon", href: "/logo.svg"}
        ]
    }),
    component: RootComponent,
})

function RootComponent() {
    return (
        <>
        <HeadContent/>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 pt-12 bg-white md:bg-gray-100">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
}