import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://hvadskaljegstemme.dk/",
            lastModified: new Date(),
            priority: 1.0,
        },
        {
            url: "https://hvadskaljegstemme.dk/om-testen/",
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: "https://hvadskaljegstemme.dk/partiernes-stemmer/",
            lastModified: new Date(),
            priority: 0.7,
        },
        {
            url: "https://hvadskaljegstemme.dk/tag-testen/",
            lastModified: new Date(),
            priority: 0.6,
        },
    ];
}
