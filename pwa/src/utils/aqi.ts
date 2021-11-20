export function getAQIDescriptor(aqi: number) {
    if (aqi < 50) {
        return "Good";
    } else if (aqi < 100) {
        return "Moderate";
    } else if (aqi < 150) {
        return "Unhealthy for Sensitive Groups";
    } else if (aqi < 200) {
        return "Unhealthy";
    } else if (aqi < 300) {
        return "Very Unhealthy";
    } else {
        return "Hazardous";
    }
}

export function getAQIColor(aqi: number) {
    if (aqi < 50) {
        return "rgb(0, 228, 0)";
    } else if (aqi < 100) {
        return "rgb(255, 255, 0)";
    } else if (aqi < 150) {
        return "rgb(255, 126, 0)";
    } else if (aqi < 200) {
        return "rgb(255, 0, 0)";
    } else if (aqi < 300) {
        return "rgb(143, 63, 151)";
    } else {
        return "rgb(126, 0, 35)";
    }
}