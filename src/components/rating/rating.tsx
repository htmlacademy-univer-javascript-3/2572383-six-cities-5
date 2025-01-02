import {PropsWithChildren} from 'react';

interface RatingProps extends PropsWithChildren {
  wrapperClass: string;
  starsClass: string;
  averageRating: number;
  roundToNearestInteger: boolean;
}

export default function Rating(props: RatingProps) {
  const { wrapperClass, starsClass, averageRating, roundToNearestInteger, children } = props;

  const starPercentage = roundToNearestInteger
    ? Math.round(averageRating) * 20
    : averageRating * 20;

  return (
    <div className={`${wrapperClass} rating`}>
      <div className={`${starsClass} rating__stars`}>
        <span style={{ width: `${starPercentage}%` }} />
        <span className="visually-hidden">Rating</span>
      </div>
      {children}
    </div>
  );
}

