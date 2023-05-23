import { differenceInDays, differenceInMonths, differenceInYears, formatDistanceToNow, subMonths, subYears } from 'date-fns';
export const calculateAge = (birthDate: Date) => {
    const currentDate = new Date();
    const yearsDiff = differenceInYears(currentDate, birthDate);
    const currentDateAfterYears = subYears(currentDate, yearsDiff);
    const monthsDiff = differenceInMonths(currentDateAfterYears, birthDate);
    const currentDateAfterMonths = subMonths(currentDateAfterYears, monthsDiff);
    const daysDiff = differenceInDays(currentDateAfterMonths, birthDate);

    return `${yearsDiff} year${yearsDiff === 1 ? '' : 's'}, ${monthsDiff} month${monthsDiff === 1 ? '' : 's'}, ${daysDiff} day${daysDiff === 1 ? '' : 's'}`;
};
export const getTimeSinceDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
};
