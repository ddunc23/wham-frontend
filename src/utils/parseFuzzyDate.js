export default function parseFuzzyDate(date) {
    if (!date || typeof date !== 'object') {
        return '-';
    }
    if (date.accuracy === 0) {
        const year = new Date(date.start_date).getFullYear();
        return year;
    }
}