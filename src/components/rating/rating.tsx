import {PropsWithChildren} from 'react';

interface RatingProps extends PropsWithChildren {
  wrapperClass: string;
  starsClass: string;
  averageRating: number;
}

export default function Rating(props: RatingProps) {
  return (
    <div className={`${props.wrapperClass} rating`}>
      <div className={`${props.starsClass} rating__stars`}>
        <span style={{width: `${props.averageRating * 20}%`}}/>
        <span className="visually-hidden">Rating</span>
      </div>
      {props.children}
    </div>
  );
}
