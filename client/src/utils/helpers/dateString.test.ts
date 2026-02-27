import { expect, test } from 'vitest'
import { formatDateString } from './dateString';

test("Formats date from yyyy-mm-dd to dd-mm-yyyy", () => {
    expect(formatDateString("2026-02-27")).toBe("27-02-2026");
});