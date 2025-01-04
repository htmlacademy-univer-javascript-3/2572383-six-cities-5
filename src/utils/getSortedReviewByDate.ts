import {Review} from '../types/review.ts';

export const sortReviewsByDate = (reviews: Review[]): Review[] => [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
