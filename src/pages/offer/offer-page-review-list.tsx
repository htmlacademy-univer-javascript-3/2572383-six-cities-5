import {Review} from '../../types/review.ts';
import Rating from '../../components/rating/rating.tsx';
import {getReviewsAverageRating} from '../../utils/get-reviews-average-rating.ts';

function ReviewDate(props: { date: string }) {
  const formattedDate = new Date(props.date).toLocaleString('en-US', {year: 'numeric', month: 'long'});

  return (
    <time className="reviews__time" dateTime={props.date}>
      {formattedDate}
    </time>
  );
}

function ReviewItem(props: { review: Review }) {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={props.review.user.imageSrc}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{props.review.user.firstname}</span>
      </div>
      <div className="reviews__info">
        <Rating wrapperClass="reviews__rating" starsClass="reviews__stars" averageRating={getReviewsAverageRating([props.review])}/>
        <p className="reviews__text">
          {props.review.text}
        </p>
        <ReviewDate date={props.review.datetime}/>
      </div>
    </li>
  );
}

export function OfferPageReviewList(props: { reviews: Review[] }) {
  return (
    <ul className="reviews__list">
      {props.reviews.map((review: Review) => <ReviewItem key={review.text} review={review}/>)}
    </ul>
  );
}
