export function formatTime(isoDateStr) {
    const date = new Date(isoDateStr);
    const now = new Date();

    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const timeString = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    let dayText = "";
    if (diffDays === 0) {
        dayText = "Hôm nay";
    } else if (diffDays === 1) {
        dayText = "Hôm qua";
    } else {
        dayText = `${diffDays} ngày trước`;
    }

    return `${timeString} | ${dayText}`;
}