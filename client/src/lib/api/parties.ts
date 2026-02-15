import type { Party } from "../types/party";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchParties(): Promise<Party[]> {
    const response = await fetch(`${API_URL}/parties`);

    if (!response.ok) {
        throw new Error(`Failed to fetch parties: ${response.statusText}`);
    }

    return response.json();
}