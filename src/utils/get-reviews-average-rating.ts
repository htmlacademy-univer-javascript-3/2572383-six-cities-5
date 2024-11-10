import {Review} from '../types/review.ts';

export function getReviewsAverageRating(reviews: Review[]) {
  if (reviews.length === 0) {
    return 0;
  }
  const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
  return totalStars / reviews.length;
}
