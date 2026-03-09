import type { Bill } from "./types/bill";
import type { Party } from "./types/party";

export const mockParties: Party[] = [
    { id: 1, name: "Socialdemokratiet", letter: "A", colorHex: "#E4002B" },
    { id: 2, name: "Radikale Venstre", letter: "B", colorHex: "#E52583" },
    { id: 3, name: "Konservative", letter: "C", colorHex: "#00583C" },
    { id: 4, name: "Dansk Folkeparti", letter: "O", colorHex: "#E7D01E" },
    { id: 5, name: "SF", letter: "F", colorHex: "#C7402E" },
    { id: 6, name: "Liberal Alliance", letter: "I", colorHex: "#00AADC" },
    { id: 7, name: "Enhedslisten", letter: "Ø", colorHex: "#E6801A" },
    { id: 8, name: "Venstre", letter: "V", colorHex: "#004A96" },
    { id: 9, name: "Alternativet", letter: "Å", colorHex: "#2B8738" },
    { id: 10, name: "Moderaterne", letter: "M", colorHex: "#7B2D8E" },
    { id: 11, name: "Danmarksdemokraterne", letter: "Æ", colorHex: "#0F4D3A" },
];

export const mockBills: Bill[] = [
    {
        id: 1,
        billTag: "L 13",
        title: "Forslag til lov om konsekvenser ved afskaffelsen af store bededag som helligdag",
        question: "Det var den rigtige beslutning at afskaffe store bededag",
        description:
            "Lovforslaget gik ud på at afskaffe store bededag som helligdag og gøre dagen til en almindelig arbejdsdag.",
        forExplanation:
            "Det gav flere arbejdstimer og penge til velfærd og forsvar. Danmark har brug for flere hænder på arbejdsmarkedet.",
        againstExplanation:
            "Det fjernede en vigtig fridag for mange danskere. Tradition og fritid blev ofret for økonomi.",
        url: "https://www.ft.dk/samling/20222/lovforslag/L13/index.htm",
        votedAt: "2023-02-28",
        isPassed: true,
        billType: "Lovforslag",
        partyVotes: [
            { partyId: 1, vote: "for" },
            { partyId: 2, vote: "for" },
            { partyId: 3, vote: "against" },
            { partyId: 4, vote: "against" },
            { partyId: 5, vote: "against" },
            { partyId: 6, vote: "for" },
            { partyId: 7, vote: "against" },
            { partyId: 8, vote: "for" },
            { partyId: 9, vote: "against" },
            { partyId: 10, vote: "for" },
            { partyId: 11, vote: "against" },
        ],
    },
    {
        id: 2,
        billTag: "B 40",
        title: "Forslag til beslutning om at forbyde salg af energidrikke til børn under 18 år",
        question: "Salg af energidrikke bør forbydes til børn under 18 år",
        description:
            "Beslutningsforslaget ville indføre et forbud mod salg af energidrikke til personer under 18 år.",
        forExplanation:
            "Energidrikke er skadelige for børns sundhed. Andre lande har allerede indført lignende forbud.",
        againstExplanation:
            "Det er forældrenes ansvar, ikke statens. Et forbud er et unødvendigt indgreb i den personlige frihed.",
        url: "https://www.ft.dk/samling/20222/beslutningsforslag/B40/index.htm",
        votedAt: "2023-05-30",
        isPassed: false,
        billType: "Beslutningsforslag",
        partyVotes: [
            { partyId: 1, vote: "against" },
            { partyId: 2, vote: "against" },
            { partyId: 3, vote: "against" },
            { partyId: 4, vote: "for" },
            { partyId: 5, vote: "for" },
            { partyId: 6, vote: "against" },
            { partyId: 7, vote: "for" },
            { partyId: 8, vote: "against" },
            { partyId: 9, vote: "for" },
            { partyId: 10, vote: "against" },
            { partyId: 11, vote: "for" },
        ],
    },
    {
        id: 3,
        billTag: "L 93",
        title: "Forslag til lov om ændring af udlændingeloven (Indførelse af mulighed for at udvise udlændinge dømt for bandekriminalitet)",
        question: "Udlændinge dømt for bandekriminalitet bør kunne udvises",
        description:
            "Lovforslaget gav mulighed for at udvise udenlandske statsborgere, der dømmes for banderelateret kriminalitet.",
        forExplanation:
            "Bandekriminalitet er et alvorligt problem, og udvisning sender et klart signal. Det beskytter samfundet.",
        againstExplanation:
            "Udvisning kan være i strid med internationale konventioner. Straf bør afsones i Danmark.",
        url: "https://www.ft.dk/samling/20222/lovforslag/L93/index.htm",
        votedAt: "2023-06-01",
        isPassed: true,
        billType: "Lovforslag",
        partyVotes: [
            { partyId: 1, vote: "for" },
            { partyId: 2, vote: "neither" },
            { partyId: 3, vote: "for" },
            { partyId: 4, vote: "for" },
            { partyId: 5, vote: "against" },
            { partyId: 6, vote: "for" },
            { partyId: 7, vote: "against" },
            { partyId: 8, vote: "for" },
            { partyId: 9, vote: "against" },
            { partyId: 10, vote: "for" },
            { partyId: 11, vote: "for" },
        ],
    },
];
