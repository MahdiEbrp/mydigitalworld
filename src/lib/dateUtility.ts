import { differenceInDays, differenceInMonths, differenceInYears, formatDistanceToNow, subMonths, subYears, format } from 'date-fns';
export const calculateAge = (birthDate: Date) => {

    const currentDate = new Date();
    const yearsDiff = differenceInYears(currentDate, birthDate);
    const currentDateAfterYears = subYears(currentDate, yearsDiff);
    const monthsDiff = differenceInMonths(currentDateAfterYears, birthDate);
    const currentDateAfterMonths = subMonths(currentDateAfterYears, monthsDiff);
    const daysDiff = differenceInDays(currentDateAfterMonths, birthDate);

    const getDurationString = (value: number, unit: 'year' | 'month' | 'day'): string => {
        if (value === 1) {
            return `1 ${unit}`;
        } else if (value > 1) {
            return `${value} ${unit}s`;
        }

        return '';
    };
    const yearsString = getDurationString(yearsDiff, 'year');
    const monthsString = getDurationString(monthsDiff, 'month');
    const daysString = getDurationString(daysDiff, 'day');

    const durationStrings = [yearsString, monthsString, daysString].filter(Boolean);

    return durationStrings.join(', ');
};

export const getTimeSinceDate = (dateValue: string | Date) => {
    const date = new Date(dateValue);
    return formatDistanceToNow(date, { addSuffix: true });
};
export const getFormattedDate = (dateValue: string | Date): string => {
    const date = new Date(dateValue);
    return format(date, 'yyyy-MM-dd');
};