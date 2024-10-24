import {ChangeEvent, FormEvent, useState} from 'react';


interface StarRatingInputProps {
  value: number;
  title: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

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

export function OfferPageReviewForm() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit} method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <StarRatingInput value={5} title="perfect" onChange={handleRatingChange} checked={rating === 5}/>
        <StarRatingInput value={4} title="good" onChange={handleRatingChange} checked={rating === 4}/>
        <StarRatingInput value={3} title="not bad" onChange={handleRatingChange} checked={rating === 3}/>
        <StarRatingInput value={2} title="badly" onChange={handleRatingChange} checked={rating === 2}/>
        <StarRatingInput value={1} title="terribly" onChange={handleRatingChange} checked={rating === 1}/>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={handleReviewChange}
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
          disabled={rating === 0 || review.length < 50}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
