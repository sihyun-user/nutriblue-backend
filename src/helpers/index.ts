import { format } from 'date-fns';

export const formatedDate = (value: Date): string => format(value, 'yyyy-MM-dd');
