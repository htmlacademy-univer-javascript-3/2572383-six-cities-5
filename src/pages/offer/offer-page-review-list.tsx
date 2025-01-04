import {Review} from '../../types/review.ts';
import Rating from '../../components/rating/rating.tsx';
import {useAppDispatch, useAppSelector} from '../../store';
import {useEffect} from 'react';
import {fetchReviews} from '../../store/api-actions.ts';
import {sortReviewsByDate} from '../../utils/getSortedReviewByDate.ts';

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
            src={props.review.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{props.review.user.name}</span>
      </div>
      <div className="reviews__info">
        <Rating wrapperClass="reviews__rating" starsClass="reviews__stars" averageRating={props.review.rating} roundToNearestInteger={false}/>
        <p className="reviews__text">
          {props.review.comment}
        </p>
        <ReviewDate date={props.review.date}/>
      </div>
    </li>
  );
}

export function OfferPageReviewList(props: { id: string }) {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => sortReviewsByDate(state.offers.reviews));
  const reviewsLoading = useAppSelector((state) => state.offers.reviewsLoading);

  useEffect(() => {
    dispatch(fetchReviews(props.id));
  }, [dispatch, props.id]);

  if (reviewsLoading){
    return null;
  }

  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.slice(0, 10).map((review: Review) => <ReviewItem key={review.id} review={review}/>)}
      </ul>
    </>
  );
}
