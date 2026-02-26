export function formatDateString(dateString: string) {
    return dateString.split("-").reverse().join("-");
}