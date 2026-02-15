import type { Bill } from "../types/bill";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchBills(): Promise<Bill[]> {
    const response = await fetch(`${API_URL}/bills`);

    if (!response.ok) {
        throw new Error(`Failed to fetch bills: ${response.statusText}`);
    }

    return response.json();
}