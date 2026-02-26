import type { Bill } from "../types/bill";

export async function fetchBills(): Promise<Bill[]> {
    const response = await fetch(`/api/bills`);

    if (!response.ok) {
        throw new Error(`Failed to fetch bills: ${response.statusText}`);
    }

    return response.json();
}