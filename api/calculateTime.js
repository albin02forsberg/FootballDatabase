export default function calculateTime(seconds) {
    const time = new Date(seconds * 1000);
    const now = new Date();
    const diff = (now.getTime() - time.getTime()) / 1000;
    if (diff < 60) {
        return `${Math.round(diff)} sekunder sedan`;
    } else if (diff < 3600) {
        return `${Math.round(diff / 60)} minuter sedan`;
    } else if (diff < 86400) {
        return `${Math.round(diff / 3600)} timmar sedan`;
    } else if (diff < 604800) {
        return `${Math.round(diff / 86400)} dagar sedan`;
    } else if (diff < 2419200) {
        return `${Math.round(diff / 604800)} veckor sedan`;
    } else if (diff < 31536000) {
        return `${Math.round(diff / 2419200)} månader sedan`;
    } else {
        return `${Math.round(diff / 31536000)} år sedan`;
    }
}