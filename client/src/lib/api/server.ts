import type { Bill } from "../types/bill";
import type { Party } from "../types/party";
import { mockBills, mockParties } from "../mock-data";

const API_URL = process.env.API_URL;

export async function fetchBillsServer(): Promise<Bill[]> {
    if (!API_URL) return mockBills;

    try {
        const res = await fetch(`${API_URL}/api/bills`, {
            next: { revalidate: 300 },
        });
        if (!res.ok) return mockBills;
        return res.json();
    } catch {
        return mockBills;
    }
}

export async function fetchPartiesServer(): Promise<Party[]> {
    if (!API_URL) return mockParties;

    try {
        const res = await fetch(`${API_URL}/api/parties`, {
            next: { revalidate: 300 },
        });
        if (!res.ok) return mockParties;
        return res.json();
    } catch {
        return mockParties;
    }
}
