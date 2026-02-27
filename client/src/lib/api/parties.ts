import type { Party } from "../types/party";

export async function fetchParties(): Promise<Party[]> {
    const response = await fetch(`/api/parties`);

    if (!response.ok) {
        throw new Error(`Failed to fetch parties: ${response.statusText}`);
    }

    return response.json();
}