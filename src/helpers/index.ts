import { format } from 'date-fns';

export const isValidDate = (date: string): boolean => /^(\d{4})-(\d{2})-(\d{2})$/.test(date);

export const formatedDate = (value: Date): string => format(value, 'yyyy-MM-dd');