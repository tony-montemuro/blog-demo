export default function timeAgo(date) {
    const addS = n => n > 1 ? "s" : "";

    date = new Date(date);
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31557600; // converts seconds to years

    if (interval > 1) {
        const years = Math.floor(interval);
        return `${ years } year${ addS(years) } ago`;
    }
    interval = seconds / 2592000; // converts seconds to months
    if (interval > 1) {
        const months = Math.floor(interval);
        return `${ months } month${ addS(months) } ago`;
    }
    interval = seconds / 86400; // converts seconds to days
    if (interval > 1) {
        const days = Math.floor(interval);
        return `${ days } day${ addS(days) } ago`;
    }
    interval = seconds / 3600; // converts seconds to hours
    if (interval > 1) {
        const hours = Math.floor(interval);
        return `${ hours } hour${ addS(hours) } ago`;
    }
    interval = seconds / 60; // converts seconds to minutes
    if (interval > 1) {
        const minutes = Math.floor(interval);
        return `${ minutes } minute${ addS(minutes) } ago`;
    }
    return `${ seconds } second${ addS(seconds) } ago`;
};