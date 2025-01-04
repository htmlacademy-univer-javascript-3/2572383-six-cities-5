import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../store';
import {postReview} from '../../store/api-actions.ts';
import {selectIsAuthorized} from '../../store/user/user-selectors.ts';


interface StarRatingInputProps {
  value: number;
  title: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  disabled: boolean;
}

const StarInputTitles = new Map<number, string>([
  [5, 'perfect'],
  [4, 'good'],
  [3, 'not bad'],
  [2, 'badly'],
  [1, 'terribly'],
]);

function StarRatingInput(props: StarRatingInputProps) {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        defaultValue={props.value}
        id={`${props.value}-stars`}
        type="radio"
        onChange={props.onChange}
        checked={props.checked}
        disabled={props.disabled}
      />
      <label
        htmlFor={`${props.value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={props.title}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>
    </>
  );
}

export function OfferPageReviewForm(props: {offerId: string}) {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const dispatch = useAppDispatch();
  const reviewUploading = useAppSelector((state) => state.offers.reviewUploading);
  const reviewSuccess = useAppSelector((state) => state.offers.reviewSuccess);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    if (reviewSuccess) {
      setRating(0);
      setReview('');
    }
  }, [reviewSuccess, dispatch]);

  if (!isAuthorized){
    return null;
  }

  const handleRatingChange = (value: string) => {
    setRating(Number(value));
  };

  const handleReviewChange = (value: string) => {
    setReview(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(postReview({offerId: props.offerId, comment: review, rating: rating}));
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit} method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Array.from(StarInputTitles.entries()).map(([value, title]) => (
          <StarRatingInput
            key={value}
            value={value}
            title={title}
            onChange={(event) => handleRatingChange(event.target.value)}
            checked={rating === value}
            disabled={reviewUploading}
          />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={(event) => handleReviewChange(event.target.value)}
        disabled={reviewUploading}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={rating === 0 || review.length < 50 || review.length > 300 || reviewUploading}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
